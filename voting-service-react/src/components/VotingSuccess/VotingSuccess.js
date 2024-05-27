import "./VotingSuccess.css"
import { Link } from "react-router-dom";

function VotingSuccess() {
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