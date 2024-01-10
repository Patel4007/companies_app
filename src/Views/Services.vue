<template>
    <body>
      <h2 style="text-align: center; margin-top: 25px;">Top Services</h2>
      <br>
      <button class="option1">House Cleaning</button>
      <button class="option2">Plumbing</button>
      <button class="option3">Gardening</button>
      <br><br><br>
      <div class="container">
        
        <div class="product" v-for="(product, index) in products" :key="index" @click="businessPage()">
  <div class="package-block col-lg-4 col-md-6 col-sm-12" id="male">
    <div class="inner-box">
      <div class="image-box">
        <div class="image" style=" width: 460px;">
            <a><img :src="product.company_logo_url" alt=""></a>
        </div>
      </div>
      <div class="lower-box">
        <div class="location">{{ product.company_name }}</div>
        <div class="info clearfix">
          <div class="duration"><i class="fa fa-clock"></i>{{ product.company_location }}</div>
        </div>
        <div class="bottom-box clearfix"></div>
      </div>
    </div>
  </div>
</div>
</div>
</body>
</template>

<script>

import axios from 'axios';
import router from '../router'

export default {
    data() {
        return {
            products: [],
        }
    },

    mounted() {
      this.fetchData();
    },

    methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/getData?limit=3');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    businessPage() {
      router.push('/BusinessPage');
    },
  },
}

</script>

<style scoped>

body {
    margin: 0;
    padding: 0;  
    background-color: #e4f1ff;
}

h2 {
    margin-left: 60px;
    margin-bottom: 10px;
    padding-top: 60px;
    font-family:Arial, Helvetica, sans-serif;
    text-transform: uppercase;
    font-size: 26px;  
    font: 100;
}



.option1 {
    margin-left: 75px;
    border: 2px #0077ff solid;
    padding: 7px;
    border-radius: 20px;
    font-size: 14px;
    display: inline-flex;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.option2 {
    margin-left: 15px;
    border: 2px #0077ff solid;
    padding: 7px;
    border-radius: 20px;
    font-size: 14px;
    display: inline-flex;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.option3 {
    margin-left: 15px;
    border: 2px #0077ff solid;
    padding: 7px;
    border-radius: 20px;
    font-size: 14px;
    display: inline-flex;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.container {
    margin-left: 43px;
    display: flex;
    flex-wrap: wrap;
    margin-top: -70px;
}


.product {
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 80px;
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
    background-size: cover; /* Ensure the image covers the entire area */
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
.image img {

    height: 250px;
    width: 350px;
    
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

@media (max-width: 600px) {
    h2 {
        font-size: 20px;
    }

    .container {
        margin-left: 0;
        max-width: 50px; 
        display: list-item;
    }

    .image img {
        height: 250px; 
        width: 360px;
    }

    .image h2 {
        font-size: 15px;
    }
}

</style>