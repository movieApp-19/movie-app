import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./fanPage.css";
import { useUser } from "../context/useUser.js";

const FanPage = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const navigate = useNavigate();
  const { user, isSignedIn, refreshToken } = useUser();

  const fetchGroups = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:8000/fangroups', {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Error fetching groups: ${response.statusText}`);
      }
      const data = await response.json();
      setGroups(data);
      refreshToken();
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
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ fangroupName: newGroupName }),
      });

      if (response.ok) {
        const newGroup = await response.json();
        setGroups([...groups, newGroup]);
        setNewGroupName("");
        refreshToken();
      } else {
        throw new Error("Failed to add group");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const viewGroup = (id) => {
    console.log(`Navigating to: /groupPage/${id}`);
    navigate(`/groupPage/${id}`);
  };
  
  return (
    <div id="fanPage" className="card">
      { isSignedIn() ?
        <div className="card-body">
          <h5 className="title">Fanpage</h5>
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="New group name"
            className="form-control mt-3"
          />
          <button id="btn" className="btn btn-success mt-2" onClick={addGroup}>
            Add Group
          </button>
        </div> : "" }
      <button id="btn2" className="btn btn-primary" onClick={fetchGroups}>
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
                <button
                  id="groupPage"
                  onClick={() => viewGroup(group.fangroup_id)}
                  className="btn btn-info btn-sm ml-2"
                >
                  View Group
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
