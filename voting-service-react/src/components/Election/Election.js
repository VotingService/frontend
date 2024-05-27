import { useState } from "react";
import { Link } from "react-router-dom";
import "./Election.css"

function Election(){
  let rendered_statistics = []
  const electionBarWidth = 800
  const [isStatisticsShown, seIsStatisticsShown] = useState(false)
  const [electionWinner, setElectionWinner] = useState({
    "name": "Володимир",
    "surname": "Зеленський",
    "by-father": "Олександрович",
    "image_uri": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Volodymyr_Zelensky_Official_portrait.jpg/250px-Volodymyr_Zelensky_Official_portrait.jpg",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  })
  const [election, setElection] = useState({
    "name": "Вибори президента України",
    "description": "",
    "start-time": "12.05.2024",
    "end-time": "14.05.2024",
    "candidates": [
      {
        "name": "Володимир",
        "surname": "Зеленський",
        "by-father": "Олександрович",
        "image_uri": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Volodymyr_Zelensky_Official_portrait.jpg/250px-Volodymyr_Zelensky_Official_portrait.jpg",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "votes_percent": 25
      },
      {
        "name": "Володимир",
        "surname": "Зеленський",
        "by-father": "Олександрович",
        "image_uri": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Volodymyr_Zelensky_Official_portrait.jpg/250px-Volodymyr_Zelensky_Official_portrait.jpg",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "votes_percent": 20
      },
      {
        "name": "Володимир",
        "surname": "Зеленський",
        "by-father": "Олександрович",
        "image_uri": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Volodymyr_Zelensky_Official_portrait.jpg/250px-Volodymyr_Zelensky_Official_portrait.jpg",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "votes_percent": 20
      },
      {
        "name": "Володимир",
        "surname": "Зеленський",
        "by-father": "Олександрович",
        "image_uri": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Volodymyr_Zelensky_Official_portrait.jpg/250px-Volodymyr_Zelensky_Official_portrait.jpg",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "votes_percent": 20
      },
      {
        "name": "Володимир",
        "surname": "Зеленський",
        "by-father": "Олександрович",
        "image_uri": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Volodymyr_Zelensky_Official_portrait.jpg/250px-Volodymyr_Zelensky_Official_portrait.jpg",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "votes_percent": 45
      }
    ]
  })

  rendered_statistics = election.candidates.map(candidate => (
    <div className="candidate-statistics-item">
      <div className="candidate-statistics-item__info">
        <h5>{candidate.name} {candidate["by-father"]} {candidate.surname}</h5>
        <Link to={"/candidate"} className="about-button">Про кандидата</Link>
      </div>
      <div style={{width: electionBarWidth}} className="candidate-statistics-item__bar">
        <div className="candidate-statistics-item__bar__filled" style={{width: candidate.votes_percent / 100 * electionBarWidth}}></div>
        <p className="candidate-statistics-item__bar__percentage">{candidate.votes_percent} %</p>
      </div>
    </div>
  ))
  return(
    <div className="election-page">
      <h1 className="election-name">{election.name}</h1>
      <h4>{election["start-time"]} - {election["end-time"]}</h4>
      <h2>Переможець:</h2>
      <div className="election-winner-block">
        <img alt="winner-icon" src={electionWinner.image_uri}/>
        <div className="election-winner-block__info">
          <h2>{electionWinner.name} {electionWinner["by-father"]} {electionWinner.surname}</h2>
          <p>{electionWinner.description}</p>
        </div>
      </div>
      <button className="show-hide-statistics-button" onClick={() => seIsStatisticsShown(!isStatisticsShown)}>{isStatisticsShown ? "Сховати" : "Відобразити"} результати</button>
      {isStatisticsShown ? <div className="statistics-block"> {rendered_statistics} </div> : null}
    </div>
  )
}

export default Election;