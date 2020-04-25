<template>
  <article v-if="post" class="post">
    <div class="post__img">
      <img :src="post.thumbnail" :alt="post.title" />
    </div>
    <div class="post__inner container">
      <h1 class="post__title">{{ post.title }}</h1>
      <div class="post__desc" v-html="post.body" />
    </div>
    <Comments :postId="post.id" />
  </article>
</template>

<script>
import { mapState } from 'vuex';

import { getPost } from '../services/posts.service';
import Comments from '../components/Comments';

export default {
  name: 'Post',
  components: {
    Comments
  },
  data() {
    return {
      post: null
    };
  },
  async mounted() {
    try {
      const response = await getPost(this.$route.params.id);
      this.post = response.data;
    } catch (error) {
      if (error.response.status === 404) {
        this.$toasted.show(error.response.data.message, {
          type: 'error'
        });
        this.$router.push('/not-found');
      }

      if (error.response.status === 500) {
        this.$toasted.show(error.response.data.message, {
          type: 'error'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  margin-top: 60px;

  &__img {
    text-align: center;
  }

  &__title {
    color: $col-text;
  }

  &__desc {
    color: $col-text;
    line-height: 30px;
  }
}
</style>
