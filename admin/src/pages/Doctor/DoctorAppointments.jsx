import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-7xl mx-auto p-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Appointments</h1>
          <p className='text-gray-600 mt-1'>Manage your patient appointments</p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm'>
            <p className='text-sm text-gray-500'>Total Appointments</p>
            <p className='text-xl font-semibold text-gray-900'>{appointments.length}</p>
          </div>
          <div className='bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm'>
            <p className='text-sm text-gray-500'>Completed</p>
            <p className='text-xl font-semibold text-green-600'>
              {appointments.filter(a => a.isCompleted).length}
            </p>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {appointments.map((item, index) => (
          <div 
            key={index}
            className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow'
          >
            {/* Patient Info Header */}
            <div className='p-4 border-b border-gray-100 bg-gray-50/50'>
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <img 
                    src={item.userData.image} 
                    className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm' 
                    alt={item.userData.name} 
                  />
                  {item.payment && (
                    <div className='absolute -bottom-1 -right-1 bg-green-500 text-white text-xs p-1 rounded-full'>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>{item.userData.name}</h3>
                  <p className='text-sm text-gray-500'>Age: {calculateAge(item.userData.dob)}</p>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className='p-4 space-y-4'>
              {/* Date & Time */}
              <div className='flex items-center gap-2 text-gray-600'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className='font-medium text-gray-900'>{slotDateFormat(item.slotDate)}</p>
                  <p className='text-sm text-gray-500'>{item.slotTime}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.payment ? 'Online Payment' : 'Cash Payment'}
                  </span>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-gray-500'>Consultation Fee</p>
                  <p className='font-semibold text-gray-900'>{currency}{item.amount}</p>
                </div>
              </div>

              {/* Status/Actions */}
              <div className='pt-4 border-t border-gray-100'>
                {item.cancelled ? (
                  <div className='flex items-center justify-between'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800'>
                      Cancelled
                    </span>
                  </div>
                ) : item.isCompleted ? (
                  <div className='flex items-center justify-between'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'>
                      Completed
                    </span>
                  </div>
                ) : (
                  <div className='flex items-center justify-between'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
                      Pending
                    </span>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className='p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors'
                        title='Mark as completed'
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                        title='Cancel appointment'
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {appointments.length === 0 && (
        <div className='py-12 text-center'>
          <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center'>
            <img src={assets.appointment_icon} alt="" className='w-8 h-8 opacity-50' />
          </div>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>No Appointments</h3>
          <p className='text-gray-500'>You don't have any appointments scheduled.</p>
        </div>
      )}
    </div>
  )
}

export default DoctorAppointments