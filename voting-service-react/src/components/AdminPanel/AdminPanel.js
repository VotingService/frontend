import "./AdminPanel.css"
import { FaHome } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate()
  const handleExit = () => {
    sessionStorage.clear()
    navigate("/")
  }
  return (
    <div className="admin-panel">
      <Link to={"/home-admin"} className="section"><FaHome className="section__icon"/><p>Домашня сторінка</p></Link>
      <Link to={"/account"} className="section"><MdAccountCircle className="section__icon"/><p>Особистий кабінет</p></Link>
      <Link className="section"><IoMdSettings className="section__icon"/><p>Налаштування</p></Link>
      <Link className="section"><FaInfoCircle className="section__icon"/><p>Інформація та контакти</p></Link>
      <button onClick={handleExit} className="exit-button">Вийти</button>
    </div>
  );
}

export default AdminPanel;