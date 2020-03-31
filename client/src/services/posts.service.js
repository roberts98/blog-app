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

export function getPost(id) {
  return axios(`/posts/${id}`, { method: 'GET' });
}

export function getComments(postId) {
  return axios(`/posts/${postId}/comments`, { method: 'GET' });
}
