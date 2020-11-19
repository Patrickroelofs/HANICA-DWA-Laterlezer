import axios from 'axios';

const API_URL = 'http://localhost:3000/';

const login = (username, password) => (dispatch) => {
  axios.post(`${API_URL}/login`, {
    username,
    password,
  })
    .then((response) => {
      console.log(response);
      dispatch(); // TODO: Send to reducer?
    })
    .catch((error) => {
      console.log(error);
    });
};

export default login;
