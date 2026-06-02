const axios = require('axios');

const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            aboutMe
          }
        }
      }
`;

axios.post('https://leetcode.com/graphql', {
  query,
  variables: { username: "lee215" }
}).then(res => {
  console.log(JSON.stringify(res.data, null, 2));
}).catch(console.error);
