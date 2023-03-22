import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import './AdminShows.css';
import ShowForm from './ShowForm/ShowForm';

function AdminShows() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const [shows, setShows] = useState([]);
  const [showForm, setShowForm] = useState({ title: '', artist: '', description: '', time: '', runtime: '', date: [], venue: '', address: '', price: '', genre: '' });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    if (!isAdmin) {
      return;
    }

    async function fetchShows() {
      try {
        const response = await fetch('/shows');
  
        if (!response.ok) {
          throw new Error(`Error fetching shows: ${response.statusText}`);
        }
  
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  
    fetchShows();
  }, [isLoggedIn, isAdmin]);
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      if (checked) {
        setShowForm((prevShowForm) => ({ ...prevShowForm, date: [...prevShowForm.date, parseInt(value)] }));
      } else {
        setShowForm((prevShowForm) => ({ ...prevShowForm, date: prevShowForm.date.filter((date) => date !== parseInt(value)) }));
      }
    } else {
      setShowForm((prevShowForm) => ({ ...prevShowForm, [name]: value }));
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

  if (editing) {
    const response = await fetch(`/shows/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(showForm),
    });

    if (response.ok) {
      const updatedShow = await response.json();
      setShows(shows.map((show) => (show._id === editingId ? updatedShow : show)));
      setEditing(false);
      setEditingId(null);
      window.alert('Successfully edited show')
    } else {
      console.error('Failed to update show');
      window.alert('Failed to update show');
        }
      } else {
        const response = await fetch('/shows', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(showForm),
        });

      if (response.ok) {
        const newShow = await response.json();
        setShows([...shows, newShow]);
        window.alert('Successfully added show');
      } else {
        console.error('Failed to add show');
        window.alert('Failed to add show');
      }
    }

    setShowForm({ title: '', artist: '', description: '', time: '', runtime: '', date: '', venue: '', address: '', price: '', genre: '' });
  };

  const handleEdit = (show) => {
    setEditing(true);
    setEditingId(show._id);
    setShowForm({ title: show.title, artist: show.artist, description: show.description, time: show.time, runtime: show.runtime, date: show.date, venue: show.venue, address: show.address, price: show.price, genre: show.genre });
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/shows/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setShows(shows.filter((show) => show._id !== id));
      window.alert('Successfully deleted show')
    } else {
      console.error('Failed to delete show');
      window.alert('Failed to delete show');
    }
  };

  if (!isLoggedIn) {
    return <p>You must be logged in to access this page.</p>;
  }
  if (!isAdmin) {
    return <p>You do not have permission to access this page.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Tab.Container defaultActiveKey="add-show">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="add-show" className="tab-link">Add Show</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="edit-delete-show" className="tab-link">Edit/Delete Show</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="add-show">
            <section>
              <h4>Add Show</h4>
              <ShowForm
                showForm={editing ? {} : showForm}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                editing={editing}
                cancelEditing={() => {}}
                isEditing={false}
              />
            </section>
          </Tab.Pane>
          <Tab.Pane eventKey="edit-delete-show">
            <section>
              <h4>Edit/Delete Show</h4>
              <Row>
                <Col>
                  <ShowForm
                    showForm={editing ? showForm : {}}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    editing={editing}
                    cancelEditing={() => {
                      setEditing(false);
                      setEditingId(null);
                      setShowForm({ title: '', artist: '', description: '', time: '', runtime: '', date: '', venue: '', address: '', price: '', genre: '' });   
                    }}
                    isEditing={true}
                  />
                </Col>
                <Col>
                  <div>
                    <h5 className="margin-top-2vh">Select a Show:</h5>
                    {shows.map((show) => (
                      <div key={show._id} className="margin-2vh">
                        <h4>{show.title}</h4>
                        <button onClick={() => handleEdit(show)} className="btn btn-secondary custom-btn-pink">Select to Edit</button>
                        <button onClick={() => handleDelete(show._id)} className="btn btn-secondary custom-btn-blue">Delete</button>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </section>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default AdminShows;




