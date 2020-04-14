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
      <Button class="user__btn" type="submit" variant="primary">Submit</Button>
    </form>
    <h2 class="user__header">Upload avatar</h2>
    <AvatarForm />
  </div>
</template>

<script>
import { updateUserInfo } from '../services/user.service';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import AvatarForm from '../components/AvatarForm';

export default {
  name: 'ProfileEdit',
  components: {
    Input,
    Button,
    AvatarForm
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
        return this.$toasted.show(`Passwords don't match`, {
          type: 'error'
        });
      }

      if (this.password === this.oldPassword) {
        return this.$toasted.show(
          `Old password cannot be the same as new password!`,
          {
            type: 'error'
          }
        );
      }

      const data = {
        oldPassword: this.oldPassword
      };

      if (this.password) data.password = this.password;
      if (this.bio) data.bio = this.bio;

      try {
        const response = await updateUserInfo(data);
        this.$toasted.show('Profile succesfully updated!', {
          type: 'success'
        });
        this.bio = this.oldPassword = this.password = this.rePassword = '';
      } catch (error) {
        if (error.response.status === 400) {
          error.response.data.message.forEach(message => {
            Object.keys(message.constraints).forEach(key => {
              this.$toasted.show(message.constraints[key], {
                type: 'error'
              });
            });
          });
        }

        if (error.response.status === 401) {
          this.$toasted.show(error.response.data.message, {
            type: 'error'
          });
        }

        if (error.response.status === 422) {
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

<style>
.user__header--small {
  font-size: 24px;
}

.user__btn {
  margin-bottom: 32px;
}
</style>
