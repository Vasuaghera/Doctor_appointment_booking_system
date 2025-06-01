import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {
        setDocSlots([])
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            toast.warning('Please select a time slot')
            return
        }

        const date = docSlots[slotIndex][0].datetime
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', 
                { docId, slotDate, slotTime }, 
                { headers: { token } }
            )
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Doctor Profile Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in">
                <div className="md:flex">
                    {/* Doctor Image */}
                    <div className="md:w-1/3 relative">
                        <img 
                            className="w-full h-[300px] md:h-full object-cover" 
                            src={docInfo.image} 
                            alt={docInfo.name} 
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white md:hidden">
                            <h2 className="text-2xl font-bold">{docInfo.name}</h2>
                            <p className="text-sm opacity-90">{docInfo.degree} - {docInfo.speciality}</p>
                </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="md:w-2/3 p-6 md:p-8">
                        <div className="flex items-start justify-between">
                    <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{docInfo.name}</h2>
                                    <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                    <p className="text-gray-600">{docInfo.degree} - {docInfo.speciality}</p>
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                        {docInfo.experience}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Appointment Fee</p>
                                <p className="text-2xl font-bold text-primary">{currencySymbol}{docInfo.fees}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                About
                                <img className="w-4 h-4" src={assets.info_icon} alt="Info" />
                            </h3>
                            <p className="mt-2 text-gray-600 leading-relaxed">{docInfo.about}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Section */}
            <div className="mt-12 animate-fade-in-up">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Book an Appointment</h3>
                
                {/* Date Selection */}
                <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-4">Select Date</p>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                    {docSlots.length && docSlots.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setSlotIndex(index)}
                                className={`flex flex-col items-center justify-center min-w-[80px] h-[80px] rounded-xl transition-all duration-300 ${
                                    slotIndex === index 
                                    ? 'bg-primary text-white shadow-lg scale-105' 
                                    : 'bg-white border border-gray-200 hover:border-primary/50'
                                }`}
                            >
                                <span className="text-sm font-medium">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</span>
                                <span className="text-2xl font-bold mt-1">{item[0] && item[0].datetime.getDate()}</span>
                            </button>
                        ))}
                        </div>
                </div>

                {/* Time Selection */}
                <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-4">Select Time</p>
                    <div className="flex flex-wrap gap-3">
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setSlotTime(item.time)}
                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                    item.time === slotTime
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-white border border-gray-200 hover:border-primary/50 text-gray-600'
                                }`}
                            >
                                {item.time.toLowerCase()}
                            </button>
                    ))}
                    </div>
                </div>

                {/* Book Button */}
                <button
                    onClick={bookAppointment}
                    disabled={!slotTime}
                    className={`w-full md:w-auto px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                        slotTime 
                        ? 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl' 
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                    Book Appointment
                </button>
            </div>

            {/* Related Doctors */}
            <div className="mt-16 animate-fade-in">
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : null
}

export default Appointment