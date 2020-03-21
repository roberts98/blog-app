import { createPost } from '../../../services/posts.service';
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from './types';

const state = {
  items: [],
  isLoading: false,
  error: ''
};

const getters = {};

const actions = {
  async addPost({ commit, state }, post) {
    console.log(post);

    console.log(state);

    try {
      commit(ADD_POST_REQUEST);
      const response = await createPost(post);
      commit(ADD_POST_SUCCESS, response.data);
    } catch (error) {
      commit(ADD_POST_FAILURE, error);
    }
  }
};

const mutations = {
  [ADD_POST_REQUEST](state) {
    state.isLoading = true;
  },

  [ADD_POST_SUCCESS](state, post) {
    state.isLoading = false;
    state.items.push(post);
  },

  [ADD_POST_FAILURE](state, error) {
    state.isLoading = false;
    state.error = error;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
