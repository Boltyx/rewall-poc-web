import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import FeedPage from './pages/FeedPage';
import TopicPage from './pages/TopicPage';
import SourcePage from './pages/SourcePage';
import ProfilePage from './pages/ProfilePage';
import PublisherPage from './pages/PublisherPage';
import SearchPage from './pages/SearchPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page - no header/footer */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Main app pages - with layout */}
        <Route path="/feed" element={<Layout><FeedPage /></Layout>} />
        <Route path="/topic/:slug" element={<Layout><TopicPage /></Layout>} />
        <Route path="/source/:id" element={<Layout><SourcePage /></Layout>} />
        <Route path="/profile/:username" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/publisher/:id" element={<Layout><PublisherPage /></Layout>} />
        <Route path="/search" element={<Layout><SearchPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
