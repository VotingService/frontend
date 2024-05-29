import "./MyElections.css"
import AdminPanel from "../AdminPanel/AdminPanel";
import Blocks from "../Home/Blocks/Blocks";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getAllElections } from "../../API/API";

export default function MyElections(){
    const  navigate = useNavigate()
    const [sortBy, setSortBy] = useState({sortBy: ''});
    const [searchValue, setSearchValue] = useState({searchValue: ''});
    const [elections, setElections] = useState([]);
    let myElections = [
        {name: 'Вибори президента України', buttonType: 'history', endDate: '01/01/2022'},
        {name: 'Історія голосування2', buttonType: 'history', endDate: '02/02/2023'},
        {name: 'Історія голосування2', buttonType: 'history', endDate: '02/02/2023'},
    ];
    useEffect(() => {
        if(sessionStorage.getItem("role") === 'USER'){
            navigate("/home")
        } else if (!sessionStorage.getItem("role")){
            navigate("/")
        }
        getAllElections({"Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`})
        .then((res) => {
            setElections(res.data._embedded.elections
                .sort((a, b) => b.id - a.id)
                .slice(0, 4)
                .map(obj => ({
                ...obj,
                startDate: obj.startDate.split('T')[0],
                endDate: obj.endDate.split('T')[0],
                name: obj.title,
                buttonType: 'history' // Add any new key-value pair you need here
            })))
            // rename title to name
            // setElections(elections.map(obj => {
            //     const {title, ...rest} = obj;
            //     return {...rest, name: title};
            // }))
            // add buttonType parameter to each object
            // setElections(elections.map(obj => {
            //     return {...obj, buttonType: 'history'}
            // }))
            console.log(res.data._embedded.elections)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])  
    return(
        <div className="MyElections">
            <AdminPanel></AdminPanel>
            <div>
                <h1>Мої вибори</h1>
                <div className="sort">
                    <div className="sort-by">Сортувати за:</div>
                    <div className="sort-buttons">
                        <button onClick={() => setSortBy({ sortBy: 'name'})}>Назвою</button>
                        <button onClick={() => setSortBy({ sortBy: 'startDate'})}>Датою початку</button>
                        <button onClick={() => setSortBy({ sortBy: 'endDate'})}>Датою кінця</button>
                        <button onClick={() => setSortBy({ sortBy: 'location'})}>Локацією</button>
                    </div>
                </div>
                <div>
                    <input type="text" placeholder="Пошук.." onChange=
                        {(value) => setSearchValue(
                            {searchValue: value.target.value})}/>
                    <button className="search-button">Пошук</button>
                </div>
                <Blocks blocks={elections} sortBy={sortBy} searchValue={searchValue}></Blocks>
            </div>
        </div>
    )
}