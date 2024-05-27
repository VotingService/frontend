import "./blocks.css"
import Block from "./Block";

export default function Blocks(props){
    let sortBy = props.sortBy.sortBy;
    let searchValue = props.searchValue ? props.searchValue.searchValue : null;
    let itemList = props.blocks;
    let foundItems = searchValue ? itemList.filter(item => item.name.search(searchValue) !== -1) : itemList;
    let sortedItems = [];
    if (sortBy === 'name'){
        sortedItems = foundItems.sort(function (a, b) {
            return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        })}
    else{
        sortedItems = foundItems;
    }
    if (sortBy === 'startDate'){
        sortedItems = foundItems.sort(function (a, b) {
            return a.startDate > b.startDate ? 1 : -1;
        })}
    else{
        sortedItems = foundItems;
    }
    if (sortBy === 'endDate'){
        sortedItems = foundItems.sort(function (a, b) {
            return a.endDate > b.endDate ? 1 : -1;
        })}
    else{
        sortedItems = foundItems;
    }
    if (sortBy === 'location'){
        sortedItems = foundItems.sort(function (a, b) {
            return a.location.toLowerCase() > b.location.toLowerCase() ? 1 : -1;
        })}
    else{
        sortedItems = foundItems;
    }
    let renderedBlocks = sortedItems.map(item =>
        <Block name={item.name} buttonType={item.buttonType} endDate={item.endDate}
               key={sortedItems.indexOf(item)}></Block>)
    return(
        <div className="available-blocks">
            {renderedBlocks}
        </div>
    )
}