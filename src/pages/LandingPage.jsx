import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Fake login - just navigate after a brief delay
    setTimeout(() => {
      navigate('/feed');
    }, 800);
  };

  return (
    <div className="landing-page">
      <AnimatePresence mode="wait">
        {!isLoggingIn ? (
          <motion.div 
            className="landing-hero"
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h1 
              className="landing-title text-display"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              REWALL
            </motion.h1>
            
            <AnimatePresence mode="wait">
              {!showLogin ? (
                <motion.button
                  key="login-btn"
                  className="btn btn-primary landing-cta"
                  onClick={() => setShowLogin(true)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  LOGIN
                </motion.button>
              ) : (
                <motion.form
                  key="login-form"
                  className="login-form"
                  onSubmit={handleLogin}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="login-field">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="login-input"
                      autoFocus
                    />
                  </div>
                  <div className="login-field">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="login-input"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary login-submit">
                    LOGIN
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className="login-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LandingPage;
