import { HiOutlineMailOpen } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../Authorize.css"

function Register(){
    return(
        <div className='wrapper'>
            <form action=''>
                <h1>Реєстрація</h1>
                <p className="input-description">Особисті дані</p>
                <div className='input-box'>
                    <input type="text" placeholder="Ваше ім'я (як у паспорті)" required/>
                    <SiGoogledocs className="icon"/>
                </div>
                <div className='input-box'>
                    <input type="text" placeholder="Ваше прізвище (як у паспорті)" required/>
                    <SiGoogledocs className="icon"/>
                </div>
                <div className='input-box'>
                    <input type="text" placeholder="По-батькові (як у паспорті)" required/>
                    <SiGoogledocs className="icon"/>
                </div>
                <p className="input-description">Дата народження</p>
                <div className='input-box'>
                    <input type="date"/>
                    {/* <MdDateRange className="icon"/> */}
                </div>
                <div className='input-box'>
                    <input type="text" placeholder='Адреса прописки' required/>
                    <FaLocationDot className="icon"/>
                </div>
                <div className='input-box'>
                    <input type="email" placeholder='Електронна адреса' required/>
                    <HiOutlineMailOpen className="icon"/>
                </div>
                <div className='input-box'>
                    <input type="password" placeholder='Пароль' required/>
                    <FaLock className="icon"/>
                </div>
                <div className='input-box'>
                    <input type="password" placeholder='Повторіть пароль' required/>
                    <FaLock className="icon"/>
                </div>

                <Link className="enter-button" to={"home"} type="submit">Зареєструватись</Link>

                <div className="register-link">
                    <p>Уже зареєстровані? <a href="/">Вхід</a></p>
                </div>
            </form>

        </div>
    )
}

export default Register;