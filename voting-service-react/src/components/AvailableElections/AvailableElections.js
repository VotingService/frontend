import "./AvailableElections.css"
import Blocks from "../Home/Blocks/Blocks";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserCanParticipateInElections} from "../../API/API";
import Block from "../Home/Blocks/Block";

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
    if(sessionStorage.getItem("role") === 'ADMIN'){
      navigate("/home-admin")
    } else if (!sessionStorage.getItem("role")){
      navigate("/")
  }
  })
  const [renderedAvailableBlocks, setRenderedAvailableBlocks] = useState([]);
  useEffect(() => {
    getUserCanParticipateInElections(sessionStorage.getItem("user_id"),
        {Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`}).then(res => {
      let av1 = res.data._embedded.elections.filter(item => item.startDate < '2024-05-28T22:43:46');
      available = av1.map((item) => {
        return ({name: item.title, buttonType: 'vote', startDate: item.startDate, electionId: item.id})
      });
      setRenderedAvailableBlocks(available);
    }).catch((error) => {
    });

  }, []);
  let renderedAvailableBlocks1 = renderedAvailableBlocks.map(item =>
      <Block name={item.name} buttonType={item.buttonType} endDate={item.endDate} electionId={item.electionId}
             key={renderedAvailableBlocks.indexOf(item)}></Block>);
  return(
      <div>
        <Header/>
        <div className="Home">
          <h1 className="available">Доступні для вас голосування:</h1>
          {available.length === 0 ? <div className="no-available">Зараз немає доступних для вас голосувань.</div> :
              <div className="available-blocks">{renderedAvailableBlocks1}</div>}
        </div>
      </div>
  )
}