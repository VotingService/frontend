import AdminPanel from "../../AdminPanel/AdminPanel"
import "./SettingElectionProps.css"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createElection } from "../../../API/API";

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
    maxVotes: 1
  });
  const [newElectionLocation, setNewElectionLocation] = useState({
    "country": "",
    "city": ""
  })
  const [newElection, setNewElection] = useState({
    "title": "",
    "description": "",
    "startDate": "",
    "endDate": "",
    "canRetractVote": true,
    "votingStrategy": "",
    "maxVotes" : 1,
    "location": ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownClick = (type) => {
    setElectionType(type);
    formData.maxVotes = 1;
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newElection.canRetractVote = formData.allowanceToChangeVote === 'yes';
    newElection.title = formData.electionName;
    newElection.votingStrategy = electionType === 'Єдиний голос' ? 'PluralityVoting': electionType === 'Множинний голос' ? 'ApprovalVoting' : 'DistributionVoting';
    newElection.maxVotes = formData.maxVotes === 1 ? formData.maxVotes : null;
    newElection.startDate = `${formData.startDate}T00:00:00`;
    newElection.endDate = `${formData.endDate}T00:00:00`;
    newElection.location = newElectionLocation;
    createElection(newElection, 
      {"Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`})
    console.log('Election created:', newElection);
  };

  const handleChangeLocation = (e) => {
    const {name, value} = e.target;
    setNewElectionLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value
    }))
  }

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
        <div className="inputs-block">
          <label>
            Країна:
            <input type="text" name="country" value={newElectionLocation.country} onChange={handleChangeLocation}/>
          </label>
          <label>
            Місто:
            <input type="text" name="city" value={newElectionLocation.city} onChange={handleChangeLocation}/>
          </label>
        </div>
        <div className="inputs-block">
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
        <div className="inputs-block">
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
          <label>
              Максимальна кількість голосів:
              <input
                type="number"
                name="maxVotes"
                min={1}
                max={100}
                value={formData.maxVotes}
                onChange={handleChange}
                disabled={!(electionType === 'Оцінка')}
              />
            </label>
          </div>
        <button onClick={handleSubmit} type="submit" className="continue-button"><Link className="continue-button__label" to={"/add-candidates"}>
          Продовжити
        </Link></button>
      </form>
      </div>
    </div>
  );
}

export default SettingElectionProps;