import { createPost, getPosts } from '../../../services/posts.service';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS
} from './types';

const state = {
  items: [],
  isLoading: false,
  error: ''
};

const getters = {};

const actions = {
  async addPost({ commit }, post) {
    try {
      commit(ADD_POST_REQUEST);
      const response = await createPost(post);
      commit(ADD_POST_SUCCESS, response.data);
    } catch (error) {
      commit(ADD_POST_FAILURE, error);
    }
  },

  async getPosts({ commit }) {
    try {
      commit(GET_POSTS_REQUEST);
      const response = await getPosts();
      commit(GET_POSTS_SUCCESS, response.data);
    } catch (error) {
      commit(GET_POSTS_FAILURE, error);
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
  },

  [GET_POSTS_REQUEST]() {
    state.isLoading = true;
  },

  [GET_POSTS_SUCCESS](state, posts) {
    state.isLoading = false;
    state.items = posts;
  },

  [GET_POSTS_FAILURE](state, error) {
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
