import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='py-16 bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-gray-900 mb-3'>Top Doctors</h2>
                    <p className='text-gray-600'>Find and book appointments with our most trusted doctors</p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {doctors.slice(0, 8).map((item, index) => (
                        <div 
                            onClick={() => { 
                                navigate(`/appointment/${item._id}`); 
                                scrollTo(0, 0) 
                            }} 
                            className='group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer'
                            key={index}
                        >
                            <div className='relative'>
                                <img 
                                    className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300' 
                                    src={item.image} 
                                    alt={item.name} 
                                />
                                <div className='absolute top-3 right-3'>
                                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                        item.available 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            item.available ? 'bg-green-500' : 'bg-gray-500'
                                        }`}></span>
                                        {item.available ? 'Available' : 'Not Available'}
                                    </div>
                                </div>
                            </div>

                            <div className='p-4'>
                                <h3 className='text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors'>
                                    {item.name}
                                </h3>
                                <p className='text-gray-600 text-sm mb-3'>{item.speciality}</p>
                                
                                <div className='flex items-center gap-2 text-sm text-primary'>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>View Profile</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='text-center mt-10'>
                    <button 
                        onClick={() => { 
                            navigate('/doctors'); 
                            scrollTo(0, 0) 
                        }} 
                        className='inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors'
                    >
                        View All Doctors
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopDoctors