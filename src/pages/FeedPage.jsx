import { motion } from 'framer-motion';
import feedItems from '../data/feed/feedItems.json';
import {
  FeedDiscussion,
  FeedPaper,
  FeedNetworkActivity,
  FeedComment,
  FeedTopics,
  FeedSpectrum,
  FeedPublisher,
  FeedTrendingQuestions,
  FeedGroup,
  FeedDigest
} from '../components/feed/FeedItems';
import './FeedPage.css';

function FeedPage() {
  // Render the appropriate component based on feed item type
  const renderFeedItem = (item) => {
    switch (item.type) {
      case 'discussion_thread':
        return <FeedDiscussion key={item.id} item={item} />;
      case 'new_paper':
        return <FeedPaper key={item.id} item={item} />;
      case 'network_activity':
        return <FeedNetworkActivity key={item.id} item={item} />;
      case 'comment_highlight':
        return <FeedComment key={item.id} item={item} />;
      case 'topics_for_you':
        return <FeedTopics key={item.id} item={item} />;
      case 'spectrum_question':
        return <FeedSpectrum key={item.id} item={item} />;
      case 'publisher_update':
        return <FeedPublisher key={item.id} item={item} />;
      case 'trending_questions':
        return <FeedTrendingQuestions key={item.id} item={item} />;
      case 'group_activity':
        return <FeedGroup key={item.id} item={item} />;
      case 'weekly_digest':
        return <FeedDigest key={item.id} item={item} />;
      default:
        return null;
    }
  };

  // First 3 items animate immediately, rest animate when scrolled into view
  const IMMEDIATE_ITEMS = 3;

  return (
    <div className="feed-page">
      <motion.div 
        className="feed-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="feed-list">
          {feedItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="feed-item-wrapper"
              // First few items: animate immediately with stagger
              // Rest: animate when scrolled into view
              {...(index < IMMEDIATE_ITEMS 
                ? {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { 
                      delay: 0.1 + index * 0.12, 
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad
                    }
                  }
                : {
                    initial: { opacity: 0, y: 40 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: "-50px" },
                    transition: { 
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  }
              )}
            >
              {renderFeedItem(item)}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default FeedPage;
