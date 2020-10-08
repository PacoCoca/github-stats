import fetch from 'node-fetch';
import config from '../config';

export default async function getUserData(username) {
  const headers = {
    'Authorization': `bearer ${config.ghToken}`,
  }
  const body = {
    'query': `query {
      user(login: "${username}") {
        login
        name
        createdAt
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
