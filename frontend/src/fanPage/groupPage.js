import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from "../context/useUser.js";
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const GroupPage = () => {
   const { id } = useParams();
  
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);
  const [requestList, setRequestList] = useState(null);
  const { user, refreshToken } = useUser();
  const [isOwner, setIsOwner] = useState(false)
  
  useEffect(() => {

    const checkIfIsOwner = async (accId) => {
      axios
      .post(url + `/fangroup/checkifowner`, {
        accID: accId, 
        fangrId: id     
      }, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      .then((response) => {
        setIsOwner(response.data[0].isowner)
      })
      .catch((error) => {
        console.error(error); 
      });
    }

    const fetchGroup = async () => {
      try {
        const response = await fetch(url + `/fangroups/${id}`, {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        });
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (parseError) {
            errorData = { message: 'Failed to parse error response' };
          }
          throw new Error(errorData.message || 'Failed to fetch group');
        }
        const data = await response.json();
        setGroup(data); 
        setError(null); 
      } catch (err) {
        setError(err.message);
        setGroup(null);
      }
    };

    fetchGroup();
    checkIfIsOwner(user.id);

    if (isOwner){
      console.log('is owner')
      getRequestList(user.id)
    }
  }, [id, isOwner]);

  const deleteGroup = async () => {
    try {
      const response = await fetch(url +`/fangroup/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json(); 
        } catch (parseError) {
          errorData = { message: 'Failed to parse error response' };
        }
        throw new Error(errorData.message || 'Failed to delete group');
      }

      refreshToken();
      alert('Group deleted successfully!');
      navigate(-1);
    } catch (err) {
      console.error('Error deleting group:', err);
      alert(`Error: ${err.message}`);
    }
  };


const checkIfIsOwner = async (accId) => {
  axios
  .post(url + `/fangroup/checkifowner`, {
    accID: accId, 
    fangrId: id     
  }, {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  })
  .then((response) => {
    console.log(response.data[0].isowner); 
    setIsOwner(response.data[0].isowner)
  })
  .catch((error) => {
    console.error(error); 
  });
}

  // gets the list of users that are not accepted to the group yet
  const getRequestList = async (accID1) => {
    try{
      axios
        .get(url + `/fangroup/listRequests/${id}`
          , { headers: {
          "Authorization": `Bearer ${user.token}`
        }}
        )
        .then((response) => {
          const mapresult = response.data.map((i) => i)
          //console.log(mapresult)
          setRequestList(mapresult)
        })
          
    } catch (error) {
      console.log(error)
    }

  }

  const acceptJoinRequest = (accID) => {
    try {
      axios
        .post(url + `/fangroup/acceptJoin`, {
          accountId: accID, fangroupId: id
        },
        {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        })
        .then((response) => {
          console.log(response)
          getRequestList(user.id)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const rejectJoinRequest = (accID) => {
    try {
      axios
        .delete(url + `/fangroup/rejectJoin/${id}`, 
          {
          data: {accountId: accID},
          headers: {
            "Authorization": `Bearer ${user.token}`
          },
        })
        .then((response) => {
          console.log(response)
          getRequestList(user.id)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const exitGroup = async () => {
    try{
      const response = await fetch(`http://localhost:8000/fangroup/${user.id}/${id}/leave`, 
        {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({ account_id: user.id}),
        });

        console.log("USER_id: " + user.id)

        if (!response.ok) {

         const errorData = await response.json();
          throw new Error(errorData.error || "Failed to leave group");
        }

        alert("Successfully exited the group");
        navigate('/fanpage')
    } catch (err){
      console.error("Error", err.message);
      setError(err.message);
    }
  }

  return (
    <div>
      <h3>Group Details</h3>
      <button onClick={deleteGroup} style={{ backgroundColor: 'red' }} 
      > Delete group
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
      {group ? (
        <div>
          <p><strong>ID:</strong> {group.fangroup_id}</p>
          <p><strong>Name:</strong> {group.fangroupname}</p>
          <p><strong>Group owner:</strong> {group.username}</p>

          <button onClick={exitGroup} style={{ backgroundColor: 'purple' }} 
      > Exit group
      </button>
        </div>
      ) : (
        <p>Loading group details...</p>
      )}
      {
        requestList ? (
          <div>
            <h4>Group Requests</h4>
            <ul>
              {requestList.map((i) =>  (
                <li key={i.account_id}> 
                  {i.username}
                  {<div>
                    <button onClick={()=>acceptJoinRequest(i.account_id)}>Accept</button>
                    <button onClick={()=>rejectJoinRequest(i.account_id)}>Reject</button>
                  </div>}
                </li>
              )
              )}
            </ul>
          </div>
        )
        :
        (
        <></>
        )
      }
    </div>
  );
};

export default GroupPage;
