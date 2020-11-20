import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const loginUser = (username) => (dispatch) => axios
  .get(`${API_URL}/user/${username}`)
  .then((response) => {
    console.log(response);
    dispatch({ TYPE: 'LOGIN USER' });
  });

export default loginUser;
