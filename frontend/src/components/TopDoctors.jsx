import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const TopDoctors = () => {

    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-20 text-[#262626] md:mx-10'>
            <span className='text-teal-700 font-semibold tracking-[0.2em] uppercase text-xs'>Directory Highlights</span>
            <h1 className='section-title text-center'>Featured NCJIMS consultants</h1>
            <p className='sm:w-1/2 text-center text-sm text-slate-500'>These cards are pulled from the institute dataset and prioritize doctors with clear OPD-day information for faster booking.</p>
            <div className='w-full grid grid-cols-auto gap-5 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='overflow-hidden rounded-[28px] border border-slate-200 bg-white cursor-pointer shadow-[0_18px_45px_rgba(15,23,42,0.06)] hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img className='h-72 w-full object-cover bg-slate-100' src={item.image} alt="" />
                        <div className='p-5'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            <p className='text-[#262626] text-xl font-medium mt-2'>{item.name}</p>
                            <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                            <p className='text-[#7C7C7C] text-xs mt-1'>{item.opdDays || 'OPD to be confirmed'}</p>
                            <p className='mt-3 line-clamp-2 text-xs leading-5 text-slate-500'>{item.departmentFacilities?.slice(0, 2).join(' • ') || item.about}</p>
                            <div className='mt-4 flex justify-between items-center'>
                                <span className='text-xs text-slate-500'>{item.experience}</span>
                                <span className='text-teal-700 text-sm font-medium'>Open profile</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='rounded-full border border-slate-300 bg-white px-12 py-3 text-gray-700 mt-10'>Explore full institute directory</button>
        </div>

    )
}

export default TopDoctors
