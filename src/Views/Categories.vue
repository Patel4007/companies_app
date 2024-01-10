<template>
    <body>
        <section class="section__container header__container" id="book">
        <div class="header__image__container">
            <div class="header__content">
                <p></p>
            </div>
            <div class="search__container">
                <form action="" id="myform" onsubmit="return false">
                    <div class="form__group">
                        <input v-model="searchText" id="searchbox" class="show" placeholder="Search Business Services">
                    </div>
                    <button type="submit" class="btn"><font-awesome-icon class="icon" :icon="['fas', 'search']" @mouseover="isHovered = true"
      @mouseleave="isHovered = false" /></button>
                </form>
            </div>
        </div>
    </section>

    <div class="container">
        <div class="product" v-for="company in paginatedCompanies" :key="company.id" @click="navigateToCompany(company.id, company.user_id)">
  <div class="package-block col-lg-4 col-md-6 col-sm-12" id="male">
    <div class="inner-box">
      <div class="image-box">
        <div class="image">
            <a><img :src="company.company_logo_url" alt=""></a>
        </div>
      </div>
    
      <div class="lower-box">
        <div class="location" style="margin-top: -30px;">{{ company.company_name }}</div>
        <div class="info clearfix">
          <div class="duration" style="margin-top: 20px;">{{ company.company_location }}</div>
        </div>
        <div class="bottom-box clearfix"></div>
      </div>
    </div>
  </div>
</div>
</div>

<div v-if="totalPages > 1" class="pagination" style="margin-bottom: 30px;">
      <button @click="navigate('left')" :disabled="currentPage === 1"><i class="fa-solid fa-arrow-left custom-arrow"></i></button>
      <span style="font-size: 18px; margin-left: 20px; margin-right: 20px;">{{ currentPage }}   -  {{ totalPages }}</span>
      <button @click="navigate('right')" :disabled="currentPage === totalPages"><i class="fa-solid fa-arrow-right custom-arrow"></i></button>
    </div>
  
    <!--<div class="arrow-keys">
      <button @click="navigate('left')">
        <img src="../assets/left_arrow.png" alt="Left Arrow">
      </button>
      <button @click="navigate('right')">
        <img src="../assets/right_arrow.png" alt="Right Arrow">
      </button>
    </div>-->
    </body>
</template>

<script>
import axios from 'axios';
import router from '../router';
import CryptoJS from 'crypto-js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';

library.add(faSearch);

export default {

  data() {
        return {
            companies: [],
            currentPage: 1,
            itemsPerPage: 4, 
            isHovered: false,
            searchText: '',
        }
    },

    computed: {
      paginatedCompanies() {
      // Filter companies based on searchText
      const filteredCompanies = this.companies.filter(company =>
        company.company_name.toLowerCase().includes(this.searchText.toLowerCase())
      );
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return filteredCompanies.slice(startIndex, startIndex + this.itemsPerPage);
    },
    totalPages() {
      // Calculate total pages based on filtered companies
      return Math.ceil(this.companies.filter(company =>
        company.company_name.toLowerCase().includes(this.searchText.toLowerCase())
      ).length / this.itemsPerPage);
    },
  },

  components: {
    FontAwesomeIcon,
  },

  methods: {

    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/getData');
        this.companies = response.data;
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async navigateToCompany(id, user_id) {

const encryptionKey = '7a1e2b3c4d5f6a7b8c9d0e1f2a3b4c5d7a1e2b3c4d5f6a7b8c9d0e1f2a3b4c5';

const encryptedID = CryptoJS.AES.encrypt(id.toString(), encryptionKey).toString();
const encrypteduserID = CryptoJS.AES.encrypt(user_id.toString(), encryptionKey).toString();

try {
        router.push({ name: 'businesspage', params: { id: encryptedID, user_id: encrypteduserID } });
    } catch (error) {
        console.error('Error sending encrypted ID:', error);
    }
},

navigate(direction) {
  if (direction === 'left') {
    this.currentPage = Math.max(1, this.currentPage - 1);
  } else if (direction === 'right') {
    this.currentPage = Math.min(this.totalPages, this.currentPage + 1);
  }
},

    handleKeyPress(event) {
      if (event.keyCode === 37) { 
        this.navigate('left');
      } else if (event.keyCode === 39) { 
        this.navigate('right');
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.fetchData();
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
}
</script>

<style scoped>

:root {
  --primary-color: #2c3855;
  --primary-color-dark: #435681;
  --text-dark: #333333;
  --text-light: #767268;
  --extra-light: #f3f4f6;
  --white: #ffffff;
  --bg-color: #fff;
  --text-color: #221314;
  --second-color: #5a7184;
  --main-color: #1067cc;
  --big-font: 6rem;
  --h2-font: 3rem;
  --p-font: 1.1rem;
}

body {
    margin: 0;
    padding: 0;  
    background-color: #e9e9e9;
    height: 80vh;
}

header {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  padding: 30px 18%;
  transition: ease .40s;
}

.logo {
  font-size: 35px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--bg-color);
}

.navbar {
  display: flex;
}

.navbar li {
  list-style-type: none;
}

.navbar a {
  color: var(--bg-color);
  font-size: var(--p-font);
  font-weight: 500;
  padding: 10px 22px;
  border-radius: 4px;
  transition: ease .40s;
}

.navbar a:hover {
  background: var(--bg-color);
  color: var(--text-color);
  box-shadow: 5px 10px 30px rgb(85 85 85 / 20%);
  border-radius: 4px;
}

#menu-icon {
  color: var(--bg-color);
  font-size: 300%;
  z-index: 10001;
  cursor: pointer;
  display: none;
}

header.sticky {
  background: var(--bg-color);
  padding: 10px 18%;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}

.sticky .logo {
  color: var(--text-color);
}

.sticky .navbar a {
  color: var(--text-color);
}

.sticky .navbar a:hover {
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 4px;
}

.section__container {
  max-width: var(--max-width);
  margin: auto;
  padding: 5rem 1rem;
  height: 300px;
  
}

.section__header {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-dark);
  text-align: center;
}

a {
  text-decoration: none;
}

img {
  width: 100%;
  display: flex;
}


.header__container {
  padding: 1rem 1rem 5rem 1rem;
}

.header__image__container {
  position: relative;
  min-height: 500px;
  
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 2rem;
}

.header__content {
  max-width: 600px;
  padding: 5rem 2rem;
}

.header__content h1 {
  margin-bottom: 1rem;
  font-size: 3.5rem;
  line-height: 4rem;
  font-weight: 600;
  color: var(--white);
}

.header__content p {
  color: var(--extra-light);
}

.search__container {
  position: absolute;
  left: 50%;
  margin-top: -175px;
  transform: translateX(-50%);
  width: calc(101.95% - 0rem);
  display: flex;
  align-items: center;
  background-color:  #e7e4e4;;
  gap: 1rem;
  padding: 3rem 2rem;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
}

.search__container form {
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5rem;
}

.search__container .input__group {
  width: 100%;
  position: relative;
}

.search__container label {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-dark);
  pointer-events: none;
  transition: 0.3s;
}

#searchbox {
  width: 600px;
  background-color: rgb(255, 255, 255);
}

#myform {
  margin-left: 135px;
}

.search__container input {
  width: 100%;
  padding: 10px 10px;
  font-size: 1rem;
  border: black round solid 2px;
  background-color: rgb(255, 255, 255);
  margin-top: 200px;
  margin-bottom: 10px;
  margin-right: -50px;
  color: var(--text-dark);
}

.search__container .form__group .show {
  margin-top: 2rem;
  margin-left: 20rem;
  font-size: 1rem;
  color: var(--text-light);
}

.icon {
  color: white;
  transform: translateY(-10px);
  width: 22px;
}

.custom-arrow {
  width: 58px;
  height: 27px;
  line-height: 26px;
  color: white;
  content: '\f061'; /* Unicode character for the arrow icon */
  font-family: 'Font Awesome 5 Free'; /* Font family for Font Awesome */
  font-weight: bolder; /* Font weight for solid style */
  color: #0077ff; /* White color for the arrow */
  font-size: 19px;
}

form .btn {
  padding: 1rem;
  font-size: 1.5rem;
  color: var(--white);
  background-color: #307ff5;
  cursor: pointer;
  margin-top: 32px;
  margin-left: -32px;
  width: 80px;
  height: 49px;
  transition: 0.3s;
}

form .btn:hover {
  background-color: black;
  cursor: default;
}

.is-hidden {
  display: none;
}

.popular__grid {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.popular__card {
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
}

.popular__card img {
  object-fit: fill;
}

.popular__content {
  padding: 1rem;
}

.popular__card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.popular__card__header h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
}

.popular__content p {
  color: var(--text-light);
}

.arrow-keys {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.arrow-keys button {
  width: 50px;
  height: 50px;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
}

.pagination {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.btn-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  margin-bottom: 20px;
}

.button {
  background-color: #1067cc;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 10px 15px;
  margin-top: 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
}

.buttons {
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  color: black;
  padding: 10px 15px;
  margin-top: 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
}

.main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 50px;
}

.footer {
  padding: 11px 0;
}

.list {
  width: 25%;
}

.list h4 {
  font-size: 21px;
  margin-left: 180px;
  color: var(--bg-color);
  margin-bottom: 50px;
  position: relative;
}

.list h4::before {
  content: "";
  position: absolute;
  height: 2px;
  width: 60px;
  left: 0;
  bottom: -10px;
  background: var(--bg-color);
}

.list li {
  list-style-type: none;
  margin-left: 180px;
}

.list ul li {
  margin-bottom: 20px;
}

.list ul li a {
  color: #ffffffbf;
  font-size: var(--p-font);
  display: block;
  transition: .3s;
}

.container {
    margin-left: 43px;
    display: flex;
    flex-wrap: wrap;
    margin-top: -90px;
}


.product {
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 80px;
}

.package-block {
  width: 330px;
  height: 200px;
}

.image-box .inner-box {
  width: 330px;
}

.image-box .image img {
  
  height: 200px;
  width: 329px;
}

.lower-box {
  height: 100px;
}

.deals {

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 80px;

}

.deals-block .image-box {
    position: relative;
    width: 300px;
    height: 200px;
    overflow: hidden;
}

.deals-block .inner-box {
    position: relative;
    display: block;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.22);
    min-height: 50%;
}

.deals-block .image-box .image{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover; 
    background-position: center;
  }

  .deals-block .image-box .image img{
    position: relative;
    width: 100%;
    transition: all 0.5s ease;
  }
  
  .deals-block .inner-box:hover .image img{
      
      transform: scale(1.05);
  }
  
  .deals-block .image-box .b-title{
    position: absolute;
    left: 12px;
    top: 15px;
    z-index: 5;
  }
  
  .deals-block .image-box .b-title span{
    position: relative;
    display: inline-block;
    line-height: 22px;
    padding: 2px 10px;
    font-size: 12px;
    text-transform: uppercase;
    font-family: 'Gilroy_Bold', sans-serif;
    color: #2d3434;
    background: #ffc322;
    border-radius: 3px;
  }
  
 
  
  .deals-block .inner-box:hover .p-icon{
      -webkit-animation: icon-bounce 0.8s ease-out infinite;
      animation: icon-bounce 0.8s ease-out infinite;
  }
  
  .deals-block .image-box .fav-btn{
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 5;
  }
  
  .deals-block .image-box .fav-btn a{
    position: relative;
    display: block;
    line-height: 24px;
    color: #ffffff;
    font-size: 21px;
    opacity: 0.50;
  }
  
  .deals-block:hover .image-box .fav-btn a{
    opacity: 1;
  }
  
  .deals-block .image-box .fav-btn a:hover{
    color: #ff5522;
  }
  
  .deals-block .lower-box{
    position: relative;
    display: block;
    padding: 30px 30px 0;
  }
  
  .deals-block.alt .lower-box{
    padding-top: 25px;
  }
  
  .deals-block .lower-box .p-icon{
    position: absolute;
    top: -36px;
    right: 30px;
    width: 90px;
    height: 72px;
    z-index: 5;
  }
  
  .deals-block .lower-box .p-icon img{
    max-height: 40px;
  }
  
  .deals-block .lower-box .location{
    position: relative;
    font-weight: 400;
    color: black;
    text-decoration: solid;
    font-weight: 800;
    font-family: Verdana, Geneva, Tahoma, sans-serif; 
    margin-bottom: 10px;
  }
  
  .deals-block.alt .lower-box .location{
    margin-bottom: 5px;
  }
  
  .deals-block .lower-box h5{
    position: relative;
    font-weight: 400;
    color: #2d3434;
    margin-bottom: 20px;
  }
  
  .deals-block h5 a{
    color: #2d3434;
  }
  
  .deals-block h5 a:hover{
    color: var(--main-color);
  }
  
  .deals-block .lower-box .info{
    position: relative;
    font-size: 14px;
    line-height: 20px;
  }



.divider {
            border-top: 1px solid rgba(252, 252, 252, 0.945);; 
            margin: 20px 0; 
        }

.image {
    display: inline-block;
    text-align: center;
}

.image img:hover {
    
    filter: brightness(1.2);
    
}

.image h2 {
    font-size: 18px;
    text-align: center;
    
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.duration {
    font-size: 16px;
    margin-top: 30px;
}

.bottom-box {
    padding-bottom: -40px;
    height: 5px;
}
    
</style>    