import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const initialForm = {
  name: '',
  age: '',
  gender: 'Not specified',
  phone: '',
  symptoms: '',
  duration: '',
  history: '',
  preferredVisitDate: ''
}

const buildDemoReport = (payload, doctors) => {
  const sourceText = [
    payload.symptoms,
    payload.duration,
    payload.history,
    payload.patient?.gender,
    payload.patient?.age
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  const scoredDoctors = doctors
    .map((doctor) => {
      const symptomMatches = (doctor.symptomFocus || []).filter((keyword) => sourceText.includes(String(keyword).toLowerCase()))
      const specialityMatch = sourceText.includes(doctor.speciality.toLowerCase()) ? 1 : 0
      return {
        doctor,
        score: symptomMatches.length + specialityMatch,
        symptomMatches
      }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  const probableDepartments = [...new Set(scoredDoctors.slice(0, 5).map((item) => item.doctor.speciality))]
  const recommendedDoctors = (scoredDoctors.length ? scoredDoctors : doctors.map((doctor) => ({ doctor, score: 0, symptomMatches: [] })))
    .slice(0, 4)
    .map((item) => item.doctor)

  const urgency = /chest pain|breathing difficulty|shortness of breath|seizure|stroke|faint|blood/i.test(sourceText)
    ? 'High Priority'
    : /pain|fever|swelling|infection/i.test(sourceText)
      ? 'Priority'
      : 'Routine'

  return {
    _id: `demo-${Date.now()}`,
    createdAt: new Date().toISOString(),
    intake: payload,
    analysis: {
      urgency,
      summary: probableDepartments.length
        ? `Demo analysis matched the symptoms to ${probableDepartments.join(', ')} using the local NCJIMS dataset because the backend is not connected yet.`
        : 'Demo analysis could not confidently match a department, so Internal Medicine is the safest starting point.',
      probableDepartments: probableDepartments.length ? probableDepartments : ['Internal Medicine'],
      redFlags: urgency === 'High Priority' ? ['Please seek urgent medical review if symptoms are severe or worsening.'] : [],
      careAdvice: [
        'This is a local demo result generated from the institute doctor dataset.',
        'Carry previous prescriptions or reports for the OPD visit.',
        'Once backend setup is complete, AI reports and PDFs will save to your account.'
      ]
    },
    recommendedDoctors
  }
}

const AiTriageSection = () => {
  const navigate = useNavigate()
  const { backendUrl, token, loadReportHistory, doctors } = useContext(AppContext)
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState(null)
  const [demoMode, setDemoMode] = useState(false)

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const analyzeCase = async (event) => {
    event.preventDefault()

    if (!form.symptoms.trim()) {
      toast.error('Please describe the symptoms first')
      return
    }

    try {
      setLoading(true)
      const payload = {
        patient: {
          name: form.name,
          age: form.age ? Number(form.age) : undefined,
          gender: form.gender,
          phone: form.phone
        },
        symptoms: form.symptoms,
        duration: form.duration,
        history: form.history,
        preferredVisitDate: form.preferredVisitDate
      }

      const { data } = await axios.post(`${backendUrl}/api/ai/analyze`, payload, {
        headers: token ? { token } : {}
      })

      if (data.success) {
        setReport(data.report)
        if (token) {
          loadReportHistory()
        }
        toast.success('AI recommendation ready')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      const localReport = buildDemoReport(payload, doctors)
      setReport(localReport)
      setDemoMode(true)
      toast.info('Backend is not connected yet, so Appointex switched to local demo analysis.')
    } finally {
      setLoading(false)
    }
  }

  const openPdf = () => {
    if (!report?._id) return
    if (demoMode) {
      toast.info('PDF download needs the backend service. Demo mode only shows the matching flow.')
      return
    }
    window.open(`${backendUrl}/api/ai/report/${report._id}/pdf`, '_blank')
  }

  return (
    <section className='my-16 surface-card overflow-hidden bg-[linear-gradient(135deg,#f8fafc,#eef7f5)] p-6 md:p-10'>
      <div className='grid lg:grid-cols-[1.1fr_0.9fr] gap-8'>
        <div>
          <p className='muted-label'>AI Triage</p>
          <h2 className='mt-2 text-3xl md:text-4xl font-semibold text-gray-800'>Let Appointex analyze the case and suggest the most relevant Jindal doctor.</h2>
          <p className='mt-4 max-w-2xl text-gray-600 leading-7'>
            Patients can enter their symptoms in plain language. The backend analyzes the case,
            suggests the most relevant department and doctors, and generates a downloadable PDF summary report.
          </p>

          <form onSubmit={analyzeCase} className='grid sm:grid-cols-2 gap-4 mt-8'>
            <input name='name' value={form.name} onChange={onChange} className='field-input' placeholder='Patient name (optional)' />
            <input name='phone' value={form.phone} onChange={onChange} className='field-input' placeholder='Phone (optional)' />
            <input name='age' type='number' value={form.age} onChange={onChange} className='field-input' placeholder='Age' />
            <select name='gender' value={form.gender} onChange={onChange} className='field-input bg-white'>
              <option>Not specified</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
            <input name='duration' value={form.duration} onChange={onChange} className='field-input' placeholder='Duration (e.g. 3 days)' />
            <input name='preferredVisitDate' type='date' value={form.preferredVisitDate} onChange={onChange} className='field-input' />
            <textarea name='symptoms' value={form.symptoms} onChange={onChange} className='field-input sm:col-span-2 min-h-32' placeholder='Describe symptoms, pain points, fever, breathing issue, dizziness, skin issue, etc.' />
            <textarea name='history' value={form.history} onChange={onChange} className='field-input sm:col-span-2 min-h-24' placeholder='Any medical history, previous reports, surgeries, medicines, pregnancy context, chronic conditions, etc.' />

            <div className='sm:col-span-2 flex flex-wrap gap-3'>
              <button disabled={loading} className='rounded-full bg-slate-900 px-8 py-3 text-white disabled:opacity-60'>
                {loading ? 'Analyzing...' : 'Analyze and suggest doctors'}
              </button>
              {report?._id && (
                <button type='button' onClick={openPdf} className='rounded-full border border-slate-300 px-8 py-3 text-slate-700'>
                  Download PDF summary
                </button>
              )}
            </div>
            {demoMode && (
              <p className='sm:col-span-2 text-xs leading-6 text-amber-700'>
                Demo mode is active because the backend API is not fully configured. You can still test doctor matching from the local NCJIMS dataset.
              </p>
            )}
          </form>
        </div>

        <div className='rounded-3xl border border-slate-200 bg-white p-6'>
          <p className='muted-label'>AI Output</p>
          {!report ? (
            <div className='mt-6 text-gray-500 text-sm leading-6'>
              Fill the form and Appointex will return:
              <ul className='list-disc pl-5 mt-3 space-y-2'>
                <li>case summary</li>
                <li>urgency indication</li>
                <li>recommended departments</li>
                <li>best-fit doctors</li>
                <li>downloadable PDF report</li>
              </ul>
            </div>
          ) : (
            <div className='mt-5 space-y-5'>
              <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                <p className='text-sm text-gray-500'>Urgency</p>
                <p className='text-xl font-semibold text-gray-800'>{report.analysis.urgency}</p>
                <p className='text-sm text-gray-600 mt-2'>{report.analysis.summary}</p>
                {demoMode && <p className='mt-2 text-xs text-amber-700'>This output is coming from the frontend demo fallback, not the backend AI service.</p>}
              </div>

              <div>
                <p className='font-semibold text-gray-800'>Relevant departments</p>
                <div className='flex flex-wrap gap-2 mt-3'>
                  {report.analysis.probableDepartments.map((item) => (
                    <span key={item} className='rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-700'>{item}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className='font-semibold text-gray-800'>Recommended doctors</p>
                <div className='space-y-3 mt-3'>
                  {report.recommendedDoctors.map((doctor) => (
                    <div key={doctor._id} className='flex items-center gap-3 rounded-2xl border border-slate-200 p-3'>
                      <img className='h-14 w-14 rounded-xl object-cover bg-slate-100' src={doctor.image} alt={doctor.name} />
                      <div className='flex-1'>
                        <p className='font-medium text-gray-800'>{doctor.name}</p>
                        <p className='text-sm text-gray-500'>{doctor.speciality}</p>
                        <p className='text-xs text-gray-500 mt-1'>{doctor.opdDays}</p>
                      </div>
                      <button
                        type='button'
                        onClick={() => navigate(`/appointment/${doctor._id}?reportId=${report._id}`)}
                        className='rounded-full bg-slate-900 px-4 py-2 text-sm text-white'
                      >
                        Book
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AiTriageSection
