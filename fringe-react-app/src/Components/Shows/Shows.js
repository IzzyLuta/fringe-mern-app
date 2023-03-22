import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import './Shows.css';

function Shows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/shows');
      const data = await response.json();
      setShows(data);
    }
    fetchData();
  }, []);

  return (
    <div className="shows">
      <Breadcrumb>
        <Breadcrumb.Item href="/" className="breadcrumb-href">Home</Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumb-href" active>Shows</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Shows</h2>
      <p>Take a look at our fantastic programme of comedy, theatre, and dance coming to London in July 2023.</p>
      <Container>
        <Row>
          {shows.map((show) => (
            <Col key={show._id} xs={12} md={6} lg={4} className="mb-4">
              <div class="card show-card">
                <h3 class="card-header custom-card-header">{show.title}</h3>
                <div class="card-body">
                  <h5 class="card-title">{show.artist}</h5>
                  <p class="card-text">{show.time} <br/> {show.date && show.date.join(', ')} July </p>
                  <p class="card-text uppercase">{show.genre}</p>
                  <Link to={`/shows/${show._id}`} id={show._id}>
                    <button type="button" className="btn btn-secondary custom-btn-yellow">Find out more</button>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Shows;
