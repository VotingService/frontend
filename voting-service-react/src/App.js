import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom"
import Login from './components/Authorization/Login/Login'
import Register from './components/Authorization/Register/Register'
import Header from './components/Header/Header';
import Election from './components/Election/Election';
import About from './components/About/About'

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/election" element={<Election/>}/>
                <Route path="about" element={<About/>}/>
            </Routes>
        </Router>
    );
}

export default App;
