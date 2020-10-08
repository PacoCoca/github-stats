import fetch from 'node-fetch';
import config from '../config';

export default async function getContributions(username, from, to) {
  const headers = {
    'Authorization': `bearer ${config.ghToken}`,
  }
  const body = {
    'query': `query {
      user(login: "${username}") {
        contributionsCollection(from: "${from}", to: "${to}") {
          contributionCalendar {
            totalContributions
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
