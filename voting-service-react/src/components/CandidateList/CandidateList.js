import "./CandidateList.css"

export default function CandidateList(){
    let candidates = [{name: 'Зеленський Володимир Олександрович'},
        {name: 'Зеленський Володимир Олександрович'},
        {name: 'Зеленський Олександрович'},
        {name: 'Зеленський Володимир Олександрович'},
        {name: 'Зеленський Володимир Олександрович'},
        {name: 'Зеленський Володимир Олександрович'}
    ];
    let renderedCandidates = candidates.map(candidate =>
    <li>
        <div className="candidate-name">{candidate.name}</div>
        <a>Про кандидата</a>
        <button>Проголосувати</button>
        <hr />
    </li>)
    return(
        <div className="CandidateList">
            <h1>Список кандидатів для голосування</h1>
            <ul>
                {renderedCandidates}
            </ul>
        </div>
    )
}