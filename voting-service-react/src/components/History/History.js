import "./History.css"
import Blocks from "../Home/Blocks/Blocks";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { getAllBallotsByUser } from "../../API/API";

export default function History() {
    const [ballots, setBallots] = useState([])
    let history = [
        {name: 'Вибори президента України', buttonType: 'history', endDate: '01/01/2022'},
        {name: 'Історія голосування2', buttonType: 'history', endDate: '02/02/2023'},
        {name: 'Історія голосування2', buttonType: 'history', endDate: '03/03/2024'}
    ];
    useEffect(() => {
        getAllBallotsByUser({"Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`},
        sessionStorage.getItem("user_id"))
        .then((res) => {
            setBallots(res.data._embedded.ballots)
            console.log(res.data._embedded.ballots)
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