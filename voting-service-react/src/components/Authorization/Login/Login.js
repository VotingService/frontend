import { HiOutlineMailOpen } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import "../Authorize.css"

function Login() {
    return (
        <div className='wrapper'>
            <form action=''>
                <h1>Авторизація</h1>
                <div className='input-box'>
                    <input type="email" placeholder='Електронна адреса' required/>
                    <HiOutlineMailOpen className="icon"/>
                </div>
                <div className='input-box'>
                    <input type="password" placeholder='Пароль' required/>
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Запам'ятати мене</label>
                    <a href="#">Забули пароль?</a>
                </div>

                <button type="submit">Увійти</button>

                <div className="register-link">
                    <p>Вперше тут? <a href="/register">Зареєструйтесь</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login;