import axios from 'axios';

export function register(username, password) {
  return axios('/auth', {
    method: 'POST',
    data: {
      username,
      password
    }
  });
}
