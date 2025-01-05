import React, { useState } from 'react';
import Header from './Header.js';

const UsernamePrompt = ({ onSubmit }) => {
    
  const [username, setUsername] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      onSubmit(username.toLocaleLowerCase());
    }
  };

  return (
    <div 
      className="container d-flex flex-column mx-auto text-center">
      <div 
        className="col-12 col-md-6 col-lg-4 p-4 border rounded bg-white shadow  mx-auto">
        <Header />
        <h2 className="text-center mb-4 mt-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter username" 
              value={username}
              onChange={handleChange}
              required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Start Chat</button>
        </form>
      </div>
    </div>
  );
};

export default UsernamePrompt;