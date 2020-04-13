import axios from 'axios';
import router from '../../../router';

import { login } from '../../../services/auth.service';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  UPDATE_USER_DATA,
  UPDATE_AVATAR
} from './types';

const state = {
  token: null,
  user: null,
  isLoading: false,
  messages: [],
  messageType: 'default'
};

const getters = {
  isLoading: ({ isLoading }) => isLoading,
  token: ({ token }) => token,
  avatar: ({ user }) => user.avatar
};

const actions = {
  async login({ commit }, userFormData) {
    try {
      commit(AUTH_REQUEST);
      const response = await login(
        userFormData.username,
        userFormData.password
      );
      const { accesToken, user } = response.data;

      axios.defaults.headers.common['Authorization'] = `Bearer ${accesToken}`;
      localStorage.setItem('token', accesToken);
      localStorage.setItem('user', JSON.stringify(user));
      commit(AUTH_SUCCESS, { accesToken, user });
      router.push('/');
    } catch (error) {
      if (error.response.status === 401) {
        commit(AUTH_FAILURE, [error.response.data.message]);
      }

      if (error.response.status === 400) {
        const errors = [];
        error.response.data.message.map(error => {
          Object.keys(error.constraints).forEach(key => {
            const errorMessage = error.constraints[key];
            errors.push(errorMessage);
          });
        });
        commit(AUTH_FAILURE, errors);
      }
    }
  },

  updateAvatar({ commit }, avatar) {
    commit(UPDATE_AVATAR, {
      avatar
    });
  },

  fetchUser({ commit }) {
    commit(UPDATE_USER_DATA, {
      accesToken: localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user'))
    });
  },

  logout({ commit }) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    commit(UPDATE_USER_DATA, { accesToken: null, user: null });
    router.push('/');
  }
};

const mutations = {
  [AUTH_REQUEST](state) {
    state.isLoading = true;
  },

  [AUTH_SUCCESS](state, data) {
    state.isLoading = false;
    state.token = data.accesToken;
    state.user = data.user;
    state.messages = ['Logged in successfully!'];
    state.messageType = 'success';
  },

  [AUTH_FAILURE](state, errors) {
    state.isLoading = false;
    state.messages = [...errors];
    state.messageType = 'error';
  },

  [UPDATE_USER_DATA](state, { accesToken, user }) {
    state.token = accesToken;
    state.user = user;
  },

  [UPDATE_AVATAR](state, { avatar }) {
    state.user = {
      ...state.user,
      avatar
    };
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
