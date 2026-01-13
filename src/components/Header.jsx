import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Settings, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import currentUser from '../data/currentUser.json';
import './Header.css';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <button 
            className="btn btn-ghost header-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
          <Link to="/feed" className="header-logo text-display">
            REWALL
          </Link>
        </div>

        <div className="header-right">
          <button 
            className="btn header-search-btn"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={16} strokeWidth={1.5} />
            <span>SEARCH</span>
          </button>
          <button className="btn btn-ghost header-icon-btn" aria-label="Settings">
            <Settings size={20} strokeWidth={1.5} />
          </button>
          <Link to={`/profile/${currentUser.username}`} className="btn btn-ghost header-icon-btn">
            <User size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="sidebar-header">
                <span className="sidebar-title">MENU</span>
                <button 
                  className="btn btn-ghost sidebar-close"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              
              <div className="sidebar-section">
                <h3 className="sidebar-section-title">Following</h3>
                <nav className="sidebar-nav">
                  {currentUser.following.topics.map(topic => (
                    <Link 
                      key={topic}
                      to={`/topic/${topic}`}
                      className="sidebar-link"
                      onClick={() => setSidebarOpen(false)}
                    >
                      #{topic.replace('-', ' ')}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="sidebar-section">
                <h3 className="sidebar-section-title">Groups</h3>
                <nav className="sidebar-nav">
                  {currentUser.following.groups.map(group => (
                    <Link 
                      key={group}
                      to={`/group/${group}`}
                      className="sidebar-link"
                      onClick={() => setSidebarOpen(false)}
                    >
                      {group.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay onClose={() => setSearchOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('');
  
  // Import mock data for search suggestions
  const users = require('../data/users.json');
  const topics = require('../data/topics.json');
  const groups = require('../data/groups.json');

  const filteredTopics = topics.filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredUsers = users.filter(u => 
    u.displayName.toLowerCase().includes(query.toLowerCase()) ||
    u.username.toLowerCase().includes(query.toLowerCase())
  );
  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(query.toLowerCase())
  );

  const suggestedQuestions = [
    "Is nuclear energy safe?",
    "Will AI replace human jobs?",
    "How urgent is climate action?"
  ].filter(q => q.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.div
      className="search-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="search-container">
        <div className="search-header">
          <div className="search-input-wrapper">
            <Search size={20} strokeWidth={1.5} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search topics, users, groups..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <button className="btn btn-ghost" onClick={onClose}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="search-results">
          {query.length > 0 && suggestedQuestions.length > 0 && (
            <div className="search-section">
              <h4 className="search-section-title">SUGGESTED QUESTIONS</h4>
              {suggestedQuestions.map((q, i) => (
                <Link key={i} to={`/search?q=${encodeURIComponent(q)}`} className="search-result-item" onClick={onClose}>
                  <Search size={14} />
                  <span>{q}</span>
                </Link>
              ))}
            </div>
          )}

          {filteredTopics.length > 0 && (
            <div className="search-section">
              <h4 className="search-section-title">TOPICS</h4>
              {filteredTopics.map(topic => (
                <Link key={topic.id} to={`/topic/${topic.slug}`} className="search-result-item" onClick={onClose}>
                  <span className="search-tag">#{topic.name}</span>
                </Link>
              ))}
            </div>
          )}

          {filteredGroups.length > 0 && (
            <div className="search-section">
              <h4 className="search-section-title">GROUPS</h4>
              {filteredGroups.map(group => (
                <Link key={group.id} to={`/group/${group.id}`} className="search-result-item" onClick={onClose}>
                  <span>{group.name}</span>
                  <span className="search-meta">{group.memberCount.toLocaleString()} members</span>
                </Link>
              ))}
            </div>
          )}

          {filteredUsers.length > 0 && (
            <div className="search-section">
              <h4 className="search-section-title">USERS</h4>
              {filteredUsers.map(user => (
                <Link key={user.id} to={`/profile/${user.username}`} className="search-result-item" onClick={onClose}>
                  <span>@{user.username}</span>
                  <span className="search-meta">{user.displayName}</span>
                </Link>
              ))}
            </div>
          )}

          {query.length === 0 && (
            <div className="search-hint">
              <p>Start typing to search...</p>
              <p className="text-muted">Use @ for users, # for topics</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
