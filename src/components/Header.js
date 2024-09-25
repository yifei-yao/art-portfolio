// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import artworksData from '../data/artworks.json';
import './Header.css'; // Make sure to import the CSS file

function Header() {
  return (
    <header className="header">
      {/* Artist's Name */}
      <Link to="/" className="artist-name">
        Renaissance Guy
      </Link>

      {/* Navigation */}
      <nav className="nav">
        {artworksData.categories.map((category) => (
          <div className="nav-item" key={category.name}>
            <Link to={`/${category.name}`} className="nav-link">
              {category.name}
            </Link>
            <div className="dropdown-menu">
              {/* Dropdown menu with years only */}
              {category.years.map((year) => (
                <Link
                  key={year.year}
                  to={`/${category.name}/${year.year}`}
                  className="dropdown-item"
                >
                  {year.year}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </header>
  );
}

export default Header;
