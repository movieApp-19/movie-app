import React, { useState } from 'react';
import "./fanPage.css";

const FanPage = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  const fetchGroups = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:8000/fangroups');
      if (!response.ok) {
        throw new Error(`Error fetching groups: ${response.statusText}`);
      }
      const data = await response.json();
      setGroups(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const addGroup = async () => {
    if (!newGroupName) {
      return alert("Please provide a group name.");
    }
    try {
      const response = await fetch("http://localhost:8000/fangroups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fangroupName: newGroupName }),
      });

      if (response.ok) {
        const newGroup = await response.json();
        setGroups([...groups, newGroup]);
        setNewGroupName("");
      } else {
        throw new Error("Failed to add group");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteGroup = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/fangroups/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setGroups(groups.filter((group) => group.fangroup_id !== id));
      } else {
        throw new Error("Failed to delete group");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
      <h5 className="title">Fanpage</h5>
        <input 
          type="text" 
          value={newGroupName} 
          onChange={(e) => setNewGroupName(e.target.value)} 
          placeholder="New group name" 
          className="form-control mt-3" 
        />
        <button className="btn btn-success mt-2" onClick={addGroup}>
          Add Group
        </button>
      </div>
        <button className="btn btn-primary" onClick={fetchGroups}>
          Browse Public Groups
        </button>
        <div className="public-groups" style={{ marginTop: '20px' }}>
          <h6>Public Groups:</h6>
          {error ? (
            <p style={{ color: 'red' }}>Error: {error}</p>
          ) : groups.length > 0 ? (
            <ul>
              {groups.map((group) => (
                <li key={group.fangroup_id}>
                  {group.fangroupname} 
                  <button onClick={() => deleteGroup(group.fangroup_id)} className="btn btn-danger btn-sm ml-2">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No groups available. Try fetching!</p>
          )}
        </div>
    </div>
  );
};

export default FanPage;
