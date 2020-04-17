<template>
  <div @click="onClick" class="avatar" v-if="avatar">
    <img class="avatar__img" :src="avatar" alt="avatar" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { getAvatar } from '../../services/user.service';

export default {
  name: 'Avatar',
  props: ['onClick'],
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
  cursor: pointer;

  &__img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>
