import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const registerUser = (data) => (dispatch) => {
  axios.post(`${API_URL}/user`, {
    firstName: data.firstName,
    lastName: data.lastName,
    userName: data.username,
    password: data.password,
    email: data.email,
  })
    .then((response) => {
      console.log(response);
      dispatch(); // TODO: Send to reducer?
    })
    .catch((error) => {
      console.log(error);
    });
};

export default registerUser;
