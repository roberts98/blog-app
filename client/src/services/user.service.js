import axios from 'axios';

export function getUser() {
  return axios('/user', {
    method: 'GET'
  });
}
