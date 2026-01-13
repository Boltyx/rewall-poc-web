import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, BookOpen, Users } from 'lucide-react';
import users from '../data/users.json';
import currentUser from '../data/currentUser.json';
import topics from '../data/topics.json';
import './ProfilePage.css';

function ProfilePage() {
  const { username } = useParams();
  
  // Check if viewing own profile or another user
  const isOwnProfile = username === currentUser.username;
  const user = isOwnProfile ? currentUser : users.find(u => u.username === username) || users[0];
  
  const followedTopics = isOwnProfile 
    ? topics.filter(t => currentUser.following.topics.includes(t.id))
    : [];

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <motion.header 
          className="profile-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="profile-avatar">
            <span className="avatar-placeholder">
              {user.displayName?.charAt(0) || user.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="profile-info">
            <div className="profile-name-row">
              <h1 className="profile-name">{user.displayName}</h1>
              {user.verified && <CheckCircle size={20} className="verified-icon" />}
            </div>
            <p className="profile-username">@{user.username}</p>
            {user.bio && <p className="profile-bio">{user.bio}</p>}
            {user.affiliation && (
              <p className="profile-affiliation">{user.affiliation}</p>
            )}
          </div>
        </motion.header>

        {/* Transparency Panel (only for own profile) */}
        {isOwnProfile && (
          <motion.section 
            className="transparency-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="section-title">Transparency Panel</h2>
            <div className="transparency-content">
              <div className="transparency-item">
                <h3>Learning Style</h3>
                <span className="badge">{currentUser.learningStyle}</span>
              </div>
              <div className="transparency-item">
                <h3>Interests</h3>
                <div className="tags-list">
                  {currentUser.interests.map(interest => (
                    <span key={interest} className="tag">
                      #{interest.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
              <div className="transparency-item">
                <h3>Following</h3>
                <div className="following-stats">
                  <span><BookOpen size={14} /> {followedTopics.length} topics</span>
                  <span><Users size={14} /> {currentUser.following.users.length} users</span>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Expertise (for other users) */}
        {!isOwnProfile && user.expertise && (
          <motion.section 
            className="expertise-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="section-title">Expertise</h2>
            <div className="tags-list">
              {user.expertise.map(exp => (
                <span key={exp} className="tag">#{exp.replace('-', ' ')}</span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Activity Placeholder */}
        <motion.section 
          className="activity-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-placeholder">
            <p className="text-muted">User contributions will appear here</p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default ProfilePage;
