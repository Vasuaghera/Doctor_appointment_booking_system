import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const success = searchParams.get("success");
    const appointmentId = searchParams.get("appointmentId");
    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();

    // Function to verify stripe payment
    const verifyStripe = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/user/verifyStripe", 
                { success, appointmentId }, 
                { headers: { token } }
            );

            if (data.success) {
                setVerificationStatus('success');
                toast.success(data.message);
                setTimeout(() => {
                    navigate("/my-appointments");
                }, 2000);
            } else {
                setVerificationStatus('error');
                toast.error(data.message);
                setTimeout(() => {
                    navigate("/my-appointments");
                }, 2000);
            }
        } catch (error) {
            setVerificationStatus('error');
            toast.error(error.message);
            console.log(error);
            setTimeout(() => {
                navigate("/my-appointments");
            }, 2000);
        }
    };

    useEffect(() => {
        if (token && appointmentId && success) {
            verifyStripe();
        }
    }, [token]);

    const renderContent = () => {
        switch (verificationStatus) {
            case 'verifying':
                return (
                    <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Verifying Payment</h2>
                        <p className="text-gray-600">Please wait while we confirm your payment...</p>
                    </div>
                );
            case 'success':
                return (
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600">Your appointment has been confirmed.</p>
                        <p className="text-sm text-gray-500 mt-2">Redirecting to appointments...</p>
                    </div>
                );
            case 'error':
                return (
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Verification Failed</h2>
                        <p className="text-gray-600">There was an issue verifying your payment.</p>
                        <p className="text-sm text-gray-500 mt-2">Redirecting to appointments...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full mx-4 p-8 bg-white rounded-2xl shadow-sm">
                {renderContent()}
            </div>
        </div>
    );
};

export default Verify;