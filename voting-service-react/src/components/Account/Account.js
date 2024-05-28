import "./Account.css"
import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import { getUserData, updateUserData, changePassword, login } from "../../API/API";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../AdminPanel/AdminPanel";

function Account() {
  const navigate = useNavigate()
  const [location, setLocation] = useState({
    "city": "",
    "country": ""
  })
  const [user, setUser] = useState({
    "birthDate": "",
    "email": "",
    "firstName": "",
    "id": 0,
    "byFather": "",
    "lastName": "",
    "location": location,
    "password": ""});

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmationPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleChangeLocation = (e) => {
    const {name, value} = e.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(
      user, 
      {"Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`}
    ).then((res) => {
      alert("Інформація успішно оновлена")
    }).catch((err) => {
      console.log(err)
    })
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmationPassword) {
      alert('Новий пароль та повторний пароль не збігаються!');
      return;
    }
    changePassword(password, {"Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`})
    .then((res) => {
      alert("Пароль успішно змінено!")
      setPassword({currentPassword: '',
      newPassword: '',
      confirmationPassword: '',})
      login({"email": user.email, "password": password.newPassword})
      .then((res) => {
        sessionStorage.removeItem("auth_token")
        sessionStorage.setItem("auth_token", res.data.access_token)
        console.log("token changed")
      })
    }).catch((err) => {
      console.log(err)
    })
  };

  useEffect(() => {
    if (!sessionStorage.getItem("role")){
      navigate("/")
    } else {
      getUserData(sessionStorage.getItem("user_id"),
        {"Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`}
      ).then((res) => {
        setUser(res.data)
        setLocation(res.data.location)
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }
    
  },[])

  return (
      <div style={(sessionStorage.getItem("role") === 'ADMIN') ? {display: "flex"} : {}}>
        {sessionStorage.getItem("role") === 'USER' ? <Header/> : <AdminPanel/>}
        <div className="account-page" style={(sessionStorage.getItem("role") === 'ADMIN') ? {marginTop: 0, display: "flex", flexDirection: "column"} : {}}>
          <h1 className="title">Особистий кабінет</h1>
          <div className="account-page__forms">
          <form className="account-form" onSubmit={handleSubmit}>
            <label>
              Прізвище:
              <input type="text" name="lastName" value={user.lastName} onChange={handleChange}/>
            </label>
            <label>
              Ім'я:
              <input type="text" name="firstName" value={user.firstName} onChange={handleChange}/>
            </label>
            <label>
              По-батькові:
              <input type="text" name="secondName" value={user.byFather} onChange={handleChange}/>
            </label>
            <label>
              Країна:
              <input type="text" name="country" value={location.country} onChange={handleChangeLocation}/>
            </label>
            <label>
              Місто:
              <input type="text" name="country" value={location.city} onChange={handleChangeLocation}/>
            </label>
            <label>
              Електронна адреса:
              <input type="email" name="email" value={user.email} onChange={handleChange} disabled/>
            </label>
            <label>
              Дата народження:
              <input type="date" name="birthDate" value={user.birthDate} onChange={handleChange}/>
            </label>
            <button type="submit">Зберегти зміни</button>
          </form>

          <form className="password-form" onSubmit={handlePasswordSubmit}>
            <label>
              Ваш пароль:
              <input type="password" name="currentPassword" value={password.currentPassword}
                onChange={handlePasswordChange}/>
            </label>
            <label>
              Новий пароль:
              <input type="password" name="newPassword" value={password.newPassword} onChange={handlePasswordChange}/>
            </label>
            <label>
              Повторіть новий пароль:
              <input type="password" name="confirmationPassword" value={password.confirmationPassword}
                     onChange={handlePasswordChange}/>
            </label>
            <button type="submit">Змінити пароль</button>
          </form>
          </div>
        </div>
      </div>

  );
}

export default Account;