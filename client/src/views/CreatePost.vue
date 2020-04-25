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
        <label for="body">Body</label>
        <ckeditor :editor="editor" v-model="body" />
        <Input
          v-model="summary"
          placeholder="Summary"
          id="summary"
          label="Summary"
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
      thumbnail: '',
      editor: ClassicEditor
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

      if (title.length < 6) {
        return this.$toasted.show(
          'The title must be at least 6 characters long',
          {
            type: 'error'
          }
        );
      }

      this.$store.dispatch('addPost', post).then(() => {
        this.$store.state.posts.messages.forEach(message => {
          this.$toasted.show(message, {
            type: this.$store.state.posts.messageType
          });
        });
      });
    }
  }
};
</script>

<style lang="scss">
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

.ck-editor__editable {
  height: 300px;
}
</style>
