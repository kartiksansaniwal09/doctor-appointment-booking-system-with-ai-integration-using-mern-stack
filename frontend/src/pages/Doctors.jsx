import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)
  const specialities = [...new Set(doctors.map((doctor) => doctor.speciality))]

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='pb-10'>
      <div className='mb-8 rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc,#eef7f5)] p-6 md:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.05)]'>
        <p className='text-teal-700 font-semibold tracking-[0.2em] uppercase text-xs'>Institute Directory</p>
        <h1 className='section-title mt-2'>Browse NCJIMS faculty, departments, and OPD-day text</h1>
        <p className='text-gray-600 mt-3 max-w-3xl'>Filter by department, open a doctor profile, then carry symptom context or an AI summary directly into the appointment flow.</p>
      </div>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 sm:min-w-72 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.05)] ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialities.map((item) => (
            <div key={item} onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)} className={`w-[94vw] sm:w-auto cursor-pointer rounded-2xl border px-4 py-3 transition-all ${speciality === item ? 'border-teal-400 bg-teal-50 text-slate-900' : 'border-slate-200 hover:border-slate-300'}`}>
              <p className='font-medium'>{item}</p>
              <p className='mt-1 text-xs text-slate-500'>{doctors.filter((doctor) => doctor.speciality === item).length} listed consultants</p>
            </div>
          ))}
        </div>
        <div className='w-full grid grid-cols-auto gap-5 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='overflow-hidden rounded-[28px] border border-slate-200 bg-white cursor-pointer shadow-[0_18px_45px_rgba(15,23,42,0.06)] hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='h-72 w-full object-cover bg-slate-100' src={item.image} alt="" />
              <div className='p-5'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-[#262626] text-xl font-medium mt-2'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                <p className='text-[#7C7C7C] text-xs mt-1'>{item.opdDays || 'OPD to be confirmed'}</p>
                <p className='mt-3 line-clamp-2 text-xs leading-5 text-slate-500'>{item.departmentFacilities?.slice(0, 2).join(' • ') || item.opdNote}</p>
                <p className='text-[#7C7C7C] text-xs mt-3'>{item.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
