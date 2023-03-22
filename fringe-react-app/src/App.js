import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setIsAdmin, setUserId } from './redux/actions/authActions';
import './App.css';

import AdminShows from './Components/AdminShows/AdminShows';
import Header from './Components/Header/Header';
import Landing from './Components/Landing/Landing';
import Login from './Components/Login/Login';
import Menu from './Components/Menu/Menu';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import Shows from './Components/Shows/Shows';
import ShowsByGenre from './Components/ShowsByGenre/ShowsByGenre';
import ShowDetails from './Components/ShowDetails/ShowDetails';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const token = localStorage.getItem('token'); 
      if (token) {
        dispatch(setIsLoggedIn(true));
  
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('Retrieved user:', user);

        if (user && user.admin) {
          dispatch(setIsAdmin(true));
        } else {
          dispatch(setIsAdmin(false));
        }

        if (user) {
          console.log(`Setting userId to ${user._id}...`);
          dispatch(setUserId(user._id));
        }
      }
    }

    checkLoggedInStatus();
  }, [dispatch]);
  

  return (
    <div className="App">
      <Header />
      <Menu />
      <Routes>
        <Route exact path="/" element={<div><Landing /><Shows /></div>} /> 
        <Route path="/shows" element={<Shows />} />
        <Route path="/shows/genre/:genre" element={<ShowsByGenre />} />
        <Route path="/shows/:id" element={<ShowDetails />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/users/id/:id" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminShows />} />
      </Routes>
    </div>
  );
}

export default App;