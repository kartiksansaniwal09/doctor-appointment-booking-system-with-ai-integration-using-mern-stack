import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment, updateAppointmentNotes } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [activeId, setActiveId] = useState('')
  const [noteDraft, setNoteDraft] = useState({ doctorNotes: '', doctorDiagnosis: '', followUpPlan: '', prescriptionSummary: '' })

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  const startEditing = (appointment) => {
    setActiveId(appointment._id)
    setNoteDraft({
      doctorNotes: appointment.doctorNotes || '',
      doctorDiagnosis: appointment.doctorDiagnosis || '',
      followUpPlan: appointment.followUpPlan || '',
      prescriptionSummary: appointment.prescriptionSummary || ''
    })
  }

  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='border-b hover:bg-gray-50' key={index}>
          <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6'>
            <p className='max-sm:hidden'>{index}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 rounded-full' alt="" />
              <div>
                <p>{item.userData.name}</p>
                {item.patientConcern && <p className='text-[11px] text-gray-400 max-w-48 truncate'>{item.patientConcern}</p>}
              </div>
            </div>
            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full'>
                {item.payment?'Online':'CASH'}
              </p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{currency}{item.amount}</p>
            {item.cancelled
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted
                ? <div className='flex flex-col gap-2'>
                    <p className='text-green-500 text-xs font-medium'>Completed</p>
                    <button onClick={() => startEditing(item)} className='text-xs border rounded-full px-3 py-1'>Notes</button>
                  </div>
                : <div className='flex'>
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                  <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                </div>
            }
          </div>
          {activeId === item._id && (
            <div className='px-6 pb-5 grid gap-3'>
              <textarea className='border rounded-xl p-3' rows={3} placeholder='Clinical notes' value={noteDraft.doctorNotes} onChange={(e) => setNoteDraft(prev => ({ ...prev, doctorNotes: e.target.value }))} />
              <input className='border rounded-xl p-3' placeholder='Diagnosis summary' value={noteDraft.doctorDiagnosis} onChange={(e) => setNoteDraft(prev => ({ ...prev, doctorDiagnosis: e.target.value }))} />
              <input className='border rounded-xl p-3' placeholder='Follow-up plan' value={noteDraft.followUpPlan} onChange={(e) => setNoteDraft(prev => ({ ...prev, followUpPlan: e.target.value }))} />
              <textarea className='border rounded-xl p-3' rows={2} placeholder='Prescription summary' value={noteDraft.prescriptionSummary} onChange={(e) => setNoteDraft(prev => ({ ...prev, prescriptionSummary: e.target.value }))} />
              <div className='flex gap-3'>
                <button onClick={() => updateAppointmentNotes({ appointmentId: item._id, ...noteDraft })} className='bg-primary text-white px-5 py-2 rounded-full text-sm'>Save Notes</button>
                <button onClick={() => setActiveId('')} className='border px-5 py-2 rounded-full text-sm'>Close</button>
              </div>
            </div>
          )}
          </div>
        ))}
      </div>

    </div>
  )
}

export default DoctorAppointments
