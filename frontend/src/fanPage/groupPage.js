import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GroupPage = () => {
  const { id } = useParams();
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
    </div>
  );
};

export default GroupPage;
