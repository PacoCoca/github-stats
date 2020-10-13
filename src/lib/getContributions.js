import fetch from 'node-fetch';
import config from '../config';

/**
 * Returns an array with the data about the contributions of an user
 * This function uses the GraphQl GitHub API
 * @param username The username of which we want to know the contributions
 * @param from The datetime from which contributions will be retrieved
 * @param to The datetime until which contributions will be retrieved
 */
async function getContributionsInterval({ username, from, to }) {
  const headers = {
    'Authorization': `bearer ${config.ghToken}`,
  }
  const body = {
    'query': `query {
      user(login: "${username}") {
        contributionsCollection(from: "${from}", to: "${to}") {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }`
  };
  const response = await fetch(
    'https://api.github.com/graphql',
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers
    }
  );
  const data = await response.json();
  return data;
};

/**
 * Returns an array with the data about the contributions of an user
 * @param username The username of which we want to know the contributions
 * @param creationYear The year from which contributions will be retrieved
 */
async function getContributions({ username, creationYear }) {
  const today = new Date();
  const contributions = [];

  for (let from = creationYear; from <= today.getFullYear(); from++) {
    // I will parse the response to [{date, count}, ...]
    const response = await getContributionsInterval({
      username: username,
      from: `${from}-01-01T00:00:00`,
      to: `${from}-12-31T23:59:59`
    });

    for (const week of response.data.user.contributionsCollection.contributionCalendar.weeks) {
      for (const day of week.contributionDays) {
        contributions.push({ date: day.date, count: day.contributionCount });
      }
    }
  }

  return contributions;
}

export default getContributions;
