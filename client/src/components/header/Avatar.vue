<template>
  <div class="avatar" v-if="avatar">
    <router-link to="/profile">
      <img class="avatar__img" :src="avatar" alt="avatar" />
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { getAvatar } from '../../services/user.service';

export default {
  name: 'Avatar',
  computed: {
    ...mapGetters(['avatar'])
  },
  async mounted() {
    const response = await getAvatar();
    this.$store.dispatch('updateAvatar', response.data);
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  margin-right: 20px;
  &__img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>
