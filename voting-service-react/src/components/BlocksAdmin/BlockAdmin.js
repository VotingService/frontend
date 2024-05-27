import { Link } from "react-router-dom"
import "./BlockAdmin.css"

export default function BlockAdmin(props){
    return(
        <div className="BlockAdmin">
            <div className="block-name">{props.name}</div>
            <Link to={props.buttonType === "Створити нові вибори" ? "/set-elect-props" : 
                props.buttonType === "Редагування кандидатів" ? "#" : "/myelections-admin"} 
                className="block-button">
                    {props.buttonType}
            </Link>
        </div>
    )
}