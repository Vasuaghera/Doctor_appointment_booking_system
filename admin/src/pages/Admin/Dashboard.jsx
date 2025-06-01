import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='w-full max-w-7xl mx-auto p-6'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-gray-600 mt-1'>Welcome to your hospital management dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {/* Doctors Card */}
        <div className='bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center'>
              <img className='w-7 h-7' src={assets.doctor_icon} alt="Doctors" />
            </div>
            <div>
              <p className='text-2xl font-bold text-gray-900'>{dashData.doctors}</p>
              <p className='text-sm text-gray-500'>Total Doctors</p>
            </div>
          </div>
          <div className='mt-4 pt-4 border-t border-gray-100'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-500'>Active Doctors</span>
              <span className='font-medium text-gray-900'>{dashData.doctors}</span>
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center'>
              <img className='w-7 h-7' src={assets.appointments_icon} alt="Appointments" />
            </div>
            <div>
              <p className='text-2xl font-bold text-gray-900'>{dashData.appointments}</p>
              <p className='text-sm text-gray-500'>Total Appointments</p>
            </div>
          </div>
          <div className='mt-4 pt-4 border-t border-gray-100'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-500'>Today's Appointments</span>
              <span className='font-medium text-gray-900'>
                {dashData.latestAppointments.filter(item => 
                  new Date(item.slotDate).toDateString() === new Date().toDateString()
                ).length}
              </span>
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className='bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center'>
              <img className='w-7 h-7' src={assets.patients_icon} alt="Patients" />
            </div>
            <div>
              <p className='text-2xl font-bold text-gray-900'>{dashData.patients}</p>
              <p className='text-sm text-gray-500'>Total Patients</p>
            </div>
          </div>
          <div className='mt-4 pt-4 border-t border-gray-100'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-500'>New Patients Today</span>
              <span className='font-medium text-gray-900'>
                {dashData.latestAppointments.filter(item => 
                  new Date(item.slotDate).toDateString() === new Date().toDateString()
                ).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
        <div className='px-6 py-4 border-b border-gray-100 bg-gray-50/50'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center'>
              <img src={assets.list_icon} alt="" className='w-4 h-4' />
            </div>
            <h2 className='font-semibold text-gray-900'>Latest Bookings</h2>
          </div>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div 
              key={index}
              className='flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors'
            >
              <div className='relative'>
                <img 
                  className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm' 
                  src={item.docData.image} 
                  alt="Doctor" 
                />
                <div className='absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-green-500'></div>
              </div>
              
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2'>
                  <p className='font-medium text-gray-900 truncate'>{item.docData.name}</p>
                  <span className='text-xs text-gray-500'>({item.docData.speciality})</span>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  <div className='px-2 py-1 bg-gray-50 rounded text-xs text-gray-600'>
                    {slotDateFormat(item.slotDate)}
                  </div>
                  <div className='px-2 py-1 bg-gray-50 rounded text-xs text-gray-600'>
                    {item.slotTime}
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                {item.cancelled ? (
                  <span className='px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600'>
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='p-2 hover:bg-red-50 rounded-lg transition-colors group'
                  >
                    <img 
                      src={assets.cancel_icon} 
                      className='w-5 h-5 group-hover:opacity-80 transition-opacity' 
                      alt="Cancel" 
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {dashData.latestAppointments.length === 0 && (
          <div className='py-12 text-center'>
            <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center'>
              <img src={assets.appointment_icon} alt="" className='w-8 h-8 opacity-50' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-1'>No Recent Bookings</h3>
            <p className='text-gray-500'>There are no recent appointments to display.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard