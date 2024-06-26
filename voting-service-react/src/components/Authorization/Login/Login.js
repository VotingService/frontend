import {HiOutlineMailOpen} from "react-icons/hi";
import {FaLock} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import "../Authorize.css"
import {useState, useEffect} from "react";
import {login} from "../../../API/API";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const onSubmit = (event) => {
        event.preventDefault();
        let body = {email: email, password: password};
        login(body).then(res => {
            sessionStorage.setItem("auth_token", res.data.access_token);
            sessionStorage.setItem("user_id", res.data.id);
            sessionStorage.setItem("role", res.data.role);
            if (sessionStorage.getItem("auth_token")) {
                if(sessionStorage.getItem("role") === 'USER'){
                    navigate("/home");
                }
                else if (sessionStorage.getItem("role") === 'ADMIN'){
                    navigate("/home-admin");
                }
            }
        }).catch((error) => {
                alert('Помилка! Неправильний пароль або електронна адреса.');
            }
        );
    };
    useEffect(() => {
        sessionStorage.clear()
    })
    return (
        <div className='wrapper'>
            <form action='' onSubmit={onSubmit}>
                <h1>Авторизація</h1>
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
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Запам'ятати мене</label>
                    <a href="#">Забули пароль?</a>
                </div>
                <button className="enter-button" type="submit">Увійти</button>
                <div className="register-link">
                    <p>Вперше тут? <a href="/register">Зареєструйтесь</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login;