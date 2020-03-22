<template>
  <div class="container">
    <Post :key="post.id" v-for="post in posts" :post="post" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Post from '../components/Post';

export default {
  name: 'Home',
  components: {
    Post
  },
  mounted() {
    this.$store.dispatch('posts/getPosts');
  },
  computed: mapState({
    posts: state => state.posts.items
  })
};
</script>
