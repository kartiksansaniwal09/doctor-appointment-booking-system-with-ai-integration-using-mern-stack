import React from 'react'
import { assets } from '../assets/assets'
import { ncjimsDepartmentSummaries, ncjimsFallbackDoctors, ncjimsInstituteProfile } from '../data/ncjimsFallback'

const Header = () => {
    const stats = [
        { label: 'Doctors mapped', value: ncjimsFallbackDoctors.length },
        { label: 'Departments', value: ncjimsDepartmentSummaries.length },
        { label: 'Call desk', value: ncjimsInstituteProfile.phone }
    ]

    return (
        <div className='grid overflow-hidden rounded-[42px] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#eef8f6_45%,#e7eefc_100%)] md:grid-cols-[1.15fr_0.85fr] shadow-[0_30px_80px_rgba(15,23,42,0.08)]'>

            <div className='flex flex-col justify-center gap-6 px-6 py-10 md:px-10 lg:px-14'>
                <span className='inline-flex w-fit rounded-full border border-teal-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-teal-700'>Appointex for NCJIMS</span>
                <div>
                    <p className='text-sm font-medium uppercase tracking-[0.22em] text-slate-500'>AI triage + institute directory</p>
                    <h1 className='mt-3 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl'>
                        Symptom-led booking for real Jindal departments and OPD days.
                    </h1>
                    <p className='mt-4 max-w-2xl text-sm leading-7 text-slate-600'>
                        Appointex matches patients with the NCJIMS roster, keeps the hospital contact desk visible, and packages a PDF summary so people walk into OPD with context instead of confusion.
                    </p>
                </div>

                <div className='flex flex-wrap gap-3 text-xs text-slate-700'>
                    <span className='rounded-full border border-slate-200 bg-white px-4 py-2'>Official NCJIMS doctor list</span>
                    <span className='rounded-full border border-slate-200 bg-white px-4 py-2'>AI specialty recommendation</span>
                    <span className='rounded-full border border-slate-200 bg-white px-4 py-2'>Downloadable PDF summary</span>
                </div>

                <div className='grid gap-3 sm:grid-cols-3'>
                    {stats.map((item) => (
                        <div key={item.label} className='rounded-3xl border border-slate-200 bg-white p-4'>
                            <p className='text-xs uppercase tracking-[0.16em] text-slate-500'>{item.label}</p>
                            <p className='mt-2 text-xl font-semibold text-slate-900'>{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className='flex flex-wrap gap-4'>
                    <a href='#speciality' className='inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm text-white transition-all duration-300 hover:scale-105'>
                        Explore departments <img className='w-3' src={assets.arrow_icon} alt="" />
                    </a>
                    <a href={ncjimsInstituteProfile.whatsappBooking} target='_blank' rel='noreferrer' className='inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3 text-sm text-slate-700'>
                        Book on WhatsApp
                    </a>
                </div>
            </div>

            <div className='relative flex min-h-[420px] items-end justify-center bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.18),transparent_56%),linear-gradient(180deg,#eff6ff,#dbeafe)] px-6 pt-8'>
                <div className='absolute left-6 top-6 max-w-xs rounded-3xl bg-white/90 p-4 shadow-lg backdrop-blur'>
                    <p className='text-xs font-semibold uppercase tracking-[0.18em] text-teal-700'>Campus Desk</p>
                    <p className='mt-3 text-sm font-semibold text-slate-900'>{ncjimsInstituteProfile.name}</p>
                    <p className='mt-2 text-xs leading-6 text-slate-500'>{ncjimsInstituteProfile.address.line1}, {ncjimsInstituteProfile.address.line2}</p>
                    <p className='mt-3 text-xs text-slate-600'>Reserve numbers: {ncjimsInstituteProfile.reserveNumbers.join(', ')}</p>
                </div>

                <img className='relative z-10 w-full max-w-xl rounded-lg object-contain' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header
