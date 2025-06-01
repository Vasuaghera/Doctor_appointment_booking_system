import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../../assets/assets'

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='w-full max-w-7xl mx-auto p-6'>
            {/* Header */}
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-gray-900'>Profile</h1>
                <p className='text-gray-600 mt-1'>Manage your professional profile</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Profile Image & Basic Info */}
                <div className='lg:col-span-1'>
                    <div className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
                        <div className='relative'>
                            <img 
                                className='w-full h-64 object-cover' 
                                src={profileData.image} 
                                alt={profileData.name} 
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
                            <div className='absolute bottom-4 left-4 right-4'>
                                <h2 className='text-2xl font-bold text-white'>{profileData.name}</h2>
                                <p className='text-white/90'>{profileData.degree} - {profileData.speciality}</p>
                            </div>
                        </div>

                        <div className='p-6'>
                            <div className='flex items-center justify-between mb-4'>
                                <div className='flex items-center gap-2'>
                                    <div className='w-2 h-2 rounded-full bg-green-500'></div>
                                    <span className='text-sm text-gray-500'>Active</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='text-sm text-gray-500'>Experience</span>
                                    <span className='text-sm font-medium text-gray-900'>{profileData.experience}</span>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Consultation Fee</label>
                                    {isEdit ? (
                                        <input
                                            type='number'
                                            value={profileData.fees}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                            className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors'
                                        />
                                    ) : (
                                        <p className='text-lg font-semibold text-gray-900'>{currency} {profileData.fees}</p>
                                    )}
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Availability</label>
                                    <label className='flex items-center gap-2 cursor-pointer'>
                                        <div className='relative'>
                                            <input 
                                                type="checkbox" 
                                                className='sr-only peer'
                                                checked={profileData.available}
                                                onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                                            />
                                            <div className='w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors'></div>
                                            <div className='absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5'></div>
                                        </div>
                                        <span className='text-sm text-gray-600'>
                                            {profileData.available ? 'Available for appointments' : 'Not available'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Information */}
                <div className='lg:col-span-2'>
                    <div className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
                        <div className='p-6'>
                            <div className='flex items-center justify-between mb-6'>
                                <h3 className='text-lg font-semibold text-gray-900'>Professional Information</h3>
                                <button
                                    onClick={() => setIsEdit(prev => !prev)}
                                    className='px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors'
                                >
                                    {isEdit ? 'Cancel' : 'Edit Profile'}
                                </button>
                            </div>

                            <div className='space-y-6'>
                                {/* About Section */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>About</label>
                                    {isEdit ? (
                                        <textarea
                                            value={profileData.about}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                            rows={6}
                                            className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors'
                                        />
                                    ) : (
                                        <p className='text-gray-600 leading-relaxed'>{profileData.about}</p>
                                    )}
                                </div>

                                {/* Address Section */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Address</label>
                                    <div className='space-y-2'>
                                        {isEdit ? (
                                            <>
                                                <input
                                                    type='text'
                                                    value={profileData.address.line1}
                                                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                                    placeholder='Address Line 1'
                                                    className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors'
                                                />
                                                <input
                                                    type='text'
                                                    value={profileData.address.line2}
                                                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                                    placeholder='Address Line 2'
                                                    className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors'
                                                />
                                            </>
                                        ) : (
                                            <div className='text-gray-600'>
                                                <p>{profileData.address.line1}</p>
                                                <p>{profileData.address.line2}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Save Button */}
                                {isEdit && (
                                    <div className='flex justify-end'>
                                        <button
                                            onClick={updateProfile}
                                            className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile