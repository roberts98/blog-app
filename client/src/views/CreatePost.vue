<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <Input v-model="title" placeholder="Title" id="title" label="Title*" type="text" />
      <Input v-model="body" placeholder="Body" id="body" label="Body*" type="text" />
      <Input v-model="summary" placeholder="Summary" id="summary" label="Summary*" type="text" />
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
</template>

<script>
import { mapState } from 'vuex';

import Input from '../components/Input';
import Button from '../components/Button';

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
      this.$store.dispatch('posts/addPost', post);
    }
  }
};
</script>