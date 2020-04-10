<template>
  <div id="app">
   
    <!-- <div id="nav" >
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">About</router-link>
    </div> -->
    
    
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'employees-table',
    
    data () {
    return {
      loginToken : localStorage.getItem('token'),
      login : false,
      employees: [],
      
    }
  },
  mounted () {
    console.log(this.loginToken)
    if(this.loginToken!=""){
      this.login = true
    }
    else{
      this.login = false;
    }

    console.log(this.login)

   
  },
  methods: {

    logout: function () {
    //this.$router.replace('login')
    this.$router.replace(this.$route.query.redirect || '/')
    localStorage.token = ""
}
}
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
