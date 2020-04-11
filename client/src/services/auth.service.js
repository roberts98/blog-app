import axios from 'axios';

export function register(username, password) {
  return axios('/api/auth', {
    method: 'POST',
    data: {
      username,
      password
    }
  });
}

export function login(username, password) {
  return axios('/api/auth/login', {
    method: 'POST',
    data: {
      username,
      password
    }
  });
}
