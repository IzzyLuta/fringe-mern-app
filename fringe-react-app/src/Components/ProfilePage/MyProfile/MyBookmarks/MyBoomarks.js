import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import './MyBoomarks.css';

function MyBookmarks() {
  const [bookmarkedShows, setBookmarkedShows] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchBookmarkedShows = async () => {
      try {
        const response = await fetch(`/users/id/${userId}/bookmarks`);
        const data = await response.json();

        if (response.ok) {
          setBookmarkedShows(data);
        } else {
          console.error(`Response status: ${response.status}`);
          console.error(`Response text: ${await response.text()}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookmarkedShows();
  }, [userId]);

  const handleRemoveBookmark = (showId) => {
    fetch('/bookmarks', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ userId, showId })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBookmarkedShows(bookmarkedShows.filter(bookmarkedShow => bookmarkedShow._id !== showId));
      })
      .catch(error => console.error(error));
  };

return (
    <div>
      <button type="button" onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }} className="btn btn-secondary custom-btn-pink">Your Bookmarked Shows</button>
      <Collapse in={open}>
        <div>
        <p>When tickets go on sale for any of your bookmarked shows, we'll email you. </p>
        {bookmarkedShows.length > 0 ? (
          bookmarkedShows.map((show) => (
            <div key={show._id}>
              <h3>{show.title}</h3>
              <p>{show.artist}</p>
              <p>{show.time}</p>
              <p>{show.date.join(', ')} July</p>
              <p>@ {show.venue}</p>
              <div>
                <Link to={`/shows/${show._id}`}>
                  <button type="button" className="btn btn-secondary custom-btn-pink">To Show Page</button>
                </Link> 
                <button type="button" onClick={() => handleRemoveBookmark(show._id)} className="btn btn-secondary custom-btn-blue">Unbookmark</button>
              </div>
            </div>
          ))
        ):( 
          <div className="margin-2vh">
          <p>You haven't bookmarked any shows!</p>
          <Link to={`/shows`} className="link-custom">Click here to check out our programme...</Link>
          </div>     
        )}
      </div>
    </Collapse>
  </div>
); 
}

export default MyBookmarks;


