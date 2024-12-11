import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GroupPage = () => {
   const { userId, id } = useParams();
   console.log("ASDASSDA: " + userId, id);
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);

  const deleteGroup = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fangroup/${id}`, {
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

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`http://localhost:8000/fangroups/${id}`);
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
  }, [id]);

  const exitGroup = async () => {
    try{
      const response = await fetch(`http://localhost:8000/fangroup/${userId}/${id}/leave`, 
        {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({ account_id: userId}),
        });

        console.log("USER_id: " + userId)

        if (!response.ok) {
         // const errorData = await response.json();
         const errorData = await response.text();
          throw new Error(errorData.error || "Failed to leave group");
        }

        alert("Successfully exited the group");
      
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
          <p><strong>Group owner:</strong> {group.account_id}</p>

          <button onClick={exitGroup} style={{ backgroundColor: 'purple' }} 
      > Exit group
      </button>
        </div>
      ) : (
        <p>Loading group details...</p>
      )}
    </div>
  );
};

export default GroupPage;
