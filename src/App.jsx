import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">React<span>Dev</span></div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="https://github.com/vikashchauhan1141" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </nav>

      <main className="hero-section">
        <div className="glass-card">
          <h1 className="title">Learning <span className="highlight">React</span></h1>
          <p className="subtitle">
            Building modern, interactive, and high-performance web applications with professional standards.
          </p>
          <div className="cta-group">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Documentation</button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Learning React. Built with ❤️ by Vikash Chauhan</p>
      </footer>
    </div>
  );
}

export default App;
