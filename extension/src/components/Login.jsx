import React, { useState } from 'react';

function Login({ setUser }) {
  const [name, setName] = useState('');

  return (
    <div className="login">
      <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} value={name} />
      <button type="submit" onClick={() => setUser(name)}>Login</button>
    </div>
  );
}

export default Login;
