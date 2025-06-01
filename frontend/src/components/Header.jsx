import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className="relative bg-gradient-to-br from-primary/95 to-primary">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-10 lg:py-16">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                <span className="text-sm text-white/90">24/7 Medical Support</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                Your Health Journey <br />
                                <span className="text-white/90">Starts Here</span>
                            </h1>
                            <p className="text-base text-white/80">
                                Connect with expert doctors and get the care you deserve.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <a 
                                href="#speciality" 
                                className="group flex items-center gap-2 bg-white px-6 py-3.5 rounded-lg text-primary font-medium hover:bg-white/90 transition-all duration-300 w-full sm:w-auto justify-center"
                            >
                                Book Appointment
                                <img 
                                    className="w-4 group-hover:translate-x-1 transition-transform" 
                                    src={assets.arrow_icon} 
                                    alt="Arrow" 
                                />
                            </a>
                            <div className="flex items-center gap-4 bg-white/10 px-5 py-2.5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="text-white">
                                        <p className="text-sm font-medium">100+</p>
                                        <p className="text-xs text-white/70">Expert Doctors</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Highlights */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-white">Quick Response</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-white">Verified Doctors</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-white">Easy Payment</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Image */}
                    <div className="relative h-[450px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20 rounded-xl"></div>
                        <img 
                            className="w-full h-full object-cover rounded-xl shadow-lg" 
                            src={assets.header_img} 
                            alt="Medical Professional" 
                        />
                        {/* Floating Card */}
                        <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Expert Team</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header