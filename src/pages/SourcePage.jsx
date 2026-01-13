import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, ExternalLink, CheckCircle } from 'lucide-react';
import sources from '../data/sources.json';
import discussions from '../data/discussions.json';
import users from '../data/users.json';
import './SourcePage.css';

function SourcePage() {
  const { id } = useParams();
  const source = sources.find(s => s.id === id) || sources[0];
  const sourceDiscussions = discussions.filter(d => d.sourceId === source.id);

  // Mock paper content - in real app, this would be the actual paper text
  const mockParagraphs = [
    "Introduction: The role of nuclear power in climate change mitigation has been a subject of intense debate among policymakers, scientists, and the public. As the world grapples with the urgent need to reduce greenhouse gas emissions, nuclear energy presents both opportunities and challenges.",
    "This comprehensive review examines the potential of nuclear power as a low-carbon energy source across 47 countries, analyzing lifecycle emissions, safety records, economic factors, and public perception.",
    "Methodology: We conducted a meta-analysis of 156 peer-reviewed studies published between 2010 and 2024, focusing on lifecycle greenhouse gas emissions from nuclear power plants compared to other energy sources.",
    "Our analysis reveals that nuclear power has one of the lowest lifecycle carbon footprints among all energy sources, averaging 12 gCO2eq/kWh compared to 820 gCO2eq/kWh for coal and 490 gCO2eq/kWh for natural gas.",
    "Safety Analysis: Modern Gen III+ reactor designs incorporate passive safety systems that significantly reduce the risk of severe accidents. Our review of operational data from 440 reactors worldwide shows a 94% reduction in incident rates compared to older designs.",
    "Economic Considerations: While initial capital costs for nuclear power plants remain high, the levelized cost of electricity (LCOE) becomes competitive when considering the full lifecycle and the cost of carbon emissions.",
    "Public Perception: Despite the scientific evidence supporting nuclear safety, public perception remains a significant barrier to expansion. Our survey across 23 countries found that 62% of respondents expressed concerns about nuclear waste management.",
    "Conclusion: Nuclear power represents a viable component of a diversified low-carbon energy portfolio. However, addressing public concerns through transparent communication and demonstrating the safety of modern reactor designs will be crucial for its expanded role in climate change mitigation."
  ];

  // Calculate discussion density for heatmap
  const discussionDensity = mockParagraphs.map((_, index) => {
    const count = sourceDiscussions.filter(d => d.paragraphIndex === index).length;
    return count;
  });
  const maxDensity = Math.max(...discussionDensity, 1);

  return (
    <div className="source-page">
      <div className="source-container">
        {/* Source Header */}
        <motion.header 
          className="source-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to={`/publisher/${source.publisher.id}`} className="source-publisher-link">
            {source.publisher.verified && <CheckCircle size={14} className="verified-icon" />}
            {source.publisher.name}
          </Link>
          <h1 className="source-title">{source.title}</h1>
          <div className="source-authors-list">
            {source.authors.map((author, i) => (
              <span key={i}>
                {author.name} <span className="text-muted">({author.affiliation})</span>
                {i < source.authors.length - 1 && ', '}
              </span>
            ))}
          </div>
          <div className="source-meta">
            <span>Published: {new Date(source.publishedDate).toLocaleDateString()}</span>
            <span>•</span>
            <a href={`https://doi.org/${source.doi}`} target="_blank" rel="noopener noreferrer" className="source-doi">
              DOI <ExternalLink size={12} />
            </a>
          </div>
        </motion.header>

        {/* Reader Content */}
        <div className="reader-layout">
          {/* Main Text */}
          <motion.article 
            className="reader-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {mockParagraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className={`reader-paragraph ${discussionDensity[index] > 0 ? 'has-discussions' : ''}`}
                data-discussions={discussionDensity[index]}
              >
                {paragraph}
              </p>
            ))}
          </motion.article>

          {/* Heatmap Bar */}
          <motion.aside 
            className="heatmap-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="heatmap-container">
              {discussionDensity.map((density, index) => (
                <div 
                  key={index}
                  className="heatmap-segment"
                  style={{ 
                    opacity: density > 0 ? 0.3 + (density / maxDensity) * 0.7 : 0.1,
                    background: density > 0 ? 'var(--color-text-primary)' : 'var(--color-border)'
                  }}
                  title={`${density} discussions`}
                />
              ))}
            </div>
            <span className="heatmap-label">Activity</span>
          </motion.aside>

          {/* Discussion Sidebar */}
          <motion.aside 
            className="discussion-sidebar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="sidebar-title">
              <MessageSquare size={14} />
              Discussions ({sourceDiscussions.length})
            </h3>
            <div className="discussions-list">
              {sourceDiscussions.map(discussion => {
                const author = users.find(u => u.id === discussion.author);
                return (
                  <div key={discussion.id} className="discussion-card">
                    <div className="discussion-author">
                      <span className="author-name">@{author?.username || 'unknown'}</span>
                      {author?.verified && <CheckCircle size={12} className="verified-icon" />}
                    </div>
                    <p className="discussion-content">{discussion.content}</p>
                    <div className="discussion-meta">
                      <span>{discussion.likes} likes</span>
                      <span>•</span>
                      <span>{discussion.replies?.length || 0} replies</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

export default SourcePage;
