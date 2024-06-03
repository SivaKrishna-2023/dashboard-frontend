import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../api';
import './UserList.css'; // Import the CSS file

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [error, setError] = useState('');

  useEffect(() => {
    getUsers()
      .then(response => setUsers(response.data))
      .catch(error => {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-list-container">
      {error && <div className="error-message">{error}</div>}
      <h2 className="user-list-header">User List</h2>
      <div className="user-list-search">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul className="user-list">
        {currentUsers.map(user => (
          <li key={user._id}>
            <Link to={`/users/${user._id}`} className="user-list-link">{user.name}</Link>
          </li>
        ))}
      </ul>
      <div className="user-list-pagination">
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={filteredUsers.length}
          paginate={paginate}
        />
      </div>
      <Link to="/" className="user-list-link">Create New User</Link>
    </div>
  );
};

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserList;