import axios from 'axios';

export function createPost(data) {
  return axios('/posts', {
    method: 'POST',
    data
  });
}

export function getPosts() {
  return axios('/posts', {
    method: 'GET'
  });
}
