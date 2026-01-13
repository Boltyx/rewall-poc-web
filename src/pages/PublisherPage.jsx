import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, BookOpen, ExternalLink } from 'lucide-react';
import publishers from '../data/publishers.json';
import sources from '../data/sources.json';
import './PublisherPage.css';

function PublisherPage() {
  const { id } = useParams();
  const publisher = publishers.find(p => p.id === id) || publishers[0];
  const publisherSources = sources.filter(s => s.publisher.id === publisher.id);

  return (
    <div className="publisher-page">
      <div className="publisher-container">
        {/* Publisher Header */}
        <motion.header 
          className="publisher-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="publisher-badge-row">
            {publisher.verified && (
              <span className="badge badge-verified">
                <CheckCircle size={12} />
                Verified Publisher
              </span>
            )}
          </div>
          <h1 className="publisher-name">{publisher.name}</h1>
          <p className="publisher-description">{publisher.description}</p>
          <div className="publisher-meta">
            <a href={publisher.website} target="_blank" rel="noopener noreferrer" className="publisher-link">
              Visit Website <ExternalLink size={12} />
            </a>
            <span>•</span>
            <span>{publisher.publicationCount.toLocaleString()} publications</span>
          </div>
        </motion.header>

        {/* Trust Metrics */}
        <motion.section 
          className="trust-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="section-title">Trust Metrics</h2>
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-label">Verification Status</span>
              <span className="trust-value verified">
                <CheckCircle size={14} />
                Verified since {new Date(publisher.verifiedSince).getFullYear()}
              </span>
            </div>
            <div className="trust-item">
              <span className="trust-label">Perspective Balance</span>
              <div className="bias-meter">
                <div className="bias-track">
                  <div 
                    className="bias-indicator"
                    style={{ left: `${publisher.biasScore * 100}%` }}
                  />
                </div>
                <div className="bias-labels">
                  <span>Left-leaning</span>
                  <span>Balanced</span>
                  <span>Right-leaning</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Mini Spectrum - showing range of perspectives in their publications */}
        <motion.section 
          className="spectrum-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="section-title">Perspective Range</h2>
          <p className="spectrum-description text-muted">
            This spectrum shows the range of perspectives published by {publisher.name}
          </p>
          <div className="mini-spectrum">
            <div className="spectrum-track">
              {publisherSources.map(source => {
                // Use first available spectrum position
                const positions = Object.values(source.spectrumPositions);
                const avgPosition = positions.length > 0 
                  ? positions.reduce((a, b) => a + b, 0) / positions.length 
                  : 0.5;
                return (
                  <Link
                    key={source.id}
                    to={`/source/${source.id}`}
                    className="spectrum-dot"
                    style={{ left: `${avgPosition * 100}%` }}
                    title={source.title}
                  />
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Publications */}
        <motion.section 
          className="publications-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="section-title">
            <BookOpen size={14} />
            Recent Publications
          </h2>
          <div className="publications-list">
            {publisherSources.map(source => (
              <Link key={source.id} to={`/source/${source.id}`} className="card publication-card">
                <h3>{source.title}</h3>
                <p className="text-muted">{source.authors.map(a => a.name).join(', ')}</p>
                <span className="publication-date">
                  {new Date(source.publishedDate).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default PublisherPage;
