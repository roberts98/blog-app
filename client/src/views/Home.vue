<template>
  <div>
    <div :key="post.id" v-for="post in posts">{{ post.title }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Home',
  mounted() {
    this.$store.dispatch('posts/getPosts');
  },
  computed: mapState({
    posts: state => state.posts.items
  })
};
</script>
