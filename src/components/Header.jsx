import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import currentUser from '../data/currentUser.json';
import users from '../data/users.json';
import topics from '../data/topics.json';
import groups from '../data/groups.json';
import './Header.css';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Normalize query for matching
  const normalizedQuery = searchQuery.toLowerCase().trim();
  
  // Filter topics - match by name OR description OR questions
  const filteredTopics = normalizedQuery.length > 0 
    ? topics.filter(t => 
        t.name.toLowerCase().includes(normalizedQuery) ||
        t.description.toLowerCase().includes(normalizedQuery) ||
        t.questionsForSpectrum?.some(q => q.question.toLowerCase().includes(normalizedQuery))
      )
    : [];
  
  // Extract matching questions from all topics
  const filteredQuestions = normalizedQuery.length > 0
    ? topics.flatMap(t => 
        (t.questionsForSpectrum || [])
          .filter(q => q.question.toLowerCase().includes(normalizedQuery))
          .map(q => ({ ...q, topic: t }))
      ).slice(0, 3)
    : [];
  
  const filteredUsers = normalizedQuery.length > 0
    ? users.filter(u => u.displayName.toLowerCase().includes(normalizedQuery) || u.username.toLowerCase().includes(normalizedQuery))
    : [];
  const filteredGroups = normalizedQuery.length > 0
    ? groups.filter(g => g.name.toLowerCase().includes(normalizedQuery))
    : [];

  const hasResults = filteredTopics.length > 0 || filteredUsers.length > 0 || filteredGroups.length > 0 || filteredQuestions.length > 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchFocused(false);
    }
  };

  const handleResultClick = () => {
    setSearchQuery('');
    setSearchFocused(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="header">
        <button 
          className="header-icon-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Menu"
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>

        {/* Pill Search */}
        <div className="search-pill-wrapper" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="search-pill">
            <svg className="search-pill-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="search-pill-input"
              placeholder="Search topics, papers, people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
            />
          </form>

          {/* Search Dropdown */}
          <AnimatePresence>
            {searchFocused && (searchQuery.length > 0 || true) && (
              <motion.div 
                className="search-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {searchQuery.length === 0 && (
                  <div className="search-dropdown-hint">
                    Start typing to search...
                  </div>
                )}

                {filteredTopics.length > 0 && (
                  <div className="search-dropdown-section">
                    <span className="search-dropdown-label">Topics</span>
                    {filteredTopics.slice(0, 3).map(topic => (
                      <Link 
                        key={topic.id} 
                        to={`/topic/${topic.slug}`} 
                        className="search-dropdown-item"
                        onClick={handleResultClick}
                      >
                        <span className="search-dropdown-tag">#{topic.name}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {filteredQuestions.length > 0 && (
                  <div className="search-dropdown-section">
                    <span className="search-dropdown-label">🔥 Hot Questions</span>
                    {filteredQuestions.map(q => (
                      <Link 
                        key={`${q.topic.id}-${q.id}`} 
                        to={`/topic/${q.topic.slug}?q=${encodeURIComponent(q.question)}`} 
                        className="search-dropdown-item search-dropdown-question"
                        onClick={handleResultClick}
                      >
                        <span className="search-dropdown-question-text">{q.question}</span>
                        <span className="search-dropdown-meta">#{q.topic.name}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {filteredGroups.length > 0 && (
                  <div className="search-dropdown-section">
                    <span className="search-dropdown-label">Groups</span>
                    {filteredGroups.slice(0, 3).map(group => (
                      <Link 
                        key={group.id} 
                        to={`/group/${group.id}`} 
                        className="search-dropdown-item"
                        onClick={handleResultClick}
                      >
                        <span>{group.name}</span>
                        <span className="search-dropdown-meta">{group.memberCount.toLocaleString()} members</span>
                      </Link>
                    ))}
                  </div>
                )}

                {filteredUsers.length > 0 && (
                  <div className="search-dropdown-section">
                    <span className="search-dropdown-label">People</span>
                    {filteredUsers.slice(0, 3).map(user => (
                      <Link 
                        key={user.id} 
                        to={`/profile/${user.username}`} 
                        className="search-dropdown-item"
                        onClick={handleResultClick}
                      >
                        <span className="search-dropdown-username">@{user.username}</span>
                        <span className="search-dropdown-meta">{user.displayName}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {searchQuery.length > 0 && !hasResults && (
                  <div className="search-dropdown-hint">
                    No results for "{searchQuery}"
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to={`/profile/${currentUser.username}`} className="header-icon-btn">
          <User size={20} strokeWidth={1.5} />
        </Link>
      </header>

      {/* Sidebar */}
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
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="sidebar-header">
                <Link to="/feed" className="sidebar-logo" onClick={() => setSidebarOpen(false)}>
                  REWALL
                </Link>
                <button className="header-icon-btn" onClick={() => setSidebarOpen(false)}>
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="sidebar-nav">
                <div className="sidebar-section">
                  <span className="sidebar-section-label">Your Topics</span>
                  {currentUser.following.topics.map(topicId => {
                    const topic = topics.find(t => t.id === topicId);
                    return topic ? (
                      <Link 
                        key={topic.id} 
                        to={`/topic/${topic.slug}`} 
                        className="sidebar-link"
                        onClick={() => setSidebarOpen(false)}
                      >
                        # {topic.name}
                      </Link>
                    ) : null;
                  })}
                </div>

                <div className="sidebar-section">
                  <span className="sidebar-section-label">Your Groups</span>
                  {currentUser.following.groups.map(groupId => {
                    const group = groups.find(g => g.id === groupId);
                    return group ? (
                      <Link 
                        key={group.id} 
                        to={`/group/${group.id}`} 
                        className="sidebar-link"
                        onClick={() => setSidebarOpen(false)}
                      >
                        {group.name}
                      </Link>
                    ) : null;
                  })}
                </div>

                <div className="sidebar-section">
                  <span className="sidebar-section-label">Activity</span>
                  <Link to="/history" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
                    📜 My History
                  </Link>
                  <Link to="/liked" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
                    ❤️ Liked
                  </Link>
                  <Link to="/comments" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
                    💬 My Comments
                  </Link>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
