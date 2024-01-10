<template>
    <div>
    <section class="inner-banner" id="search">
        <div class="image-layer" :style="{ backgroundImage: 'url(' + company.company_logo_url + ')' }"></div>
        <div class="content-box">
            <h1>{{ company.company_name }}</h1>
        </div>
        <div class="auto-container">
           
        </div>
    </section>
    <br><br><br>
    <div class="container">
    <h2 style="margin-left: 40px; font-size: 32px;">Our Services</h2>
    <br>
    <div class="desc">
    <p>We are a small plumbing company situated in the north of vaughan. For years, we have served our customers providing them 
        top-notch plumbing services in the town. Feel free to write to us or visit our website to know about the best deals.    
     </p></div>

     <div class="update-container" style="float: right;">
        
        
        <div class="contacts">
        <div class="title">
            <h2 style="text-align: center;">Important Updates</h2>
        </div>
        <div>
            <p>Store will remain closed on March 03, 2024</p>
            <br>
            <p>We have new plumbing gear in stock</p>
        </div>
        </div>
    
    </div>
   </div>
    
    <br><br><br>
    
    <div class="photo-cover">
    <h2 style="margin-left: 40px; font-size: 28px; margin-top: 200px;">Photo Gallery</h2>
    <div class="photo-wrapper">
      <div class="wrapper" style="margin-left: 30px; margin-top: 80px; margin-bottom: 50px;">
        <i id="left" class="fa-solid fa-angle-left" @click.stop="slide(-1)"></i>
      <div class="carousel" ref="carousel" v-if="company" @mousedown="dragStart" 
  @mousemove="dragging" @mouseup="dragStop" @touchend="dragStop">
  <img v-for="(imageUrl, index) in company.image_urls" :key="index" :src="imageUrl" alt="img" style="width: 320px; height: 220px;">
</div>
<div v-else>
  
  <p>No images available</p>
</div>

<i id="right" class="fa-solid fa-angle-right" @click.stop="slide(1)"></i>
      </div>
    </div>
    </div>

    <div class="company-info">
                                <div class="company_loc">Company Location</div>
                                <div class="company_address">{{ company.company_location }}</div>
                                <div class="company_contact">Contact Us</div>
                                <div class="contact_details"><strong style="text-transform: none; padding-right: 5px;">Email: </strong>{{ company.company_email }}</div>
                                <div class="phone_no"><strong style="text-transform: none; padding-right: 5px;">Phone: </strong>{{ company.company_contact }}</div>
                                </div>
                                
    
    <div class="content-side col-xl-8 col-lg-12 col-md-12 col-sm-12" id="location">
                        <div class="content-inner">
                            <div class="location" style=" margin-top: 70px; margin-left: 140px; width: 60rem;">
                                <div class="map-box">
                                    <iframe id="iframe-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d453478.8006792069!2d152.71300288692046!3d-27.38186310374308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b91579aac93d233%3A0x402a35af3deaf40!2sBrisbane%20QLD%2C%20Australia!5e0!3m2!1sen!2s!4v1679456478116!5m2!1sen!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    <div class="map-icon"><img src="images/resource/map-marker-2.png" alt=""></div>
                                </div>
                                
                            </div>
                            
                        </div>
                        </div>
<br><br><br><br>
    <div class="contact-container">
    <form class="contact"  @submit.prevent="submitForm">
        <div class="title">
            <h2>Get a Quote</h2>
            
        </div>
        
            <input type="text" name="name" placeholder="Subject" class="contact-input" v-model="formData.subject" required>
            <textarea type="message" placeholder="Your Message" class="contact-textarea"  v-model="formData.message" required></textarea>
            <button type="submit">Submit</button>
    </form>
    </div>
    <br><br><br><br>
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
                                            <h4>Company Location</h4>
                                            <div class="links">
                                                <ul>
                                                    <li><a href="#">{{ company.company_location }}</a></li>
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
                                        <h4>Business Timings</h4>
                                        <div class="links">
                                            <ul>
                                                <li>Mon - Fri: 9 AM - 5 PM</li>
                                                <li>Saturday: 10 AM - 2 PM</li>
                                                <li>Sunday: Closed</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="footer-column col-lg-6 col-md-6 col-sm-12" style="padding-right: 100px; padding-left: 100px;">
                                    <div class="footer-widget links-widget">
                                        <h4>Contact Info</h4>
                                        <div class="links">
                                            <ul>
                                                <li style="text-transform: lowercase;"><strong style="text-transform: none; padding-right: 5px;">Email: </strong>{{ company.company_email }}</li>
                                                <li style><strong style="text-transform: none; padding-right: 5px;">Phone: </strong> {{ company.company_contact }}</li>
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
    </div>

   

</template>

<script>

import axios from 'axios';
import CryptoJS from 'crypto-js';
import { jwtDecode } from 'jwt-decode';

export default {

    data() {
        return {
            formData: {
                subject: '',
                message: ''
            },
            company: {
                company_logo_url: ''
            }, 
            email: '',
            token: ''
            
        };
    },

   

    methods: {

        async submitForm() {

               try {

                    const token = sessionStorage.getItem('token');
                    if (!token) {
          
                        return;
                    }
        
                    const decodedToken = jwtDecode(token);
                    const user_id = decodedToken.userId;
                  

                const formData = new FormData();
                formData.append('subject', this.formData.subject);
                formData.append('message', this.formData.message);

                this.token = sessionStorage.getItem('token');
                this.formData.token = this.token;
                formData.append('token', this.formData.token);
                console.log(this.token);
               
                this.email = sessionStorage.getItem('email');
                this.formData.email = this.email;
                formData.append('email', this.formData.email);
                console.log('Stored email:', this.email);

                this.formData.company_email = this.company.company_email;
                formData.append('company_email', this.formData.company_email);

                this.formData.sender_id = user_id;
                formData.append('sender_id', this.formData.sender_id);

                this.formData.company_user_id = this.company.user_id;
                
                formData.append('receiver_id', this.formData.company_user_id);

                try {
        const response = await axios.post('http://localhost:3000/api/sendEmail', formData);
       
        const imageURLs = response.data.imageURLs; 
        this.formData.image_urls = imageURLs; 
        alert('Your message has been sent!');
      } catch (error) {
        alert('Error saving data:', error);
      }


            } catch(error) {
                console.error('Error sending message', error);
            }

        },


        async fetchImageUrls() {
  try {
   
    const encryptedID = this.$route.params.id;
    const encrypteduserID = this.$route.params.user_id;
    
    const encryptionKey = '7a1e2b3c4d5f6a7b8c9d0e1f2a3b4c5d7a1e2b3c4d5f6a7b8c9d0e1f2a3b4c5';

    const bytes = CryptoJS.AES.decrypt(encryptedID, encryptionKey);
    const bytesId = CryptoJS.AES.decrypt(encrypteduserID, encryptionKey);

    const decryptedID = bytes.toString(CryptoJS.enc.Utf8);
    const decrypteduserID = bytesId.toString(CryptoJS.enc.Utf8);
    console.log(decrypteduserID);
    

    const response = await axios.get(`http://localhost:3000/api/getData`);
   
    const company = response.data.find(item => item.id === decryptedID); 
        if (company) {
          this.company = company; 
          
          console.log('Company Data:', this.company);
        } else {
          console.error('Company not found');
        }
  } catch (error) {
    console.error('Error fetching image URLs:', error);
  }
},

    slide(direction) {
      const carousel = this.$refs.carousel;
      const firstImgWidth = carousel.querySelector("img").clientWidth + 14;
      carousel.scrollLeft += direction * firstImgWidth;
    },
    dragStart(event) {
      this.isDragStart = true;
      this.prevPageX = event.pageX || event.touches[0].pageX;
      this.prevScrollLeft = this.$refs.carousel.scrollLeft;
    },
    dragging(event) {
      if (!this.isDragStart) return;
      event.preventDefault();
      this.isDragging = true;
      this.$refs.carousel.classList.add("dragging");
      this.positionDiff = (event.pageX || event.touches[0].pageX) - this.prevPageX;
      this.$refs.carousel.scrollLeft = this.prevScrollLeft - this.positionDiff;
    },
    dragStop() {
      this.isDragStart = false;
      this.$refs.carousel.classList.remove("dragging");

      if (!this.isDragging) return;
      this.isDragging = false;
      this.autoSlide();
    },
    autoSlide() {
      const carousel = this.$refs.carousel;
      const scrollWidth = carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft - scrollWidth > -1 || carousel.scrollLeft <= 0) return;

      this.positionDiff = Math.abs(this.positionDiff);
      const firstImgWidth = carousel.querySelector("img").clientWidth + 14;
      const valDifference = firstImgWidth - this.positionDiff;

      if (carousel.scrollLeft > this.prevScrollLeft) {
        return carousel.scrollLeft += this.positionDiff > firstImgWidth / 3 ? valDifference : -this.positionDiff;
      }

      carousel.scrollLeft -= this.positionDiff > firstImgWidth / 3 ? valDifference : -this.positionDiff;
    }
  },

    mounted() {

        this.fetchImageUrls();


        this.$root.navbarBackgroundColor = 'transparent';
        this.$root.navbarPosition = 'absolute';
    }
};
</script>

<style scoped>

.container {
    position: relative;
}


.contact-container {
   
    display: flex;
    justify-content: space-evenly;
    background-color: rgb(255, 245, 226, 0.87);
    margin-top: 100px;
}

.desc {
    width: 1100px;
}

.desc p {
    font-size: 21px; 
    margin-left: 40px;
}

.update-container {
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    top: 200px;
    left: 20px;
    margin-right: 50px;
    margin-top: -200px;    
}

.photo-wrapper {
    background-color: rgb(235, 231, 228, 0.92);
    height: 360px;
    width: 1645px;
    overflow: hidden;
}

 .carousel {
    margin-top: -5px;
    margin-left: 290px;
    height: 220px; 
    transition: transform 0.5s ease; 
}


.carousel img {
    flex: 0 0 33.33%; /* Make each image take up one-third of the carousel width */
    height: auto; /* Maintain aspect ratio */
    object-fit: cover; /* Ensure images cover their container */
}

.photo-cover {
    width: 1100px;
}

#location {
    height: 400px;
}

.map-box {
    display: inline-block;
    position: relative;
    display: block;
    width: 65%;
    height: 450px;
    background: #e0e0e0;
    margin-top: -120px;
    margin-left: 50px;

}

.map-box iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
}

.map-box .map-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 60px;
    width: 60px;
    line-height: 60px;
    text-align: center;
    z-index: 5;
}

 .company-info {
    position: relative;
    margin-left: 1150px;/* Ensure the children are displayed side by side */
    margin-top: 250px;
    align-items: center; /* Align vertically */
}

.company_loc {
    position: absolute;
    top: -10px; /* Adjust the top position as needed */
    left: -140px; /* Adjust the left position as needed */
    font-size: 21px;
    font-weight: bold;
}

.company_address {
    position: absolute;
    top: 40px; /* Adjust the top position as needed */
    left: -140px; /* Adjust the left position as needed */
    font-size: 17px;
}

.company_contact {
    position: absolute;
    top: 120px; /* Adjust the top position as needed */
    left: -140px; /* Adjust the left position as needed */
    font-size: 21px;
    font-weight: bold;
}

.contact_details {
    position: absolute;
    top: 170px; /* Adjust the top position as needed */
    left: -140px; /* Adjust the left position as needed */
    font-size: 17px;
}

.phone_no {
  position: absolute;
  top: 210px; /* Adjust the top position as needed */
  left: -140px; 
  font-size: 17px;
}

.contact {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 20px;
    padding: 30px 70px;
    padding-top: 90px;
    margin-right: 30px;
    background-color: rgb(255, 245, 226);
}

.contacts {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 20px;
    border: 1px solid black;
    padding: 30px 70px;
    padding-top: 90px;
    margin-right: 30px;
    background-color: rgb(233, 232, 232);
}

.contact .title h2{
    margin-left: 222px; 
    font-size: 25px;
}

.title h2{
    font-weight: 600;
    color: black;
    font-size: 22px;
    text-align: center;
    margin-bottom: 5px;
    margin-top: -50px;
   
}

.contacts {
    margin-left: 1200px;
}

.contact-input {
    width: 600px;
    height: 50px;
    padding-left: 10px;
    line-height: 5%;
    font-weight: 500;
    color: black;
    font-size: 17px;
}

.contact-textarea{
    height: 350px;
    width: 600px;
    padding-top: 15px;
    padding-left: 10px;
    font-weight: 500;
    font-size: 17px;
    resize: none;
}

.contact-input:focus {
    border: 2px solid blue;
}

.contact-textarea:focus {
    border: 2px solid blue;
}

.contact-input::placeholder {
    color: #a9a9a9;
}

.contact-textarea::placeholder {
    color: #a9a9a9;
}

.contact button {
    display: flex;
    align-items: center;
    margin-left: 230px;
    margin-top: 15px;
    padding: 5px 40px;
    font-size: 15px;
    width: 140px;
    height: 40px;
    border: 1px solid rgb(50, 132, 255);
    color: white;
    background-color: rgb(6, 106, 255);
    border-radius: 50px;
}

.contact button:hover {
    background-color: black;
}

/* Adjustments for mobile */
@media screen and (max-width: 765px) {
  .container {
    padding: 10px;
  }

  .desc {
    width: 500px;
  }

  .desc p {
    font-size: 16px;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 24px;
    margin-left: 20px;
  }

  p {
    font-size: 10px;
    margin-left: 20px;
  }

  .update-container {
    margin-left: -100px;
    margin-top: -60px;
  }

  .contacts {
    width: 220px;
    height: 320px;
    margin-left: 200px;
  }

  .photo-cover {
    width: 500px;
  }

  .photo-wrapper {
    width: 100%;
    padding: 20px;
  }

  .wrapper {
    margin-left: 0;
  }

  .carousel {
    margin-left: 0;
    margin-top: -20px;
   
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    width: 400px;
    height: 300px;
  }

  .carousel img {
    width: auto;
    height: 200px;
    margin-right: 10px;
  }

  .company-info {
    margin: 20px auto;
    text-align: center;
  }

  .content-inner {
    margin-left: 0;
    width: 100%;
  }

  .map-box {
    margin: 0 auto;
    margin-left: -50px;
    width: 350px;
    height: 200px;
  }

  .contact-input,
  .contact-textarea {
    width: 220%;
    margin-left: -85px;
  }
  .contact button {
    margin-left: 300px;
  }

  .contact .title h2{
    font-size: 20px;
    margin-left: 55px;
  }

  .footer-column {
    padding: 0 10px;
  }

  .footer-column h4 {
    font-size: 20px;
  }

  .links {
    text-align: center;
  }

  .footer-column img {
    width: 50px;
    height: 50px;
  }

  .contact button {
    margin: 20px auto;
  }
}

@media screen and (max-width: 400px) {

  .inner-banner {
     width: 525px;
  } 

  .container {
    padding: 10px;
  }

  .desc {
    width: 500px;
  }

  .desc p {
    font-size: 16px;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 24px;
    margin-left: 20px;
  }

  p {
    font-size: 10px;
    margin-left: 20px;
  }

  .update-container {
    margin-left: -100px;
    margin-top: -60px;
  }

  .contacts {
    width: 220px;
    height: 320px;
    margin-left: 200px;
  }

  .photo-cover {
    width: 500px;
  }

  .photo-wrapper {
    width: 100%;
    padding: 20px;
  }

  .wrapper {
    margin-left: 0;
  }

  .carousel {
    margin-left: 0;
    margin-top: -20px;
   
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    width: 400px;
    height: 300px;
  }

  .carousel img {
    width: auto;
    height: 200px;
    margin-right: 10px;
  }

  .company-info {
    margin: 20px auto;
    text-align: center;
  }

  .content-inner {
    margin-left: 0;
    width: 100%;
  }

  .map-box {
    margin: 0 auto;
    margin-left: -50px;
    width: 350px;
    height: 200px;
  }

  .contact-input,
  .contact-textarea {
    width: 220%;
    margin-left: -85px;
  }
  .contact button {
    margin-left: 300px;
  }

  .contact .title h2{
    font-size: 20px;
    margin-left: 55px;
  }

  .footer-column {
    padding: 0 10px;
  }

  .footer-column h4 {
    font-size: 20px;
  }

  .links {
    text-align: center;
  }

  .footer-column img {
    width: 50px;
    height: 50px;
  }

  .contact button {
    margin: 20px auto;
  }
}

@media screen and (max-width: 450px) {

.inner-banner {
   width: 412px;
} 

.container {
  padding: 10px;
}

.desc {
  width: 500px;
}

.desc p {
  font-size: 16px;
}

h1 {
  font-size: 24px;
}

h2 {
  font-size: 24px;
  margin-left: 20px;
}

p {
  font-size: 10px;
  margin-left: 20px;
}

.update-container {
  margin-left: -100px;
  margin-top: -60px;
}

.contacts {
  width: 220px;
  height: 320px;
  margin-left: 200px;
}

.photo-cover {
  width: 500px;
}

.photo-wrapper {
  width: 100%;
  padding: 20px;
}

.wrapper {
  margin-left: 0;
}

.carousel {
  margin-left: 0;
  margin-top: -20px;
 
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  width: 400px;
  height: 300px;
}

.carousel img {
  width: auto;
  height: 200px;
  margin-right: 10px;
}

.company-info {
  margin: 20px auto;
  text-align: center;
}

.content-inner {
  margin-left: 0;
  width: 100%;
}

.map-box {
  margin: 0 auto;
  margin-left: -50px;
  width: 350px;
  height: 200px;
}

.contact-input,
.contact-textarea {
  width: 220%;
  margin-left: -85px;
}
.contact button {
  margin-left: 300px;
}

.contact .title h2{
  font-size: 20px;
  margin-left: 55px;
}

.footer-column {
  padding: 0 10px;
}

.footer-column h4 {
  font-size: 20px;
}

.links {
  text-align: center;
}

.footer-column img {
  width: 50px;
  height: 50px;
}

.contact button {
  margin: 20px auto;
}
}


</style>