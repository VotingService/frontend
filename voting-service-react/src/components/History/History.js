import "./History.css"
import Blocks from "../Home/Blocks/Blocks";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { getElectionsByUserId } from "../../API/API";

export default function History() {
    const [ballots, setBallots] = useState([])
    const [history, setHistory] = useState([])
    useEffect(() => {
        getElectionsByUserId({"Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`},
        sessionStorage.getItem("user_id"))
        .then((res) => {
            setHistory(res.data._embedded.elections
                .map(obj => ({
                    ...obj,
                    startDate: obj.startDate.split('T')[0],
                    endDate: obj.endDate.split('T')[0],
                    name: obj.title,
                    buttonType: 'history'
                })))
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    return(
        <div>
            <Header/>
            <div className="History">
                <h1>Ваша історія голосувань:</h1>
                {history.length === 0 ? <div className="no-available">Ви не брали участь у голосуваннях раніше.</div> :
                    <Blocks blocks={history} sortBy={"endDate"} className="history-blocks"></Blocks>}
                <div className="bottom"></div>
            </div>
        </div>
    )
}