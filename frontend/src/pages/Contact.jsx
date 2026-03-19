import React from 'react'
import { assets } from '../assets/assets'
import { ncjimsInstituteProfile } from '../data/ncjimsFallback'

const Contact = () => {
  return (
    <div>
      <div className='page-shell text-center'>
        <p className='muted-label'>Contact Us</p>
        <h1 className='mt-2 text-3xl font-semibold text-slate-900'>Hospital contact and deployment path</h1>
        <p className='mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600'>Keep the NCJIMS desk numbers visible for patients, and use the same page as the handoff point for hospitals evaluating Appointex.</p>
      </div>

      <div className='my-10 surface-card flex flex-col justify-center gap-10 p-6 text-sm md:flex-row md:p-8 mb-28'>
        <img className='w-full rounded-[32px] md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-lg text-gray-600'>APPOINTEX / NCJIMS CONTACT</p>
          <p className=' text-gray-500'>{ncjimsInstituteProfile.address.line1} <br /> {ncjimsInstituteProfile.address.line2}</p>
          <p className=' text-gray-500'>Tel: {ncjimsInstituteProfile.phone} <br /> Reserve: {ncjimsInstituteProfile.reserveNumbers.join(', ')} <br /> Email: support@appointex.ai</p>
          <p className=' font-semibold text-lg text-gray-600'>FOR HOSPITAL DEPLOYMENT</p>
          <p className=' text-gray-500'>Contact us to connect Appointex with your MERN backend, doctor roster, and appointment workflows.</p>
          <a href={ncjimsInstituteProfile.whatsappBooking} target='_blank' rel='noreferrer' className='rounded-full border border-slate-300 px-8 py-4 text-sm transition-all duration-500 hover:bg-slate-900 hover:text-white'>Book on WhatsApp</a>
        </div>
      </div>

    </div>
  )
}

export default Contact
