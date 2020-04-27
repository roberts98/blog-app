import { createPost, getPosts } from '../../../services/posts.service';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  UPDATE_FILTERS
} from './types';
import router from '../../../router';

const state = {
  items: [],
  isLoading: false,
  messages: [],
  messageType: 'default',
  filters: {
    show: 3,
    skip: 0
  },
  itemsCount: 0
};

const getters = {
  filters: ({ filters }) => filters,
  itemsCount: ({ itemsCount }) => itemsCount
};

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

  async getPosts({ commit, getters }) {
    const { show, skip } = getters.filters;

    try {
      commit(GET_POSTS_REQUEST);
      const response = await getPosts(show, skip);
      commit(GET_POSTS_SUCCESS, response.data);
    } catch (error) {
      if (error.response.status === 404) {
        commit(GET_POSTS_FAILURE, [error.response.data.message]);
      }

      if (error.response.status === 500) {
        commit(GET_POSTS_FAILURE, [error.response.statusText]);
      }
    }
  },

  loadMore({ commit, getters, dispatch }) {
    const { show, skip } = getters.filters;
    const { itemsCount } = getters;

    if (itemsCount > skip + 3) {
      commit(UPDATE_FILTERS, { show, skip: skip + 3 });

      dispatch('getPosts');
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

  [GET_POSTS_SUCCESS](state, result) {
    state.isLoading = false;
    state.items = [...state.items, ...result.posts];
    state.itemsCount = result.count;
  },

  [GET_POSTS_FAILURE](state, error) {
    state.isLoading = false;
    state.messages = error;
    state.messageType = 'error';
  },

  [UPDATE_FILTERS](state, filters) {
    state.filters = filters;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
