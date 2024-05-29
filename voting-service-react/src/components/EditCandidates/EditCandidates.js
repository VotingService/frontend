import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminPanel from '../AdminPanel/AdminPanel';
import './EditCandidates.css';
import { getAllUsers } from '../../API/API';

const userList = [
  { id: 1, name: 'Степан Гіга Тарасович', role: 'користувач' },
  { id: 2, name: 'Степан Гіга Тарасович', role: 'кандидат' },
  { id: 3, name: 'Степан Гіга Тарасович', role: 'кандидат' },
  { id: 4, name: 'Степан Гіга Тарасович', role: 'користувач' },
  { id: 5, name: 'Степан Гіга Тарасович', role: 'кандидат' },
];

function EditCandidates() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chosenUsers, setChosenUsers] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = users.filter((user) =>
        (user.firstName + " " + user.lastName).toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleUserClick = (user) => {
    // Check if user is already in the chosen list
    if (!chosenUsers.some((u) => u.id === user.id)) {
      setChosenUsers([...chosenUsers, user]);
    }
    setSearchTerm('');
    setFilteredUsers([]);
  };

  const handleChangeRole = (id) => {
    const updatedChosen = chosenUsers.map((user) =>
      user.id === id ? { ...user, demoRole: user.demoRole === 'користувач' ? 'кандидат' : 'користувач' } : user
    );
    setChosenUsers(updatedChosen);
  };

  const handleSave = () => {
    console.log('Users with updated roles:', chosenUsers);
  };

  useEffect(() => {
    if(sessionStorage.getItem("role") === 'USER'){
        navigate("/home")
        return;
    }
    getAllUsers({"Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`})
    .then((res) => {
      setUsers(res.data._embedded.users.map(obj => ({
        ...obj, 
        demoRole: 'користувач'
      })))})
    .catch((err) => {
      console.log(err)
    })
})

  return (
    <div className="change-user-role-page">
      <AdminPanel/>
      <div className="no-panel">
      <h1 className="header">Редагувати статус кандидата</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Почніть писати ім'я кандидата..."
        />
        {filteredUsers.length > 0 && (
          <div className="autocomplete-dropdown">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="autocomplete-item"
                onClick={() => handleUserClick(user)}
              >
                {user.lastName} {user.firstName} {user.byFather} - {user.demoRole}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="chosen-users">
        {chosenUsers.map((user) => (
          <div key={user.id} className="user-item">
            {user.lastName} {user.firstName} {user.byFather} - {user.demoRole}
            <button
              className="change-role-button"
              onClick={() => handleChangeRole(user.id)}
            >
              Змінити роль
            </button>
          </div>
        ))}
      </div>
      <Link to={"/home-admin"} className="save-button" onClick={() => handleSave()}>
        Зберегти
      </Link>
      </div>
    </div>
  );
}

export default EditCandidates;