<template>
  <div class="page">
    <Slider />
    <div class="container">
      <div class="row page__posts">
        <PostTeaser :key="post.id" v-for="post in posts" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import PostTeaser from '../components/PostTeaser';
import Slider from '../components/homepage/Slider';

export default {
  name: 'Home',
  components: {
    PostTeaser,
    Slider
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

<style lang="scss" scoped>
.page {
  &__posts {
    margin-top: 80px;
    margin-bottom: 80px;
    display: grid;
    grid-template-columns: 33.33333% 33.33333% 33.33333%;
    column-gap: 20px;
    row-gap: 40px;
  }
}
</style>
