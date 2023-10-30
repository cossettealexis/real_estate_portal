import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/core/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const apiHost = process.env.REACT_APP_API_HOST;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // State for login success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${apiHost}/api/login/`, {
        email: formData.email,
        password: formData.password,
      });
  
      setErrorMessage(null);
  
      if (response.status === 200) {
        const token = response.data.token;
  
        // Set the token in localStorage
        localStorage.setItem('authToken', token);
  
        // Use the login function from the AuthContext to set the token in state
        login(token);
  
        console.log('Authentication successful');
        setLoginSuccess(true); // Set login success to true
        setTimeout(() => {
          // Redirect to /properties after 3 seconds
          navigate('/properties');
        }, 3000); // 3000 milliseconds (3 seconds)
      } else {
        setErrorMessage('');
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('API request error:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred while processing your request.');
      }
      console.log(error.response);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card p-4">
        <h2>Welcome</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <button className='col-12' type="submit">Login</button>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {loginSuccess && (
            <p className="text-success">Login successful. Redirecting...</p>
          )}
        </form>
        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
