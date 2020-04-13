<template>
  <div class="register">
    <Box title="Register" :img="image">
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
        <Input
          v-model="rePassword"
          placeholder="Repeat password"
          id="password-repeat"
          label="Re-Password*"
          type="password"
          :className="{ error: passwordError }"
        />
        <Button type="submit" variant="primary">Sign up</Button>
      </form>
    </Box>
  </div>
</template>

<script>
import { register } from '../services/auth.service';
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
      passwordError: false,
      usernameError: false
    };
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.rePassword) {
        this.passwordError = true;
        return this.$toasted.show(`Passwords don't match`, {
          type: 'error'
        });
      }

      try {
        await register(this.username, this.password);
        this.username = this.passowrd = this.rePassword = '';
        this.$toasted.show('Registered succesfully!', {
          type: 'success'
        });
        this.$router.push('/login');
      } catch (error) {
        if (error.response.status === 500) {
          return this.$toasted.show(error.response.data.error, {
            type: 'error'
          });
        }

        const message = error.response.data.message;
        if (error.response.status === 409) {
          this.usernameError = true;
          return this.$toasted.show(message, {
            type: 'error'
          });
        }
        // If validation fails due to validation pipe
        message.forEach(error => {
          Object.keys(error.constraints).forEach(key => {
            const errorMessage = error.constraints[key];
            this.$toasted.show(errorMessage, {
              type: 'error'
            });
          });
        });
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
