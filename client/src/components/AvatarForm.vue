<template>
  <form class="avatar-form">
    <label class="avatar-form__label" for="avatar">Upload avatar</label>
    <input
      class="avatar-form__input"
      ref="input"
      @change="handleChange"
      type="file"
      id="avatar"
    />
  </form>
</template>

<script>
import { updateAvatar, getAvatar } from '../services/user.service';

export default {
  name: 'AvatarForm',
  methods: {
    async handleChange(e) {
      const response = await updateAvatar(e.target.files[0]);
      this.$store.dispatch('updateAvatar', response.data);
      this.$refs.input.value = '';
    }
  }
};
</script>

<style scoped lang="scss">
.avatar-form {
  margin-bottom: 60px;

  &__label {
    width: 400px;
    height: 400px;
    border: 2px dashed $col-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
  }

  &__input {
    display: none;
  }
}
</style>
