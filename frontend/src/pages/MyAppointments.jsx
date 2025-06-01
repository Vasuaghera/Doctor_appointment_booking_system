import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    const getStatusColor = (appointment) => {
        if (appointment.cancelled) return 'bg-red-100 text-red-700'
        if (appointment.isCompleted) return 'bg-green-100 text-green-700'
        if (appointment.payment) return 'bg-blue-100 text-blue-700'
        return 'bg-yellow-100 text-yellow-700'
    }

    const getStatusText = (appointment) => {
        if (appointment.cancelled) return 'Cancelled'
        if (appointment.isCompleted) return 'Completed'
        if (appointment.payment) return 'Paid'
        return 'Pending Payment'
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
                <div className="text-sm text-gray-500">
                    Total Appointments: {appointments.length}
                </div>
            </div>

            {appointments.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No appointments found</h3>
                    <p className="text-gray-500">Book your first appointment to get started</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {appointments.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Doctor Image */}
                                    <div className="md:w-48 flex-shrink-0">
                                        <img 
                                            className="w-full h-48 object-cover rounded-lg bg-gray-50" 
                                            src={item.docData.image} 
                                            alt={item.docData.name} 
                                        />
                                    </div>

                                    {/* Appointment Details */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                    Dr. {item.docData.name}
                                                </h3>
                                                <p className="text-primary font-medium mb-2">
                                                    {item.docData.speciality}
                                                </p>
                                                
                                                <div className="space-y-2 text-gray-600">
                                                    <div className="flex items-start gap-2">
                                                        <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <div>
                                                            <p className="font-medium text-gray-700">Address:</p>
                                                            <p>{item.docData.address.line1}</p>
                                                            <p>{item.docData.address.line2}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <div>
                                                            <p className="font-medium text-gray-700">Date & Time:</p>
                                                            <p>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status and Actions */}
                                            <div className="flex flex-col items-end gap-3">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item)}`}>
                                                    {getStatusText(item)}
                                                </span>

                                                <div className="flex flex-col gap-2 w-full md:w-auto">
                                                    {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                                        <button 
                                                            onClick={() => setPayment(item._id)}
                                                            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300"
                                                        >
                                                            Pay Online
                                                        </button>
                                                    )}
                                                    
                                                    {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                                        <button 
                                                            onClick={() => appointmentRazorpay(item._id)}
                                                            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300"
                                                        >
                                                            <img className="h-5 mx-auto" src={assets.razorpay_logo} alt="Razorpay" />
                                                        </button>
                                                    )}

                                                    {!item.cancelled && !item.isCompleted && (
                                                        <button 
                                                            onClick={() => cancelAppointment(item._id)}
                                                            className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
                                                        >
                                                            Cancel Appointment
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyAppointments