import { useState } from "react";
import { axiosIn } from "../util/axios.js";
import { authStore } from "../store/authStore";

function Auth() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login & Sign-Up
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setName] = useState("");
    const [message, setMessage] = useState("");

    const { checkAuth } = authStore();

    // Handle authentication request
    const handleAuth = async () => {
        const url = isLogin ? "/auth/login" : "/auth/signin";
        const payload = isLogin ? { email, password } : { username, email, password };

        try {
            const response = await axiosIn.post(url, payload);
            checkAuth();
        } catch (error) {
            console.log(error);
            setMessage("Error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-xl border border-gray-700 text-white">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-6 text-center">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>

                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button 
                    onClick={handleAuth} 
                    className="w-full p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white mb-4"
                >
                    {isLogin ? "Login" : "Sign Up"}
                </button>

                <button 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="w-full text-sm text-blue-400 hover:text-blue-500 transition-colors"
                >
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </button>

                {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
            </div>
        </div>
    );
}

export default Auth;
