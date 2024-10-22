// src/Components/Header.js
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import AuthContext from "../AuthContext";

const Header = () => {
  const { token } = useContext(AuthContext);

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <Link to="/">MyApp</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {token ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
