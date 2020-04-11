<template>
<div>
  <Nav/>
  <modal name="view-details" @before-open="beforeOpen" class="px-5 my-auto" :min-height="300" height="auto" :scrollable="true">
    
<form class="px-8 pt-6 pb-8 mb-4"  @submit.prevent="editDetails" v-show="userAction=='edit'">
  <div class=" bg-green-200 border-l-4 border-green-500 text-green-900 p-2" v-show="isResponse" role="alert">
      <p class="font-bold">Success!</p>
      <p>{{resMsg}}</p>
    </div>
    <div class="bg-red-200 border-l-4 border-red-500 text-red-700 p-4" v-show="isResponseError" role="alert">
      <p class="font-bold">Failed</p>
      <p>{{resMsg}}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Name
      </label>
      <input v-model="employeeData.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input v-model="employeeData.email" class="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text">
      <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
    </div>
    <div class="flex items-center justify-between">
      <button v-on:click="closeModal" class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Cancel
      </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Edit
      </button>
     
    </div>     
  </form>

  <form class="px-8 pt-6 pb-8 mb-4"  @submit.prevent="changePass" v-show="userAction=='changeP'">
  <div class=" bg-green-200 border-l-4 border-green-500 text-green-900 p-2" v-show="isResponse" role="alert">
      <p class="font-bold">Success!</p>
      <p>{{resMsg}}</p>
    </div>
    <div class="bg-red-200 border-l-4 border-red-500 text-red-700 p-4" v-show="isResponseError" role="alert">
      <p class="font-bold">Failed</p>
      <p>{{resMsg}}</p>
    </div>
    <div class="bg-orange-200 border-b-2 border-orange-500 text-orange-700 p-4 mb-4" role="alert">
      <h3 class="font-bold">Change Password</h3>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="passwprd">
        New Password
      </label>
      <input v-model="cp.password" class="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password">
      <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password_c">
        Confirm New Password
      </label>
      <input v-model="cp.password_c" class="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password_c" type="password">
      <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
    </div>
    <div class="flex items-center justify-between">
      <button v-on:click="closeModal" class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Cancel
      </button>
      <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Change Password
      </button>
     
    </div>     
  </form>
    </modal>
  <div class="dashboard mx-auto px-1 pt-4">
    <!-- Two columns -->
    <div class="flex mb-4">
      <div class="w-1/2 bg-gray-400 mx-2">
     <CompanyCard/>

</div>
      <div class="w-1/2 bg-gray-500 mx-2 rounded shadow-sm">
      <EmployeeDetailsCard/>
  </div>
    </div>
  </div>
  </div>
</template>

<script>
import CompanyCard from '@/components/CompanyDetails.vue'
import EmployeeDetailsCard from '@/components/EmployeeDetails.vue'
import Nav from '@/components/Nav.vue'

import axios from 'axios';

let baseUrl = 'http://localhost:8000/api/v1/employee/';

export default {
  name: 'Home',
  components: {
    CompanyCard,
    EmployeeDetailsCard,
    Nav
  },
   data(){
    return{
      loginToken : localStorage.getItem('token'),
      userID : localStorage.getItem('userID'),
      companyDetails :  JSON.parse(localStorage.getItem('userCompany')),
      employeeData:[],
      userAction: '',
      resMsg:'',
      isResponse:false,
      isResponseError:false,
      type:'',
      cp: {
          password_c: '',
          password: ''        
        },
    }

  },
  methods:{
    beforeOpen (event) {
      console.log(event.params.employeeData);
      this.employeeData = event.params.employeeData;
      this.userAction = event.params.action;   
      this.type = event.params.type;     
    },
    closeModal(){
        this.$modal.hide('view-details');
        this.isResponseError=false;
        this.isResponse=false;
      },
      editDetails(){
        axios
        .put(baseUrl+this.userID, {name: this.employeeData.name}, { headers: {"Authorization" : `Bearer ${this.loginToken}`}})
        .then(response => (this.resData(response.data)))
      
      },

      changePass(){
        if(this.cp.password==this.cp.password_c){
            axios
            .post(baseUrl+'changepass', this.cp, { headers: {"Authorization" : `Bearer ${this.loginToken}`}})
            .then(response => (this.resData(response.data)))
        }
        else{
          this.isResponseError=true;
          this.resMsg ='Password does not match';
        }
      
      
      },

      resData(response){
        if(response.status){
            this.isResponse = true;
        }
        else{
            this.isResponseError = true;
        }
        
        console.log(response);
        this.resMsg = response.message
      },
  }
}
</script>
