import "./CandidateList.css"

import {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import {getAllCandidatesByElectionId, getElectionById, vote} from "../../API/API";

const ELECTION_TYPE_SINGLE = 'single';
const ELECTION_TYPE_MULTIPLE = 'multiple';
const ELECTION_TYPE_POINTS = 'points';
const totalPoints = 100;


export default function CandidateList(props) {
    const location = useLocation()
    const {electionId} = location.state;
    const [election, setElection] = useState({});
    useEffect(() => {
        getElectionById({Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`}, electionId).then(res => {
                setElection(res.data);
                switch (res.data.votingStrategy) {
                    case 'PluralityVoting':
                        setElectionType(ELECTION_TYPE_SINGLE);
                        break;
                    case 'DistributionVoting':
                        setElectionType(ELECTION_TYPE_POINTS);
                        break;
                    case 'ApprovalVoting':
                        setElectionType(ELECTION_TYPE_MULTIPLE);
                        break;
                    default:
                        break;
                }
            }
        ).catch(error => {
        });
        console.log(electionId);
        getAllCandidatesByElectionId(electionId,
            {Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`}).then(res => {
            let candidates1 = [];
            candidates1 = res.data.map(element => {
                return ({
                    id: element.id, name: `${element.firstName} ` + `${element.lastName} ` +
                        `${element.byFather}`
                })
            });
            setCandidates(candidates1);
        })

    }, []);
    const navigate = useNavigate()
    const [candidates, setCandidates] = useState([]);

    // let candidates = [{id: 1, name: 'Зеленський Володимир Олександрович'},
    //     {id: 2, name: 'Зеленський Володимир Олександрович'},
    //     {id: 3, name: 'Зеленський Олександрович'},
    //     {id: 4, name: 'Зеленський Володимир Олександрович'},
    //     {id: 5, name: 'Зеленський Володимир Олександрович'},
    //     {id: 6, name: 'Зеленський Володимир Олександрович'}
    // ];
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [pointsDistributionJson, setPointsDistributionJson] = useState([]);
    const [pointsDistribution, setPointsDistribution] = useState(
        candidates.reduce((acc, candidate) => {
            acc[candidate.id] = 0;
            return acc;
        }, {})
    );
    const [electionType, setElectionType] = useState('');
    useEffect(() => {
        if (electionType !== ELECTION_TYPE_SINGLE) {
            let pointKeys = Object.keys(selectedCandidates);
            if (pointKeys) {
                let candidateSelect = pointKeys.map(item => {
                    return ({
                        "election_id": electionId,
                        "voter_id": sessionStorage.getItem("user_id"),
                        "candidate_id": selectedCandidates[item],
                        "candidate_point": 1
                    })
                })
                setPointsDistributionJson(candidateSelect);
            }
        }
    }, [selectedCandidates]);
    const handleVoteChange = (id) => {
        if (electionType === ELECTION_TYPE_SINGLE) {
            setSelectedCandidates([id]);
            setPointsDistributionJson([{
                "election_id": electionId,
                "voter_id": sessionStorage.getItem("user_id"),
                "candidate_id": id,
                "candidate_point": 1
            }]);
            console.log(selectedCandidates);
            console.log(pointsDistributionJson);
        } else {
            setSelectedCandidates((prevSelected) =>
                prevSelected.includes(id)
                    ? prevSelected.filter((candidateId) => candidateId !== id)
                    : [...prevSelected, id]
            );
        }
    }

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
            console.log('Points Distribution:', pointsDistributionJson);
        } else {
            console.log('Selected Candidates IDs:', selectedCandidates);
        }
        vote({Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`}, {
            "election_id": electionId,
            "voter_id": sessionStorage.getItem("user_id"),
            "ballot_entries": pointsDistributionJson
        }).then(res => {
            console.log(res);
        })
        navigate("/voting-success");
    };

    const remainingPoints = totalPoints - Object.values(pointsDistribution).reduce((a, b) => a + b, 0);

    useEffect(() => {
        if (!sessionStorage.getItem("role")) {
            navigate("/")
        }
    })
    useEffect(() => {
        let pointKeys = Object.keys(pointsDistribution);
        if (pointKeys) {
            let candidatePoints = pointKeys.map(item => {
                return ({
                    "election_id": electionId,
                    "voter_id": sessionStorage.getItem("user_id"),
                    "candidate_id": item,
                    "candidate_point": pointsDistribution[item]
                })
            })
            setPointsDistributionJson(candidatePoints);
        }
    }, [pointsDistribution]);
    return (<div>
            <Header/>
            <>
                {electionType === ELECTION_TYPE_POINTS ? (
                    <h2 className="remaining-points">Залишилось голосів: <br/> {remainingPoints}</h2>) : null}
                <div className="vote-for-candidate-page">
                    <h1 className="header">Голосування</h1>
                    <h4>Щоб віддати голос, 
                        {electionType === ELECTION_TYPE_POINTS ? " впишіть кількість голосів у квадратик " : electionType === ELECTION_TYPE_SINGLE ? " натисніть на кружечок" : " натисніть на квадратик"} навпроти
                        імені вибраного кандидата
                    </h4>

                    <div className="candidate-list">
                        {candidates.map((candidate) => (
                            <div key={candidate.id} className="candidate-item">
                                <h3>{candidate.name}</h3>
                                <div className="candidate-item__about-and-input">
                                    <Link className="about" to={"/candidate"} state={{candidate: candidate}}>
                                        Про кандидата</Link>
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
        </div>
    );

}