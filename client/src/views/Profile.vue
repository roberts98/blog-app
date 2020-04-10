<template>
  <div v-if="user" class="container user">
    <div class="user__content">
      <section class="user__section user__info">
        <h2 class="user__header">Basic info</h2>
        <div class="user__info__content">
          <div class="user__avatar">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
          </div>
          <h2 class="user__name">{{ user.username }}</h2>
        </div>
        <div class="user__bio">{{ user.bio }}</div>
      </section>
      <div class="user__twoCol">
        <section v-if="user.posts.length > 0" class="user__section user__posts">
          <h2 class="user__header">Last Posts</h2>
          <ul class="user__list listReset">
            <li class="user__item" :key="post.id" v-for="post in user.posts">
              <router-link class="user__itemTitle" :to="`/post/${post.id}`">
                <p>{{ post.title }}</p>
              </router-link>
              <span class="user__itemDate">{{
                post.createdAt | formatDate
              }}</span>
            </li>
          </ul>
        </section>
        <section
          v-if="user.comments.length > 0"
          class="user__section user__comments"
        >
          <h2 class="user__header">Last comments</h2>
          <ul class="user__list listReset">
            <li
              class="user__item"
              :key="comment.id"
              v-for="comment in user.comments"
            >
              <router-link
                class="user__itemTitle"
                :to="`/post/${comment.postId}`"
              >
                <p>{{ comment.body }}</p>
              </router-link>
              <span class="user__itemDate">{{
                comment.createdAt | formatDate
              }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser } from '../services/user.service';
export default {
  name: 'Profile',
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    const response = await getUser();
    this.user = response.data;
  }
};
</script>

<style lang="scss">
.user {
  margin-top: 60px;

  &__content {
    max-width: 70%;
  }

  &__section {
    margin-bottom: 40px;
  }

  &__twoCol {
    display: flex;
    justify-content: space-between;
  }

  &__header {
    font-size: 30px;
    font-weight: 400;
    text-transform: uppercase;
    margin: 0;

    &::after {
      content: '';
      display: block;
      height: 3px;
      width: 80px;
      margin-top: 10px;
      margin-bottom: 20px;
      background-color: $col-primary;
    }
  }

  &__info {
    &__content {
      display: flex;
      align-items: center;
    }
  }

  &__avatar {
    margin-right: 32px;

    img {
      height: 100px;
      width: 100px;
    }
  }

  &__bio {
    margin-top: 20px;
    line-height: 32px;
    padding-left: 30px;
    border-left: 3px solid $col-mid-gray;
  }

  &__item {
    position: relative;

    &Title {
      text-decoration: none;
      color: $col-text;

      &:hover {
        & + span {
          display: flex;
        }
      }
    }

    &Date {
      display: none;
      width: 200px;
      height: 30px;
      align-items: center;
      background-color: $col-light-2;
      padding-left: 20px;
      position: absolute;
      top: -25px;
      left: 0;
      transform: translateY(-50%);
      font-style: italic;
      font-size: 12px;
      font-weight: bold;
    }
  }
}
</style>
