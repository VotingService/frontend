import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ElectionSuccess.css';

function ElectionSuccess() {
  const navigate = useNavigate()
  useEffect(() => {
    if(sessionStorage.getItem("role") === 'USER'){
        navigate("/home")
    }  else if (!sessionStorage.getItem("role")){
      navigate("/")
  }
})
  return (
    <div className="election-success-page">
      <h1 className="header">Вибори успішно створені</h1>
      <Link to={"/home-admin"} className="home-button">
        Назад на домашню сторінку
      </Link>
    </div>
  );
}

export default ElectionSuccess;