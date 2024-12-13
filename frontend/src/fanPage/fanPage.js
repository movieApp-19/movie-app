import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./fanPage.css";
import { useUser } from "../context/useUser.js";

const url = process.env.REACT_APP_API_URL;

const FanPage = () => {
  const [groups, setGroups] = useState([]);
  const [groupsAlreadyIn, setGroupsAlreadyIn] = useState([]);
  const [groupOwned, setGroupsOwned] = useState([]);
  const [error, setError] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const { user, isSignedIn, refreshToken } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    isSignedIn() ? fetchGroupsAsUser() : fetchGroups();
  }, []);
  
  const fetchGroups = async () => {
    try {
      setError(null);
      const response = await fetch(url + '/fangroups', {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
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

  const fetchGroupsAsUser = async () => {
    try {
      
      const responseAsMember = await fetch(url + '/fangroups/getJoined', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!responseAsMember.ok) {
        throw new Error(`Error fetching groups: ${responseAsMember.statusText}`);
      }
      const dataAsMember = await responseAsMember.json();
      setGroupsAlreadyIn(dataAsMember)

      const responseAsOwner = await fetch(url + '/fangroups/getowned', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!responseAsOwner.ok) {
        throw new Error(`Error fetching groups: ${responseAsOwner.statusText}`);
      }
      const dataAsOwner = await responseAsOwner.json();
      setGroupsOwned(dataAsOwner)
      console.log(dataAsOwner)

      const responseAsNotJoined = await fetch(url + '/fangroups/getNotJoined', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!responseAsNotJoined.ok) {
        throw new Error(`Error fetching groups: ${responseAsNotJoined.statusText}`);
      }
      const dataAsNotJoined = await responseAsNotJoined.json();
      setGroups(dataAsNotJoined);
    } catch (err) {
      setError(err.message);
    }
  }

  const addGroup = async () => {
    if (!newGroupName) {
      return alert("Please provide a group name.");
    }
    try {
      const response = await fetch(url + "/fangroups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ fangroupName: newGroupName }),
      });

      setNewGroupName("");
      if (response.ok) {
        await fetchGroupsAsUser();
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
  
  const joinGroup = async (fangid) => {
    try {
      const response = await fetch(url + `/fangroups/requestJoin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
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
      <button id="btn2" className="btn btn-primary" onClick={isSignedIn() ? fetchGroupsAsUser : fetchGroups }>
        Browse Public Groups
      </button>
      <div className="public-groups" style={{ marginTop: '20px' }}>
      {/* GROUPS WHERE USER IS OWNER */}
      <h6>Groups you own:</h6>
        {error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : groupOwned.length > 0 ? (
          <ul>
            {groupOwned.map((group) => (
              <li key={group.fangroup_id}>
                {group.fangroupname}
                  {
                    isSignedIn() ? (
                    <div>
                        <button
                        id="groupPage"
                        onClick={() => viewGroup(group.fangroup_id)}
                        className="btn btn-info btn-sm ml-2"
                        style={{ backgroundColor: 'purple' }} 
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
        ) : (isSignedIn() ?
          <p>No groups available. Try fetching!</p>
          :
          <p>Login or make an account to see groups you own!</p>
        )}
      {/* GROUPS WHERE USER IS A ACCEPTED MEMBER */}
      <h6>Groups that you are a member of:</h6>
        {error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : groupsAlreadyIn.length > 0 ? (
          <ul>
            {groupsAlreadyIn.map((group) => (
              <li key={group.fangroup_id}>
                {group.fangroupname}
                  {
                    isSignedIn() ? (
                    <div>
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
        ) : (isSignedIn() ?
          <p>No groups available. Try fetching!</p>
          :
          <p>Login or make an account to see groups you are member of!</p>
        )}
        {/* GROUPS USER IS NOT PART A MEMBER */}
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
