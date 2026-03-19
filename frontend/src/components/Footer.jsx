import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { ncjimsInstituteProfile } from '../data/ncjimsFallback'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='mt-32 rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc,#eef7f5)] px-6 py-10 text-sm shadow-[0_22px_65px_rgba(15,23,42,0.05)] sm:grid sm:grid-cols-[2.2fr_1fr_1fr] gap-14'>

        <div>
          <div className='mb-5 flex items-center gap-3'>
            <img className='w-12' src={assets.logo} alt="Appointex logo" />
            <div>
              <p className='text-2xl font-semibold text-slate-900'>Appointex</p>
              <p className='text-xs text-gray-500'>Smarter OPD discovery for real hospital workflows</p>
            </div>
          </div>
          <p className='w-full md:w-2/3 text-gray-600 leading-7'>Appointex helps patients describe symptoms in plain language, get AI-guided specialty suggestions, book the right Jindal doctor faster, and download a summarized report PDF for consultation.</p>
          <div className='mt-5 rounded-3xl bg-white p-4 ring-1 ring-slate-200'>
            <p className='text-xs uppercase tracking-[0.16em] text-slate-500'>NCJIMS Contact</p>
            <p className='mt-2 text-sm font-medium text-slate-800'>{ncjimsInstituteProfile.address.line1}</p>
            <p className='mt-1 text-sm text-slate-500'>{ncjimsInstituteProfile.address.line2}</p>
            <p className='mt-2 text-sm text-slate-600'>Phone: {ncjimsInstituteProfile.phone}</p>
          </div>
        </div>

        <div>
          <p className='mb-5 text-xl font-medium'>NAVIGATE</p>
          <ul className='flex flex-col gap-3 text-gray-600'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About us</Link></li>
            <li><Link to='/doctors'>All doctors</Link></li>
            <li><Link to='/my-reports'>My AI reports</Link></li>
          </ul>
        </div>

        <div>
          <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>{ncjimsInstituteProfile.phone}</li>
            <li>{ncjimsInstituteProfile.reserveNumbers.join(', ')}</li>
            <li>support@appointex.ai</li>
            <li>Demo WhatsApp: {ncjimsInstituteProfile.whatsappNumber}</li>
          </ul>
        </div>

      </div>

      <div>
        <p className='py-6 text-center text-sm text-slate-500'>Copyright 2026 @ Appointex. Designed for institute-specific OPD discovery.</p>
      </div>

    </div>
  )
}

export default Footer
