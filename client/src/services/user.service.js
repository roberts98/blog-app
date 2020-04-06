import axios from 'axios';

export function getUser() {
  return axios('/user', {
    method: 'GET'
  });
}

export function updateUserInfo(data) {
  return axios('/user', {
    method: 'PATCH',
    data
  });
}
