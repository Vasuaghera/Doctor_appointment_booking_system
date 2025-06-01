import React from 'react'

const Terms = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using our healthcare platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services."
    },
    {
      title: "Use of Services",
      content: "Our platform provides healthcare services and information. You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services in any way that could damage, disable, or impair the platform."
    },
    {
      title: "User Accounts",
      content: "To access certain features of our platform, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account."
    },
    {
      title: "Medical Information",
      content: "The information provided on our platform is for general informational purposes only and is not intended to be a substitute for professional medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."
    },
    {
      title: "Appointments and Cancellations",
      content: "You can book appointments through our platform. We require 24 hours notice for cancellations. Late cancellations or no-shows may be subject to a fee. We reserve the right to modify or cancel appointments due to unforeseen circumstances."
    },
    {
      title: "Payment Terms",
      content: "Payment for services is due at the time of booking unless otherwise arranged. We accept various payment methods as indicated on our platform. All fees are subject to change with notice."
    },
    {
      title: "Intellectual Property",
      content: "All content on our platform, including text, graphics, logos, and software, is the property of our company and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our permission."
    },
    {
      title: "Limitation of Liability",
      content: "We strive to provide accurate and up-to-date information, but we make no warranties about the completeness, reliability, or accuracy of the information on our platform. We are not liable for any damages arising from the use of our services."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
        <p className="text-xl text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Agreement Section */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
        <p className="text-gray-600 mb-6">
          By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
            Accept Terms
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default Terms 