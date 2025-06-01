import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);

            image && formData.append('image', image);

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return userData ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="mt-2 text-gray-600">Manage your personal information and preferences</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex flex-col items-center">
                            {isEdit ? (
                                <label htmlFor="image" className="cursor-pointer group">
                                    <div className="relative">
                                        <img
                                            className="w-32 h-32 rounded-full object-cover ring-4 ring-primary/10"
                                            src={image ? URL.createObjectURL(image) : userData.image}
                                            alt="User"
                                        />
                                        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <img
                                                className="w-8 h-8"
                                                src={assets.upload_icon}
                                                alt="Upload"
                                            />
                                        </div>
                                    </div>
                                    <input
                                        onChange={(e) => setImage(e.target.files[0])}
                                        type="file"
                                        id="image"
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                            ) : (
                                <img
                                    className="w-32 h-32 rounded-full object-cover ring-4 ring-primary/10"
                                    src={userData.image}
                                    alt="User"
                                />
                            )}

                            <div className="mt-4 text-center">
                                {isEdit ? (
                                    <input
                                        className="text-xl font-bold text-center bg-transparent border-b-2 border-primary focus:outline-none focus:border-primary/70 transition-all duration-300"
                                        type="text"
                                        onChange={(e) =>
                                            setUserData((prev) => ({ ...prev, name: e.target.value }))
                                        }
                                        value={userData.name}
                                    />
                                ) : (
                                    <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                                )}
                                <p className="text-gray-500 mt-1">{userData.email}</p>
                            </div>

                            <button
                                onClick={() => isEdit ? updateUserProfileData() : setIsEdit(true)}
                                className={`mt-6 px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                                    isEdit
                                        ? 'bg-primary text-white hover:bg-primary/90'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {isEdit ? 'Save Changes' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>

                    {/* Quick Info Card */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Gender</p>
                                    {isEdit ? (
                                        <select
                                            className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            value={userData.gender}
                                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <p className="font-medium text-gray-900">{userData.gender}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Date of Birth</p>
                                    {isEdit ? (
                                        <input
                                            type="date"
                                            className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            value={userData.dob}
                                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                        />
                                    ) : (
                                        <p className="font-medium text-gray-900">{userData.dob}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    {isEdit ? (
                                        <input
                                            type="tel"
                                            className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            value={userData.phone}
                                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                            placeholder="Enter phone number"
                                        />
                                    ) : (
                                        <p className="font-medium text-gray-900">{userData.phone}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address Card */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                        {isEdit ? (
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                        type="text"
                                        placeholder="Enter address line 1"
                                        onChange={(e) =>
                                            setUserData((prev) => ({
                                                ...prev,
                                                address: { ...prev.address, line1: e.target.value },
                                            }))
                                        }
                                        value={userData.address.line1}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                        type="text"
                                        placeholder="Enter address line 2"
                                        onChange={(e) =>
                                            setUserData((prev) => ({
                                                ...prev,
                                                address: { ...prev.address, line2: e.target.value },
                                            }))
                                        }
                                        value={userData.address.line2}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-900">{userData.address.line1}</p>
                                <p className="text-gray-900 mt-1">{userData.address.line2}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default MyProfile;
