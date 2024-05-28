import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom"
import Login from './components/Authorization/Login/Login'
import Register from './components/Authorization/Register/Register'
import Header from './components/Header/Header';
import Home from './components/Home/Home/Home';
import Election from './components/Election/Election';
import About from './components/About/About'
import Account from './components/Account/Account';
import History from "./components/History/History";
import Candidate from "./components/Candidate/Candidate";
import SettingElectionProps from './components/CreateNewElection/SettingElectionProps/SettingElectionProps';
import HomeAdmin from "./components/HomeAdmin/HomeAdmin";
import MyElections from "./components/MyElections/MyElections";
import AssigningCandidates from './components/CreateNewElection/AssigningCandidates/AssigningCandidates';
import ElectionSuccess from './components/CreateNewElection/ElectionSuccess/ElectionSuccess';
import CandidateList from "./components/CandidateList/CandidateList";
import EditCandidates from './components/EditCandidates/EditCandidates';
import AvailableElections from './components/AvailableElections/AvailableElections';
import VotingSuccess from './components/VotingSuccess/VotingSuccess';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                {sessionStorage.getItem("auth_token") != null ? 
                <>
                <Route path="/home" element={<Home/>}/>
                <Route path="/history" element={<History/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/available-elections" element={<AvailableElections/>}/>
                <Route path="/voting-success" element={<VotingSuccess/>}/>
                <Route path="/set-elect-props" element={<SettingElectionProps/>}/>
                <Route path="/home-admin" element={<HomeAdmin/>}/>
                <Route path="/myelections-admin" element={<MyElections/>}/>
                <Route path="/add-candidates" element={<AssigningCandidates/>}/>
                <Route path="/election-success" element={<ElectionSuccess/>}/>
                <Route path="/edit-candidates" element={<EditCandidates/>}/>
                <Route path="/election" element={<Election/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/candidate" element={<Candidate/>}/>
                <Route path="/candidatelist" element={<CandidateList/>}/>
                </> : null}
            </Routes>
        </Router>
    );
}

export default App;
