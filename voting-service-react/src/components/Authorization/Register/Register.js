import { HiOutlineMailOpen } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../Authorize.css"
import {useState} from "react";
import {register} from "../../../API/API";
import {useNavigate} from "react-router-dom";

function Register(){
    sessionStorage.clear();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [byFather, setByFather] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const onSubmit = (event) => {
        event.preventDefault();
        let body = {firstName: name, lastName: surname,
            birthDate: birthDate, location: {
                "country": "Ukraine",
                "city": "Kyiv"
            }, email: email, password: password, role: 'USER'};
        register(body).then(res => {
            sessionStorage.setItem("auth_token", res.data.access_token);
            if (res.data.access_token){
                navigate("/home");
            }
        }).catch((error) => {
            switch (error.response.status) {
                case 403:
                    alert('Помилка! Спробуйте знову.');
                    break;
                default:
                    break
            }
        });
    };
    return(
        <div className='wrapper'>
            <form action='' onSubmit={onSubmit}>
                <h1>Реєстрація</h1>
                <p className="input-description">Особисті дані</p>
                <div className='input-box'>
                    <input type="text" placeholder="Ваше ім'я (як у паспорті)" required
                           onChange={(e) => setName(e.target.value)}/>
                    <SiGoogledocs className="icon"/>
                </div>
                <div className='input-box'>
                    <input type="text" placeholder="Ваше прізвище (як у паспорті)" required
                           onChange={(e) => setSurname(e.target.value)}/>
                    <SiGoogledocs className="icon"/>
                </div>
                <div className='input-box'>
                    <input type="text" placeholder="По-батькові (як у паспорті)" required
                           onChange={(e) => setByFather(e.target.value)}/>
                    <SiGoogledocs className="icon"/>
                </div>
                <p className="input-description">Дата народження</p>
                <div className='input-box'>
                    <input type="date"
                           onChange={(e) => setBirthDate(e.target.value)}/>
                    {/* <MdDateRange className="icon"/> */}
                </div>
                <div className='input-box'>
                    <input type="text" placeholder='Адреса прописки' required
                           onChange={(e) => setAddress(e.target.value)}/>
                    <FaLocationDot className="icon"/>
                </div>
                <div className='input-box'>
                    <input type="email" placeholder='Електронна адреса' required
                           onChange={(e) => setEmail(e.target.value)}/>
                    <HiOutlineMailOpen className="icon"/>
                </div>
                <div className='input-box'>
                    <input type="password" placeholder='Пароль' required
                           onChange={(e) => setPassword(e.target.value)}/>
                    <FaLock className="icon"/>
                </div>
                <div className='input-box'>
                    <input type="password" placeholder='Повторіть пароль'/>
                    <FaLock className="icon"/>
                </div>

                <button className="enter-button" type="submit">Зареєструватись</button>

                <div className="register-link">
                    <p>Уже зареєстровані? <a href="/">Вхід</a></p>
                </div>
            </form>

        </div>
    )
}

export default Register;