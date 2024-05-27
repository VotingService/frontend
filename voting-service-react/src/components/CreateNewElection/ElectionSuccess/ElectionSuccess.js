import React from 'react';
import { Link } from 'react-router-dom';
import './ElectionSuccess.css';

function ElectionSuccess() {
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