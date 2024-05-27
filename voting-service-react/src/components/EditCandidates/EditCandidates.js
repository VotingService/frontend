import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminPanel from '../AdminPanel/AdminPanel';
import './EditCandidates.css';

const userList = [
  { id: 1, name: 'Степан Гіга Тарасович', role: 'користувач' },
  { id: 2, name: 'Степан Гіга Тарасович', role: 'кандидат' },
  { id: 3, name: 'Степан Гіга Тарасович', role: 'кандидат' },
  { id: 4, name: 'Степан Гіга Тарасович', role: 'користувач' },
  { id: 5, name: 'Степан Гіга Тарасович', role: 'кандидат' },
];

function EditCandidates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chosenUsers, setChosenUsers] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = userList.filter((user) =>
        user.name.toLowerCase().startsWith(value.toLowerCase())
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
      user.id === id ? { ...user, role: user.role === 'користувач' ? 'кандидат' : 'користувач' } : user
    );
    setChosenUsers(updatedChosen);
  };

  const handleSave = () => {
    console.log('1234')
    console.log('Users with updated roles:', chosenUsers);
  };

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
                {user.name} - {user.role}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="chosen-users">
        {chosenUsers.map((user) => (
          <div key={user.id} className="user-item">
            {user.name} - {user.role}
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