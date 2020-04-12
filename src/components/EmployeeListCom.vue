<template>
  <div id="employees-table">
    <!-- <table>
      <tbody>
        <tr v-for="company in companies.data" :key="company.id">
          <td>{{ company.name }}</td>
          <td>{{ company.status }}</td>
        </tr>
      </tbody>
    </table> -->
     <button v-on:click="addNewEmp" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full" type="button">
          Add New Employee
        </button>
    <table class="table-auto">
  <thead>
    <tr>
      <th class="px-4 py-2">Logo</th>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Status</th>
      <th class="px-4 py-2">Views</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="employee in employees.data" :key="employee.id">
      <td class="border px-4 py-2"><img alt="Vue logo" src="../assets/logo.png" class="w-4 h-4 rounded-full mr-1"></td>
      <td class="border px-4 py-2">{{ employee.name }}</td>
      <td class="border px-4 py-2">{{ employee.email }}</td>
      <td class="border px-4 py-2">{{ employee.status }}</td>
      <td class="border px-4 py-2">
        <button v-on:click="getSingle(employee.id, 'view')"  class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full">
          View
        </button>
        <button v-show="login" v-on:click="getSingle(employee.id, 'edit', 'employee')" class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full" type="button">
          Edit
        </button>
        <button v-show="login" v-on:click="getSingle(employee.id, 'delete', 'employee')" class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full" type="button">
          Delete
        </button>
      </td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
   import {HTTP} from '../config';
  
  export default {
    name: 'employees-table',
    
    data () {
    return {
      loginToken : localStorage.getItem('token'),
      employees: [],
       login: false
      
    }
  },
  mounted () {
    HTTP
      .get('employee/company/all')
      .then(response => (this.employees = response.data))
      if(this.loginToken!=""){
          this.login = true
        }
        else{
          this.login = false;
        }
  },
  methods:{
    getSingle(id, action, type){
      console.log(id)
      HTTP
      .get('employee/'+id)
      .then(response => (this.show(response.data, action, type)))

    },

    show (data, action, type) {
    this.$root.$modal.show('view-details', { companyData: data.data, action: action, type:type });
    },
    hide () {
      this.$root.$modal.hide('view-details');
    },
    addNewEmp(){
      this.$root.$modal.show('view-details', {type:'company',companyData: [], action: 'new', });
    }
  }

  }
</script>

<style scoped></style>