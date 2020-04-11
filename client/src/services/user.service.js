import axios from 'axios';

export function getUser() {
  return axios('/api/user', {
    method: 'GET'
  });
}

export function updateUserInfo(data) {
  return axios('/api/user', {
    method: 'PATCH',
    data
  });
}
