import "./Account.css"
import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import { getUserData } from "../../API/API";

function Account() {
  const [user, setUser] = useState({});

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to update user information
    console.log('User updated:', user);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    // Logic to update password
    console.log('Password updated:', password);
  };

  useEffect(() => {
    getUserData(1,
      {"Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`}
    ).then((res) => {
      setUser(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
      <div>
        <Header/>
        <div className="account-page">
          <h1 className="title">Особистий кабінет</h1>
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
              <input type="text" name="secondName" value={user.secondName} onChange={handleChange}/>
            </label>
            <label>
              Країна:
              <input type="text" name="country" value={user.location.country} onChange={handleChange}/>
            </label>
            <label>
              Місто:
              <input type="text" name="country" value={user.location.city} onChange={handleChange}/>
            </label>
            <label>
              Електронна адреса:
              <input type="email" name="email" value={user.email} onChange={handleChange}/>
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
              <input type="password" name="confirmPassword" value={password.confirmPassword}
                     onChange={handlePasswordChange}/>
            </label>
            <button type="submit">Змінити пароль</button>
          </form>
        </div>
      </div>

  );
}

export default Account;