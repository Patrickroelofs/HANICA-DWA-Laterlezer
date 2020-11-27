/* eslint-disable no-alert */
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
    dispatch(setTags(response.data.data));
    return {
      status: response.status,
      message: response.data.message,
      success: response.data.success,
    };
  }).catch((error) => ({
    status: error.response.status,
    message: error.response.data.message,
    success: error.response.data.success,
  }));

export default createTag;
