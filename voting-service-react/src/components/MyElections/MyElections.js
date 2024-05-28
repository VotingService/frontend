import "./MyElections.css"
import AdminPanel from "../AdminPanel/AdminPanel";
import Blocks from "../Home/Blocks/Blocks";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function MyElections(){
    const  navigate = useNavigate()
    const [sortBy, setSortBy] = useState({sortBy: ''});
    const [searchValue, setSearchValue] = useState({searchValue: ''});
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
    })
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
                <Blocks blocks={myElections} sortBy={sortBy} searchValue={searchValue}></Blocks>
            </div>
        </div>
    )
}