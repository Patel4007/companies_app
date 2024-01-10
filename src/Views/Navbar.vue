<template>
   
    <div id="nav" class="transparent" :style="{ background: background, position: position }">
      <ul>
        <a style="text-decoration: none;" class="logo">GrowMore</a>
        <li><router-link style="text-decoration: none; color: inherit;" 
            to="/home" @click.native="emitHomeClick">Home</router-link></li>
        <li><router-link style="text-decoration: none; color: inherit;" 
            to="/categories" @click.native="emitSearchClick">Search</router-link></li>
        <li><router-link style="text-decoration: none; color: inherit;" 
            to="/conversation" @click.native="emitDashboardClick">Posts</router-link></li>
        <li><router-link style="text-decoration: none; color: inherit;" 
            to="/dashboard" @click.native="emitDashboardClick">Profile</router-link></li>
    </ul>
    </div>

    
</template>

<script>
export default {
    props: ['background', 'position'],
    methods: {
    emitHomeClick() {
      this.$emit('home-click');
    },
    emitSearchClick() {
        this.$emit('home-click');
    },
    emitDashboardClick() {
        this.$emit('home-click');
    }
  }
}
</script>


<style scoped>

#nav {
    padding:40px;
    font-size: 19px;
    color: white;
    text-transform: uppercase;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background-color: #1c80f1;
}

#nav ul {
    text-align: right;
    margin-right: 80px;
}

#nav ul li {
    display: inline-block;
    padding-left: 40px;
}

</style>