import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='mt-10'>
            <div className='page-shell mb-8'>
                <p className='muted-label'>Patient Dashboard</p>
                <h1 className='mt-2 text-3xl font-semibold text-slate-900'>My appointments</h1>
                <p className='mt-3 max-w-2xl text-sm leading-7 text-slate-600'>Track upcoming visits, reopen linked AI PDFs, review doctor notes, and complete payments without losing the hospital context.</p>
            </div>
            <div className='grid gap-5'>
                {appointments.map((item, index) => (
                    <div key={index} className='surface-card grid grid-cols-[1fr_2fr] gap-4 p-4 sm:flex sm:gap-6 md:p-5'>
                        <div>
                            <img className='w-36 rounded-3xl bg-slate-100 object-cover' src={item.docData.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-slate-600'>
                            <div className='flex flex-wrap items-start justify-between gap-3'>
                                <div>
                                    <p className='text-lg font-semibold text-slate-900'>{item.docData.name}</p>
                                    <p className='mt-1'>{item.docData.speciality}</p>
                                </div>
                                <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600'>{slotDateFormat(item.slotDate)} | {item.slotTime}</span>
                            </div>
                            {item.patientConcern && <p className='mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-500'>Concern: {item.patientConcern}</p>}
                            {item.doctorDiagnosis && <p className='mt-2 rounded-2xl bg-blue-50 px-4 py-3 text-xs leading-6 text-blue-700'>Diagnosis: {item.doctorDiagnosis}</p>}
                            {item.followUpPlan && <p className='mt-2 rounded-2xl bg-violet-50 px-4 py-3 text-xs leading-6 text-violet-700'>Follow up: {item.followUpPlan}</p>}
                            <p className='mt-4 text-sm font-medium text-slate-700'>Hospital location</p>
                            <p>{item.docData.address.line1}</p>
                            <p>{item.docData.address.line2}</p>
                        </div>
                        <div></div>
                        <div className='flex flex-col justify-end gap-2 text-center text-sm'>
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && <button onClick={() => setPayment(item._id)} className='sm:min-w-48 rounded-2xl border border-slate-300 py-2.5 text-slate-700 transition-all duration-300 hover:bg-slate-900 hover:text-white'>Pay Online</button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentStripe(item._id)} className='sm:min-w-48 rounded-2xl border border-slate-300 py-2.5 transition-all duration-300 hover:bg-gray-100 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="" /></button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentRazorpay(item._id)} className='sm:min-w-48 rounded-2xl border border-slate-300 py-2.5 transition-all duration-300 hover:bg-gray-100 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" /></button>}
                            {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 rounded-2xl border border-teal-200 bg-teal-50 py-2.5 text-teal-700'>Paid</button>}
                            {item.reportId && <button onClick={() => window.open(`${backendUrl}/api/ai/report/${item.reportId}/pdf`, '_blank')} className='sm:min-w-48 rounded-2xl border border-slate-300 py-2.5 transition-all duration-300 hover:bg-slate-50'>Download AI PDF</button>}

                            {item.isCompleted && <button className='sm:min-w-48 rounded-2xl border border-green-500 py-2.5 text-green-600'>Completed</button>}

                            {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='sm:min-w-48 rounded-2xl border border-rose-200 py-2.5 text-rose-600 transition-all duration-300 hover:bg-rose-600 hover:text-white'>Cancel appointment</button>}
                            {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 rounded-2xl border border-red-500 py-2.5 text-red-500'>Appointment cancelled</button>}
                        </div>
                    </div>
                ))}
                {appointments.length === 0 && (
                    <div className='surface-card p-10 text-center text-slate-500'>
                        No appointments yet. Run an AI analysis or open the doctor directory to book your first visit.
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyAppointments
