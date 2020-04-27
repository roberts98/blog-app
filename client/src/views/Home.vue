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
  methods: {
    scroll() {
      window.onscroll = () => {
        const bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.$store.dispatch('loadMore');
        }
      };
    }
  },
  mounted() {
    this.scroll();
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
