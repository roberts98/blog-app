<template>
  <div class="post container">
    <h1 class="post__title">
      {{ post.title }}
    </h1>
    <div class="post__desc">
      {{ post.body }}
    </div>
  </div>
</template>

<script>
import { getPost } from '../services/posts.service';

export default {
  name: 'Post',
  data() {
    return {
      post: null
    };
  },
  async mounted() {
    const response = await getPost(this.$route.params.id);
    this.post = response.data;
  }
};
</script>

<style lang="scss" scoped>
.post {
  margin-top: 60px;

  &__title {
    color: $col-text;
  }

  &__desc {
    color: $col-text;
    line-height: 30px;
  }
}
</style>
