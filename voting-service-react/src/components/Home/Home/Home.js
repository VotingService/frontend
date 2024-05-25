import Blocks from "../Blocks/Blocks";
import "./Home.css"

export default function Home(){
    let available = [
        {name: 'Вибори президента України', buttonType: 'vote'},
        {name: 'Доступне голосування2', buttonType: 'vote'},
        {name: 'Доступне голосування2', buttonType: 'vote'},
        {name: 'Доступне голосування2', buttonType: 'vote'},
        {name: 'Доступне голосування2', buttonType: 'vote'},
        {name: 'Доступне голосування2', buttonType: 'vote'}
    ];
    let soon = [
        {name: 'Скоро голосування1', buttonType: 'soon'},
        {name: 'Скоро голосування2', buttonType: 'soon'}
    ];
    let currently = [
        {name: 'Зараз голосування1', buttonType: 'currently'},
        {name: 'Зараз голосування2', buttonType: 'currently'}
    ];
    return(
        <div className="Home">
            <h1>Доступні для вас голосування:</h1>
            <Blocks blocks={available} className="available-blocks"></Blocks>
        </div>
    )
}
