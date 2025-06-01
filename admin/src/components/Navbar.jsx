import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <nav className='bg-white border-b border-gray-100 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Left side */}
          <div className='flex items-center gap-4'>
            <div 
              onClick={() => navigate('/')}
              className='flex items-center gap-2 cursor-pointer group'
            >
              <div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform'>
                {aToken ? 'A' : 'D'}
              </div>
              <div>
                <h1 className='font-bold text-gray-900'>Hospital Admin</h1>
                <p className='text-xs text-gray-500'>{aToken ? 'Administrator' : 'Doctor Portal'}</p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className='flex items-center gap-4'>
            {/* Notifications */}
            <button className='p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors relative'>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
            </button>

            {/* Profile Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className='flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors'
              >
                <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium'>
                  {aToken ? 'A' : 'D'}
                </div>
                <div className='hidden md:block text-left'>
                  <p className='text-sm font-medium text-gray-900'>{aToken ? 'Admin User' : 'Doctor User'}</p>
                  <p className='text-xs text-gray-500'>{aToken ? 'Administrator' : 'Medical Staff'}</p>
                </div>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50'>
                  <div className='px-4 py-2 border-b border-gray-100'>
                    <p className='text-sm font-medium text-gray-900'>{aToken ? 'Admin User' : 'Doctor User'}</p>
                    <p className='text-xs text-gray-500'>{aToken ? 'Administrator' : 'Medical Staff'}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowDropdown(false)
                      logout()
                    }}
                    className='w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2'
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar