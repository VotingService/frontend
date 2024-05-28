import "./Account.css"
import React, { useState } from 'react';
import Header from "../Header/Header";

function Account() {
  const [user, setUser] = useState({
    firstName: 'Устим',
    secondName: 'Володимирович',
    lastName: 'Бучко',
    address: 'Садовського 6, 5, Львів, Україна',
    email: 'john.doe@example.com',
    birthDate: '1990-01-01',
  });

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
              Адреса:
              <input type="text" name="address" value={user.address} onChange={handleChange}/>
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