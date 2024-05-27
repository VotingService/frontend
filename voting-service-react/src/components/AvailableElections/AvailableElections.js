import "./AvailableElections.css"
import Blocks from "../Home/Blocks/Blocks";

export default function AvailableElections() {
  let available = [
    {name: 'Вибори президента України', buttonType: 'vote'},
    {name: 'Доступне голосування2', buttonType: 'vote'},
    {name: 'Доступне голосування2', buttonType: 'vote'},
    {name: 'Доступне голосування2', buttonType: 'vote'},
    {name: 'Доступне голосування2', buttonType: 'vote'},
    {name: 'Доступне голосування2', buttonType: 'vote'}
];
  return(
    <div className="Home">
      <h1 className="available">Доступні для вас голосування:</h1>
      {available.length === 0 ? <div className="no-available">Зараз немає доступних для вас голосувань.</div> :
          <Blocks blocks={available} sortBy={"endDate"} className="available-blocks"></Blocks>}
    </div>
  )
}