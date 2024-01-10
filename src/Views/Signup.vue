<template>
  <body>
    <div class="container">
      <form class="contact" @submit.prevent="submitForm">
        <div style="font-size: 30px; font-weight: bold; position: relative; z-index: 1; margin-right: 10px;">Register</div>
        <input type="text" name="username" id="username" placeholder="Username" class="contact-input" v-model="formData.username" required>
        <input type="email" name="email" id="email" placeholder="Email" class="contact-input" v-model="formData.email" required>
        <div class="password-input-container">
          <input ref="password" :type="showPassword ? 'text' : 'password'" id="password" name="password" placeholder="Password" class="contact-input" v-model="formData.password" required @input="handlePasswordInput('password')">
          <input ref="confirmPassword" :type="showconfirmPassword ? 'text' : 'password'" name="confirmPassword" placeholder="Confirm Password" class="contact-input" v-model="formData.confirmPassword" required @input="handlePasswordInput('confirmPassword')">
        </div>
        <button type="submit" style="position: relative; z-index: 1;">Sign Up</button>
        <div style="margin-top: 40px; font-size: 15px; margin-right: 7px;">Existing User?<router-link to="/login" style="color: black; font-weight: bold; text-decoration: underline; text-transform: uppercase; margin-left: 10px;">Login</router-link></div>
      </form>
    </div>
  </body>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  data() {
    return {
      showPassword: false,
      showconfirmPassword: false,
      showPasswordSymbol: false,
      showConfirmPasswordSymbol: false,
      formData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    handlePasswordInput(inputName) {
      if (inputName === 'password' && this.$refs.password.value !== '') {
        this.showPasswordSymbol = true;
      } else if (inputName === 'confirmPassword' && this.$refs.confirmPassword.value !== '') {
        this.showConfirmPasswordSymbol = true;
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showconfirmPassword = !this.showconfirmPassword;
    },
    login() {
      console.log('Logging in with email:', this.email, 'and password:', this.password);
    },
    forgotPassword() {
      console.log('Forgot Password?');
    },
    async submitForm() {
      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      try {
        const response = await axios.post('http://localhost:3000/api/signup', {
          username: this.formData.username,
          email: this.formData.email,
          password: this.formData.password
        });
        if (response.status >= 200 && response.status < 300) {
          router.push({ name: 'login'});
        } else {
          alert('Unexpected response status:', response.status);
        }
      } catch (error) {
        alert('Error saving data:', error);
      }
    },
  },
};
</script>

<style scoped>
body {
  background: linear-gradient(to top, #bbe1ee, #fdeeee);
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 89vh;
}

.contact {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 70px;
  background-color: rgb(242, 249, 255);
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.contact-input {
  width: 300px;
  height: 40px;
  padding-left: 10px;
  line-height: 5%;
  font-weight: 500;
  color: black;
  font-size: 17px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  position: relative;
  z-index: 1;
  margin-top: 10px;
}

.contact-input:focus {
  border: 2px solid blue;
}

.contact button {
  display: flex;
  align-items: center;
  padding: 5px 60px;
  font-size: 16px;
  border: 1px solid rgb(50, 132, 255);
  color: white;
  background-color: rgb(6, 106, 255);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  margin-top: 20px;
}

.password-input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.password-input-container input[type="checkbox"] {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>