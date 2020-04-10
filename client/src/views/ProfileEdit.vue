<template>
  <div class="container user">
    <h2 class="user__header">Edit profile info</h2>
    <form @submit.prevent="handleSubmit" class="edit-form">
      <Input
        v-model="oldPassword"
        placeholder="Old password"
        id="old-password"
        label="Old Password*"
        type="password"
      />
      <h2 class="user__header user__header--small">Change password</h2>
      <Input
        v-model="password"
        placeholder="New password"
        id="new-password"
        label="New Password*"
        type="password"
        ref="newPassword"
      />
      <Input
        v-model="rePassword"
        placeholder="Retype new password"
        id="new-re-password"
        label="Retype new Password*"
        type="password"
        ref="newRePassword"
      />
      <h2 class="user__header user__header--small">Change biography</h2>
      <Input
        v-model="bio"
        placeholder="Tell me who you are :)"
        id="biography"
        label="Biography*"
        type="text"
      />
      <Button type="submit" variant="primary">Submit</Button>
    </form>
  </div>
</template>

<script>
import { updateUserInfo } from '../services/user.service';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';

export default {
  name: 'ProfileEdit',
  components: {
    Input,
    Button
  },
  data() {
    return {
      errors: [],
      oldPassword: '',
      password: '',
      rePassword: '',
      bio: ''
    };
  },
  methods: {
    async handleSubmit(e) {
      if (this.password !== this.rePassword) {
        this.errors.push('The password must be the same as re-password');
        this.$refs['newPassword'].$el
          .querySelector('input')
          .classList.add('error');
        this.$refs['newRePassword'].$el
          .querySelector('input')
          .classList.add('error');
      }

      const data = {
        password: this.password,
        oldPassword: this.oldPassword,
        bio: this.bio
      };

      const response = await updateUserInfo(data);
    }
  }
};
</script>

<style>
.user__header--small {
  font-size: 24px;
}
</style>
