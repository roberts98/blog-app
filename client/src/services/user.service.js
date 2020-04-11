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

export function updateAvatar(avatar) {
  const formData = new FormData();
  formData.append('avatar', avatar);

  return axios('/api/user/avatar', {
    method: 'PATCH',
    data: formData
  });
}

export function getAvatar() {
  return axios('/api/user/avatar', {
    method: 'GET'
  });
}
