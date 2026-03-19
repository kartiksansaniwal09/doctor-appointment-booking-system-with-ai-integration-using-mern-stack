import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get("success")
    const appointmentId = searchParams.get("appointmentId")

    const { backendUrl, token } = useContext(AppContext)

    const navigate = useNavigate()

    // Function to verify stripe payment
    const verifyStripe = async () => {

        try {

            const { data } = await axios.post(backendUrl + "/api/user/verifyStripe", { success, appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

            navigate("/my-appointments")

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (token && appointmentId && success) {
            verifyStripe()
        }
    }, [token, appointmentId, success])

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className='surface-card flex flex-col items-center gap-5 px-10 py-12'>
                <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600"></div>
                <div className='text-center'>
                    <p className='muted-label'>Payment Verification</p>
                    <p className='mt-2 text-lg font-semibold text-slate-900'>Confirming your payment status</p>
                    <p className='mt-2 text-sm text-slate-500'>Please wait while Appointex syncs your appointment payment with the backend.</p>
                </div>
            </div>
        </div>
    )
}

export default Verify
