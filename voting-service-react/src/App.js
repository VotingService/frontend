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
import CandidateList from "./components/CandidateList/CandidateList";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/election" element={<Election/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/history" element={<History/>}/>
                <Route path="/candidate" element={<Candidate/>}/>
                <Route path="/set-elect-props" element={<SettingElectionProps/>}/>
                <Route path="/home-admin" element={<HomeAdmin/>}/>
                <Route path="/myelections-admin" element={<MyElections/>}/>
                <Route path="/candidatelist" element={<CandidateList/>}/>
            </Routes>
        </Router>
    );
}

export default App;
