import React from 'react'

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: "We collect information that you provide directly to us, including but not limited to your name, email address, phone number, and medical history. This information is used to provide you with healthcare services and improve your experience with our platform."
    },
    {
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, to communicate with you about appointments and services, and to comply with legal obligations. We may also use your information to send you updates about our services and healthcare tips."
    },
    {
      title: "Information Sharing",
      content: "We do not sell or rent your personal information to third parties. We may share your information with healthcare providers involved in your care, and as required by law. We take appropriate measures to ensure that your information is protected when shared."
    },
    {
      title: "Data Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We regularly review and update our security practices to ensure the safety of your data."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You can also object to the processing of your data or request data portability. To exercise these rights, please contact us through the provided channels."
    },
    {
      title: "Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to improve your browsing experience and analyze how you use our website. You can control cookies through your browser settings and opt out of certain tracking technologies."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
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

      {/* Contact Section */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Questions About Our Privacy Policy?</h2>
        <p className="text-gray-600 mb-6">
          If you have any questions or concerns about our privacy policy, please don't hesitate to contact us.
        </p>
        <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
          Contact Us
        </button>
      </div>
    </div>
  )
}

export default PrivacyPolicy 