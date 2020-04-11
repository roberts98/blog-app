<template>
  <div class="avatar">
    <img class="avatar__img" :src="`/files/${avatar}`" />
    <form class="avatar-form">
      <label class="avatar-form__label" for="avatar">Avatar</label>
      <input @change="handleChange" type="file" id="avatar" />
    </form>
  </div>
</template>

<script>
import { updateAvatar, getAvatar } from '../services/user.service';

export default {
  name: 'AvatarForm',
  data() {
    return {
      avatar: null
    };
  },
  methods: {
    async handleChange(e) {
      const response = await updateAvatar(e.target.files[0]);
    }
  },
  async mounted() {
    const response = await getAvatar();
    this.avatar = response.data;
  }
};
</script>

<style scoped lang="scss">
.avatar {
  &__img {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    object-fit: contain;
  }
}
</style>
