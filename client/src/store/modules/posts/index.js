import { createPost, getPosts } from '../../../services/posts.service';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS
} from './types';
import router from '../../../router';

const state = {
  items: [],
  isLoading: false,
  messages: [],
  messageType: 'default'
};

const getters = {};

const actions = {
  async addPost({ commit }, post) {
    try {
      commit(ADD_POST_REQUEST);
      const response = await createPost(post);
      commit(ADD_POST_SUCCESS, response.data);
      router.push('/');
    } catch (error) {
      if (error.response.status === 400) {
        const errors = [];
        error.response.data.message.map(error => {
          Object.keys(error.constraints).forEach(key => {
            const errorMessage = error.constraints[key];
            errors.push(errorMessage);
          });
        });

        commit(ADD_POST_FAILURE, errors);
      }

      if (error.response.status === 500) {
        commit(ADD_POST_FAILURE, [error.response.statusText]);
      }
    }
  },

  async getPosts({ commit }) {
    try {
      commit(GET_POSTS_REQUEST);
      const response = await getPosts();
      commit(GET_POSTS_SUCCESS, response.data);
    } catch (error) {
      if (error.response.status === 404) {
        commit(GET_POSTS_FAILURE, [error.response.data.message]);
      }

      if (error.response.status === 500) {
        commit(GET_POSTS_FAILURE, [error.response.statusText]);
      }
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
    state.messages = ['Post has been added successfully'];
    state.messageType = 'success';
  },

  [ADD_POST_FAILURE](state, error) {
    state.isLoading = false;
    state.messages = error;
    state.messageType = 'error';
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
    state.messages = error;
    state.messageType = 'error';
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
