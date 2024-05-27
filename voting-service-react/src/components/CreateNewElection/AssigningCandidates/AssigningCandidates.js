import React, { useState } from 'react';
import "./AssigningCandidates.css"
import AdminPanel from "../../AdminPanel/AdminPanel"

const candidateList = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Michael Johnson' },
  { id: 4, name: 'Patricia Brown' },
  { id: 5, name: 'Robert Davis' },
  { id: 6, name: 'John Doe' },
  { id: 7, name: 'Jane Smith' },
  { id: 8, name: 'Michael Johnson' },
  { id: 9, name: 'Patricia Brown' },
  { id: 10, name: 'Robert Davis' },
  { id: 11, name: 'John Doe' },
  { id: 12, name: 'Jane Smith' },
  { id: 13, name: 'Michael Johnson' },
  { id: 14, name: 'Patricia Brown' },
  { id: 15, name: 'Robert Davis' },
];

function AssigningCandidates(){
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [chosenCandidates, setChosenCandidates] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = candidateList.filter((candidate) =>
        candidate.name.toLowerCase().includes(value.toLowerCase())
      );
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
    // Add logic to handle election creation with chosen candidates
  };

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
                {candidate.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="chosen-candidates">
        {chosenCandidates.map((candidate) => (
          <div key={candidate.id} className="candidate-item">
            {candidate.name}
            <button
              className="remove-button"
              onClick={() => handleRemoveCandidate(candidate.id)}
            >
              Видалити
            </button>
          </div>
        ))}
      </div>
      <button className="create-button" onClick={handleCreate}>
        Створити вибори
      </button>
      </div>
    </div>
  );
}

export default AssigningCandidates;