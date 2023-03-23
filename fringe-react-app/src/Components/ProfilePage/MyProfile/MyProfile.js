import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MyProfile.css';
import MyBookmarks from './MyBookmarks/MyBoomarks'; 

function MyProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { name, surname, email} = user;

  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    name,
    surname,
    email,
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const userId = useSelector((state) => state.auth.userId);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    console.log('token fetched success!');

    try {
      console.log('Before fetch request');
      const response = await fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(userId)
      console.log('After fetch request');

      if (response.ok) {
        window.alert('User information updated successfully');
        setShowEditForm(false);
        localStorage.setItem('user', JSON.stringify(formData));
      } else {
        console.error(`Response status: ${response.status}`);
        console.error(`Response text: ${await response.text()}`);
        window.alert('Failed to update user information');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="user-details-form" >
      <p>Hello {name}, welcome back to your profile!</p>
      {showEditForm ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />

          <label htmlFor="surname">Surname:</label>
          <input type="text" name="surname" id="surname" value={formData.surname} onChange={handleChange} required />

          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="password">Current Password:</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />

          <label htmlFor="new-password">New Password:</label>
          <input type="password" name="newPassword" id="new-password" value={formData.newPassword} onChange={handleChange} />

          <label htmlFor="confirm-password">Confirm New Password:</label>
          <input type="password" name="confirmPassword" id="confirm-password" value={formData.confirmPassword} onChange={handleChange} />

          <button type="submit" className="btn btn-secondary custom-btn-pink">Update Profile</button>
          <button type="button" onClick={() => setShowEditForm(false)} className="btn btn-secondary custom-btn-blue">Cancel</button>
          </form>
          ) : (
            <>
              <h4>Your details</h4>
              <p>Email address: {email}</p>
              <p>First name : {name}</p>
              <p>Last name : {surname}</p>
              {isAdmin && (
                <div>
                  <p><i>You have Admin access: click the button below to add, delete and edit shows.</i></p>
                  <Link to="/admin">
                    <button type="button" className="btn btn-secondary custom-btn-pink">Admin - Show Manager</button>
                  </Link>
                </div>
              )}
              <button type="button" onClick={() => setShowEditForm(true)} className="btn btn-secondary custom-btn-blue">Edit User Details</button>
            </>
          )}
          <MyBookmarks />
          <button type="button" onClick={handleLogout} className="btn btn-secondary custom-btn-blue">Log Out</button>
    </div>
  );
}

export default MyProfile;