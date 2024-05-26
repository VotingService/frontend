import "./AdminPanel.css"
import { FaHome } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminPanel() {
  return (
    <div className="admin-panel">
      <Link className="section"><FaHome className="section__icon"/><p>Домашня сторінка</p></Link>
      <Link className="section"><MdAccountCircle className="section__icon"/><p>Особистий кабінет</p></Link>
      <Link className="section"><IoMdSettings className="section__icon"/><p>Налаштування</p></Link>
      <Link className="section"><FaInfoCircle className="section__icon"/><p>Інформація та контакти</p></Link>
      <button className="exit-button">Вийти</button>
    </div>
  );
}

export default AdminPanel;