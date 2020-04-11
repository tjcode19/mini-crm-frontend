<template>
<div>
  <Nav/>
  <div class="dashboard container mx-auto px-1 pt-4">

     <modal name="view-details" @before-open="beforeOpen" class="px-5 my-auto" :min-height="300" height="auto" :scrollable="true">
       <div slot="top-right">
      <button @click="$modal.hide('foo')">
        ❌
      </button>
    </div>
       <table class="table-auto mx-auto" v-show="userAction=='view'">
  <thead>
    <tr>
      <th class="px-4 py-2" colspan="2">{{ companyData.name }} Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border px-4 py-2">Name</td>
      <td class="border px-4 py-2">{{ companyData.name }}</td>
      
    </tr>
    <tr>
      <td class="border px-4 py-2">Email</td>
      <td class="border px-4 py-2">{{ companyData.email }}</td>      
    </tr>
    <tr>
      <td class="border px-4 py-2">Status</td>
      <td class="border px-4 py-2">{{ companyData.status }}</td>
      
    </tr>
  </tbody>
</table>

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
      <input v-model="companyData.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input v-model="companyData.email" class="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text">
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

  <form class="px-8 pt-6 pb-8 mb-4"  @submit.prevent="addNewEmp" v-show="userAction=='new'">
  <div class=" bg-green-200 border-l-4 border-green-500 text-green-900 p-2" v-show="isResponse" role="alert">
      <p class="font-bold">Success!</p>
      <p>{{resMsg}}</p>
    </div>
    <div class="bg-red-200 border-l-4 border-red-500 text-red-700 p-4" v-show="isResponseError" role="alert">
      <p class="font-bold">Failed</p>
      <p>{{resMsg}}</p>
    </div>
    <div class="bg-orange-200 border-b-2 border-orange-500 text-orange-700 p-4 mb-4" role="alert">
      <h3 class="font-bold">New Employee</h3>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name_n">
        Name
      </label>
      <input v-model="newEmp.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name_n" type="text">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email_n">
        Email
      </label>
      <input v-model="newEmp.email" class="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email_n" type="text">
      <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="passwprd">
        Password
      </label>
      <input v-model="newEmp.password" class="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password">
      <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password_c">
        Confirm Password
      </label>
      <input v-model="newEmp.password_c" class="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password_c" type="password">
      <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
    </div>
    <div class="flex items-center justify-between">
      <button v-on:click="closeModal" class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Cancel
      </button>
      <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Add New Employee
      </button>
     
    </div>     
  </form>

  <div v-show="userAction=='delete'">
    <p>Are you sure you want to delete?</p>
    <button v-on:click="closeModal" type="button" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">No</button>
    <button v-on:click="deleteItem" type="button" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">Proceed</button>
  </div>

   <div v-show="userAction=='deleted'">
    <div class=" bg-green-200 border-l-4 border-green-500 text-green-900 p-2" v-show="isResponse" role="alert">
      <p class="font-bold">Success!</p>
      <p>{{resMsg}}</p>
    </div>
    <div class="bg-red-200 border-l-4 border-red-500 text-red-700 p-4" v-show="isResponseError" role="alert">
      <p class="font-bold">Failed</p>
      <p>{{resMsg}}</p>
    </div>
    <button v-on:click="closeModal" type="button" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">Close</button>
  </div>
    </modal>
    <!-- Two columns -->
    <div class="flex mb-4">
      <div class="w-1/2 bg-gray-400 mx-2">
     <CompanyDetailsCard/>

</div>
      <div class="w-1/2 bg-gray-500 mx-2 rounded shadow-sm">
      <EmployeeCard/>
  </div>
    </div>
  </div>
  </div>
</template>

<script>
import CompanyDetailsCard from '@/components/CompanyDetails.vue'
import EmployeeCard from '@/components/EmployeeListCom.vue'
import Nav from '@/components/Nav.vue'
import axios from 'axios';

let baseUrl = 'http://localhost:8000/api/v1/employee/';

export default {
  name: 'Home',
  components: {
    CompanyDetailsCard,
    EmployeeCard,
    Nav
  },
  data(){
    return{
      loginToken : localStorage.getItem('token'),
      companyDetails :  JSON.parse(localStorage.getItem('userCompany')),
      companyData:[],
      userAction: '',
      resMsg:'',
      isResponse:false,
      isResponseError:false,
      type:'',
      newEmp: {
          company_id: '',
          name: '',
          password: '',
          email:'',          
        },
    }

  },
  methods:{
    beforeOpen (event) {
      console.log(event.params.companyData);
      this.companyData = event.params.companyData;
      this.userAction = event.params.action;   
      this.type = event.params.type;     
    },
    closeModal(){
        this.$modal.hide('view-details');
      },
      editDetails(){
        axios
        .put(baseUrl+this.companyData.id, {name: this.companyData.name}, { headers: {"Authorization" : `Bearer ${this.loginToken}`}})
        .then(response => (this.resData(response.data)))
      
      },

      addNewEmp(){
        if(this.newEmp.name!=''){
          this.newEmp.company_id = this.companyDetails.company_id;
            axios
            .post(baseUrl+'company/create', this.newEmp, { headers: {"Authorization" : `Bearer ${this.loginToken}`}})
            .then(response => (this.resData(response.data)))
        }
        else{
          this.isResponseError=true;
          this.resMsg ='All fields must be filed'
        }
      
      
      },

      deleteItem(){
        axios
        .delete('http://localhost:8000/api/v1/employee/'+this.companyData.id, { headers: {"Authorization" : `Bearer ${this.loginToken}`}})
        .then(response => (this.resData(response.data)))
        this.userAction = 'deleted';
      
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
