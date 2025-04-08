import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../store/authStore';

const LogoutPage = () => {
    const { logout, checkAuth } = authStore();
    const navigate = useNavigate();

    useEffect(() => {
       
    }, [logout, checkAuth]);

    const handleLoginRedirect = () => {
        if(confirm("do you want to Logout.")){
            logout();
            checkAuth();
            navigate('/auth'); 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-xl shadow-xl border border-gray-700 text-center">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                   Logout
                </h2>
                <p className="text-gray-400">We hope to see you again soon!</p>
                <button
                    onClick={handleLoginRedirect}
                    className="mt-4 w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default LogoutPage;
