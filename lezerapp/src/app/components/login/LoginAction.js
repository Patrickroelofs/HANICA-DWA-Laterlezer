import axios from 'axios';
import { setUsername } from './LoginSlice';

const API_URL = 'http://localhost:3000/api';

const loginUser = (username) => (dispatch) => axios
  .get(`${API_URL}/user/${username}`)
  .then((response) => {
    dispatch(setUsername(response.data));
  });

export default loginUser;
