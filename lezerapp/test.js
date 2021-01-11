const axios = require('axios');

const test = async () => {
  const { data } = await axios.post('http://localhost:3000/api/articles', { url: 'http://www.loremipsum.nl/' }, {
    headers: {
      Username: 'testuser',
    },
  });

  const res = await axios.delete(`http://localhost:3000/api/articles/${data.data}`, {
    headers: {
      Username: 'testuser',
    },
  });
  console.log(res.data);
};

test();
