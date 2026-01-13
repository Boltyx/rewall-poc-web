import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, Users } from 'lucide-react';
import sources from '../data/sources.json';
import topics from '../data/topics.json';
import groups from '../data/groups.json';
import './SearchPage.css';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Mock AI-generated summary
  const aiSummary = query ? `Based on analysis of ${sources.length} research papers, the answer to "${query}" involves multiple perspectives. Current research suggests a nuanced view that considers both potential benefits and risks. The scientific consensus indicates the need for further study, though several key findings have emerged from recent publications.` : '';

  const relevantSources = sources.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.abstract.toLowerCase().includes(query.toLowerCase())
  );

  const relevantTopics = topics.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.description.toLowerCase().includes(query.toLowerCase())
  );

  const relevantGroups = groups.filter(g =>
    g.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <div className="search-container">
        {/* Search Header */}
        <motion.header 
          className="search-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="search-query-display">
            <Search size={20} />
            <span>{query || 'Search Rewall'}</span>
          </div>
        </motion.header>

        {query && (
          <>
            {/* AI Synthesis Section */}
            <motion.section 
              className="synthesis-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="section-title">AI Synthesis</h2>
              <div className="synthesis-content">
                <p className="synthesis-text">{aiSummary}</p>
                <div className="synthesis-citations">
                  <span className="citations-label">Sources used:</span>
                  {relevantSources.slice(0, 3).map((source, i) => (
                    <Link key={source.id} to={`/source/${source.id}`} className="citation-badge">
                      [{i + 1}] {source.publisher.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Results Grid */}
            <div className="results-grid">
              {/* Sources Column */}
              <motion.section 
                className="results-column"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="section-title">
                  <BookOpen size={14} />
                  Research ({relevantSources.length})
                </h2>
                <div className="results-list">
                  {relevantSources.map(source => (
                    <Link key={source.id} to={`/source/${source.id}`} className="card result-card">
                      <span className="result-publisher">{source.publisher.name}</span>
                      <h3 className="result-title">{source.title}</h3>
                      <p className="result-abstract">{source.abstract.slice(0, 150)}...</p>
                    </Link>
                  ))}
                  {relevantSources.length === 0 && (
                    <p className="text-muted">No research papers found</p>
                  )}
                </div>
              </motion.section>

              {/* Topics & Groups Column */}
              <motion.section 
                className="results-column"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="section-title">Related Topics</h2>
                <div className="results-list">
                  {relevantTopics.map(topic => (
                    <Link key={topic.id} to={`/topic/${topic.slug}`} className="card result-card-small">
                      <span className="topic-tag">#{topic.name}</span>
                      <span className="text-muted">{topic.sourceCount} sources</span>
                    </Link>
                  ))}
                </div>

                <h2 className="section-title mt-8">
                  <Users size={14} />
                  Groups
                </h2>
                <div className="results-list">
                  {relevantGroups.map(group => (
                    <div key={group.id} className="card result-card-small">
                      <span>{group.name}</span>
                      <span className="text-muted">{group.memberCount.toLocaleString()} members</span>
                    </div>
                  ))}
                  {relevantGroups.length === 0 && (
                    <p className="text-muted">No groups found</p>
                  )}
                </div>
              </motion.section>
            </div>
          </>
        )}

        {!query && (
          <div className="empty-search">
            <p className="text-muted">Enter a question or topic to search</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
