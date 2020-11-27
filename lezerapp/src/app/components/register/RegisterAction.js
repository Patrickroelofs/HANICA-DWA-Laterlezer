import axios from 'axios';
import { setUsername } from './RegisterSlice';

const API_URL = 'http://localhost:3000/api';

const registerUser = (username) => (dispatch) => axios
  .post(`${API_URL}/user`, {
    userName: username,
  })
  .then((response) => {
    dispatch(setUsername(response.data));
  });

export default registerUser;
