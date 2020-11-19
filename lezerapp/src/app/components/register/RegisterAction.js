import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const registerUser = (data) => (dispatch) => axios
  .post(`${API_URL}/user`, {
    firstName: data.firstName,
    lastName: data.lastName,
    userName: data.username,
    password: data.password,
    email: data.email,
  })
  .then((response) => {
    // TODO: Dispatch data to slice
    console.log(response);
    dispatch({ type: 'REGISTER_USER' });
  });

export default registerUser;
