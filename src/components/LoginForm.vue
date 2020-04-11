<template>
  <div id="login-form">
    <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular
        indeterminate
        :size="50"
        :width="8"
        color="green">
      </v-progress-circular>
    </div>
  </v-container>
    <div class="bg-red-200 border-l-4 border-red-500 text-red-700 p-4" v-show="error" role="alert">
      <p class="font-bold">Login Failed</p>
      <p>{{errorMsg}}</p>
    </div>
  <form class="px-8 pt-6 pb-8 mb-4"  @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Email
      </label>
      <input v-model="login.username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input v-model="login.password" class="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
      <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
    <div class="flex items-center justify-between">
      Admin: <input type="checkbox" v-model="x">
    </div>
     
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Mini CRM. tjcode19
  </p>
    
  </div>

  
</template>

<script>

import axios from 'axios';

  export default {
    name: 'login-form',
     props : ["nextUrl"],
    data() {
      return {
        login: {
          username: '',
          password: '',
          type:'',          
        },
        error:false,
        errorMsg:"",
        loading:false,
        x:""       
        
      }
    },
    methods: {
    handleSubmit() {  
        
      if(this.x) {
        this.login.type = 'admin'
      }
      else{
        this.login.type = 'company'
      }

       // this.$emit('add:login', this.login)
       if(this.login.username!= '' && this.login.password!=''){
         this.loading= true 
          axios
          .post('http://localhost:8000/api/v1/auth/login', this.login)
          .then(request => this.loginSuccessful(request))
          //.catch((e) => this.loginFailed(e))
          console.log('testing handleSubmit')
       }
       else{
         this.error = true;
         this.errorMsg = 'Username and Password must be field'
       }
         
    },

    loginSuccessful (req) {
      console.log('Login Responded')
      this.loading = false;
      if (!req.data.status) {
        this.error = true
        this.errorMsg = req.data.message        
        this.loginFailed()
        return
      }

      localStorage.token = req.data.token;
      localStorage.user = req.data.type;
      localStorage.userID = req.data.data.id;
      
      console.log('UserID: '+localStorage.userID)
      this.error = false;
     let is_admin = (req.data.type =='admin')?true:false;
     let is_company = (req.data.type =='company')?true:false;
     let is_employee = (req.data.type =='employee')?true:false;

      if (localStorage.token != null){
        this.$emit('loggedIn')
        if(this.$route.params.nextUrl != null){
            this.$router.push(this.$route.params.nextUrl)
        }
        else {
            if(is_admin){
                this.$router.push('dashboard')
            }
            else if(is_company){
              localStorage.setItem('userCompany',JSON.stringify(req.data.data))
                this.$router.push('dashboardCompany')
            }
            else if(is_employee) {
              localStorage.setItem('userCompany',JSON.stringify(req.data.company))
                this.$router.push('dashboardEmployee')
            }
        }
    }

      // if(req.data.type == 'admin'){
      //   this.$router.replace(this.$route.query.redirect || '/dashboard')
      // }
      // else if(req.data.type == 'company'){
      //   this.$router.replace(this.$route.query.redirect || '/companyDash')
      // }
      //  else if(req.data.type == 'employee'){
      //   this.$router.replace(this.$route.query.redirect || '/employeeDash')
      // }
      
    },
    loginFailed () {
       console.log('Login Failed, Msg: '+ this.errorMsg +"Error: "+ this.error)
      delete localStorage.token
    }
  },
  }
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }
  .v-progress-circular{
    margin: 1rem
  }    
</style>