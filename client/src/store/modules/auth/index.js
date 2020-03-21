import router from '../../../router';

import { login } from '../../../services/auth.service';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  UPDATE_ACCESS_TOKEN
} from './types';

const state = {
  token: null,
  isLoading: false,
  error: ''
};

const getters = {
  isLoading: ({ isLoading }) => isLoading,
  token: ({ token }) => token
};

const actions = {
  async login({ commit }, user) {
    try {
      commit(AUTH_REQUEST);
      const response = await login(user.username, user.password);
      const { accesToken } = response.data;

      localStorage.setItem('token', accesToken);
      commit(AUTH_SUCCESS, accesToken);
      router.push('/');
    } catch (error) {
      commit(AUTH_FAILURE, error);
    }
  },

  fetchToken({ commit }) {
    commit(UPDATE_ACCESS_TOKEN, localStorage.getItem('token'));
  },

  logout({ commit }) {
    localStorage.removeItem('token');
    commit(UPDATE_ACCESS_TOKEN, null);
  }
};

const mutations = {
  [AUTH_REQUEST](state) {
    state.isLoading = true;
  },

  [AUTH_SUCCESS](state, token) {
    state.isLoading = false;
    state.token = token;
  },

  [AUTH_FAILURE](state, error) {
    state.isLoading = false;
    state.error = error;
  },

  [UPDATE_ACCESS_TOKEN](state, token) {
    state.token = token;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
