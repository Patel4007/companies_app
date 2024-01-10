<template>
<body>
      <div class="container">
        <form class="contact">
          <div style="font-size: 25px; font-weight: bold; position: relative; z-index: 1; margin-right: 10px;">Password Recovery</div>
          <p style="position: relative; z-index: 1; margin-right: 10px; font-size: 14px;">Enter your email address to verify and reset your password</p>
          <input style="margin-top: 15px;" type="email" name="email" placeholder="Email" class="contact-input" required>
          <button type="submit" style="position: relative; z-index: 1;">Submit</button>
          <div style="margin-top: 40px; font-size: 15px; margin-right: 7px;">
            <router-link to="/login" style="color: black; font-weight: bold; text-decoration: underline; margin-left: 10px; text-transform: uppercase;">back to Login Page</router-link>
          </div>
        </form>
      </div>
    </body>
</template>

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