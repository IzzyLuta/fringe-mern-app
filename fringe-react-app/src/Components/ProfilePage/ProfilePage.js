import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MyProfile from './MyProfile/MyProfile';

function ProfilePage() {
  const userId = useSelector(state => state.auth.userId);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      fetch(`/users/id/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser((prevUser) => ({ ...prevUser, ...data.user }));
        })
        .catch((error) => console.error(error));
    }
  }, [localStorage.getItem('token')]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <MyProfile />
    </div>
  );
}

export default ProfilePage;