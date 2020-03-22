import axios from 'axios';
import router from '../../../router';

import { login } from '../../../services/auth.service';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  UPDATE_USER_DATA
} from './types';

const state = {
  token: null,
  user: null,
  isLoading: false,
  error: ''
};

const getters = {
  isLoading: ({ isLoading }) => isLoading,
  token: ({ token }) => token
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
      commit(AUTH_FAILURE, error);
    }
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
  },

  [AUTH_FAILURE](state, error) {
    state.isLoading = false;
    state.error = error;
  },

  [UPDATE_USER_DATA](state, { accesToken, user }) {
    state.token = accesToken;
    state.user = user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
