import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");  // Reset error
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Sign In</h2>
        
        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <div className="flex items-center border rounded-md p-2 bg-gray-50">
              <Mail className="text-gray-400 h-5 w-5" />
              <input
                type="email"
                className="ml-2 flex-1 bg-transparent focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <div className="flex items-center border rounded-md p-2 bg-gray-50">
              <Lock className="text-gray-400 h-5 w-5" />
              <input
                type="password"
                className="ml-2 flex-1 bg-transparent focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-gray-600 text-sm">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
