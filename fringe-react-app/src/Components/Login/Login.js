import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setIsAdmin, setUserId } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed. Incorrect email or password');
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);

        const userId = data.userId;

        if (userId) {
          dispatch(setUserId(userId));
        } else {
          console.log('User data does not contain a valid userId.');
        }

        const userResponse = await fetch(`/users/id/${userId}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const userData = await userResponse.json();

        localStorage.setItem('user', JSON.stringify({ ...userData }));

        const isAdmin = userData.admin;

        dispatch(setIsLoggedIn(true));
        dispatch(setIsAdmin(isAdmin));

        navigate(`/users/id/${userId}`, { state: { user: userData } });
      }
    } catch (error) {
      console.error(error);
      console.log('Login failed:', error.message);
      window.alert(error.message);
    }
  };

  return (
    <div className="login">
      <Container>
          <Row className="login-container">
            <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
              <h4 className="margin-2vh">Log In</h4>
              <form onSubmit={handleSubmit} className="login-form">
                <Row>
                  <Col xs={12} sm={4}>
                    <label htmlFor="email">Email:</label>
                  </Col>
                  <Col xs={12} sm={8}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs={12} sm={4}>
                    <label htmlFor="password">Password:</label>
                  </Col>
                  <Col xs={12} sm={8}>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Row>
                <button type="submit" className="btn btn-secondary custom-btn-pink mt-3">Submit</button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default Login;