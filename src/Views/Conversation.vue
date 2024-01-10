<template>
  <body>
  <div class="dash_container">
    <div class="tab_content_wrapper">
      <div class="tab_box_vertical">
        <div class="tab_btns">
        <button class="tab_btn active">Feeds</button>
        <button class="tab_btn">My inbox</button>
        </div>
        <div class="line"></div>
        <button class="tab_newpost" @click="openNewPostModal">Create a Post</button>
      </div>
      <div class="content_box">
      <div class="posts active">
        <div v-if="selectedPost">
          <!-- Display selected post -->
          <div class="post-container">
          <div class="individual_post">
            <div class="post-header">
              <div class="post-user">{{ selectedPost.username }}</div>
              <div class="post-time">{{ selectedPost.created_at }}</div>
            </div>
            <div class="post-content">{{ selectedPost.post_content }}</div>
            <div class="post-actions">
              <button class="tab_like" @click="likePost(selectedPost)">Like</button>
              <button class="tab_comment">Comment</button>
            </div>
          </div>
          <br>
          <input class="comment_input" type="text" v-model="newCommentContent" placeholder="Add a comment">
              <button class="add-comment" @click="addComment(selectedPost)">ADD</button>

          <div class="post-comments" v-if="selectedPost.showComments">
              <div class="comment" v-for="(comment, cIndex) in selectedPost.comments" :key="cIndex">
                <div class="comment-content">{{ comment.content }}</div>
                <!-- Add replies if needed -->
                <!--<input type="text" v-model="replyContent" placeholder="Reply">-->
                <div class="reply-actions">
                <button class="tab_reply" @click="toggleReplyInput(comment)">Reply</button>
              </div>
              <div v-if="comment.showReplyInput">
              <div class="reply-container">
                <textarea class="reply_input" type="text" v-model="comment.replyContent" placeholder="Give a reply"></textarea>
                <button class="add-reply" @click="addReply(selectedPost, comment)">Send</button>
              </div>
            </div>
              <div class="reply" v-for="(reply, rIndex) in comment.replies" :key="rIndex">
                <div class="reply-content">{{ reply.content }}</div>
              </div>
              </div>
            </div>
            <div class="total-likes">{{ selectedPost.likes }}</div>
          <button class="tab_post" @click="clearSelectedPost">Back</button>
        </div>
        </div>
        <div v-else>
          <!-- Existing Posts -->
          <!--<div class="new-post">
            <textarea class="post-area" v-model="newPostContent" placeholder="Write your post here"></textarea>
          </div>
          <button class="tab_post" @click="createPost">Post</button> -->
          <div class="post-container">
          <div class="post" v-for="(post, index) in posts" :key="index" @click="displayIndividualPost(post)">
            <div class="post-header">
              <div class="post-user">{{ post.username }}</div>
            </div>
            <div class="post-content">{{ post.post_content }}</div>
            <div class="post-actions">
              <button class="tab_like" @click="likePost(post)">Like</button>
              <button class="tab_comment" @click="displayIndividualPost(post)">Comment</button>
            </div>
            <div class="total-likes">{{ post.likes }}</div>
          </div>
        </div>
      </div>
      </div>
      <div class="posts">
        <div v-if="selectedChat">
        <div class="messages">
            <div class="message" v-for="(message, index) in messages" :key="index">
              <div class="message-time">{{ message.subject }}</div>
              <div class="message-content">{{ message.message }}</div>
              <div class="message-actions">
              </div>
            </div>
            </div>
            </div>
            <div v-else>
              <div class="messages">
            <div class="message" v-for="(conversation, index) in uniqueConversations" :key="index" @click="displayIndividualChat(conversation)">
              <div class="message-time">{{ conversation.sender_id !== user_id ? conversation.sender_id : conversation.receiver_id }}</div>
              <div class="message-content">{{ conversation.message }}</div>
              <div class="message-actions">
              <button class="tab_expand" @click="displayIndividualChat(conversation)">Open</button>
              </div>
            </div>
            </div>
         </div>
       </div>
     </div>
    </div>
  </div>

  <div class="modal" :class="{ 'modal-open': showNewPostModal }" v-if="showNewPostModal">
    <div class="modal-content">
      <span class="close" @click="closeNewPostModal">&times;</span>
      <div class="new-post">
        <textarea class="post-area" v-model="newPostContent" placeholder="Write your post here"></textarea>
      </div>
      <button class="tab_post" @click="createPost">Post</button>
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
      posts: [],
      comments: [],
      replies: [],
      messages: [],
      newPostContent: "",
      showNewPostModal: false,
      selectedPost: null,
      selectedChat: null,
      newCommentContent: "",
      selectedPostId: null,
      user_id: '',
      username: '',
      sender_id: '',
      replyContent: "",
    };
  },
 
  created() {
    this.username = sessionStorage.getItem('username');
    console.log('Retrieved username:', this.username);
  },

  computed: {
  uniqueConversations() {
    const uniqueConversations = [];
    const conversationSet = new Set();
    for (const message of this.messages) {
      const key = message.sender_id + '-' + message.receiver_id;
      if (!conversationSet.has(key)) {
        conversationSet.add(key);
        uniqueConversations.push(message);
      }
    }
    return uniqueConversations;
  }
},
  methods: {
    async displayIndividualPost(post) {
      // Set the selected post
      this.selectedPost = post;
      // Hide unnecessary elements
      this.showNewPostModal = false;
      try {

    

console.log(post.post_id);
const response = await axios.get(`http://localhost:3000/api/comments?post_id=${post.post_id}`);

post.comments = response.data;

post.showComments = true;

} catch (error) {
if (error.response && error.response.status === 404) {
 
  post.showComments = !post.showComments;
} else {
  console.error("Error fetching comments:", error);
}
}
    },

    async displayIndividualChat(chat) {
      this.selectedChat = chat;
    },

    toggleReplyInput(comment) {
    comment.showReplyInput = !comment.showReplyInput;
    if (!comment.showReplyInput) {
      comment.replyContent = ""; // Clear reply content if input is hidden
    }
  },

    async fetchMessages() {
  try {
    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const messagesResponse = await axios.get(`http://localhost:3000/api/messages?userId=${userId}`);
    const messages = messagesResponse.data;

    this.messages = messages;
  } catch(error) {
    console.error("Error fetching messages:", error);
  }
},

    clearSelectedPost() {
      
      this.selectedPost = null;
    },
    openNewPostModal() {
      console.log("Opening new post modal...");
      this.showNewPostModal = true;
    },
    closeNewPostModal() {
      this.showNewPostModal = false;
    },
    async fetchPosts() {
      try {

        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        this.user_id = decodedToken.userId;

        const response = await axios.get("http://localhost:3000/api/posts"); 
        this.posts = response.data;
        console.log(this.posts);

      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async likePost(post) {
      try {
        post.likes++;
        await axios.post(`http://localhost:3000/api/posts/${post.post_id}/like`);
      } catch (error) {
        console.error("Error liking post:", error);
      }
    },

   
   
    async addComment(post) {
  try {
    const comment = {
      post_id: post.post_id, 
      user_id: this.user_id, 
      username: this.username,
      content: this.newCommentContent
    };
    console.log(comment);
    const response = await axios.post('http://localhost:3000/api/comments', comment);
    const newComment = response.data;
    
    if (Array.isArray(post.comments)) {
      
      post.comments.unshift(newComment);
    } else {
      
      post.comments = [newComment];
    }
    this.newCommentContent = "";
  } catch (error) {
    console.error("Error adding comment:", error);
  }
},

async addReply(post, comment) {
      try {
        const reply = {
          post_id: post.post_id,
          comment_id: comment.comment_id,
          parent_reply_id: reply ? reply.reply_id : null,
          user_id: this.user_id,
          username: this.username,
          content: comment.replyContent
        };

        console.log(reply);

        const response = await axios.post('http://localhost:3000/api/replies', reply);
        const newReply = response.data;

        if (!comment.replies) {
          comment.replies = [newReply]
        } else {
          comment.replies.unshift(newReply);
        }

        comment.showReplyInput = false; // Hide the reply input after adding
        comment.replyContent = ""; // Clear the reply content after adding

      } catch (error) {
        console.error("Error adding reply:", error);
      }
    },

async createPost() {
  try {
    const post = {
      user_id: this.user_id, 
      username: this.username,
      post_content: this.newPostContent
    };
    const response = await axios.post("http://localhost:3000/api/posts", post);
    const newPost = response.data;
    
    this.posts.unshift(newPost);
   
    this.newPostContent = ""; 
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

  },
  mounted() {
    this.fetchPosts();
    this.fetchMessages();

    const tabs = document.querySelectorAll('.tab_btn');
    const all_content = document.querySelectorAll('.posts');

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
  }
};
</script> 


  <style scoped>

body {
    margin: 0;
    padding: 0;   
    min-height: 88.5vh;
    background-color: #deeeff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dash_container {
  width: 1600px;
  height: 810px; 
  margin-top: 20px;
  background-color: white;
  box-shadow: 0 2px 16px rgba(104, 104, 104, 0.1);
}

.tab_box_vertical {
  display: flex;
  flex-direction: column;
  height: 800px;
  width: 415px;
  border-right: 2px solid rgb(230, 227, 227);
}

.tab_box_vertical .tab_btn {
  font-size: 18px;
  font-weight: 600;
  color: #919191;
  background: none;
  border: none;
  padding: 18px;
  cursor: pointer;
}

.tab_box_vertical .tab_btn.active {
  color: #1c80f1;
}

.tab_content_wrapper {
    display: flex;
}

.post-container {
  max-height: 700px; 
  margin-top: -40px;
  margin-left: -100px;
  overflow-y: scroll;
}

.post-container::-webkit-scrollbar {
  display: none; 
}

.post-area {
    width: 800px; 
    height: 300px; 
    margin-top: -2px;
    margin-left: -5px;
    font-size: 18px;
    border: 1px solid white ;
    border-radius: 10px;
    outline: none;
}

.tab_newpost {
  border: 1px solid #007bff;
  border-radius: 10px;
  background-color: #007bff;
  width: 150px;
  font-size: 17px;
  align-self: center;
  margin-top: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tab_newpost:hover {
  background-color: black;
  border: 1px solid black;
}

.tab_post {
  font-size: 18px;
  font-weight: 600;
  color: #007bff;
  background-color: white;
  margin-left: 710px;
  margin-top: -30px;
  margin-bottom: 30px;
  width: 60px;
  padding: 2px;
  text-transform: uppercase;
  cursor: pointer;
}

.tab_btns {
  padding-top: 150px;
  display: flex;
  flex-direction: column;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 90px;
  padding-bottom: 50px;
  padding-right: 30px;
}

.post {
  background-color: #f0f0f0;
  padding: 50px;
  width: 810px;
  margin-left: 80px;
  border-bottom: 2px solid rgb(226, 225, 225);
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.individual_post {
  background-color: #f0f0f0;
  padding: 50px;
  width: 810px;
  margin-left: 80px;
  margin-top: -50px;
  border-bottom: 2px solid rgb(226, 225, 225);
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.post-user {
  font-weight: bold;
}

.post-time {
  color: #777;
}

.post-content {
  margin-bottom: 10px;
  width: 700px;
  overflow: hidden; 
  word-wrap: break-word;
}

.post-actions {
  display: flex;
  gap: 10px;
}

.post-comments {
  margin-top: 60px;
  margin-left: 80px;
}

.comment-content {
  background-color: #f0f0f0;
  padding: 10px;
  padding-bottom: 10px;
  width: 800px;
  margin-left: 100px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.message {
  background-color: #f0f0f0;
  padding: 50px;
  width: 800px;
  margin-left: 100px;
  border: 2px solid rgb(226, 225, 225);
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.message .message-content {
  margin-bottom: 10px;
  padding: 13px;
  padding-left: 20px;
  font-size: 18px;
  width: 700px;
  overflow: hidden; 
  word-wrap: break-word;
}

.message .message-time {
  font-weight: bold;
  padding-top: 13px;
  padding-left: 20px;
  font-size: 20px;
}


.tab_expand {

  color: #007bff;
  font-size: 15px;
  cursor: pointer;
  font-weight: 900;
  margin-top: -3px;
  margin-left: 680px;


}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-open {
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal content */
.modal-content {
  margin: 15% auto; /* 15% from the top and centered */
  background-color: white;
  padding: 20px;
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
  height: 405px;
}

.close {
  color: #aaa;
  font-size: 30px;
  font-weight: bold;
  margin-top: -10px;
  margin-right: 20px;
  float: right;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.tab_like {
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
  margin-right: -2px;
}

.tab_comment {
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
}

.tab_reply {
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
  margin-left: 110px;
  padding-bottom: 50px;
}

.reply-actions {
  margin-top: -23px;

}

.reply-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 300px;
    margin-top: -50px;
}

.add-reply {
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
  margin-left: -30px;
}

.reply_input {
    padding-left: 10px;
    padding: 15px;
    width: 400px;
    height: 130px;
    font-weight: 500;
    color: black;
    font-size: 15px;
    border: 1px solid black;
    border-radius: 20px;
    margin-bottom: -20px;
    margin-left: -350px;
}

.comment_input {
    width: 530px;
    height: 40px;
    padding-left: 10px;
    line-height: 5%;
    font-weight: 500;
    color: black;
    font-size: 15px;
    border: 1px solid black;
    border-radius: 20px;
    margin-left: 210px;
}

.add-comment {
  color: #007bff;
  font-size: 15px;
  font-weight: bold;
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
  flex: 1;
  height: auto;
  padding: 20px;
}

.content_box .posts {
    display: none;
}

.content_box .posts.active {

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
   border: 1px black solid;
}

.inner-box .image-box .image{
   width: 248px;
   height: 150px;
}

.lower-box{
    width: 300px;
    margin-top: 50px;
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

  .msg-wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 20px;
    padding: 30px 70px;
    padding-top: 90px;
    margin-right: 30px;
    border: 1px black solid;
    border-radius: 14px;
    width: 900px;
    height: 200px;
    margin: 0 auto;
    margin-top: 80px;
  }

   .latest-message {
    background-color: #f0f0f0;
    margin-top: -50px;
    cursor: pointer;
    margin-left: 20px;
  }
  
  .latest-user {
    font-weight: bold;
  }
  
  .latest-content {
    margin-left: 5px;
  }
  
  .message-container {
    margin-top: 20px;
  }
  
  .message {
    background-color: #f0f0f0;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .message-user {
    font-weight: bold;
  }
  
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
  }
  
  button {
    margin-top: 10px;
    padding: 8px 16px;
    
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .compose-message {
    width: 800px;
  }
  </style>