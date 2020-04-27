<template>
  <div class="slider">
    <Carousel :per-page="1" paginationPosition="bottom-overlay">
      <slide :key="post.id" v-for="post in posts">
        <div class="slider__img">
          <img :src="post.thumbnail" />
        </div>
        <div class="slider__content">
          <p class="slider__author">{{ post.user.username }}</p>
          <h3 class="slider__title">{{ post.title }}</h3>
          <router-link :to="`/post/${post.id}`">
            <Button variant="white--outline">Read the article</Button>
          </router-link>
        </div>
      </slide>
    </Carousel>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';

import { getSliderPosts } from '../../services/posts.service';
import Button from '../shared/Button';

export default {
  name: 'Slider',
  components: {
    Carousel,
    Slide,
    Button
  },
  data() {
    return {
      posts: []
    };
  },
  methods: {
    async getPosts() {
      try {
        const response = await getSliderPosts();
        this.posts = response.data.posts;
      } catch (error) {
        if (error.response.status === 404) {
          this.$toasted.show(error.response.data.message, {
            type: 'error'
          });
        }

        if (error.response.status === 500) {
          this.$toasted.show(error.response.data.statusText, {
            type: 'error'
          });
        }
      }
    }
  },
  mounted() {
    this.getPosts();
  }
};
</script>

<style lang="scss">
.slider {
  margin-top: -80px;

  &__img {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba($col-primary, 0.6);
    }
    img {
      max-height: 60vh;
      width: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  &__author {
    text-align: center;
    font-size: 14px;
    text-transform: uppercase;
    color: $col-white;
    display: inline-block;
    padding: 5px 20px;
    letter-spacing: 1px;
    background-color: rgba($col-white, 0.35);
    font-weight: 600;
  }

  &__title {
    color: $col-white;
    font-size: 52px;
    font-weight: 400;
    margin-top: 10px;
    max-width: 700px;
    word-break: break-all;
  }
}

.VueCarousel-slide {
  position: relative;
}
</style>
