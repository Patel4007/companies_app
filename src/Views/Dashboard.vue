<template>
   <body>
    
    <div class="dash_container">
        <div class="tab_box">
            <button class="tab_btn active">Settings</button>
            <button class="tab_btn">Create or Update Page</button>
            <div class="line"></div>
        </div>
        <div class="content_box">
            <div class="content active">
                <h1 class="profile_name">{{ username }}</h1>
                <h2 class="messages"><a href="#" class="arrow-link">Messages<img src="../assets/hyperlink.jpg" class="link_icon" style="width: 20px; height: 20px;"/></a></h2>
                <h2 class="pages">My Pages</h2>  
        <div class="container">    
        <div class="product" v-for="page in pages" :key="page.id">
  <div class="package-block col-lg-4 col-md-6 col-sm-12" id="male">
    <div class="inner-box">
      <div class="image-box">
        <div class="image">
            <a><img :src="page.company_logo_url" alt=""></a>
        </div>
      </div>
    
      <div class="lower-box">
        <div class="location" style="margin-top: -170px; font-size: 14px;">{{ page.company_name }}</div>
        <div class="bottom-box clearfix"></div>
        <button @click="deleteCompanyPage(page.id)">Delete</button>
      </div>
    </div>
  </div>
</div>
</div>    

                <h2 class="messages"><a href="#" class="arrow-link">Logout</a></h2>
                <p></p>
            </div>
            <div class="content">
                
                <h3 style="font-size: 23px; text-align: center; margin-bottom: 40px;">Setup your Business Page</h3>
                
                <h3 style="font-size: 20px; margin-top: 35px; margin-bottom: 20px;">Company Details</h3>
                <form>
                    <div class="details-section">
                    <input type="text" name="name" id="company_name" placeholder="Company Name" v-model="formData.company_name" required>
                    <input type="email" name="email" id="company_email" placeholder="Email ID" v-model="formData.company_email"  required>
                    <input type="text" name="address" id="company_address" placeholder="Company Address" v-model="address" @input="fetchLocations" required>

                    <ul v-show="suggestions.length > 0" class="suggestion-list">
                      <li v-for="suggestion in suggestions" :key="suggestion.place_id" @click="selectLocation(suggestion)">{{ suggestion.display_name }}</li>
                    </ul>

                    <input type="phone" name="contact" id="email_id" placeholder="Phone No. (Optional)" v-model="formData.company_contact"  required>
                    <input type="text" name="address" id="contact_no" placeholder="Website URL (Optional)" v-model="formData.company_location" required>
                    <input type="phone" name="contact" id="social_url" placeholder="Social Platform URL (Optional)" v-model="formData.company_contact"  required>

                  
                   <h3 style="margin-bottom: 40px; font-size: 20px; margin-top: 90px;">Updates</h3>
                   <textarea type="message" placeholder="Write updates here" class="updates-textarea"  v-model="formData.updates" required></textarea>
                   

                </div>
                <div class="updates-section">
                <h3 style="margin-bottom: 40px; font-size: 20px; margin-top: 60px;">Company Banner</h3>
                    <div class="company-img">
                        <label for="input-file" id="drop-area">
                  <input type="file" accept="image/*" id="input-file" @change="handleImageChange">
                  <div id="img-view" :style="{ backgroundImage: `url(${backgroundImage})` }">
                    <img src="../images/upload-logo.jpg" v-if="!backgroundImage">
                    <p v-if="!backgroundImage">Drag and drop or click here<br>to upload image</p>
                    <span v-if="!backgroundImage">Upload banner</span>
                  </div>
                </label>
                   </div>
                </div>
                   <h3 style="margin-bottom: 40px; font-size: 20px; margin-top: 145px;">Company Description</h3>
                   <textarea type="message" placeholder="Provided services" class="desc-textarea"  v-model="formData.company_description" required></textarea>
                   <h3 style="margin-bottom: 40px; margin-top: 100px; font-size: 20px;">Upload Pictures</h3>

                   <div class="gallery-container">
                     <form action="/upload" method="post" class="gallery">
                       <span class="inner">Drag and drop images or<span class="select">Browse</span></span>
                       <input name="image_data" type="file" class="file" multiple @change="handleMultipleImages"/>
                     </form>
                   <div class="imgs-container">
                     <div v-for="(image, index) in formData.images" :key="index" class="image-preview">
                      <img :src="image" alt="Selected Image">
                     </div>
                    </div>
                   </div>

                </form>

                <button @click="submitForm">Publish</button>

            </div>
        </div>
    </div>
   </body>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default {
    data() {
    return {
      formData: {
        company_name: '',
        company_email: '',
        company_contact: '',
        company_location: '',
        company_description: '',
        updates: '',
        company_logo_url: null,
        image_urls: [],
      },
      backgroundImage: '',
      user_id: '',
      username: '',
      address: '',
      suggestions: [],
      pages: []
    };
  },

  created() {
    this.username = sessionStorage.getItem('username');
    console.log('Retrieved username:', this.username);
    this.formData.username = this.username;
  },

  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];
      this.formData.company_logo_url = file;
      this.backgroundImage = URL.createObjectURL(file);
    },

    handleMultipleImages(event) {
    const files = Array.from(event.target.files);

    const selectedImages = files.filter(file => {
        return !this.formData.image_urls.some(image => image.name === file.name);
    });

    this.formData.image_urls.push(...selectedImages);
},

async deleteCompanyPage(pageId) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/deletePage/${pageId}`);
      this.pages = this.pages.filter(page => page.id !== pageId);
      alert('Company page deleted successfully!');
      console.log(response);
    } catch (error) {
      alert('Error deleting company page');
      console.error('Error deleting company page:', error);
    }
  },

async fetchUserData() {
      try {
        
        const token = sessionStorage.getItem('token');
        
        if (!token) {
          
          return;
        }
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken.userId;

        console.log(user_id);

        const response = await axios.get(`http://localhost:3000/api/userData?user_id=${user_id}`);
        
        this.pages = response.data;

        console.log(response.data);


      } catch (error) {
        
        console.error('Error fetching user pages:', error);
      }
    },

async fetchLocations() {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: this.address,
            format: 'json'
          }
        });
        this.suggestions = response.data;
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    },
    selectLocation(location) {
      
      console.log('Selected location:', location);
      this.address = location.display_name;
      const dropdownMenu = document.querySelector('.suggestion-list');
      if (dropdownMenu) {
         dropdownMenu.style.display = 'none';
      }
    },

    async submitForm() {
      const formData = new FormData();
      formData.append('company_contact', this.formData.company_contact);
      formData.append('company_description', this.formData.company_description);
      formData.append('company_email', this.formData.company_email);
      formData.append('company_location', this.formData.company_location);
      formData.append('company_logo_url', this.formData.company_logo_url);
      formData.append('company_name', this.formData.company_name);
      
      if (this.formData.image_urls.length > 0) {
            this.formData.image_urls.forEach(image => {
                formData.append('image_urls', image);
            });
        }
        
      formData.append('updates', this.formData.updates);

      const token = sessionStorage.getItem('token');
      const username = sessionStorage.getItem('username');
    if (token) {
      
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      
      this.user_id = decodedToken.userId;
      this.username = username;
      console.log(this.username);
      console.log(this.user_id);
      

      
    } else {
      
      this.$router.push({ name: 'login' });
    }

      this.formData.user_id = this.user_id;
      formData.append('user_id', this.formData.user_id);
      formData.append('username', this.formData.username);
      console.log(this.formData.user_id);
      console.log(this.formData.username);
     

      try {
        const response = await axios.post('http://localhost:3000/api/saveData', formData);
       
        const imageURLs = response.data.imageURLs; 
        this.formData.image_urls = imageURLs; 
        alert('Data saved successfully!');
      } catch (error) {
        alert('Error saving data:', error);
      }
    },
  },


    mounted() {

        this.fetchUserData();

        const tabs = document.querySelectorAll('.tab_btn');
        const all_content = document.querySelectorAll('.content');

        tabs.forEach((tab, index) => {

            tab.addEventListener('click', (e)=>{
                tabs.forEach(tab => {tab.classList.remove('active')});
                tab.classList.add('active');

                var line = document.querySelector('.line');
            line.style.width = e.target.offsetWidth + "px";
            line.style.left = e.target.offsetLeft + "px";

            all_content.forEach(content=>{content.classList.remove('active')});
            all_content[index].classList.add('active');

            })
        })

        let files = [];
const form = document.querySelector('.gallery');
const container = document.querySelector('.imgs-container');
const text = document.querySelector('.inner')
const input = document.querySelector('.gallery input');

form.addEventListener('click', () => input.click());
input.addEventListener('change', () => {
    let file = input.files;

    for (let i = 0; i < file.length; i++) {

        if (files.every(e => e.name != file[i].name)) files.push(file[i])
    }

    form.reset();
    showImages();
})

const showImages = () => {
    const fragment = document.createDocumentFragment();

    files.forEach((e, i) => {
       
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('images');
        
        const img = document.createElement('img');
        img.src = URL.createObjectURL(e);
        img.alt = 'images';

        const deleteSpan = document.createElement('span');
        deleteSpan.classList.add('delete');
        deleteSpan.setAttribute('data-index', i);
        deleteSpan.textContent = 'x';

        imageDiv.appendChild(img);
        imageDiv.appendChild(deleteSpan);
               
        fragment.appendChild(imageDiv);
    });

    container.innerHTML = '';
    
    container.appendChild(fragment);

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            delimage(index);
        });
    });
};

const styleElement = document.createElement('style');
styleElement.textContent = `
    .images {
        height: 85px;
        width: 150px;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        position: relative;
        display: inline-block;
        margin-right: 10px; /* Add margin between images */
    }

    .images img {
        height: 100%;
        width: 100%;
    }

    .images span {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        font-size: 22px;
        color: black;
    }

    .images span:hover {
       opacity: 0.8;
    }
`;
document.head.appendChild(styleElement);

const delimage = (index) => {
    files.splice(index, 1);
    const input = document.querySelector('.gallery input');
    const updatedFiles = Array.from(input.files).filter((file, i) => i !== index);
    const newFileList = new DataTransfer();
    updatedFiles.forEach(file => newFileList.items.add(file));
    input.files = newFileList.files;

    this.formData.image_urls.splice(index, 1);

    showImages();
};

form.addEventListener('dragover', e => {
    e.preventDefault()

    form.classList.add('dragover')
    text.innerHTML = 'Drop Images here'
})

form.addEventListener('dragleave', e => {
    e.preventDefault();

    form.classList.remove('dragover');
    text.innerHTML = 'Drag and drop images or ';
    
    const selectSpan = document.createElement('span');
    selectSpan.classList.add('select');
    selectSpan.textContent = 'Browse';

    text.appendChild(selectSpan);
});

form.addEventListener('drop', e => {
    e.preventDefault();

    form.classList.remove('dragover');
    text.innerHTML = 'Drag and drop images or ';

    const selectSpan = document.createElement('span');
    selectSpan.classList.add('select');
    selectSpan.textContent = 'Browse';

    text.appendChild(selectSpan);

    let file = e.dataTransfer.files;

    for (let i = 0; i < file.length; i++) {
        if (files.every(e => e.name != file[i].name)) files.push(file[i]);
    }

    showImages();
});

const cssElement = document.createElement('style');
cssElement.textContent = `
    .gallery .select {
        color: #1c80f1;
        margin-left: 7px;
        cursor: pointer;
    }
`;
document.head.appendChild(styleElement);

    }

};


</script>

<style scoped>

body {
    margin: 0;
    padding: 0;   
    background-color: #deeeff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 195vh;
}

.dash_container {
    width: 1380px;
    margin-top: 10px;
    background-color: white;
    padding: 30px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, .1);   
}

.tab_box {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgba(229, 229, 229);
    font-size: 18px;
    font-weight: 600;
    position: relative;
}

.tab_box .tab_btn {
    font-size: 18px;
    font-weight: 600;
    color: #919191;
    background: none;
    border: none;
    padding: 18px;
    cursor: pointer;
}

.tab_box .tab_btn.active {
    color: #1c80f1;
}

.suggestion-list {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 200px; 
  width: 500px;
  overflow-y: auto; 
 
}

.suggestion-list li {
  padding: 5px;
  cursor: pointer;
}

.suggestion-list li:hover {
  background-color: #f0f0f0;
}

.content_box {
    padding: 20px;
    height: 1710px;
}

.content_box .content {
    display: none;
}

.content_box .content.active {

    display: block;

}

.content_box .content h2 {
    margin-bottom: 10px;
}

.profile_name {
    font-size: 29px;
    margin-top: 20px;
}

.pages{
    font-size: 21px;
    margin-top: 50px;
}

.product {
   display: flex;
   flex-wrap: wrap;
}


.container {
   
    display: flex;
    flex-wrap: wrap;
    margin-top: 45px;
}

.inner-box {
   width: 250px;
   height: 200px;
   margin-left: 40px;
   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}

.inner-box .image-box .image{
   width: 248px;
   height: 150px;
}

.lower-box{
    width: 300px;
    margin-top: 55px;
    margin-left: 15px;
}

.messages {
    
    font-size: 21px;
    margin-top: 50px;
}

.messages a{
    color: #1452ff;
}

.link_icon {
    margin-left: 10px;
}

.company-img {
    width: 500px;
    height: 180px;
}

#drop-area {
    width: 50px;
    height: 50px;
    margin-bottom: 50px;
    background-color: white;
    text-align: center;
    border-radius: 20px;
}

#img-view {
    width: 80%;
    height: 100%;
    background: #f7f8ff;
    background-repeat: no-repeat;
    background-size: contain;
}

#img-view img {
    width: 100px;
    margin-top: 25px;
}

#img-view span {
    display: block;
    font-size: 12px;
    color: #777;
    margin-top: 15px;
}

#company_name {
    width: 500px;
    height: 40px;
    padding-left: 10px;
    line-height: 5%;
    font-weight: 500;
    color: black;
    font-size: 15px;
}

#company_location {
    width: 500px;
    height: 40px;
    padding-left: 10px;
    line-height: 5%;
    font-weight: 500;
    color: black;
    font-size: 15px;
    margin-top: 30px;
    margin-left: 220px;
    display: inline-flex;
}

#contact_no {
    width: 500px;
    height: 40px;
    padding-left: 10px;
    line-height: 5%;
    font-weight: 500;
    color: black;
    font-size: 15px;
}

#company_address {
    width: 500px;
    height: 40px;
    padding-left: 10px;
    line-height: 5%;
    font-weight: 500;
    color: black;
    font-size: 15px;
}

#company_email {
    width: 500px;
    height: 40px;
    padding-left: 10px;
    line-height: 5%;
    font-weight: 500;
    color: black;
    font-size: 15px;
    margin-top: 30px;
    margin-left: 220px;
    display: inline-flex;
}

#email_id {
    width: 500px;
    height: 40px;
    padding-left: 10px;
    line-height: 5%;
    font-weight: 500;
    color: black;
    font-size: 15px;
    margin-top: 30px;
    margin-left: 220px;
    display: inline-flex;
}

#social_url{
    width: 500px;
    height: 40px;
    padding-left: 10px;
    line-height: 5%;
    font-weight: 500;
    color: black;
    font-size: 15px;
    margin-top: 30px;
    margin-left: 220px;
    display: inline-flex;
}

#input-file {
    display: none;
}

.desc-textarea{
    height: 400px;
    width: 1210px;
    padding-top: 15px;
    padding-left: 10px;
    font-weight: 500;
    font-size: 17px;
    resize: none;
}

.updates-textarea{
    height: 200px;
    width: 490px;
    padding-top: 15px;
    padding-left: 10px;
    font-weight: 500;
    font-size: 17px;
    resize: none;
}

.updates-section {
    margin-left: 740px;
    margin-top: -330px;
}

.gallery-container {
    display: flex;
}

.gallery {
    width: 23%;
    height: 100px;
    border-radius: 5px;
    padding: 20px;
    border: 2px dashed #1c80f1;
    color: #a1a1a1;
    font-size: 0.9rem;
    font-weight: 500;
    position: relative;
    background-color: #d9dce0b2;
   
    display: flex; 
    justify-content: center; 
    align-items: center;
    user-select: none;   
}

.gallery .select {
    color: #1c80f1;
    margin-left: 7px;
    cursor: pointer;
}

.gallery input {
    display: none;
}

.imgs-container {
    margin-left: 90px;
}

.image {
    height: 85px;
    width: 150px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    overflow: hidden;
}

.image:nth-child(4n) {
    margin-right: 0;
}

.image img {
    height: 100%;
    width: 100%;
}

.image span {
    position: absolute;
    cursor: pointer;
    font-size: 22px;
    color: black;
}

.image span:hover {
   opacity: 0.8;
}

.content button {
    display: flex;
    align-items: center;
    margin-left: 550px;
    margin-top: 70px;
    width: 160px;
    height: 50px;
    padding: 5px 45px;
    font-size: 17px;
    text-align: center;
    border: 1px solid rgb(50, 132, 255);
    color: white;
    background-color: rgb(6, 106, 255);
    border-radius: 50px;
    cursor: pointer;
}
</style>