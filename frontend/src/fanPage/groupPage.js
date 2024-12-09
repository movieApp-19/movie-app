import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GroupPage = () => {
    const { id } = useParams();
    console.log("Group ID from URL:", id); 
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`http://localhost:8000/fangroups/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch group");
        }
        const data = await response.json();
        //console.log(data + "!!!!))))")
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
      {error && <div className="alert alert-danger">{error}</div>}
      {group ? (
        <div>
          <p><strong>ID:</strong> {group.fangroup_id}</p>
          <p><strong>Name:</strong> {group.fangroupname}</p>
        </div>
      ) : (
        <p>Loading group details...</p>
      )}
    </div>
  );
};

export default GroupPage;
