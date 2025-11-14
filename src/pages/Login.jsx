import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginWithPassword, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const success = loginWithPassword(username, password);
    if (success) {
      navigate('/decks');
    } else {
      setError('Login failed. Please try again.');
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    loginWithGoogle(credentialResponse);
    navigate('/decks');
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Biftround Card Decks</h1>
        <p className="login-subtitle">Sign in to manage your card collection</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handlePasswordLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="google-login">
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
            />
          </GoogleOAuthProvider>
        </div>

        <p className="login-note">
          Note: This is a demo app. Use any username and password to login.
        </p>
      </div>
    </div>
  );
}

export default Login;
