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

export function login(username, password) {
  return axios('/auth/login', {
    method: 'POST',
    data: {
      username,
      password
    }
  });
}
