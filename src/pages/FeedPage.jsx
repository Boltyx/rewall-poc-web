import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, BookOpen, TrendingUp, Users } from 'lucide-react';
import sources from '../data/sources.json';
import topics from '../data/topics.json';
import groups from '../data/groups.json';
import './FeedPage.css';

function FeedPage() {
  return (
    <div className="feed-page">
      <div className="feed-container">
        <motion.div 
          className="feed-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Trending Topics Section */}
          <section className="feed-section">
            <h2 className="feed-section-title">
              <TrendingUp size={16} />
              Trending Topics
            </h2>
            <div className="feed-cards-row">
              {topics.slice(0, 3).map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/topic/${topic.slug}`} className="card topic-card">
                    <h3 className="topic-card-title">#{topic.name}</h3>
                    <p className="topic-card-desc">{topic.description}</p>
                    <div className="topic-card-meta">
                      <span>{topic.sourceCount} sources</span>
                      <span>•</span>
                      <span>{topic.discussionCount} discussions</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* New Research Section */}
          <section className="feed-section">
            <h2 className="feed-section-title">
              <BookOpen size={16} />
              New Research
            </h2>
            <div className="feed-cards-list">
              {sources.map((source, index) => (
                <motion.div
                  key={source.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link to={`/source/${source.id}`} className="card source-card">
                    <div className="source-card-header">
                      <Link 
                        to={`/publisher/${source.publisher.id}`} 
                        className="source-publisher"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {source.publisher.verified && <span className="badge badge-verified">✓</span>}
                        {source.publisher.name}
                      </Link>
                      <span className="source-date">{new Date(source.publishedDate).toLocaleDateString()}</span>
                    </div>
                    <h3 className="source-card-title">{source.title}</h3>
                    <p className="source-card-abstract">{source.abstract}</p>
                    <div className="source-card-footer">
                      <span className="source-authors">
                        {source.authors.map(a => a.name).join(', ')}
                      </span>
                      <div className="source-stats">
                        <span><MessageSquare size={14} /> {source.discussionCount}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Active Groups Section */}
          <section className="feed-section">
            <h2 className="feed-section-title">
              <Users size={16} />
              Active Groups
            </h2>
            <div className="feed-cards-row">
              {groups.slice(0, 3).map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="card group-card">
                    <h3 className="group-card-title">{group.name}</h3>
                    <p className="group-card-desc">{group.description}</p>
                    <div className="group-card-meta">
                      <span>{group.memberCount.toLocaleString()} members</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default FeedPage;
