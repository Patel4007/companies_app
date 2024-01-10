<template>
  <div>
  <navbar :background="navbarBackgroundColor" :position="navbarPosition" @home-click="resetHeaderColor"/>
  <div class="container">
    <router-view></router-view>
   
  </div>
</div>
</template>



<script>
import navbar from "./Views/Navbar.vue";

export default {
  components: {navbar},
  data() {
    return {
      navbarBackgroundColor: '#1c80f1',
      navbarPosition: 'relative'
    };
  },
  mounted() {
    
    window.addEventListener('popstate', this.handleBackNavigation);
  },
  beforeUnmount() {
    
    window.removeEventListener('popstate', this.handleBackNavigation);
  },
  methods: {
    handleBackNavigation() {
      
      this.navbarBackgroundColor = '#1c80f1';
      this.navbarPosition = 'relative';
    },

    resetHeaderColor() {
      
      this.navbarBackgroundColor = '#1c80f1';
      this.navbarPosition = 'relative';
    }
  }
}
</script>