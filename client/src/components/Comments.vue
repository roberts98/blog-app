<template>
  <div class="comments">
    <div class="comments__item" :key="comment.id" v-for="comment in comments">
      <div class="comments__body">
        {{ comment.body }}
      </div>
      <span class="comments__author">
        {{ comment.user.username }}
      </span>
    </div>
  </div>
</template>

<script>
import { getComments } from '../services/posts.service';

export default {
  name: 'Comments',
  props: ['postId'],
  data() {
    return {
      comments: []
    };
  },
  async mounted() {
    const response = await getComments(this.$props.postId);
    this.comments = response.data;
  }
};
</script>
