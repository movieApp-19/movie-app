import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./fanPage.css";
import { useUser } from "../context/useUser.js";

const url = process.env.REACT_APP_API_URL;

const FanPage = () => {
  const { user, isSignedIn } = useUser();
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const navigate = useNavigate(); 

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

  const viewGroup = (id) => {
    console.log(`Navigating to: /groupPage/${id}`);
    navigate(`/groupPage/${id}`);
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
      else{
        console.log("join group request ok!")
        console.log(response)
        const message = await response.json();
        if (message.message === "alreadyasked"){
          alert("You have ALREADY sent a request to join this group!")
        }
        else alert("You send a request to join a group!")
        console.log(message)
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="fanPage" className="card">
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
                    <div>
                      <button id='btn3' 
                        onClick={() => joinGroup(group.fangroup_id)} className="btn btn-danger btn-sm ml-2">
                          Join group
                        </button>
                        <button
                        id="groupPage"
                        onClick={() => viewGroup(group.fangroup_id)}
                        className="btn btn-info btn-sm ml-2"
                        >
                        View Group
                      </button>
                    </div>
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
