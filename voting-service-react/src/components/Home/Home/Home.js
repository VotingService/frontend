import "./Home.css"
import Header from "../../Header/Header";
import {getUserCanParticipateInElections} from "../../../API/API";
import {useEffect, useState} from "react";
import Block from "../Blocks/Block";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
    const [renderedAvailableBlocks, setRenderedAvailableBlocks] = useState([]);
    const [renderedSoonBlocks, setRenderedSoonBlocks] = useState([]);
    useEffect(() => {
        getUserCanParticipateInElections(sessionStorage.getItem("user_id"),
            {Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`}).then(res => {
                let av1 = res.data._embedded.elections.filter(item => item.startDate < '2024-05-28T22:43:46');
            available = av1.map((item) => {
                return ({name: item.title, buttonType: 'vote', startDate: item.startDate, electionId: item.id})
            });
            setRenderedAvailableBlocks(available);
            let soon1 = [];
            soon1 = res.data._embedded.elections.filter(item => item.startDate > '2024-05-28T22:43:46').map((item) => {
                return ({name: item.title, buttonType: 'vote', startDate: item.startDate, electionId: item.id})
            });
            setRenderedSoonBlocks(soon1);
        }).catch((error) => {
        });

    }, []);
    let renderedAvailableBlocks1 = renderedAvailableBlocks.map(item =>
        <Block name={item.name} buttonType={item.buttonType} endDate={item.endDate} electionId={item.electionId}
               key={renderedAvailableBlocks.indexOf(item)}></Block>);
    let renderedSoonBlocks1 = renderedSoonBlocks.map(item =>
        <Block name={item.name} buttonType={''} endDate={item.endDate}
               key={renderedSoonBlocks.indexOf(item)}></Block>);

    const  navigate = useNavigate()
    let available = [
        // {name: 'Вибори президента України', buttonType: 'vote'},
        // {name: 'Доступне голосування2', buttonType: 'vote'},
        // {name: 'Доступне голосування2', buttonType: 'vote'},
        // {name: 'Доступне голосування2', buttonType: 'vote'},
        // {name: 'Доступне голосування2', buttonType: 'vote'},
        // {name: 'Доступне голосування2', buttonType: 'vote'}
    ];
    let soon = [
        // {name: 'Скоро голосування1', buttonType: 'soon'},
        // {name: 'Скоро голосування2', buttonType: 'soon'}
    ];
    useEffect(() => {
        if(sessionStorage.getItem("role") === 'ADMIN'){
            navigate("/home-admin")
        } else if (!sessionStorage.getItem("role")){
            navigate("/")
        }
    })
    return (
        <div>
            <Header/>
            <div className="Home">
                <h1 className="available">Доступні для вас голосування:</h1>
                {renderedAvailableBlocks1.length === 0 ?
                    <div className="no-available">Зараз немає доступних для вас голосувань.</div> :
                    <div className="available-blocks">{renderedAvailableBlocks1}</div>}
                <h1 className="soon">Скоро відбудуться:</h1>
                {renderedSoonBlocks1.length === 0 ?
                    <div className="no-available">Зараз немає доступних голосувань.</div> :
                    <div className="available-blocks">{renderedSoonBlocks1}</div>}
                <div className="bottom"></div>
            </div>
        </div>
    )
}
