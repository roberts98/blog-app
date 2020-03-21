<template>
  <form @submit.prevent="handleSubmit">
    <Input v-model="title" placeholder="Title" id="title" label="Title*" type="title" />
    <Input v-model="body" placeholder="Body" id="body" label="Body*" type="body" />
    <Button type="submit" variant="primary">Create Post</Button>
  </form>
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
      body: ''
    };
  },
  methods: {
    handleSubmit() {
      const { title, body } = this;
      const post = {
        title,
        body
      };
      this.$store.dispatch('posts/addPost', post);
    }
  }
};
</script>