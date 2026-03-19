import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ncjimsInstituteProfile } from '../data/ncjimsFallback'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='grid min-h-[80vh] items-center gap-8 py-10 lg:grid-cols-[0.95fr_1.05fr]'>
      <div className='surface-card overflow-hidden bg-[linear-gradient(135deg,#0f172a,#0f766e)] p-8 text-white md:p-10'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-white/70'>Patient Access</p>
        <h1 className='mt-4 text-4xl font-semibold leading-tight'>Create an Appointex account and keep your OPD history in one place.</h1>
        <p className='mt-5 max-w-xl text-sm leading-7 text-white/80'>
          Sign in to store AI reports, reopen PDF summaries, manage appointments, and keep your profile ready before you reach the hospital desk.
        </p>

        <div className='mt-8 grid gap-4 sm:grid-cols-2'>
          <div className='rounded-3xl border border-white/15 bg-white/10 p-4'>
            <p className='text-xs uppercase tracking-[0.16em] text-white/70'>Hospital desk</p>
            <p className='mt-2 text-lg font-semibold'>{ncjimsInstituteProfile.phone}</p>
          </div>
          <div className='rounded-3xl border border-white/15 bg-white/10 p-4'>
            <p className='text-xs uppercase tracking-[0.16em] text-white/70'>Reserve numbers</p>
            <p className='mt-2 text-sm font-medium'>{ncjimsInstituteProfile.reserveNumbers.join(', ')}</p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmitHandler} className='surface-card mx-auto flex w-full max-w-xl flex-col gap-5 p-8 text-sm text-slate-600 md:p-10'>
        <div>
          <p className='muted-label'>{state === 'Sign Up' ? 'Create Patient Account' : 'Member Login'}</p>
          <h2 className='mt-2 text-3xl font-semibold text-slate-900'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
          <p className='mt-2 text-sm text-slate-500'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointments and save your reports.</p>
        </div>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p className='mb-2 text-sm font-medium text-slate-700'>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='field-input' type="text" required />
          </div>
        )}

        <div className='w-full'>
          <p className='mb-2 text-sm font-medium text-slate-700'>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='field-input' type="email" required />
        </div>

        <div className='w-full'>
          <p className='mb-2 text-sm font-medium text-slate-700'>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='field-input' type="password" required />
        </div>

        <button className='mt-2 w-full rounded-2xl bg-slate-900 py-3 text-base text-white'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>

        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='cursor-pointer font-medium text-teal-700'>Login here</span></p>
          : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='cursor-pointer font-medium text-teal-700'>Click here</span></p>
        }
      </form>
    </div>
  )
}

export default Login
