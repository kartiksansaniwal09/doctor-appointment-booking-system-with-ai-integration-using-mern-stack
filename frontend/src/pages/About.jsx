import React from 'react'
import { assets } from '../assets/assets'
import { ncjimsDepartmentSummaries, ncjimsFallbackDoctors, ncjimsInstituteProfile } from '../data/ncjimsFallback'

const About = () => {
  return (
    <div>
      <div className='page-shell text-center'>
        <p className='muted-label'>About Us</p>
        <h1 className='mt-2 text-3xl font-semibold text-slate-900'>Why Appointex exists</h1>
        <p className='mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600'>Appointex is being shaped as an institute-specific booking system for NCJIMS, with triage, doctor discovery, and patient handoff all connected in one flow.</p>
      </div>

      <div className='my-10 surface-card flex flex-col gap-12 p-6 md:flex-row md:p-8'>
        <img className='w-full rounded-[32px] md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Appointex is a Jindal-focused appointment and triage platform built around the official NCJIMS department roster. Instead of asking patients to guess specialties, it starts from symptoms, maps them to departments, and keeps institute contact information visible.</p>
          <p>The current dataset in the app covers {ncjimsFallbackDoctors.length} listed faculty entries across {ncjimsDepartmentSummaries.length} mapped departments using the official NCJIMS department and location pages.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at Appointex is to create a seamless healthcare journey where symptom understanding, doctor recommendation, appointment booking, and follow-up documentation happen in one connected flow for real hospital operations, beginning with {ncjimsInstituteProfile.name} in Hisar.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p className='muted-label'>Why Choose Us</p>
      </div>

      <div className='mb-20 flex flex-col md:flex-row'>
        <div className='border border-slate-200 bg-white px-10 py-8 text-[15px] text-gray-600 transition-all duration-300 cursor-pointer hover:bg-slate-900 hover:text-white md:px-16 sm:py-16'>
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border border-slate-200 bg-white px-10 py-8 text-[15px] text-gray-600 transition-all duration-300 cursor-pointer hover:bg-slate-900 hover:text-white md:px-16 sm:py-16'>
          <b>CONVENIENCE: </b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border border-slate-200 bg-white px-10 py-8 text-[15px] text-gray-600 transition-all duration-300 cursor-pointer hover:bg-slate-900 hover:text-white md:px-16 sm:py-16'>
          <b>PERSONALIZATION:</b>
          <p >Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About
