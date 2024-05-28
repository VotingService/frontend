import AdminPanel from "../../AdminPanel/AdminPanel"
import "./SettingElectionProps.css"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SettingElectionProps(){
  const navigate = useNavigate()
  const [electionType, setElectionType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    electionName: '',
    location: '',
    startDate: '',
    endDate: '',
    allowanceToChangeVote: 'yes',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownClick = (type) => {
    setElectionType(type);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log('Election created:', { ...formData, electionType });
  };

  useEffect(() => {
    if(sessionStorage.getItem("role") === 'USER'){
      navigate("/home")
    }
  })

  return (
    <div className="new-election-page">
      <AdminPanel/>
      <div className="no-panel">
      <h1 className="header">Нові вибори</h1>
      <form className="election-form" onSubmit={handleSubmit}>
        <label>
          Назва:
          <input
            type="text"
            name="electionName"
            value={formData.electionName}
            onChange={handleChange}
          />
        </label>
        <label>
          Локація:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <div className="date-container">
          <label>
            Дата початку:
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </label>
          <label>
            Дата завершення:
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </label>
        </div>
        <label>
          Тип виборів:
          <div className="dropdown">
            <input
              type="text"
              name="electionType"
              value={electionType}
              readOnly
            />
            <button type="button" onClick={() => setShowDropdown(!showDropdown)}>
              Вибрати
            </button>
            {showDropdown && (<div className="dropdown-menu">
              <div onClick={() => handleDropdownClick('Єдиний голос')}>Єдиний голос</div>
              <div onClick={() => handleDropdownClick('Множинний голос')}>Множинний голос</div>
              <div onClick={() => handleDropdownClick('Оцінка')}>Оцінка</div>
            </div>)}
          </div>
        </label>
        <label>
          Дозвіл на зміну голосу:
          <select
            name="allowanceToChangeVote"
            value={formData.allowanceToChangeVote}
            onChange={handleChange}
          >
            <option value="yes">Так</option>
            <option value="no">Ні</option>
          </select>
        </label>
        <button type="submit" className="continue-button"><Link className="continue-button__label" to={"/add-candidates"}>
          Продовжити
        </Link></button>
      </form>
      </div>
    </div>
  );
}

export default SettingElectionProps;