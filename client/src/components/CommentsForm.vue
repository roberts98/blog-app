<template>
  <div class="comment-form">
    <h3 class="comment-form__title">Add new comment</h3>
    <form @submit.prevent="handleSubmit" class="form">
      <Input v-model="body" placeholder="Write your comment" id="body" label="Body*" type="text" />
      <Button variant="primary" type="submit">Submit</Button>
    </form>
  </div>
</template>

<script>
import Input from './shared/Input';
import Button from './shared/Button';

export default {
  name: 'CommentsForm',
  components: {
    Input,
    Button
  },
  props: ['onSubmit'],
  data() {
    return {
      body: ''
    };
  },
  methods: {
    handleSubmit() {
      this.$props.onSubmit(this.body);
      this.body = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-form {
  margin-top: 40px;
  &__title {
    font-size: 20px;
    color: $col-text;
  }
}
</style>