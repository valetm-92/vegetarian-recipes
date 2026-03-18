import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">🥦</span>
          <span className="logo-text">Vegetarian Recipes</span>
        </Link>
        <SearchBar />
      </div>
    </header>
  );
}
