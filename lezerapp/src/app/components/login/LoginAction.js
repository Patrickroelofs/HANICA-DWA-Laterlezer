import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const loginUser = (data) => (dispatch) => axios
  .get(`${API_URL}/user/${data.username}`)
  .then((response) => {
    if (response.data.password === data.password) {
      // TODO: Send to reducer
      dispatch({ TYPE: 'LOGIN USER' });
    } else {
      // TODO: Send incorrect password message
    }
  });

export default loginUser;
