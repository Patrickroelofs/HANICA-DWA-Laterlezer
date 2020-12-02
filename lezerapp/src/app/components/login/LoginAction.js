import axios from 'axios';
import { setUsername, setProfilePicture } from './LoginSlice';
import { setTags } from '../newTag/NewTagSlice';

const API_URL = 'http://localhost:3000/api';

const loginUser = (username) => (dispatch) => axios
  .get(`${API_URL}/user/${username}`)
  .then((response) => {
    dispatch(setUsername(response.data.username));
    dispatch(setTags(response.data.tags));
  });

const googleAccount = (googleResponse) => (dispatch) => axios
  .post(`${API_URL}/user/oauth/google`, {
    tokenId: googleResponse.tokenId,
  })
  .then((response) => {
    console.log('Server response: ', response);
    dispatch(setUsername(response.data.username));
    dispatch(setProfilePicture(response.data.profilePicture));
  });

export { loginUser, googleAccount };
