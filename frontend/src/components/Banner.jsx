import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ncjimsInstituteProfile } from '../data/ncjimsFallback'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='my-20 flex rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a,#0f766e)] px-6 sm:px-10 md:px-14 lg:px-12 md:mx-10'>

            {/* ------- Left Side ------- */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                    <p>Need the hospital desk details too?</p>
                    <p className='mt-4'>Appointex keeps the NCJIMS contact line visible while you book.</p>
                </div>
                <p className='mt-5 max-w-xl text-sm leading-7 text-white/80'>
                    {ncjimsInstituteProfile.address.line1}, {ncjimsInstituteProfile.address.line2}. Phone: {ncjimsInstituteProfile.phone}. Reserve numbers: {ncjimsInstituteProfile.reserveNumbers.join(', ')}.
                </p>
                <div className='mt-6 flex flex-wrap gap-3'>
                    <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='rounded-full bg-white px-8 py-3 text-sm sm:text-base text-[#595959] transition-all hover:scale-105'>View doctors</button>
                    <a href={ncjimsInstituteProfile.whatsappBooking} target='_blank' rel='noreferrer' className='rounded-full border border-white/30 px-8 py-3 text-sm text-white'>Book on WhatsApp</a>
                </div>
            </div>

            {/* ------- Right Side ------- */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
            </div>
        </div>
    )
}

export default Banner
