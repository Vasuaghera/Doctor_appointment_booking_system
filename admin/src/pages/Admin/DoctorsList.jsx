import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-7xl mx-auto p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>All Doctors</h1>
          <p className='text-gray-600 mt-1'>Manage and view all registered doctors</p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='bg-white px-4 py-2 rounded-lg border border-gray-200'>
            <p className='text-sm text-gray-500'>Total Doctors</p>
            <p className='text-xl font-semibold text-gray-900'>{doctors.length}</p>
          </div>
          <div className='bg-white px-4 py-2 rounded-lg border border-gray-200'>
            <p className='text-sm text-gray-500'>Available</p>
            <p className='text-xl font-semibold text-green-600'>
              {doctors.filter(doctor => doctor.available).length}
            </p>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {doctors.map((item, index) => (
          <div 
            key={index}
            className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow'
          >
            {/* Doctor Image */}
            <div className='relative h-48 bg-gray-50'>
              <img 
                className='w-full h-full object-cover' 
                src={item.image} 
                alt={item.name} 
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
              <div className='absolute bottom-4 left-4 right-4'>
                <h3 className='text-lg font-semibold text-white'>{item.name}</h3>
                <p className='text-sm text-white/90'>{item.speciality}</p>
              </div>
            </div>

            {/* Doctor Info */}
            <div className='p-4'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 rounded-full bg-green-500'></div>
                  <span className='text-sm text-gray-500'>Active</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-500'>Experience</span>
                  <span className='text-sm font-medium text-gray-900'>{item.experience}</span>
                </div>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500'>Consultation Fee</span>
                  <span className='text-sm font-medium text-gray-900'>₹{item.fees}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500'>Degree</span>
                  <span className='text-sm font-medium text-gray-900'>{item.degree}</span>
                </div>
              </div>

              {/* Availability Toggle */}
              <div className='mt-4 pt-4 border-t border-gray-100'>
                <label className='flex items-center justify-between cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className='text-sm font-medium text-gray-900'>
                      {item.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  <div className='relative'>
                    <input 
                      type="checkbox" 
                      className='sr-only peer'
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                    />
                    <div className='w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors'></div>
                    <div className='absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5'></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {doctors.length === 0 && (
        <div className='py-12 text-center'>
          <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center'>
            <img src={assets.doctor_icon} alt="" className='w-8 h-8 opacity-50' />
          </div>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>No Doctors Found</h3>
          <p className='text-gray-500'>There are no doctors registered in the system.</p>
        </div>
      )}
    </div>
  )
}

export default DoctorsList