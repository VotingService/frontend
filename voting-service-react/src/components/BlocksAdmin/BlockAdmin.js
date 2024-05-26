import "./BlockAdmin.css"

export default function BlockAdmin(props){
    return(
        <div className="BlockAdmin">
            <div className="block-name">{props.name}</div>
            <button>{props.buttonType}</button>
        </div>
    )
}