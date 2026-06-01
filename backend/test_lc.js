const axios = require('axios');

const query = `
      query leetcodeSync($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          id
          title
          titleSlug
          timestamp
        }
        matchedUser(username: $username) {
          userCalendar {
            streak
          }
        }
      }
`;

axios.post('https://leetcode.com/graphql', {
  query,
  variables: { username: "lee215", limit: 5 }
}).then(res => {
  console.log(JSON.stringify(res.data, null, 2));
}).catch(console.error);
