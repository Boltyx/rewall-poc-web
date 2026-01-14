import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, BookOpen, UserPlus, ChevronRight } from 'lucide-react';
import topics from '../data/topics.json';
import { spectrumData } from '../data/spectrumData';
import TwodimSpectrum from '../components/topic/TwodimSpectrum';
import { FeedDiscussion } from '../components/feed/FeedItems';
import './TopicPage.css';

// Mock discussion data for the feed
const MOCK_DISCUSSIONS = [
  {
    type: 'discussion_thread',
    id: 'd1',
    author: { username: 'dr_energy', verified: true },
    topic: { id: 'nuclear', name: 'Nuclear Energy', slug: 'nuclear-energy' },
    title: 'The new SMR regulations are a game changer',
    preview: 'I just finished reading the leaked draft of the new regulatory framework for Small Modular Reactors. If this passes, we could see deployment timelines cut by half without compromising safety standards.',
    stats: { comments: 45, likes: 320, time: '2h ago' }
  },
  {
    type: 'discussion_thread',
    id: 'd2',
    author: { username: 'climate_policy', verified: false },
    topic: { id: 'nuclear', name: 'Nuclear Energy', slug: 'nuclear-energy' },
    title: 'Why public perception lags behind safety data',
    preview: 'Looking at the spectrum analysis above, it is fascinating that even though the safety data (Y-axis) is concrete for Gen IV, the risk perception (X-axis) remains heavily polarized. We need better science communication.',
    stats: { comments: 128, likes: 890, time: '5h ago' }
  }
];

// Mock profiles for "Big Voices"
const BIG_PROFILES = [
  { id: 1, initials: 'JD', color: '#3b82f6' },
  { id: 2, initials: 'AS', color: '#10b981' },
  { id: 3, initials: 'MK', color: '#f59e0b' }
];

function TopicPage() {
  const { slug } = useParams();
  const [topic, setTopic] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    const foundTopic = topics.find(t => t.slug === slug);
    if (foundTopic) {
      setTopic(foundTopic);
      // Reset active question when changing topics
      setActiveQuestion(null);
    }
  }, [slug]);

  if (!topic) return <div className="p-8 text-center text-muted">Topic not found</div>;

  // Get spectrum data for this topic
  const topicSpectrumData = spectrumData[slug] || {};

  return (
    <div className="topic-page">
      <div className="topic-container">
        
        {/* HERO SECTION */}
        <motion.header 
          className="topic-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="topic-meta-row mb-4">
            <span className="section-label">Topic Analysis</span>
            {/* Big Profiles */}
            <div className="topic-profiles">
              <div className="profile-stack">
                {BIG_PROFILES.map(p => (
                  <div key={p.id} className="profile-avatar-mini" style={{background: p.color}}>
                    {p.initials}
                  </div>
                ))}
              </div>
              <span className="profiles-label">Top Voices</span>
              <button className="btn-follow">Follow</button>
            </div>
          </div>

          <h1 className="topic-title">#{topic.name}</h1>
          <p className="topic-description">{topic.description}</p>
          
          <div className="topic-stats">
            <div className="stat-pill">
              <BookOpen size={14} /> <b>{topic.sourceCount}</b> Sources
            </div>
            <div className="stat-pill">
              <MessageSquare size={14} /> <b>{topic.discussionCount}</b> Discussions
            </div>
            <div className="stat-pill">
              <UserPlus size={14} /> <b>12k</b> Followers
            </div>
          </div>
        </motion.header>

        {/* TRENDING QUESTIONS (The Hook) */}
        <section className="trending-section">
          <div className="section-label">
            <span style={{ color: '#f97316' }}>●</span> Trending Questions
          </div>
          
          <div className="questions-grid">
            {topic.questionsForSpectrum.map((q, index) => {
              const hasData = topicSpectrumData[q.question];
              const isActive = activeQuestion?.id === q.id;

              return (
                <div key={q.id} className="question-group">
                  <motion.div 
                    className={`question-card ${isActive ? 'active' : ''}`}
                    onClick={() => hasData && setActiveQuestion(isActive ? null : q)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="question-text">{q.question}</h3>
                    <div className="question-meta">
                      <span>{hasData ? `${topicSpectrumData[q.question].length} Sources` : 'Data processing...'}</span>
                      <span>•</span>
                      <span>{q.rightLabel} vs {q.leftLabel}</span>
                    </div>
                    {hasData && (
                      <ChevronRight 
                        className="question-arrow" 
                        size={20} 
                        style={{ transform: isActive ? 'translateY(-50%) rotate(90deg)' : undefined, opacity: isActive ? 1 : undefined }}
                      />
                    )}
                  </motion.div>

                  {/* SPECTRUM REVEAL (Interactive 2D Plot) - Integrated Accordion */}
                  <AnimatePresence>
                    {isActive && hasData && (
                      <motion.div 
                        className="spectrum-reveal-area"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      >
                        <TwodimSpectrum 
                          data={topicSpectrumData[activeQuestion.question]} 
                          question={activeQuestion.question} 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* REGULAR FEED BELOW */}
        <div className="feed-divider">
          <span>Latest Discussions</span>
        </div>

        <section className="topic-feed">
          {MOCK_DISCUSSIONS.map(item => (
            <FeedDiscussion key={item.id} item={item} />
          ))}
        </section>

      </div>
    </div>
  );
}

export default TopicPage;
