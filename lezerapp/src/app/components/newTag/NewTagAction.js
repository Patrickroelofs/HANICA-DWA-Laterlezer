import axios from 'axios';
import { setTags } from './NewTagSlice';

const API_URL = 'http://localhost:3000/api';

const createTag = (title, color) => (dispatch) => axios
  .post(`${API_URL}/tags`, {
    tags: [{
      title,
      color,
    }],
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    if (response.status === 201) {
      dispatch(setTags(response.data.data));
    }
  }).catch((error) => {
    alert(error.response.data.message);
  });

export default createTag;
