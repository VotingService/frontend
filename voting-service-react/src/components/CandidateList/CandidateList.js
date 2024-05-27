import "./CandidateList.css"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CandidateList(){
    let candidates = [{id: 1, name: 'Зеленський Володимир Олександрович'},
        {id: 2, name: 'Зеленський Володимир Олександрович'},
        {id: 3, name: 'Зеленський Олександрович'},
        {id: 4, name: 'Зеленський Володимир Олександрович'},
        {id: 5, name: 'Зеленський Володимир Олександрович'},
        {id: 6, name: 'Зеленський Володимир Олександрович'}
    ];
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleVoteChange = (e) => {
        setSelectedCandidate(e.target.value);
    };

    const handleSubmit = () => {
        console.log('Selected Candidate ID:', selectedCandidate);
        // Add logic to submit the selected candidate vote to the server
    };
    return (
        <div className="vote-for-candidate-page">
            <h1 className="header">Голосування</h1>
            <h4>Щоб віддати голос, натисніть на кружечок навпроти імені вибраного кандидата</h4>
            <div className="candidate-list">
        {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate-item">
                <h3>{candidate.name}</h3>
                <div className="candidate-item__about-and-input">
                    <Link className="about" to={"/candidate"}>Про кандидата</Link>
                    <input
                    type="radio"
                    name="candidate"
                    value={candidate.id}
                    checked={selectedCandidate === candidate.id.toString()}
                    onChange={handleVoteChange}
                    />
                    <span className="custom-radio"></span>
                </div>
            </div>
        ))}
        </div>
        <button className="submit-button" onClick={handleSubmit} disabled={!selectedCandidate}>
            Проголосувати
        </button>
    </div>
    );
    
}