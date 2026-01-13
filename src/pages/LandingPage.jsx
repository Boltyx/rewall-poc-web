import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-hero">
        <motion.h1 
          className="landing-title text-display"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          REWALL
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <Link to="/discover" className="btn btn-primary landing-cta">
            DISCOVER
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPage;
