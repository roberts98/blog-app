<template>
  <div class="container">
    <PostTeaser :key="post.id" v-for="post in posts" :post="post" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import PostTeaser from '../components/PostTeaser';

export default {
  name: 'Home',
  components: {
    PostTeaser
  },
  mounted() {
    this.$store.dispatch('posts/getPosts');
  },
  computed: mapState({
    posts: state => state.posts.items
  })
};
</script>
