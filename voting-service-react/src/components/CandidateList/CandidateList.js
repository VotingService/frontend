import "./CandidateList.css"

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ELECTION_TYPE_SINGLE = 'single';
const ELECTION_TYPE_MULTIPLE = 'multiple';
const ELECTION_TYPE_POINTS = 'points';
const totalPoints = 100;


export default function CandidateList(){
    const navigate = useNavigate();
    let candidates = [{id: 1, name: 'Зеленський Володимир Олександрович'},
        {id: 2, name: 'Зеленський Володимир Олександрович'},
        {id: 3, name: 'Зеленський Олександрович'},
        {id: 4, name: 'Зеленський Володимир Олександрович'},
        {id: 5, name: 'Зеленський Володимир Олександрович'},
        {id: 6, name: 'Зеленський Володимир Олександрович'}
    ];
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [pointsDistribution, setPointsDistribution] = useState(
        candidates.reduce((acc, candidate) => {
            acc[candidate.id] = 0;
            return acc;
            }, {})
        );
    const [electionType, setElectionType] = useState('points');

    const handleVoteChange = (id) => {
        if (electionType === ELECTION_TYPE_SINGLE) {
            setSelectedCandidates([id]);
        } else {
            setSelectedCandidates((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((candidateId) => candidateId !== id)
                : [...prevSelected, id]
            );
        }}
    
    const handlePointsChange = (id, value) => {
        const points = value === '' ? 0 : Number(value);
    const remainingPoints = totalPoints - Object.values(pointsDistribution).reduce((a, b) => a + (b || 0), 0) + (pointsDistribution[id] || 0);

    if (points > remainingPoints) {
        setPointsDistribution((prevPoints) => ({
            ...prevPoints,
            [id]: remainingPoints,
        }));
    } else {
        setPointsDistribution((prevPoints) => ({
            ...prevPoints,
            [id]: points,
        }));
    }
        };

    const handleSubmit = () => {
        if (electionType === ELECTION_TYPE_POINTS) {
            console.log('Points Distribution:', pointsDistribution);
        } else {
            console.log('Selected Candidates IDs:', selectedCandidates);
        }
        navigate("/voting-success");
    };

    const remainingPoints = totalPoints - Object.values(pointsDistribution).reduce((a, b) => a + b, 0);


    return (<>
        {electionType === ELECTION_TYPE_POINTS ? (<h2 className="remaining-points">Залишилось голосів: <br/> {remainingPoints}</h2>) : null}
        <div className="vote-for-candidate-page">
            <h1 className="header">Голосування</h1>
            <h4>Щоб віддати голос, 
                {electionType == ELECTION_TYPE_POINTS ? " впишіть кількість голосів у квадратик " : electionType === ELECTION_TYPE_SINGLE ? "натисніть на кружечок" : "квадратик"} навпроти імені вибраного кандидата
            </h4>
            
            <div className="candidate-list">
        {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate-item">
                <h3>{candidate.name}</h3>
                <div className="candidate-item__about-and-input">
                    <Link className="about" to={"/candidate"}>Про кандидата</Link>
                    {electionType === ELECTION_TYPE_SINGLE ? 
                        (<input
                        type="radio"
                        name="candidate"
                        value={candidate.id}
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => handleVoteChange(candidate.id)}
                        />
                        ) : electionType === ELECTION_TYPE_MULTIPLE ? (
                            <input
                            type="checkbox"
                            name="candidate"
                            value={candidate.id}
                            checked={selectedCandidates.includes(candidate.id)}
                            onChange={() => handleVoteChange(candidate.id)}
                            />
                        ) : (
                            <input
                            className="point-input"
                            type="number"
                            name="candidate"
                            min="0"
                            max={remainingPoints + (pointsDistribution[candidate.id] || 0)}
                            value={pointsDistribution[candidate.id]}
                            onChange={(e) => handlePointsChange(candidate.id, e.target.value)}
                            />
                        )}
                </div>
            </div>
        ))}
        </div>
        <button className="submit-button" onClick={handleSubmit} disabled={
        electionType === ELECTION_TYPE_POINTS 
        ? remainingPoints < 0 || remainingPoints === totalPoints
        : selectedCandidates.length === 0
        }>
            Проголосувати
        </button>
    </div>
    </>
    );
    
}