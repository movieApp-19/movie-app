import React, { useState } from 'react';
import "./fanPage.css";
import { useUser } from "../context/useUser.js";

const url = process.env.REACT_APP_API_URL;

const FanPage = () => {
  const { user, isSignedIn } = useUser();
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  const fetchGroups = async () => {
    try {
      setError(null);
      const response = await fetch(url + '/fangroups');
      if (!response.ok) {
        throw new Error(`Error fetching groups: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data)
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
      const response = await fetch(url + "/fangroups", {
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

  const joinGroup = async (fangid) => {
    try {
      const response = await fetch(url + `/fangroups/requestJoin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: user.id,
          fangroupId: fangid,
        }),
      });

      if (!response.ok){
        throw new Error("Failed to join the group")
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id='fanPage' className="card">
      <div className="card-body">
      <h5 className="title">Fanpage</h5>
        <input 
          type="text" 
          value={newGroupName} 
          onChange={(e) => setNewGroupName(e.target.value)} 
          placeholder="New group name" 
          className="form-control mt-3" 
        />
        <button id="btn"className="btn btn-success mt-2" onClick={addGroup}>
          Add Group
        </button>
      </div>
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
                  {
                  isSignedIn() ? (
                  <button id='btn3' 
                  onClick={() => joinGroup(group.fangroup_id)} className="btn btn-danger btn-sm ml-2">
                    Join group
                  </button>
                  )
                  :
                  null
                  }
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
