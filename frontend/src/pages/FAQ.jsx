import React, { useState } from 'react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment through our online platform by selecting your preferred doctor, choosing an available time slot, and completing the booking form. You'll receive a confirmation email with the appointment details."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, online banking, and digital wallets. Payment is typically required at the time of booking unless otherwise arranged with the healthcare provider."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time. Late cancellations may be subject to a fee. You can manage your appointments through your account dashboard."
    },
    {
      question: "What should I bring to my appointment?",
      answer: "Please bring your ID, insurance information (if applicable), any relevant medical records, and a list of current medications. For first-time visits, you may need to complete some paperwork in advance."
    },
    {
      question: "How do I access my medical records?",
      answer: "You can access your medical records through your secure patient portal. Log in to your account and navigate to the 'Medical Records' section. You can view, download, or share your records as needed."
    },
    {
      question: "What if I need emergency care?",
      answer: "In case of emergency, please call emergency services (911) immediately. Our platform is designed for non-emergency appointments. For urgent care needs, please visit your nearest emergency room or urgent care center."
    },
    {
      question: "How do I contact my doctor?",
      answer: "You can contact your doctor through the secure messaging system in your patient portal. For urgent matters, please call the clinic directly. Response times may vary based on the nature of your inquiry."
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we take data security seriously. All information is encrypted and stored securely in compliance with healthcare privacy regulations. We never share your information with third parties without your consent."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions about our services and platform.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                <svg
                  className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            <div
              className={`px-6 transition-all duration-200 ${
                openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
              } overflow-hidden`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still Have Questions?</h2>
        <p className="text-gray-600 mb-6">
          Can't find the answer you're looking for? Our support team is here to help.
        </p>
        <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300">
          Contact Support
        </button>
      </div>
    </div>
  )
}

export default FAQ 