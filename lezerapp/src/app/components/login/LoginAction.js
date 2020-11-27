import axios from 'axios';
import { setUsername } from './LoginSlice';
import { setTags } from '../newTag/NewTagSlice';

const API_URL = 'http://localhost:3000/api';

const loginUser = (username) => (dispatch) => axios
  .get(`${API_URL}/user/${username}`)
  .then((response) => {
    dispatch(setUsername(response.data.username));
    dispatch(setTags(response.data.tags));
  });

export default loginUser;
