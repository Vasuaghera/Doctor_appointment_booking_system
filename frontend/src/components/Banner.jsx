import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 rounded-2xl mx-4 md:mx-10 my-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
                {/* Content Section */}
                <div className="flex-1 p-8 md:p-12 lg:p-16">
                    <div className="max-w-xl">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            Book Your Appointment with{" "}
                            <span className="text-white/90">Expert Doctors</span>
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-white/80">
                            Access over 100+ trusted medical professionals for your healthcare needs
                        </p>
                        
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                                className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Create Your Account
                            </button>
                            <button 
                                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border border-white/20"
                            >
                                View Doctors
                            </button>
                        </div>

                        {/* Stats Section */}
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">100+</div>
                                <div className="text-sm text-white/80 mt-1">Expert Doctors</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">24/7</div>
                                <div className="text-sm text-white/80 mt-1">Medical Support</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">50k+</div>
                                <div className="text-sm text-white/80 mt-1">Happy Patients</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="hidden md:block md:w-1/2 lg:w-[45%] relative">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-white/10 rounded-full blur-3xl"></div>
                        <img 
                            className="relative w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-500" 
                            src={assets.appointment_img} 
                            alt="Medical Appointment" 
                        />
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
    )
}

export default Banner
