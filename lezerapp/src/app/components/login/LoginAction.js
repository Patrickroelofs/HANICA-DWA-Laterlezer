import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const loginUser = (data) => () => axios
  .get(`${API_URL}/user/${data.username}`)
  .then((response) => {
    console.log(response);
    if (response.data.password === data.password) {
      console.log('logged in success');
    }
  });

export default loginUser;
