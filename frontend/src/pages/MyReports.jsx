import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const MyReports = () => {
  const navigate = useNavigate()
  const { token, reportHistory, loadReportHistory, backendUrl } = useContext(AppContext)

  useEffect(() => {
    if (token) {
      loadReportHistory()
    }
  }, [token])

  if (!token) {
    return <div className='surface-card mt-10 flex min-h-[40vh] items-center justify-center p-10 text-gray-500'>Login to view your AI report history.</div>
  }

  return (
    <div className='mt-10'>
      <div className='page-shell mb-8'>
        <p className='muted-label'>My AI Reports</p>
        <h1 className='mt-2 text-3xl font-semibold text-gray-800'>Protected report history</h1>
        <p className='mt-3 text-gray-600'>Every AI triage created while logged in appears here and can be reopened as a PDF.</p>
      </div>

      <div className='grid gap-4'>
        {reportHistory.map((report) => (
          <div key={report._id} className='surface-card p-6'>
            <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
              <div>
                <p className='text-sm text-gray-500'>{new Date(report.createdAt).toLocaleString()}</p>
                <p className='text-xl font-semibold text-gray-800 mt-1'>{report.analysis.urgency}</p>
                <p className='text-gray-600 mt-3 max-w-3xl'>{report.analysis.summary}</p>
                <div className='flex flex-wrap gap-2 mt-4'>
                  {report.analysis.probableDepartments.map((item) => (
                    <span key={item} className='rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-700'>{item}</span>
                  ))}
                </div>
              </div>

              <div className='flex flex-wrap gap-3'>
                <button onClick={() => window.open(`${backendUrl}/api/ai/report/${report._id}/pdf`, '_blank')} className='rounded-full border border-slate-300 px-5 py-2 text-slate-700'>
                  Download PDF
                </button>
                {report.recommendedDoctors?.[0]?._id && (
                  <button onClick={() => navigate(`/appointment/${report.recommendedDoctors[0]._id}?reportId=${report._id}`)} className='rounded-full bg-slate-900 px-5 py-2 text-white'>
                    Book suggested doctor
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {reportHistory.length === 0 && (
          <div className='surface-card border-dashed p-10 text-center text-gray-500'>
            No reports yet. Run an AI analysis from the home page to create your first report.
          </div>
        )}
      </div>
    </div>
  )
}

export default MyReports
