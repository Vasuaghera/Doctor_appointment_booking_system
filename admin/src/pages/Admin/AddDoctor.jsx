import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div className='w-full max-w-7xl mx-auto p-6'>
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Add New Doctor</h1>
                    <p className='text-gray-600 mt-1'>Fill in the details to add a new doctor to the system</p>
                </div>
            </div>

            <form onSubmit={onSubmitHandler} className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
                {/* Image Upload Section */}
                <div className='p-6 border-b border-gray-100 bg-gray-50/50'>
                    <div className='flex items-center gap-6'>
                        <label htmlFor="doc-img" className='cursor-pointer group'>
                            <div className='relative'>
                                <div className='w-24 h-24 rounded-xl bg-white border-2 border-dashed border-gray-200 overflow-hidden group-hover:border-primary/50 transition-colors'>
                                    {docImg ? (
                                        <img 
                                            src={URL.createObjectURL(docImg)} 
                                            alt="Doctor" 
                                            className='w-full h-full object-cover'
                                        />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center'>
                                            <img src={assets.upload_area} alt="Upload" className='w-12 h-12 opacity-50' />
                                        </div>
                                    )}
                                </div>
                                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center'>
                                    <span className='text-white text-sm font-medium'>Change Photo</span>
                                </div>
                            </div>
                        </label>
                        <div>
                            <h3 className='font-medium text-gray-900'>Doctor's Photo</h3>
                            <p className='text-sm text-gray-500 mt-1'>Upload a professional photo of the doctor</p>
                        </div>
                        <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*" />
                    </div>
                </div>

                {/* Form Fields */}
                <div className='p-6'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* Left Column */}
                        <div className='space-y-6'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                                <input 
                                    onChange={e => setName(e.target.value)} 
                                    value={name} 
                                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors' 
                                    type="text" 
                                    placeholder="Enter doctor's full name" 
                                    required 
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                                <input 
                                    onChange={e => setEmail(e.target.value)} 
                                    value={email} 
                                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors' 
                                    type="email" 
                                    placeholder='Enter email address' 
                                    required 
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                                <input 
                                    onChange={e => setPassword(e.target.value)} 
                                    value={password} 
                                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors' 
                                    type="password" 
                                    placeholder='Set a secure password' 
                                    required 
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Experience</label>
                                <select 
                                    onChange={e => setExperience(e.target.value)} 
                                    value={experience} 
                                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors'
                                >
                                    <option value="1 Year">1 Year</option>
                                    <option value="2 Year">2 Years</option>
                                    <option value="3 Year">3 Years</option>
                                    <option value="4 Year">4 Years</option>
                                    <option value="5 Year">5 Years</option>
                                    <option value="6 Year">6 Years</option>
                                    <option value="8 Year">8 Years</option>
                                    <option value="9 Year">9 Years</option>
                                    <option value="10 Year">10 Years</option>
                                </select>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Consultation Fees</label>
                                <div className='relative'>
                                    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'>₹</span>
                                    <input 
                                        onChange={e => setFees(e.target.value)} 
                                        value={fees} 
                                        className='w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors' 
                                        type="number" 
                                        placeholder='Enter consultation fees' 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className='space-y-6'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Speciality</label>
                                <select 
                                    onChange={e => setSpeciality(e.target.value)} 
                                    value={speciality} 
                                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors'
                                >
                                    <option value="General physician">General Physician</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatricians">Pediatrician</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                </select>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Degree</label>
                                <input 
                                    onChange={e => setDegree(e.target.value)} 
                                    value={degree} 
                                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors' 
                                    type="text" 
                                    placeholder='Enter medical degree' 
                                    required 
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Address</label>
                                <input 
                                    onChange={e => setAddress1(e.target.value)} 
                                    value={address1} 
                                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors mb-2' 
                                    type="text" 
                                    placeholder='Address Line 1' 
                                    required 
                                />
                                <input 
                                    onChange={e => setAddress2(e.target.value)} 
                                    value={address2} 
                                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors' 
                                    type="text" 
                                    placeholder='Address Line 2' 
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className='mt-6'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>About Doctor</label>
                        <textarea 
                            onChange={e => setAbout(e.target.value)} 
                            value={about} 
                            className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors' 
                            rows={4} 
                            placeholder='Write a brief description about the doctor...'
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className='mt-8 flex justify-end'>
                        <button 
                            type='submit' 
                            className='bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary/20'
                        >
                            Add Doctor
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor