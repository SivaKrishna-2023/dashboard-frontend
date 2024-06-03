import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUser, deleteUser } from '../api';
import './UserDetails.css'; // Import the CSS file

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUser(id)
      .then(response => setUser(response.data))
      .catch(error => {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details. Please try again later.');
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id)
        .then(() => {
          navigate('/users');
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          setError('Failed to delete user. Please try again later.');
        });
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Date of Birth: {user.dob}</p>
      <p>Contact Number: {user.contact}</p>
      <p>Email: {user.email}</p>
      <p>Description: {user.description}</p>
      <button onClick={() => navigate(`/users/${id}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <Link to="/users">Back to User List</Link>
    </div>
  );
};

export default UserDetails;