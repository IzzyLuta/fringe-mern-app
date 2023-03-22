import React, { useState, useEffect } from 'react';
import './ShowDetails.css';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Breadcrumb } from 'react-bootstrap';

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState({});
  const [bookmarkedShows, setBookmarkedShows] = useState([]);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const userId = useSelector(state => state.auth.userId);

  useEffect(() => {
    fetch(`/shows/${id}`)
      .then(response => response.json())
      .then(data => setShow(data))
      .catch(error => console.error(error));
  }, [id]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`/users/id/${userId}/bookmarks`)
        .then(response => response.json())
        .then(data => setBookmarkedShows(data))
        .catch(error => console.error(error));
    }
  }, [isLoggedIn, userId]);

  const isShowBookmarked = () => {
    return bookmarkedShows.some(bookmarkedShow => bookmarkedShow._id === id);
  };

  const handleAddBookmark = () => {
    fetch('/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ userId, showId: id })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBookmarkedShows([...bookmarkedShows, show]);
      })
      .catch(error => console.error(error));
  };

  const handleRemoveBookmark = () => {
    fetch('/bookmarks', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ userId, showId: id })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBookmarkedShows(bookmarkedShows.filter(bookmarkedShow => bookmarkedShow._id !== id));
      })
      .catch(error => console.error(error));
  };
  
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/" className="breadcrumb-href">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/shows" className="breadcrumb-href">Shows</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/shows/genre/${show.genre}`} className="breadcrumb-link" >{show.genre}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumb-href" active>{show.title}</Breadcrumb.Item>
      </Breadcrumb>
      <h2>{show.title}</h2>
      <h4>{show.artist}</h4>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="rounded border-around-content">
          <p>{show.description}</p>
          <p>Dates: {show.date && show.date.join(', ')} July 2023 <br/> Start time: {show.time} <br/> Show length: {show.runtime} minutes</p>
          <p>Venue: {show.venue} <br/> Address: {show.address}</p>
          <p>Ticket Price: £{show.price}</p>
          <p>Part of our{' '}
            <b><Link to={`/shows/genre/${show.genre}`} className="link-custom"> {show.genre} </Link></b>{' '}programme
          </p>
        </div>
      </div>
      {isLoggedIn && (
            isShowBookmarked() ? (
              <button type="button" onClick={handleRemoveBookmark} className="btn btn-secondary custom-btn-blue">Unbookmark</button>
            ) : (
              <button type="button" onClick={handleAddBookmark} className="btn btn-secondary custom-btn-pink">Bookmark this show</button>
            )
          )}
    </div>
  );
}

export default ShowDetails;


