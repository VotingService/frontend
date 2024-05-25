import Blocks from "../Blocks/Blocks";
import "./Home.css"

export default function Home() {
    let available = [
        {name: 'Вибори президента України', buttonType: 'vote'},
        {name: 'Доступне голосування2', buttonType: 'vote'},
        {name: 'Доступне голосування2', buttonType: 'vote'},
        // {name: 'Доступне голосування2', buttonType: 'vote'},
        // {name: 'Доступне голосування2', buttonType: 'vote'},
        // {name: 'Доступне голосування2', buttonType: 'vote'}
    ];
    let soon = [
        {name: 'Скоро голосування1', buttonType: 'soon'},
        {name: 'Скоро голосування2', buttonType: 'soon'}
    ];
    let currently = [
        {name: 'Зараз голосування1', buttonType: 'currently'},
        {name: 'Зараз голосування2', buttonType: 'currently'}
    ];
    return (
        <div className="Home">
            <h1 className="available">Доступні для вас голосування:</h1>
            {available.length === 0 ? <div className="no-available">Зараз немає доступних для вас голосувань.</div> :
                <Blocks blocks={available} className="available-blocks"></Blocks>}
            <h1 className="soon">Скоро відбудуться:</h1>
            {soon.length === 0 ? <div className="no-available">Зараз немає доступних голосувань.</div> :
                <Blocks blocks={soon} className="available-blocks"></Blocks>}
            <h1 className="soon">Відбуваються зараз:</h1>
            {soon.length === 0 ? <div className="no-available">Зараз немає доступних голосувань.</div> :
                <Blocks blocks={currently} className="available-blocks"></Blocks>}
            <div className="bottom"></div>
        </div>
    )
}
