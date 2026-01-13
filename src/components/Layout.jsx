import Header from './Header';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <span className="footer-text">©HUMARENA 2026</span>
      </footer>
    </div>
  );
}

export default Layout;
