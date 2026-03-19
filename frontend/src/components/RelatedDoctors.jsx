import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-[#262626]'>
            <p className='muted-label'>Same Department</p>
            <h1 className='text-3xl font-medium text-slate-900'>More consultants from this department</h1>
            <p className='sm:w-1/3 text-center text-sm text-slate-500'>Explore other NCJIMS doctors mapped to the same specialty before you finalize the booking.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='overflow-hidden rounded-[28px] border border-slate-200 bg-white cursor-pointer shadow-[0_18px_45px_rgba(15,23,42,0.06)] hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img className='bg-slate-100' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            <p className='text-lg font-medium text-slate-900'>{item.name}</p>
                            <p className='text-sm text-slate-600'>{item.speciality}</p>
                            <p className='mt-2 text-xs text-slate-500'>{item.opdDays || 'Please confirm with hospital desk'}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* <button className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'>more</button> */}
        </div>
    )
}

export default RelatedDoctors
