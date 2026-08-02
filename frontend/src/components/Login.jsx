import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const dataToSend = { username, password };
     

    try {

     const API_URL = import.meta.env.VITE_API_URL;

      const response = await axios.post(`${API_URL}/login`, dataToSend);

      console.log("LOGIN SUCCESSFUL", response.data);

     localStorage.setItem('token', response.data.token);

      navigate('/');
      
    } catch (error) {
      console.log("Login error", error);
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-800">
      
      
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-sm rounded-lg bg-gray-300 p-8 shadow-2xl"
      >
        
        
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h2>

        <div className="mb-4">
          <label 
            htmlFor="username" 
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

      
        <div className="mb-6">
          <label 
            htmlFor="password" 
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******************"
            required
          />
        </div>

        
        <button
          type="submit"
          className="focus:shadow-outline w-full rounded bg-violet-600 py-2 px-4 font-bold text-white hover:bg-violet-700 focus:outline-none"
        >
          Login
        </button>

        
        {errorMessage && (
          <p className="mt-4 text-center text-xs text-red-500">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;