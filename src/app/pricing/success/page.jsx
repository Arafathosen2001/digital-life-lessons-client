"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For redirection
import { authClient } from '@/lib/auth-client'; // Adjust path according to your project

const Success = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({
        success: false,
        message: "Verifying your payment, please wait..."
    });

    useEffect(() => {
        const updateToPremium = async () => {
            try {
                // Update user data via Better-Auth
                const { data, error } = await authClient.updateUser({
                    isPremium: true
                });

                if (error) {
                    console.error("Error updating profile:", error);
                    setStatus({
                        success: false,
                        message: "Failed to upgrade your account to Premium."
                    });
                    setLoading(false);
                } else {
                    // console.log("Premium Upgrade Success! ✅", data);
                    setStatus({
                        success: true,
                        message: "Congratulations! Your account is now Premium."
                    });
                    setLoading(false);

                    // Redirect to home page (/) after 3 seconds on success
                    setTimeout(() => {
                        router.push('/'); // Change to '/dashboard' or any other route if needed
                    }, 3000);
                }
            } catch (err) {
                console.error(err);
                setStatus({
                    success: false,
                    message: "An unexpected error occurred."
                });
                setLoading(false);
            }
        };

        updateToPremium();
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100 transition-all">
                
                {/* 1. Loading State */}
                {loading && (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <h2 className="text-xl font-semibold text-slate-700">Processing...</h2>
                        <p className="text-slate-500 text-sm">{status.message}</p>
                    </div>
                )}

                {/* 2. Success State */}
                {!loading && status.success && (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Payment Successful!</h2>
                        <p className="text-green-600 font-medium text-sm bg-green-50 px-4 py-1.5 rounded-full">
                            {status.message}
                        </p>
                        <p className="text-slate-400 text-xs mt-4 animate-pulse">
                            Redirecting you to the home page in a moment...
                        </p>
                        
                        <button 
                            onClick={() => router.push('/')}
                            className="mt-4 px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition shadow-md w-full text-sm"
                        >
                            Go to Home Now
                        </button>
                    </div>
                )}

                {/* 3. Error/Failure State */}
                {!loading && !status.success && (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Upgrade Failed</h2>
                        <p className="text-red-500 text-sm">{status.message}</p>
                        
                        <button 
                            onClick={() => router.push('/')}
                            className="mt-4 px-6 py-2 bg-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-300 transition w-full text-sm"
                        >
                            Return to Home
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Success;