import "./CandidateList.css"
import AbstractModalHeader from "react-bootstrap/AbstractModalHeader";
import Header from "../Header/Header";

export default function CandidateList(){
    let candidates = [{name: 'Зеленський Володимир Олександрович'},
        {name: 'Зеленський Володимир Олександрович'},
        {name: 'Зеленський Олександрович'},
        {name: 'Зеленський Володимир Олександрович'},
        {name: 'Зеленський Володимир Олександрович'},
        {name: 'Зеленський Володимир Олександрович'}
    ];
    let renderedCandidates = candidates.map(candidate =>
        <div>
            <li>
                <div className="candidate-name">{candidate.name}</div>
                <a>Про кандидата</a>
                <button>Проголосувати</button>
            </li>
            <hr/>
        </div>)
    return (
        <div className="CandidateList">
            <h1>Список кандидатів для голосування</h1>
            <ul>
                {renderedCandidates}
            </ul>
            <div className="bottom"></div>
        </div>
    )
}