import "./MyElections.css"
import AdminPanel from "../AdminPanel/AdminPanel";
import Blocks from "../Home/Blocks/Blocks";

export default function MyElections(){
    let myElections = [
        {name: 'Вибори президента України', buttonType: 'history', endDate: '01/01/2022'},
        {name: 'Історія голосування2', buttonType: 'history', endDate: '02/02/2023'},
        {name: 'Історія голосування2', buttonType: 'history', endDate: '02/02/2023'},
        {name: 'Історія голосування2', buttonType: 'history', endDate: '02/02/2023'},
        {name: 'Історія голосування2', buttonType: 'history', endDate: '02/02/2023'},
        {name: 'Історія голосування2', buttonType: 'history', endDate: '03/03/2024'}
    ];
    return(
        <div className="MyElections">
            <AdminPanel></AdminPanel>
            <div>
                <h1>Мої вибори</h1>
                <div className="sort">
                    <div className="sort-by">Сортувати за:</div>
                    <div className="sort-buttons">
                        <button>Назвою</button>
                        <button>Датою початку</button>
                        <button>Датою кінця</button>
                        <button>Локацією</button>
                    </div>
                </div>
                <div>
                    <input type="text" placeholder="Пошук.."/>
                    <button className="search-button">Пошук</button>
                </div>
                <Blocks blocks={myElections}></Blocks>
            </div>
        </div>
    )
}