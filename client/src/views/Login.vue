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
        <Button type="submit" variant="primary">Sign in</Button>
      </form>
    </Box>
  </div>
</template>

<script>
import { login } from '../services/auth.service';
import Box from '../components/Box';
import Input from '../components/Input';
import Button from '../components/Button';
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
  methods: {
    async handleSubmit() {
      try {
        await login(this.username, this.password);
        this.username = this.passowrd = '';
        this.$router.push('/');
      } catch (error) {        
        this.error = error;
      }
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
