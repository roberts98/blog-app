<template>
  <div class="post">
    <h2 class="post__title">
      <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
      <span class="post__author">
        written by
        <span class="post__username">{{ post.user.username }}</span>
      </span>
    </h2>
    <p class="post__date">Published: {{ post.createdAt | formatDate }}</p>
    <div class="post__thumbnail">
      <img :src="post.thumbnail" :alt="post.title" />
    </div>
    <p class="post__body">{{ post.summary }}</p>
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
  padding: 20px 40px;
  margin-top: 20px;

  &__title {
    font-size: 32px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 8px;

    a {
      text-decoration: none;
      color: $col-dark-gray;
    }
  }

  &__author {
    font-size: 20px;
    text-transform: none;
    font-style: italic;
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
      background-image: url("data:image/svg+xml,%3Csvg fill='%23777' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z'/%3E%3C/svg%3E");
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
      width: 400px;
      height: 200px;
      object-fit: cover;
    }
  }

  &__body {
    line-height: 2;
  }
}
</style>
