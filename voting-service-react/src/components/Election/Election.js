import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Election.css"
import Header from "../Header/Header";
import { getElectionWinner, getElectionById, getElectionStats } from "../../API/API";
import AdminPanel from "../AdminPanel/AdminPanel";

function Election(props){
  const location = useLocation();
  const state = location.state;
  let rendered_statistics = []
  const electionBarWidth = 800
  const [isStatisticsShown, seIsStatisticsShown] = useState(false)
  const [electionWinner, setElectionWinner] = useState({})
  const [electionStats, setElectionStats] = useState([])
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

  useEffect(() => {
    const fetchData1 = getElectionWinner({Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`}, state.electionId);
    const fetchData2 = getElectionById({Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`}, state.electionId);
    const fetchData3 = getElectionStats({Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`}, state.electionId);

    Promise.all([fetchData1, fetchData2, fetchData3])
    .then(([res1, res2, res3]) => {
      setElectionWinner(res1.data._embedded.users[0])
      setElection({
        ...res2.data,
        startDate: res2.data.startDate.split('T')[0].replaceAll('-', '.'),
        endDate: res2.data.endDate.split('T')[0].replaceAll('-', '.'),
      })
      setElectionStats(res3.data)
    })
    .catch((err) => {
      console.log(err)
    })
  })

  rendered_statistics = electionStats.map(candidate => (
    <div className="candidate-statistics-item">
      <div className="candidate-statistics-item__info">
        <h5>{candidate.lastName} {candidate.firstName} {candidate.byFather}</h5>
        <Link state={{id: candidate.id}} to={"/candidate"} className="about-button">Про кандидата</Link>
      </div>
      <div style={{width: electionBarWidth}} className="candidate-statistics-item__bar">
        <div className="candidate-statistics-item__bar__filled" style={{width: candidate.pointInPercentage / 100 * electionBarWidth}}></div>
        <p className="candidate-statistics-item__bar__percentage">{Math.round(candidate.pointInPercentage)} %</p>
      </div>
    </div>
  ))
  return(
      <div style={sessionStorage.getItem("role") === 'ADMIN' && {display: "flex"}}>
        <Header/>
        {sessionStorage.getItem("role") === 'ADMIN' && <AdminPanel/>}
        {election && <div className="election-page" style={sessionStorage.getItem("role") === 'ADMIN' && {marginTop: '0px'}}>
          <h1 className="election-name">{election.title}</h1>
          <h4>{election.startDate} - {election.endDate}</h4>
          <h2>Переможець:</h2>
          <div className="election-winner-block">
            <img alt="winner-icon" src={electionWinner.photoUrl}/>
            <div className="election-winner-block__info">
              <h2>{electionWinner.lastName} {electionWinner.firstName} {electionWinner.byFather}</h2>
              <p>{electionWinner.description}</p>
            </div>
          </div>
          <button className="show-hide-statistics-button"
                  onClick={() => seIsStatisticsShown(!isStatisticsShown)}>{isStatisticsShown ? "Сховати" : "Відобразити"} результати
          </button>
          {isStatisticsShown ? <div className="statistics-block"> {rendered_statistics} </div> : null}
        </div>}
      </div>
  )
}

export default Election;