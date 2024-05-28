import "./AvailableElections.css"
import Blocks from "../Home/Blocks/Blocks";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AvailableElections() {
  const navigate = useNavigate()
  let available = [
    {name: 'Вибори президента України', buttonType: 'vote'},
    {name: 'Доступне голосування2', buttonType: 'vote'},
    {name: 'Доступне голосування2', buttonType: 'vote'},
    {name: 'Доступне голосування2', buttonType: 'vote'},
    {name: 'Доступне голосування2', buttonType: 'vote'},
    {name: 'Доступне голосування2', buttonType: 'vote'}
];
  useEffect(() => {
    if(sessionStorage.getItem("role") === 'USER'){
      navigate("/home")
    }
  })
  return(
      <div>
        <Header/>
        <div className="Home">
          <h1 className="available">Доступні для вас голосування:</h1>
          {available.length === 0 ? <div className="no-available">Зараз немає доступних для вас голосувань.</div> :
              <Blocks blocks={available} sortBy={"endDate"} className="available-blocks"></Blocks>}
        </div>
      </div>
  )
}