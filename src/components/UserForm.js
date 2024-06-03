import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, createUser, updateUser } from '../api';
import './UserForm.css';

const UserForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getUser(id)
        .then(response => {
          setName(response.data.name);
          setDob(response.data.dob);
          setContact(response.data.contact);
          setEmail(response.data.email);
          setDescription(response.data.description);
          setIsEditing(true);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
          setError('Failed to fetch user details. Please try again later.');
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, dob, contact, email, description };
    if (isEditing) {
      updateUser(id, userData)
        .then(() => {
          navigate(`/users/${id}`);
        })
        .catch(error => {
          console.error('Error updating user:', error);
          setError('Failed to update user. Please try again later.');
        });
    } else {
      createUser(userData)
        .then(response => {
          navigate(`/users/${response.data._id}`);
        })
        .catch(error => {
          console.error('Error creating user:', error);
          setError('Failed to create user. Please try again later.');
        });
    }
  };

  return (
    <>
    <h1 className='main-heading'>User Form</h1>
    <div className="user-form-container">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Date of Birth" required />
        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Number" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="User Description" required />
        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
      </form>
    </div>
    </>
  );
  
};

export default UserForm;