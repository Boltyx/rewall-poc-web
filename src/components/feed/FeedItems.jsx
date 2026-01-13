import { Link } from 'react-router-dom';
import { MessageSquare, Flame, BookOpen, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import './FeedItems.css';

// Discussion Thread - Reddit-style post
export function FeedDiscussion({ item }) {
  return (
    <article className="feed-item feed-item--discussion">
      <div className="feed-item__label">
        <Link to={`/topic/${item.topic.id}`} className="feed-item__topic-link">
          #{item.topic.name}
        </Link>
      </div>
      <div className="feed-item__author">
        <Link to={`/profile/${item.author.username}`} className="feed-item__author-name">
          @{item.author.username}
        </Link>
        {item.author.verified && <CheckCircle size={12} className="feed-item__verified" />}
      </div>
      <h3 className="feed-item__title">
        <Link to={`/discussion/${item.id}`}>{item.title}</Link>
      </h3>
      <p className="feed-item__preview">{item.preview}</p>
      <div className="feed-item__meta">
        <span className="feed-item__stat">
          <MessageSquare size={14} />
          {item.commentCount} comments
        </span>
        {item.isControversial && (
          <span className="feed-item__badge feed-item__badge--controversial">
            <Flame size={12} />
            Controversial
          </span>
        )}
      </div>
    </article>
  );
}

// New Paper
export function FeedPaper({ item }) {
  return (
    <article className="feed-item feed-item--paper feed-item--card">
      <div className="feed-item__label">NEW PAPER</div>
      <h3 className="feed-item__title">
        <Link to={`/source/${item.source.id}`}>{item.source.title}</Link>
      </h3>
      <div className="feed-item__publisher">
        {item.source.publisher.verified && <CheckCircle size={12} className="feed-item__verified" />}
        {item.source.publisher.name}
      </div>
      {item.hookQuestions && (
        <ul className="feed-item__hooks">
          {item.hookQuestions.map((q, i) => (
            <li key={i}>• {q}</li>
          ))}
        </ul>
      )}
      <div className="feed-item__actions">
        <Link to={`/source/${item.source.id}`} className="feed-item__btn">
          READ →
        </Link>
      </div>
      <div className="feed-item__meta">
        <span className="feed-item__stat">{item.readCount} reads</span>
        <span className="feed-item__stat">
          <MessageSquare size={14} />
          {item.commentCount}
        </span>
      </div>
    </article>
  );
}

// Network Activity
export function FeedNetworkActivity({ item }) {
  return (
    <article className="feed-item feed-item--network">
      <div className="feed-item__label">YOUR NETWORK</div>
      <div className="feed-item__network-row">
        <div className="feed-item__avatars">
          {item.users.slice(0, 3).map((user, i) => (
            <div key={user.id} className="feed-item__avatar" style={{ zIndex: 3 - i }}>
              {user.username.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
        <span className="feed-item__network-text">
          <strong>{item.count} people</strong> {item.action} this
        </span>
      </div>
      <Link to={`/source/${item.target.id}`} className="feed-item__target">
        {item.target.title}
      </Link>
    </article>
  );
}

// Comment Highlight
export function FeedComment({ item }) {
  return (
    <article className="feed-item feed-item--comment">
      <div className="feed-item__label">TRENDING IN YOUR NETWORK</div>
      <div className="feed-item__author">
        <Link to={`/profile/${item.author.username}`} className="feed-item__author-name">
          @{item.author.username}
        </Link>
        {item.author.verified && <CheckCircle size={12} className="feed-item__verified" />}
        <span className="feed-item__author-action">commented:</span>
      </div>
      <blockquote className="feed-item__quote">
        "{item.content}"
      </blockquote>
      <Link to={`/source/${item.target.id}`} className="feed-item__target">
        Paper: {item.target.title}
      </Link>
    </article>
  );
}

// Topics For You
export function FeedTopics({ item }) {
  return (
    <article className="feed-item feed-item--topics">
      <div className="feed-item__label">TOPICS FOR YOU</div>
      <div className="feed-item__pills">
        {item.topics.map(topic => (
          <Link key={topic.id} to={`/topic/${topic.slug}`} className="feed-item__pill">
            #{topic.name}
          </Link>
        ))}
      </div>
    </article>
  );
}

// Spectrum Question with Histogram
export function FeedSpectrum({ item }) {
  const maxVal = Math.max(...item.distribution);
  
  return (
    <article className="feed-item feed-item--spectrum feed-item--card">
      <div className="feed-item__label">HOT QUESTION</div>
      <h3 className="feed-item__question">
        <Link to={`/topic/${item.topic.slug}`}>{item.question}</Link>
      </h3>
      <div className="feed-item__histogram">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="feed-item__histogram-svg">
          <defs>
            <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d={generateHistogramPath(item.distribution, maxVal)}
            fill="url(#spectrumGradient)"
          />
        </svg>
        <div className="feed-item__histogram-labels">
          <span>{item.leftLabel}</span>
          <span>{item.rightLabel}</span>
        </div>
      </div>
      <div className="feed-item__meta">
        <span className="feed-item__stat">
          <BookOpen size={14} />
          {item.sourceCount} sources analyzed
        </span>
      </div>
    </article>
  );
}

// Generate smooth curve path for histogram
function generateHistogramPath(data, max) {
  const width = 100;
  const height = 35;
  const stepX = width / (data.length - 1);
  
  let path = `M 0 ${height} `;
  
  // Generate points
  const points = data.map((val, i) => ({
    x: i * stepX,
    y: height - (val / max) * (height - 5)
  }));
  
  // Create smooth curve through points
  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      path += `L ${points[i].x} ${points[i].y} `;
    } else {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      path += `Q ${cpx} ${prev.y} ${curr.x} ${curr.y} `;
    }
  }
  
  path += `L ${width} ${height} Z`;
  return path;
}

// Publisher Update
export function FeedPublisher({ item }) {
  return (
    <article className="feed-item feed-item--publisher">
      <div className="feed-item__label">PUBLISHER UPDATE</div>
      <div className="feed-item__publisher-row">
        {item.publisher.verified && <CheckCircle size={14} className="feed-item__verified" />}
        <Link to={`/publisher/${item.publisher.id}`} className="feed-item__publisher-name">
          {item.publisher.name}
        </Link>
        <span className="feed-item__publisher-message">{item.message}</span>
      </div>
    </article>
  );
}

// Trending Questions
export function FeedTrendingQuestions({ item }) {
  return (
    <article className="feed-item feed-item--trending">
      <div className="feed-item__label">
        <TrendingUp size={12} />
        TRENDING QUESTIONS
      </div>
      <ul className="feed-item__question-list">
        {item.questions.map((q, i) => (
          <li key={i}>
            <Link to={`/topic/${q.topic.slug}?q=${encodeURIComponent(q.text)}`}>
              {q.text}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

// Group Activity
export function FeedGroup({ item }) {
  return (
    <article className="feed-item feed-item--group">
      <div className="feed-item__label">ACTIVE IN YOUR GROUPS</div>
      <div className="feed-item__group-row">
        <Users size={16} />
        <Link to={`/group/${item.group.id}`} className="feed-item__group-name">
          {item.group.name}
        </Link>
      </div>
      <p className="feed-item__group-activity">{item.activity}</p>
      <div className="feed-item__meta">
        <span className="feed-item__stat">{item.replyCount} replies</span>
      </div>
    </article>
  );
}

// Weekly Digest
export function FeedDigest({ item }) {
  return (
    <article className="feed-item feed-item--digest feed-item--card">
      <div className="feed-item__label">
        <Clock size={12} />
        {item.period.toUpperCase()} IN #{item.topic.name.toUpperCase()}
      </div>
      <ul className="feed-item__digest-list">
        {item.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
      <Link to={`/topic/${item.topic.slug}`} className="feed-item__link">
        See all →
      </Link>
    </article>
  );
}
