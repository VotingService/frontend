import "./Candidate.css"
import Header from "../Header/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Candidate() {
    const navigate = useNavigate()
    let candidate =
        {
            "name": "Володимир Зеленський Олександрович",
            "image_uri": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Volodymyr_Zelensky_Official_portr" +
                "ait.jpg/250px-Volodymyr_Zelensky_Official_portrait.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " +
                "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco " +
                "laboris nisi ut aliquip ex ea commodo consequat. Zеленський парашенка"
        };
    useEffect(() => {
        if (!sessionStorage.getItem("role")){
            navigate("/")
        }
    })
    return (
        <div>
            <Header/>
            <div className="Candidate">
                <h1>Про кандидата</h1>
                <div className="candidate-container">
                    <img alt="winner-icon" src={candidate.image_uri}/>
                    <div className="about-candidate">
                        <h2>{candidate.name}</h2>
                        <div className="candidate-description">{candidate.description}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}