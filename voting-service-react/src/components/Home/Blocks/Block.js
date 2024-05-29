import { Link } from "react-router-dom"
import "./blocks.css"

export default function Block(props){
    return(
        <div className="block">
            <div className="block-name">{props.name}</div>
            {props.endDate && <div className="end-date">Дата завершення: {props.endDate}</div>}
            {props.buttonType &&
                <Link to={props.buttonType === 'vote' ? "/candidatelist" : "/election"} className="block-button"
                state={{electionId: props.electionId}}>
                    {props.buttonType === 'vote' ? "Голосувати/змінити голос" : "Докладніше"}
                </Link>}
        </div>
    )
}