import React, { useState } from 'react';

function Login(props) {
  const { setUser } = props;
  const [name, setName] = useState('');

  const submit = () => {
    setUser(name);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="login">
      <input type="text" placeholder="Username" onChange={changeName} value={name} />
      <button type="submit" onClick={submit}>Login</button>
    </div>
  );
}

export default Login;
