<template>
  <div class="post">
    <div class="post__thumbnail">
      <img :src="post.thumbnail" :alt="post.title" />
    </div>
    <div class="post__content">
      <p class="post__date">Published: {{ post.createdAt | formatDate }}</p>
      <h2 class="post__title">
        <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
      </h2>
      <p class="post__body">{{ post.summary }}</p>
      <div class="post__author">
        <img :src="post.user.avatar" :alt="post.user.username" />
        <p>{{ post.user.username }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['post']
};
</script>

<style scoped lang="scss">
.post {
  background-color: $col-white;
  box-shadow: 1px 2px 4px rgba($col-black, 0.4);

  &__content {
    padding: 10px 20px;
  }

  &__title {
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 8px;
    word-break: break-all;

    a {
      text-decoration: none;
      color: $col-text;
    }
  }

  &__author {
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
  }

  &__username {
    color: $col-primary;
  }

  &__date {
    text-transform: uppercase;
    color: $col-mid-gray;
    font-style: italic;
    font-size: 12px;
    position: relative;
    padding-left: 25px;

    &::before {
      content: '';
      background-image: $i-time;
      background-size: contain;
      position: absolute;
      left: 0;
      top: -5px;
      width: 20px;
      height: 20px;
    }
  }

  &__thumbnail {
    img {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
    }
  }

  &__body {
    line-height: 2;
    font-size: 14px;
  }
}
</style>
