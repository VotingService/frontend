import "./blocks.css"
import Block from "./Block";

export default function Blocks(props){
    let blocks = props.blocks;
    let renderedBlocks = blocks.map(item =>
        <Block name={item.name} buttonType={item.buttonType}
               key={blocks.indexOf(item)}></Block>)
    return(
        <div className="available-blocks">
            {renderedBlocks}
        </div>
    )
}