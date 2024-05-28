import React from 'react';
import './Header.css';
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  const handleExit = () => {
    sessionStorage.removeItem("auth_token")
    navigate("/")
  }
  return (
    <header>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to={"/account"} className="nav-link">
              <MdAccountCircle style={{width: 22, height: 22}}/>
              Особистий кабінет
            </Link>
          </li>
          <li className="nav-item"><Link to={"/available-elections"} className="nav-link">Доступні вибори</Link></li>
          <li className="nav-item"><Link to={"/history"} className="nav-link">Історія голосів</Link></li>
          <li className="nav-item"><Link to={"/about"} className="nav-link">Про платформу</Link></li>
          <li className="nav-item exit-button"><Link onClick={() => handleExit()} to={"/"} className="nav-link">Вийти</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;