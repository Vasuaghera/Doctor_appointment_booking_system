import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              onClick={() => navigate('/')} 
              className="h-12 w-auto cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105" 
              src={assets.logo} 
              alt="Logo" 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-6 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary hover:shadow-sm'
                }`
              }
            >
              HOME
            </NavLink>
            <NavLink 
              to="/doctors" 
              className={({ isActive }) => 
                `px-6 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary hover:shadow-sm'
                }`
              }
            >
              ALL DOCTORS
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `px-6 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary hover:shadow-sm'
                }`
              }
            >
              ABOUT
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `px-6 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary hover:shadow-sm'
                }`
              }
            >
              CONTACT
            </NavLink>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {token && userData ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 focus:outline-none group"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">{userData.name}</span>
                    <span className="text-xs text-gray-500">Patient</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                    <img 
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 relative z-10 group-hover:border-primary/40 transition-all duration-300" 
                      src={userData.image} 
                      alt="Profile" 
                    />
                  </div>
                  <img 
                    className={`w-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                    src={assets.dropdown_icon} 
                    alt="Dropdown" 
                  />
                </button>
                
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl py-2 transition-all duration-300 border border-gray-100 z-50 transform origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
                      <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                      <p className="text-xs text-gray-500">{userData.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigate('/my-profile')
                        setShowDropdown(false)
                      }}
                      className="w-full px-4 py-3.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      My Profile
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/my-appointments')
                        setShowDropdown(false)
                      }}
                      className="w-full px-4 py-3.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      My Appointments
                    </button>
                    <hr className="my-2 border-gray-100" />
                    <button 
                      onClick={() => {
                        logout()
                        setShowDropdown(false)
                      }}
                      className="w-full px-4 py-3.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')} 
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white px-8 py-3.5 rounded-xl font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                Create Account
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMenu(true)} 
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <img className="w-7 h-7" src={assets.menu_icon} alt="Menu" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b">
          <img src={assets.logo} className="h-12" alt="Logo" />
          <button 
            onClick={() => setShowMenu(false)} 
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <img src={assets.cross_icon} className="w-7 h-7" alt="Close" />
          </button>
        </div>

        <div className="px-6 py-8">
          <div className="flex flex-col space-y-2">
            <NavLink 
              to="/" 
              onClick={() => setShowMenu(false)}
              className={({ isActive }) => 
                `text-lg font-medium px-6 py-4 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              HOME
            </NavLink>
            <NavLink 
              to="/doctors" 
              onClick={() => setShowMenu(false)}
              className={({ isActive }) => 
                `text-lg font-medium px-6 py-4 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              ALL DOCTORS
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setShowMenu(false)}
              className={({ isActive }) => 
                `text-lg font-medium px-6 py-4 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              ABOUT
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={() => setShowMenu(false)}
              className={({ isActive }) => 
                `text-lg font-medium px-6 py-4 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              CONTACT
            </NavLink>
          </div>

          {!token && (
            <button 
              onClick={() => {
                setShowMenu(false)
                navigate('/login')
              }} 
              className="w-full mt-8 bg-gradient-to-r from-primary to-primary/90 text-white px-8 py-4 rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar