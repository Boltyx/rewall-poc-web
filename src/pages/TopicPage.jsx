import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, BookOpen, Filter } from 'lucide-react';
import topics from '../data/topics.json';
import sources from '../data/sources.json';
import './TopicPage.css';

function TopicPage() {
  const { slug } = useParams();
  const topic = topics.find(t => t.slug === slug) || topics[0];
  const relatedSources = sources.filter(s => s.topics.includes(topic.id));
  
  // Default to first question for spectrum
  const currentQuestion = topic.questionsForSpectrum[0];

  return (
    <div className="topic-page">
      <div className="topic-container">
        {/* Topic Header */}
        <motion.header 
          className="topic-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="topic-title">#{topic.name}</h1>
          <p className="topic-description">{topic.description}</p>
          <div className="topic-stats">
            <span><BookOpen size={14} /> {topic.sourceCount} sources</span>
            <span><MessageSquare size={14} /> {topic.discussionCount} discussions</span>
          </div>
        </motion.header>

        {/* Spectrum Section */}
        <motion.section 
          className="spectrum-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="spectrum-header">
            <h2 className="spectrum-question">{currentQuestion.question}</h2>
            <button className="btn btn-ghost">
              <Filter size={14} />
              Change Question
            </button>
          </div>
          
          {/* Spectrum Visualization Placeholder */}
          <div className="spectrum-container">
            <div className="spectrum-axis">
              <span className="spectrum-label spectrum-label-left">{currentQuestion.leftLabel}</span>
              <div className="spectrum-line">
                {/* Source dots on spectrum */}
                {relatedSources.map(source => {
                  const position = source.spectrumPositions[currentQuestion.id] || 0.5;
                  return (
                    <Link
                      key={source.id}
                      to={`/source/${source.id}`}
                      className="spectrum-dot"
                      style={{ left: `${position * 100}%` }}
                      title={source.title}
                    >
                      <span className="spectrum-dot-inner" />
                    </Link>
                  );
                })}
              </div>
              <span className="spectrum-label spectrum-label-right">{currentQuestion.rightLabel}</span>
            </div>
          </div>
        </motion.section>

        {/* Discussion Feed Placeholder */}
        <motion.section 
          className="discussions-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="section-title">Discussions</h2>
          <div className="discussions-placeholder">
            <p className="text-muted">Discussion threads will appear here</p>
          </div>
        </motion.section>

        {/* Related Sources */}
        <motion.section 
          className="sources-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="section-title">Related Research</h2>
          <div className="sources-list">
            {relatedSources.map(source => (
              <Link key={source.id} to={`/source/${source.id}`} className="card source-card-mini">
                <h3>{source.title}</h3>
                <span className="text-muted">{source.publisher.name}</span>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default TopicPage;
