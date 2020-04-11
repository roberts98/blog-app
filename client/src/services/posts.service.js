import axios from 'axios';

export function createPost(data) {
  return axios('/api/posts', {
    method: 'POST',
    data
  });
}

export function getPosts() {
  return axios('/api/posts', {
    method: 'GET'
  });
}

export function getPost(id) {
  return axios(`/api/posts/${id}`, { method: 'GET' });
}

export function getComments(postId) {
  return axios(`/api/posts/${postId}/comments`, { method: 'GET' });
}

export function addComment(body, postId) {
  return axios(`/api/posts/${postId}/comments`, {
    method: 'POST',
    data: {
      body
    }
  });
}
