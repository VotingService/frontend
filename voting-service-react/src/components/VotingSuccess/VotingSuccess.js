import "./VotingSuccess.css"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function VotingSuccess() {
  const  navigate = useNavigate()
  useEffect(() => {
    if(sessionStorage.getItem("role") === 'ADMIN'){
      navigate("/home-admin")
    } else if (!sessionStorage.getItem("role")){
      navigate("/")
  }
})
  return(
      <div className="voting-success-page">
        <h1 className="header">Дякуємо за ваш голос!</h1>
        <Link to={"/home"} className="home-button">
          Назад на домашню сторінку
        </Link>
      </div>
    );
}

export default VotingSuccess;