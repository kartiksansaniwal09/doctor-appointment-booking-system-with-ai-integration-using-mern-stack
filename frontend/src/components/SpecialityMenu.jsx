import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const SpecialityMenu = () => {
    const { doctors } = useContext(AppContext)
    const specialityData = useMemo(() => [...new Set(doctors.map((doctor) => doctor.speciality))].slice(0, 8), [doctors])

    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
            <span className='text-teal-700 font-semibold tracking-[0.2em] uppercase text-xs'>Departments</span>
            <h1 className='section-title text-center'>Browse the OPD roster department by department</h1>
            <p className='sm:w-1/2 text-center text-sm text-slate-600'>These filters come from the live NCJIMS-style dataset in the app, so each department opens into real faculty cards instead of sample categories.</p>
            <div className='flex w-full gap-4 overflow-x-auto pt-5'>
                {specialityData.map((item, index) => (
                    <Link to={`/doctors/${item}`} onClick={() => scrollTo(0, 0)} className='group flex min-w-44 flex-shrink-0 cursor-pointer flex-col justify-between rounded-[28px] border border-slate-200 bg-white p-5 text-xs shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-2' key={index}>
                        <div className='w-14 h-14 sm:w-16 sm:h-16 mb-4 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-lg font-semibold'>
                            {item.slice(0, 2).toUpperCase()}
                        </div>
                        <p className='text-sm font-semibold text-slate-900'>{item}</p>
                        <p className='mt-2 text-xs leading-6 text-slate-500'>{doctors.filter((doctor) => doctor.speciality === item).length} consultants listed</p>
                        <p className='mt-4 text-xs font-medium text-teal-700 group-hover:text-slate-900'>Open department</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
