import "./blocks.css"

export default function Blocks(props){
    return(
        <div className="block">
            <div className="block-name">{props.name}</div>
            {props.buttonType === 'vote' ? <button>Голосувати/змінити голос</button>
                : <button>Докладніше</button>}
        </div>
    )
}