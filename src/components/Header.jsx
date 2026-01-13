import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="btn btn-ghost header-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
        <Link to="/" className="header-home-link">
          HOME
        </Link>
      </div>

      <div className="header-right">
        <Link to="/search" className="btn header-search-btn">
          SEARCH
        </Link>
      </div>
    </header>
  );
}

export default Header;
