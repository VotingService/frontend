import "./Candidate.css"
import Header from "../Header/Header";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import AdminPanel from "../AdminPanel/AdminPanel";

export default function Candidate() {
    const location = useLocation();
    const state = location.state;
    useEffect(() => {
        console.log(state.candidate)
    })
    
    return (
        <div style={sessionStorage.getItem("role") === 'ADMIN' && {display: 'flex'}}>
            <Header/>
            {sessionStorage.getItem("role") === 'ADMIN' && <AdminPanel/>}
            <div className="Candidate" style={sessionStorage.getItem("role") === 'ADMIN' && {display: 'flex', flexDirection: 'column', margin: '0 auto'}}>
                <h1>Про кандидата</h1>
                <div className="candidate-container">
                    <img alt="winner-icon" src={state.candidate.photoUrl}/>
                    <div className="about-candidate">
                        <h2>{state.candidate.lastName} {state.candidate.firstName} {state.candidate.byFather}</h2>
                        <div className="candidate-description" style={sessionStorage.getItem("role") === 'ADMIN' && {maxWidth: '400px', marginLeft: '30px'}}>{state.candidate.description}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}