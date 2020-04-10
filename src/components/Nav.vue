
<template>
    

    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
    <span class="font-semibold text-xl tracking-tight">Mini CRM App</span>
  </div>
  
  <div class="w-full block flex-grow lg:flex lg:items-left lg:w-auto">
    <div v-show="login">
      <a href="#"  v-on:click="logout" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</a>
    </div>
  </div>
</nav>

</template>

<script> 
export default {
 data() {
   return {
       loginToken : localStorage.getItem('token'),
       login: false
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
    this.login = false;
    }
    }

}
</script>