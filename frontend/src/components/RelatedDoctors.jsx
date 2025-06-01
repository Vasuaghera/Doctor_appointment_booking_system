import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
            <div className='text-center mb-12'>
                <h2 className='text-3xl font-bold text-gray-900 mb-3'>Related Doctors</h2>
                <p className='text-gray-600 max-w-2xl mx-auto'>
                    Discover more specialists in this field who can provide the care you need.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {relDoc.map((item, index) => (
                    <div 
                        onClick={() => { 
                            navigate(`/appointment/${item._id}`); 
                            scrollTo(0, 0) 
                        }} 
                        className='group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100'
                        key={index}
                    >
                        <div className='relative'>
                            <img 
                                className='w-full h-48 object-cover bg-gray-50 group-hover:scale-105 transition-transform duration-300' 
                                src={item.image} 
                                alt={item.name} 
                            />
                            <div className='absolute top-4 right-4'>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                                    item.available 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-gray-100 text-gray-600'
                                }`}>
                                    <span className={`w-2 h-2 rounded-full ${
                                        item.available ? 'bg-green-500' : 'bg-gray-500'
                                    }`}></span>
                                    <span className='text-sm font-medium'>
                                        {item.available ? 'Available' : 'Not Available'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='p-5'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors'>
                                {item.name}
                            </h3>
                            <p className='text-gray-600 text-sm mb-3'>{item.speciality}</p>
                            
                            <div className='flex items-center gap-2 text-sm text-gray-500'>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>View Profile</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {relDoc.length === 0 && (
                <div className='text-center py-12'>
                    <p className='text-gray-500'>No related doctors found.</p>
                </div>
            )}
        </div>
    )
}

export default RelatedDoctors