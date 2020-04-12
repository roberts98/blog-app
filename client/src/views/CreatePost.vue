<template>
  <section class="create-post">
    <div class="create-post__container container">
      <h1 class="create-post__title">
        <router-link to="/" class="create-post__back" />
        <span class="title">Add new post</span>
      </h1>
      <form class="create-post-form" @submit.prevent="handleSubmit">
        <Input
          v-model="title"
          placeholder="Title"
          id="title"
          label="Title*"
          type="text"
        />
        <label :for="id">Body</label>
        <wysiwyg id="body" v-model="body" />
        <Input
          v-model="summary"
          placeholder="Summary"
          id="summary"
          label="Summary*"
          type="text"
        />
        <Input
          v-model="thumbnail"
          placeholder="Thumbnail"
          id="thumbnail"
          label="Thumbnail*"
          type="text"
        />
        <Button type="submit" variant="primary">Create Post</Button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import Input from '../components/shared/Input';
import Button from '../components/shared/Button';

export default {
  name: 'CreatePost',
  components: {
    Input,
    Button
  },
  data: function() {
    return {
      title: '',
      body: '',
      summary: '',
      thumbnail: ''
    };
  },
  methods: {
    handleSubmit() {
      const { title, body, summary, thumbnail } = this;
      const post = {
        title,
        body,
        summary,
        thumbnail
      };

      this.$store.dispatch('addPost', post);
    }
  }
};
</script>

<style scoped lang="scss">
.create-post {
  margin-top: 60px;

  &__back {
    &::before {
      content: $i-back;
    }
  }

  &__title {
    font-weight: 400;

    .title {
      padding-left: 20px;
    }
  }
}
</style>
