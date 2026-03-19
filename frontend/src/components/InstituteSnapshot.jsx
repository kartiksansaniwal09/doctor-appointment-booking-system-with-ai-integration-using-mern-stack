import React from 'react'
import { ncjimsDepartmentSummaries, ncjimsFallbackDoctors, ncjimsInstituteProfile } from '../data/ncjimsFallback'

const InstituteSnapshot = () => {
  const highlights = [
    { label: 'Doctors listed', value: ncjimsFallbackDoctors.length },
    { label: 'Departments mapped', value: ncjimsDepartmentSummaries.length },
    { label: 'Official phone', value: ncjimsInstituteProfile.phone }
  ]

  return (
    <section className='my-16 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
      <div className='rounded-[32px] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_22px_65px_rgba(15,23,42,0.06)]'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-teal-700'>Institute Directory</p>
        <h2 className='mt-3 text-3xl font-semibold text-slate-900'>Built around the NCJIMS department roster, not sample content</h2>
        <p className='mt-4 max-w-3xl text-sm leading-7 text-slate-600'>
          Appointex now carries institute-specific doctor names, department mapping, OPD-day text, and contact details from the official Jindal Institute of Medical Sciences pages.
        </p>

        <div className='mt-6 grid gap-4 md:grid-cols-3'>
          {highlights.map((item) => (
            <div key={item.label} className='rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200'>
              <p className='text-xs uppercase tracking-[0.16em] text-slate-500'>{item.label}</p>
              <p className='mt-2 text-xl font-semibold text-slate-900'>{item.value}</p>
            </div>
          ))}
        </div>

        <div className='mt-6 rounded-3xl bg-[linear-gradient(135deg,#0f172a,#0f766e)] p-5 text-white'>
          <p className='text-xs uppercase tracking-[0.18em] text-white/70'>Campus Contact</p>
          <p className='mt-3 text-lg font-semibold'>{ncjimsInstituteProfile.name}</p>
          <p className='mt-2 text-sm text-white/80'>{ncjimsInstituteProfile.address.line1}, {ncjimsInstituteProfile.address.line2}</p>
          <p className='mt-3 text-sm text-white/80'>Reserve numbers: {ncjimsInstituteProfile.reserveNumbers.join(', ')}</p>
        </div>
      </div>

      <div className='rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc,#eef7f5)] p-6 shadow-[0_22px_65px_rgba(15,23,42,0.05)]'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-teal-700'>Department Snapshot</p>
        <div className='mt-5 space-y-3'>
          {ncjimsDepartmentSummaries
            .sort((a, b) => b.doctors - a.doctors)
            .slice(0, 6)
            .map((department) => (
              <div key={department.speciality} className='rounded-2xl border border-slate-200 bg-white/90 p-4'>
                <div className='flex items-center justify-between gap-3'>
                  <p className='text-sm font-semibold text-slate-900'>{department.speciality}</p>
                  <span className='rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700'>{department.doctors} listed</span>
                </div>
                <p className='mt-2 text-xs leading-6 text-slate-500'>
                  {department.facilities.slice(0, 2).join(' • ') || 'Department faculty listed on official page'}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default InstituteSnapshot
