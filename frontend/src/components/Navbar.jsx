import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { ncjimsInstituteProfile } from '../data/ncjimsFallback'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'All Doctors', to: '/doctors' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' }
  ]

  return (
    <div className='sticky top-4 z-20 mb-8 mt-4 rounded-[32px] border border-slate-200 bg-white/90 px-5 py-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur'>
      <div onClick={() => navigate('/')} className='flex items-center gap-3 cursor-pointer'>
        <img className='w-10 sm:w-12' src={assets.logo} alt="Appointex logo" />
        <div className='leading-tight'>
          <p className='text-xl font-semibold text-slate-900'>Appointex</p>
          <p className='text-[11px] text-gray-500'>NCJIMS symptom-led booking platform</p>
        </div>
      </div>
      <ul className='hidden items-start gap-3 md:flex'>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className='group'>
            <li className='rounded-full px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900'>{item.label.toUpperCase()}</li>
            <hr className='mx-auto hidden h-0.5 w-3/5 border-none bg-teal-600 outline-none' />
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-4 '>
        <div className='hidden xl:block text-right'>
          <p className='text-[11px] uppercase tracking-[0.18em] text-slate-400'>Hospital desk</p>
          <p className='text-sm font-medium text-slate-700'>{ncjimsInstituteProfile.phone}</p>
        </div>
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={userData.image} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-56 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] flex flex-col gap-3'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={() => navigate('/my-reports')} className='hover:text-black cursor-pointer'>My AI Reports</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='hidden rounded-full bg-slate-900 px-7 py-3 font-light text-white shadow-lg shadow-slate-900/10 md:block'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <div className='flex items-center gap-3'>
              <img src={assets.logo} className='w-10' alt="Appointex logo" />
              <div>
                <p className='text-lg font-semibold text-slate-900'>Appointex</p>
                <p className='text-[11px] text-slate-500'>NCJIMS booking flow</p>
              </div>
            </div>
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>
          <div className='mx-5 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600'>
            Hospital desk: {ncjimsInstituteProfile.phone}
          </div>
          <ul className='mt-5 flex flex-col gap-2 px-5 text-lg font-medium'>
            {navItems.map((item) => (
              <NavLink key={item.to} onClick={() => setShowMenu(false)} to={item.to}>
                <p className='rounded-2xl border border-slate-200 px-4 py-3'>{item.label.toUpperCase()}</p>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
