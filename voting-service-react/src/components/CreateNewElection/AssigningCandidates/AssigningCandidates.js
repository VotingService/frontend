import React, { useState, useEffect } from 'react';
import "./AssigningCandidates.css"
import AdminPanel from "../../AdminPanel/AdminPanel"
import { useNavigate } from 'react-router-dom';
import { getAllUsers, registerUserAsCandidate } from '../../../API/API';

function calculateAge(birthDate){
  var today = new Date();
  var currentBirthDate = new Date(birthDate);
  var age_now = today.getFullYear() - currentBirthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
      age_now--;
    }
    return age_now;
}

function AssigningCandidates(props){
  const  navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [chosenCandidates, setChosenCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [electionId, setElectionId] = useState()

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = users.filter((candidate) =>
        (candidate.firstName + " " + candidate.lastName).toLowerCase().includes(value.toLowerCase())
      );
      console.log(filtered)
      setFilteredCandidates(filtered);
    } else {
      setFilteredCandidates([]);
    }
  };

  const handleCandidateClick = (candidate) => {
    if (!chosenCandidates.some((c) => c.id === candidate.id)) {
      setChosenCandidates([...chosenCandidates, candidate]);
    }
    setSearchTerm('');
    setFilteredCandidates([]);
  };

  const handleRemoveCandidate = (id) => {
    const updatedChosen = chosenCandidates.filter((candidate) => candidate.id !== id);
    setChosenCandidates(updatedChosen);
  };

  const handleCreate = () => {
    console.log('Chosen Candidates:', chosenCandidates);
    for(const candidate of chosenCandidates){
      registerUserAsCandidate({"Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`}, 
      electionId, candidate.id)
      .then((res) => {
        console.log(res.data)
        navigate("/election-success")
      })
      .catch((err) => {
        console.log(err)
      })
    }
  };

  useEffect(() => {
    if(sessionStorage.getItem("role") === 'USER'){
      navigate("/home")
    } else if (!sessionStorage.getItem("role")){
      navigate("/")
    }
    getAllUsers({"Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`})
    .then((res) => {
      setUsers(res.data._embedded.users)
      setElectionId(sessionStorage.getItem("new-election-id"))
      console.log(res.data._embedded.users)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className="add-candidates-page">
      <AdminPanel/>
      <div className="no-panel">
      <h1 className="header">Додати кандидатів</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Почніть писати ім'я кандидата..."
        />
        {filteredCandidates.length > 0 && (
          <div className="autocomplete-dropdown">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="autocomplete-item"
                onClick={() => handleCandidateClick(candidate)}
              >
                {candidate.lastName} {candidate.firstName} {candidate.byFather} | Вік: {calculateAge(candidate.birthDate)}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="chosen-candidates">
        {chosenCandidates.map((candidate) => (
          <div key={candidate.id} className="candidate-item">
            {candidate.lastName} {candidate.firstName} {candidate.byFather} | Вік: {calculateAge(candidate.birthDate)}
            <button
              className="remove-button"
              onClick={() => handleRemoveCandidate(candidate.id)}
            >
              Видалити
            </button>
          </div>
        ))}
      </div>
      <button disabled={chosenCandidates.length < 2} className="create-button" onClick={handleCreate}>
        Створити вибори
      </button>
      {chosenCandidates.length < 2 && <p className="add-2-at-least">Додайте хоча б 2 кандидатів</p>}
      </div>
    </div>
  );
}

export default AssigningCandidates;