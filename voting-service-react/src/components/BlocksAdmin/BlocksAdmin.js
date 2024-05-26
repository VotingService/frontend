import "./BlockAdmin.css"
import BlockAdmin from "./BlockAdmin";

export default function BlocksAdmin(){
    let blocks = [
        {name: "Створюйте вибори всього в декілька кліків", buttonType: "Створити нові вибори"},
        {name: "Надавайте та позбавляйте прав користувачів балатуватись на вибори",
        buttonType: "Редагування кандидатів"},
        {name: "З легкістю переглядайте та редагуйте вибори", buttonType: "Мої вибори"}
    ];
    let renderedBlocks = blocks.map(item =>
        <BlockAdmin name={item.name} buttonType={item.buttonType}
               key={blocks.indexOf(item)}></BlockAdmin>)
    return(
        <div className="BlocksAdmin">
            {renderedBlocks}
        </div>
    )
}