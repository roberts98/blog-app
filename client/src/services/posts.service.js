import axios from 'axios';

export function createPost(data) {
  return axios('/posts', {
    method: 'POST',
    data
  });
}
