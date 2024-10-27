// components/Login.tsx
'use client';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      // Redirect user to the dashboard or home page
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Logged in with Google!');
      // Redirect user to the dashboard or home page
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login to Your Restaurant Account</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
      <div className="my-4 text-center">
        <span className="text-gray-600">or</span>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition duration-200"
      >
        <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
        Login with Google
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <p className="mt-4 text-gray-600">
        Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
