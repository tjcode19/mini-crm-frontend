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
    <table class="table-auto">
  <thead>
    <tr>
      <th class="px-4 py-2" colspan="2">Employee Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border px-4 py-2">Name</td>
      <td class="border px-4 py-2">{{ employee.name }}</td>      
    </tr>
    <tr>
      <td class="border px-4 py-2">Email</td>
      <td class="border px-4 py-2">{{ employee.email }}</td>      
    </tr>
    <tr>
      <td class="border px-4 py-2">Status</td>
      <td class="border px-4 py-2">{{ employee.status }}</td>      
    </tr>
    <tr>
      <td colspan="2">
        <button v-on:click="getSingle(employee.id, 'edit')"  class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full">
          Edit Profile
        </button>
        <button v-on:click="getSingle(employee.id, 'changeP', 'employee')" class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full" type="button">
          Change Password
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
      userID: localStorage.getItem('userID'),
      employee: [],
      
    }
  },
  mounted () {
   HTTP
      .get('employee/'+this.userID)
      .then(response => (this.employee = response.data.data))
  },
  methods: {
     getSingle(id, action, type){
      console.log(id)
      this.show(this.employee, action, type)

    },

    show (data, action, type) {
    this.$root.$modal.show('view-details', { employeeData: data, action: action, type:type });
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