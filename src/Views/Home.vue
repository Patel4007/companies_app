<template>
    <body>
      <h2>Top Services</h2>
      <br>
      <button class="all_option" :class="{ selected: selectedOption === 'All' }" @click="filterContent('All')">All</button>
      <button class="option1" :class="{ selected: selectedOption === 'Cleaning' }" @click="filterContent('Cleaning')">House Cleaning</button>
      <button class="option2" :class="{ selected: selectedOption === 'Plumbing' }" @click="filterContent('Plumbing')">Plumbing</button>
      <button class="option3" :class="{ selected: selectedOption === 'Gardening' }" @click="filterContent('Gardening')">Gardening</button>
      <br><br><br>
      <div class="container">
        <div class="product" v-for="company in filteredCompanies" :key="company.id" @click="navigateToCompany(company.id, company.user_id)">
  <div class="package-block col-lg-4 col-md-6 col-sm-12" id="male">
    <div class="inner-box">
      <div class="image-box">
        <div class="image" style=" width: 460px;">
            <a><img :src="company.company_logo_url" alt=""></a>
        </div>
      </div>
    
      <div class="lower-box">
        <div class="location">{{ company.company_name }}</div>
        <div class="info clearfix">
          <div class="duration">{{ company.company_location }}</div>
        </div>
        <div class="bottom-box clearfix"></div>
      </div>
    </div>
  </div>

</div>
</div>
     <div style="margin-top: 70px; margin-left: 770px; cursor: pointer;" @click="servicesPage()">
        <p style="font-size: 20px; color: black; font: bolder; width: 170px;">View More <i class="fa-solid fa-arrow-right custom-arrow"></i></p>
     </div>
    <div class="divider"></div>
    <br>
    <h2>Best Deals near you</h2>
    <br>
    <div class="container">

        <div class="deals">
       
       <div class="deals-block col-lg-4 col-md-6 col-sm-12" id="male" @click="businessPage()">
                   <div class="inner-box">
                       <div class="image-box" @click="businessPage()">
                           <div class="image" @click="businessPage()" style=" width: 460px;"><a><img src="../images/helping-hands.jpg" alt=""></a></div>
                       </div>
                       <div class="lower-box">
                           
                           <div class="location">Helping Hands</div>
                           <div class="info clearfix">
                               <div class="duration">Etobicoke, ON</div>
                               
                           </div>
                           <div class="bottom-box clearfix">
                            
                           </div>
                       </div>
                   </div>
               </div>
           </div>

           <div class="deals">
       
       <div class="deals-block col-lg-4 col-md-6 col-sm-12" id="male" @click="businessPage()">
                   <div class="inner-box">
                       <div class="image-box" @click="businessPage()">
                           <div class="image" @click="businessPage()" style=" width: 460px;"><a><img src="../images/helping-hands.jpg" alt=""></a></div>
                       </div>
                       <div class="lower-box">
                           
                           <div class="location">Helping Hands</div>
                           <div class="info clearfix">
                               <div class="duration">Etobicoke, ON</div>
                               
                           </div>
                           <div class="bottom-box clearfix">
                            
                           </div>
                       </div>
                   </div>
               </div>
           </div>

           <div class="deals">
       
       <div class="deals-block col-lg-4 col-md-6 col-sm-12" id="male" @click="businessPage()">
                   <div class="inner-box">
                       <div class="image-box" @click="businessPage()">
                           <div class="image" @click="businessPage()" style=" width: 460px;"><a><img src="../images/helping-hands.jpg" alt=""></a></div>
                       </div>
                       <div class="lower-box">
                           
                           <div class="location">Helping Hands</div>
                           <div class="info clearfix">
                               <div class="duration">Etobicoke, ON</div>
                               
                           </div>
                           <div class="bottom-box clearfix">
                            
                           </div>
                       </div>
                   </div>
               </div>
           </div>

           <div class="deals">
       
       <div class="deals-block col-lg-4 col-md-6 col-sm-12" id="male" @click="businessPage()">
                   <div class="inner-box">
                       <div class="image-box" @click="businessPage()">
                           <div class="image" @click="businessPage()" style=" width: 460px;"><a><img src="../images/helping-hands.jpg" alt=""></a></div>
                       </div>
                       <div class="lower-box">
                           
                           <div class="location">Helping Hands</div>
                           <div class="info clearfix">
                               <div class="duration">Etobicoke, ON</div>
                               
                           </div>
                           <div class="bottom-box clearfix">
                            
                           </div>
                       </div>
                   </div>
               </div>
           </div>

        <div style="float: right; margin-top: 230px; margin-left: 40px; font-size: 18px;"><p>View More <i class="fa-solid fa-arrow-right custom-arrow"></i></p></div>   
       
    </div>
    <br><br>
    <div class="divider"></div>
    
    <br><br><br>
    <div class="container">
        
    </div>
    <br><br>
    <div class="divider"></div>
    
    <br><br><br>
    <div class="container">
        
    </div>
    <footer class="main-footer style-two" id="contact">
        <div class="upper-section">
            <div class="auto-container">
                <div class="content-box">
                    <div class="row clearfix" style="display: flex;">
                        <div class="footer-column col-xl-4 col-lg-3 col-md-6 col-sm-12">
                            <div class="footer-widget about-widget">
                                <div class="footer-logo"><a href="index.html"><img src="LOGO HERE" alt=""></a></div>
                                <div class="footer-info">

                                    <div  class="footer-column col-lg-6 col-md-6 col-sm-12">
                                        <div class="footer-widget links-widget">
                                            <h4>Quick Links</h4>
                                            <div class="links">
                                                <ul>
                                                    <li><a href="#">Terms and Conditions</a></li>
                                                    <li><a href="#">Privacy Policy</a></li>
                                                    <li><a href="#">Cookie Policy</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 col-lg-6 col-md-6 col-sm-12">    
                            <div class="row clearfix" style="display: flex; padding: 20px 20px;">

                                

                                <div  class="footer-column col-lg-6 col-md-6 col-sm-12" style="padding-left: 100px; padding-right: 100px;">
                                    <div class="footer-widget links-widget">
                                        <h4>About Us</h4>
                                        <div class="links">
                                            <ul>
                                                <li><a href="#">About GrowMore</a></li>
                                                <li><a href="#">Resources</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="footer-column col-lg-6 col-md-6 col-sm-12" style="padding-right: 100px; padding-left: 100px;">
                                    <div class="footer-widget links-widget">
                                        <h4>Contact Info</h4>
                                        <div class="links">
                                            <ul>
                                                <li><a href="#">225, 260 John Garland Blvd</a></li>
                                                <li><a href="#">Toronto ON M9V 1N8</a></li>
                                                <li><a href="#">patel41100@gmail.com</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="footer-column col-lg-6 col-md-6 col-sm-12" style="padding-left: 50px;">
                                    <div class="footer-widget links-widget">
                                        <h4>Connect With Us</h4>
                                        <div class="links">
                                            
                                         <li><a href="https://www.linkedin.com/in/jay-patel4007"><img src="images/linkedin-logo.webp" alt="Linkedin profile" width="80px" height="80px"></a></li>
                                         <li><a href="https://github.com/Patel4007"><img src="images/github.png" alt="Github profile" width="65px" height="65px"></a></li>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</body>
   
</template>

<script>

import axios from 'axios';
import router from '../router';
import CryptoJS from 'crypto-js';
import serviceKeywords from '../assets/service_keywords.json';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
    
    data() {
        return {
            companies: [],
            filteredCompanies: [],
            selectedOption: 'All',
        }
    },

    mounted() {
      console.log(serviceKeywords);
      this.fetchData();
    },

    

    methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/getData');
        this.companies = response.data;
        this.filteredCompanies = this.companies;
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    filterContent(option) {
     
      if (option === 'All') {
        this.selectedOption = 'All';
        this.filteredCompanies = this.companies;
      } else {
        this.selectedOption = option;
        const keywords = serviceKeywords[option];
        if (!keywords) return;
        this.filteredCompanies = this.companies.filter(company =>
          this.containsKeyword(company.company_description, keywords)
        );
      } 
    },

    

    containsKeyword(description, keywords) {
      const lowerDescription = description.toLowerCase();
      console.log('Description:', description);
      console.log('Keywords:', keywords);
      for (let keyword of keywords) {
        console.log('Checking keyword:', keyword);
        if (lowerDescription.includes(keyword)) {
            console.log('Keyword found:', keyword);
          return true;
        }
      }
      return false;
    },
    async navigateToCompany(id, user_id) {

        if (id === null || user_id === null) {
    
            return;
        }

        const encryptionKey = '7a1e2b3c4d5f6a7b8c9d0e1f2a3b4c5d7a1e2b3c4d5f6a7b8c9d0e1f2a3b4c5';

        const encryptedID = CryptoJS.AES.encrypt(id.toString(), encryptionKey).toString();
        const encrypteduserID = CryptoJS.AES.encrypt(user_id.toString(), encryptionKey).toString();
    
        try {
            router.push({ name: 'businesspage', params: { id: encryptedID, user_id: encrypteduserID } });
            } catch (error) {
                console.error('Error sending encrypted ID:', error);
            }
    },
    servicesPage() {
      router.push('/Services');
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
    margin-left: 75px;
    margin-bottom: 10px;
    padding-top: 60px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-transform: uppercase;
    font-size: 21px;  
}

.all_option {
    margin-left: 70px;
    border: 2px #0077ff solid;
    padding: 8px 18px;
    border-radius: 20px;
    font-size: 14px;
    display: inline-flex;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}


.option1, .option2, .option3 {
    margin-left: 15px;
    border: 2px #0077ff solid;
    padding: 7px;
    border-radius: 20px;
    font-size: 14px;
    display: inline-flex;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.selected {
    background-color: #0077ff;
    color: white;
}

.all_option:hover {
    
    border: 3px #0077ff solid;
}

.option1:hover {
    
    border: 3px #0077ff solid;
}

.option2:hover {
    
    border: 3px #0077ff solid;
}

.option3:hover {
    
    border: 3px #0077ff solid;
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
    margin-top: 80px;
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


 

.custom-arrow::before {
  content: '\f061'; /* Unicode character for the arrow icon */
  font-family: 'Font Awesome 5 Free'; /* Font family for Font Awesome */
  font-weight: 900; /* Font weight for solid style */
  color: #0077ff; /* White color for the arrow */
  margin-left: 10px;
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