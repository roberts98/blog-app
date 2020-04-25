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
    this.$store.dispatch('getPosts').then(() => {
      this.$store.state.posts.messages.forEach(message => {
        this.$toasted.show(message, {
          type: this.$store.state.posts.messageType
        });
      });
    });
  },
  computed: mapState({
    posts: state => state.posts.items
  })
};
</script>
