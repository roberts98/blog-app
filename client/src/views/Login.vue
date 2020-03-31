<template>
  <div class="login">
    <Box title="Sign in" :img="image">
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      <form @submit.prevent="handleSubmit">
        <Input
          v-model="username"
          placeholder="Enter username"
          id="username"
          label="Username*"
          type="text"
          :className="{ error: usernameError }"
        />
        <Input
          v-model="password"
          placeholder="Enter password"
          id="password"
          label="Password*"
          type="password"
          :className="{ error: passwordError }"
        />
        <Button type="submit" :disabled="isLoading" variant="primary"
          >Sign in</Button
        >
      </form>
    </Box>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Box from '../components/shared/Box';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import image from '../assets/images/laptop.png';

export default {
  name: 'Register',
  components: {
    Box,
    Input,
    Button
  },
  data: function() {
    return {
      image,
      username: '',
      password: '',
      rePassword: '',
      error: '',
      passwordError: '',
      usernameError: ''
    };
  },
  computed: mapState({
    isLoading: state => state.auth.isLoading
  }),
  methods: {
    async handleSubmit() {
      this.$store.dispatch('auth/login', {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style scoped lang="scss">
.error {
  border: 2px solid $col-red;
  padding: 10px 20px;
  margin-bottom: 40px;
}
</style>
