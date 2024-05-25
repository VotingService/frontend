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

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default App;
