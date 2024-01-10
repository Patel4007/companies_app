<template>
    <body>
      <div class="container">
    <form class="contact" @submit.prevent="login">
      <div style="font-size: 30px; font-weight: bold; position: relative; z-index: 1; margin-right: 10px;">Login</div>
      <input type="email" name="email" placeholder="Email" class="contact-input" v-model="formData.email" required>
      <div class="password-input-container">
        <input :type="showPassword ? 'text' : 'password'" name="password" placeholder="Password" class="contact-input" v-model="formData.password" required @input="handlePasswordInput">
        <span v-if="showPasswordSymbol" class="password-toggle" @click="togglePasswordVisibility">{{ showPassword ? 'Hide' : 'Show' }}</span>
      </div>
      <div style="margin-top: 10px; margin-right: 162px; font-size: 15px;"><router-link to="/forgotpassword">Forgot Password?</router-link></div>
      <button type="submit" style="position: relative; z-index: 1;">Login</button>
      <div style="margin-top: 40px; font-size: 15px; margin-right: 7px;">
        New User?<router-link to="/signup" style="color: black; font-weight: bold; text-decoration: underline; margin-left: 10px; text-transform: uppercase;">Sign up</router-link>
      </div>
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
      showPasswordSymbol: false,
      formData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    handlePasswordInput() {
      this.showPasswordSymbol = true;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.formData.email, 
          password: this.formData.password,
        });
        if (response.status === 200) {
          console.log('login successful');
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('email', response.data.email);
          sessionStorage.setItem('username', response.data.username);
          console.log(response.data.token);
          console.log(response.data.username);
          console.log(response.data.email);
          router.push({ name: 'home'});
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
    forgotPassword() {
      console.log('Forgot Password?');
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
    margin-top: 5px;
  }
  
  .password-input-container {
    position: relative;
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