import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {
      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }
    }
  }

  return (
    <div className='min-h-screen flex'>
      {/* Left Side - Image/Info */}
      <div className='hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12'>
        <div className='max-w-md text-white'>
          <h1 className='text-4xl font-bold mb-6'>Hospital Management System</h1>
          <p className='text-lg text-white/80 mb-8'>
            Streamline your healthcare operations with our comprehensive management solution.
          </p>
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p>Secure and reliable platform</p>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p>24/7 access to patient records</p>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p>Manage appointments efficiently</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              {state} Login
            </h2>
            <p className='text-gray-600'>
              Welcome back! Please enter your details
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors'
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors'
                placeholder='Enter your password'
              />
            </div>

            <button
              type="submit"
              className='w-full bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary/20'
            >
              Sign In
            </button>

            <div className='text-center'>
              <button
                type="button"
                onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')}
                className='text-primary font-medium hover:text-primary/80 transition-colors'
              >
                Switch to {state === 'Admin' ? 'Doctor' : 'Admin'} Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login