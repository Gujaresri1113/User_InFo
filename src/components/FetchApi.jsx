import React, { useState } from 'react';

const FetchApi = () => {
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    const apiUrl = `https://api.github.com/users/${username}`;

    try {
      const response = await fetch(apiUrl);
      const userData = await response.json();

      if (response.ok) {
        setUserInfo(userData);
      } else {
        alert(`Error: ${userData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Github User Information</h2>
      <form onSubmit={(e) => { e.preventDefault(); getUserInfo(); }}>
        <label htmlFor="username">Enter GitHub Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <button type="submit">Get Info</button>
      </form>

      {userInfo && (
        <div>
          <img src={userInfo.avatar_url} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }} />
          <h3>{userInfo.name || 'Name not available'}</h3>
          <p>{userInfo.login}</p>
          <p>Public Repos: {userInfo.public_repos}</p>
          <p>Public Gists: {userInfo.public_gists}</p>
          <p>Created At: {new Date(userInfo.created_at).toLocaleDateString('en-US')}</p>
        </div>
      )}
    </div>
  );
};

export default FetchApi;
