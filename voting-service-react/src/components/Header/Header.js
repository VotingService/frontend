import React from 'react';
import './Header.css';
import { MdAccountCircle } from "react-icons/md";

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/account" className="nav-link">
              <MdAccountCircle style={{width: 22, height: 22}}/>
              Особистий кабінет
            </a>
          </li>
          <li className="nav-item"><a href="#" className="nav-link">Доступні вибори</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Історія голосів</a></li>
          <li className="nav-item"><a href="/about" className="nav-link">Про платформу</a></li>
          <li className="nav-item exit-button"><a href="#" className="nav-link">Вийти</a></li>
        </ul>
        
      </nav>
    </header>
  );
}

export default Header;