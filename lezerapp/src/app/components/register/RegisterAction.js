import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const registerUser = (username) => (dispatch) => axios
  .post(`${API_URL}/user`, {
    userName: username,
  })
  .then((response) => {
    // TODO: Dispatch data to slice
    console.log(response);
    dispatch({ type: 'REGISTER_USER' });
  });

export default registerUser;
