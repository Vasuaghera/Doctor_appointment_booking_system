import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-7xl mx-auto p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>All Appointments</h1>
          <p className='text-gray-600 mt-1'>Manage and track all patient appointments</p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='bg-white px-4 py-2 rounded-lg border border-gray-200'>
            <p className='text-sm text-gray-500'>Total Appointments</p>
            <p className='text-xl font-semibold text-gray-900'>{appointments.length}</p>
          </div>
          <div className='bg-white px-4 py-2 rounded-lg border border-gray-200'>
            <p className='text-sm text-gray-500'>Completed</p>
            <p className='text-xl font-semibold text-green-600'>{appointments.filter(item => item.isCompleted).length}</p>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        {/* Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 py-4 px-6 bg-gray-50/50 border-b border-gray-100'>
          <p className='text-sm font-medium text-gray-500'>#</p>
          <p className='text-sm font-medium text-gray-500'>Patient</p>
          <p className='text-sm font-medium text-gray-500'>Age</p>
          <p className='text-sm font-medium text-gray-500'>Date & Time</p>
          <p className='text-sm font-medium text-gray-500'>Doctor</p>
          <p className='text-sm font-medium text-gray-500'>Fees</p>
          <p className='text-sm font-medium text-gray-500'>Status</p>
        </div>

        {/* Appointments List */}
        <div className='divide-y divide-gray-100'>
          {appointments.map((item, index) => (
            <div 
              key={index}
              className='grid grid-cols-1 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 py-4 px-6 hover:bg-gray-50/50 transition-colors'
            >
              {/* Index */}
              <div className='hidden sm:flex items-center'>
                <span className='text-sm text-gray-500'>{index + 1}</span>
              </div>

              {/* Patient Info */}
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <img 
                    src={item.userData.image} 
                    className='w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm' 
                    alt="Patient" 
                  />
                </div>
                <div>
                  <p className='font-medium text-gray-900'>{item.userData.name}</p>
                  <p className='text-sm text-gray-500 sm:hidden'>Age: {calculateAge(item.userData.dob)}</p>
                </div>
              </div>

              {/* Age */}
              <div className='hidden sm:flex items-center'>
                <span className='text-sm text-gray-500'>{calculateAge(item.userData.dob)}</span>
              </div>

              {/* Date & Time */}
              <div className='flex items-center'>
                <div className='bg-gray-50 px-3 py-1.5 rounded-lg'>
                  <p className='text-sm font-medium text-gray-900'>{slotDateFormat(item.slotDate)}</p>
                  <p className='text-xs text-gray-500'>{item.slotTime}</p>
                </div>
              </div>

              {/* Doctor Info */}
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <img 
                    src={item.docData.image} 
                    className='w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm' 
                    alt="Doctor" 
                  />
                </div>
                <div>
                  <p className='font-medium text-gray-900'>{item.docData.name}</p>
                  <p className='text-sm text-gray-500'>{item.docData.speciality}</p>
                </div>
              </div>

              {/* Fees */}
              <div className='flex items-center'>
                <span className='text-sm font-medium text-gray-900'>{currency}{item.amount}</span>
              </div>

              {/* Status/Action */}
              <div className='flex items-center justify-end'>
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
                      className='w-6 h-6 group-hover:opacity-80 transition-opacity' 
                      alt="Cancel" 
                    />
                  </button>
                )}
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
            <p className='text-gray-500'>There are no appointments to display at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments