import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          About <span className="text-primary">Us</span>
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative animate-slide-in-left">
          <img 
            className="w-full h-[400px] object-cover rounded-lg shadow-xl" 
            src={assets.about_image} 
            alt="About Hospital" 
          />
          <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-lg shadow-lg">
            <p className="text-2xl font-bold">20+</p>
            <p className="text-sm">Years of Excellence</p>
          </div>
        </div>

        <div className="space-y-6 animate-slide-in-right">
          <p className="text-gray-600 leading-relaxed">
            Welcome to our Hospital, where we prioritize your health and well-being. We understand the challenges of finding quality healthcare, and we're here to make the process easier and more efficient. Whether you're booking a routine checkup or need urgent medical attention, we're committed to providing you with trusted medical professionals and a seamless experience.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our Hospital strives for excellence in patient care and healthcare technology. We're constantly evolving to integrate the latest innovations that ensure better treatment outcomes, enhanced care, and an improved patient experience.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              Our vision is to create a healthcare experience that's convenient, accessible, and patient-centric. We aim to bridge the gap between patients and healthcare providers, offering you easy access to the best care when you need it most.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Why Choose <span className="text-primary">Us</span>
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 animate-fade-in-up">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Experienced Doctors</h3>
          <p className="text-gray-600">
            Our team includes highly qualified and experienced healthcare professionals ready to provide the best care.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Comprehensive Care</h3>
          <p className="text-gray-600">
            We offer a wide range of healthcare services, from routine checkups to specialized treatments, all in one place.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Accessibility</h3>
          <p className="text-gray-600">
            We ensure that healthcare is accessible to everyone, with convenient appointment scheduling and easy access to healthcare professionals.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
  