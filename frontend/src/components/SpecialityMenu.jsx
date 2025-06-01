import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
            <div className='text-center mb-12'>
                <h2 className='text-3xl font-bold text-gray-900 mb-3'>Find by Speciality</h2>
                <p className='text-gray-600 max-w-2xl mx-auto'>
                    Browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
                {specialityData.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => scrollTo(0, 0)} 
                        className='group' 
                        key={index}
                    >
                        <div className='flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300'>
                            <div className='relative w-16 h-16 sm:w-20 sm:h-20 mb-3'>
                                <div className='absolute inset-0 bg-primary/5 rounded-full group-hover:scale-110 transition-transform duration-300'></div>
                                <img 
                                    className='relative w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300' 
                                    src={item.image} 
                                    alt={item.speciality} 
                                />
                            </div>
                            <p className='text-sm font-medium text-gray-700 group-hover:text-primary transition-colors text-center'>
                                {item.speciality}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Optional: Add a "View All" button */}
            <div className='text-center mt-12'>
                <Link 
                    to="/doctors" 
                    className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors'
                >
                    View All Specialities
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default SpecialityMenu