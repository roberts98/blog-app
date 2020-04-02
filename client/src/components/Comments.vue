<template>
  <div class="comments container">
    <div class="comments__header">
      <p>
        Comments
        <span class="comments__number">({{ comments.length }})</span>
      </p>
      <span>Start a discussion, not a fire. Post with kindness.</span>
    </div>
    <div class="comments__item" :key="comment.id" v-for="comment in comments">
      <div class="comments__avatar">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
      </div>
      <div>
        <span class="comments__author">
          {{ comment.user.username }} on
          <span
            class="comments__date"
          >{{ comment.createdAt | formatDate }}</span>
        </span>
        <div class="comments__body">{{ comment.body }}</div>
      </div>
    </div>
    <CommentsForm :onSubmit="addComment" />
  </div>
</template>

<script>
import { getComments, addComment } from '../services/posts.service';
import CommentsForm from './CommentsForm';

export default {
  name: 'Comments',
  props: ['postId'],
  components: {
    CommentsForm
  },
  data() {
    return {
      comments: []
    };
  },
  async mounted() {
    const response = await getComments(this.$props.postId);
    this.comments = response.data;
  },
  methods: {
    async addComment(body) {
      const res = await addComment(body, this.$props.postId);
      this.comments.push(res.data);
    }
  }
};
</script>

<style scoped lang="scss">
.comments {
  margin-top: 60px;
  margin-bottom: 60px;

  &__body {
    font-size: 16px;
    line-height: 30px;
    color: $col-text;
  }

  &__header {
    padding-bottom: 15px;
    border-bottom: 1px solid $col-gray;
    margin-bottom: 15px;

    span {
      font-size: 14px;
      font-weight: 700;
    }
  }

  &__number {
    font-weight: 500;
  }

  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    width: 80%;
    border-bottom: 1px solid $col-gray;
  }

  &__avatar {
    width: 64px;
    height: 64px;
    margin-right: 16px;

    img {
      height: 100%;
      border-radius: 50%;
    }
  }

  &__author {
    font-size: 13px;
    font-weight: bold;
    color: $col-mid-gray;
    text-transform: uppercase;
  }
}
</style>
