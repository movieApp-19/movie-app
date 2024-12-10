import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const GroupPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);
  const [requestList, setRequestList] = useState(null);
  
  useEffect(() => {
    fetchGroup();
    getRequestList()
  }, [id]);
  
  const fetchGroup = async () => {
    try {
      const response = await fetch(url + `/fangroups/${id}`);
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

  const deleteGroup = async () => {
    try {
      const response = await fetch(url +`/fangroup/${id}`, {
        method: 'DELETE',
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

      alert('Group deleted successfully!');
      navigate(-1);
    } catch (err) {
      console.error('Error deleting group:', err);
      alert(`Error: ${err.message}`);
    }
  };

  /*
  	const getFavourites = () => {
    axios
			.get(urlbackend + `/favourite/${user.username}`)
			.then((response) => {
				//console.log(response.data);
        const moviesDataShort = response.data.map((element) => {
          return { id: element.movie_id, title: element.movietitle };
        })
        setMovies(moviesDataShort)
			})
			.catch((error) => console.log(error));
	};
  */
  const getRequestList = async () => {
    try {
      axios
        .get(url + `/fangroup/listRequests/${id}`)
        .then((response) => {
          const mapresult = response.data.map((i) => i)
          console.log(mapresult)
          setRequestList(mapresult)
          //console.log(response.data)
        })
      /*
      const response = await fetch(url + `/fangroup/listRequests/${id}`)
      console.log(response.account_id)
      */
    } catch (error) {
      console.log(error)
    }
  }

  const acceptJoinRequest = (accID) => {
    try {
      axios
        .post(url + `/fangroup/acceptJoin`, {
          //req.body.accountId, req.body.fangroupId'
          accountId: accID, fangroupId: id
        })
        .then((response) => {
          console.log(response)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const rejectJoinRequest = (accID) => {
    try {
      axios
        .delete(url + `/fangroup/rejectJoin/${id}`, {
          //req.body.accountId, req.body.fangroupId'
          data: {accountId: accID},
        })
        .then((response) => {
          console.log(response)
        })
    } catch (error) {
      console.log(error)
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
          <p><strong>Group owner:</strong> {group.account_id}</p>
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
        <p>Loading requestlist</p>
        )
      }
    </div>
  );
};

export default GroupPage;
