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
import { updateAvatar, getAvatar } from '@/services/user.service';
import { allowedTypes } from '@/utils/avatar';

export default {
  name: 'AvatarForm',
  methods: {
    async handleChange(e) {
      try {
        const file = e.target.files[0];

        if (allowedTypes.indexOf(file.type) === -1) {
          return this.$toasted.show(
            'Allowed files extensions are: jpg, png, gif',
            {
              type: 'error'
            }
          );
        }

        if (file.size > 102400) {
          return this.$toasted.show('Maximum avatar size is 100kB', {
            type: 'error'
          });
        }

        const response = await updateAvatar(file);
        this.$store.dispatch('updateAvatar', response.data);
        this.$refs.input.value = '';
        window.scrollTo(0, 0);
        this.$toasted.show('Avatar successfully updated!', {
          type: 'success'
        });
      } catch (error) {
        if (error.response.status === 400) {
          this.$toasted.show(error.response.data.message, {
            type: 'error'
          });
        }

        if (error.response.status === 500) {
          this.$toasted.show(error.response.data.error, {
            type: 'error'
          });
        }
      }
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
