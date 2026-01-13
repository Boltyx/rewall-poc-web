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

  return (
    <div className="feed-page">
      <motion.div 
        className="feed-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="feed-list">
          {feedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
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
