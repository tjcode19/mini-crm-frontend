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
  </tbody>
</table>
  </div>
</template>

<script>
  import axios from 'axios';
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
    axios
      .get('http://localhost:8000/api/v1/employee/'+this.userID,   
      { headers: {"Authorization" : `Bearer ${this.loginToken}`}})
      .then(response => (this.employee = response.data.data))
  }
  }
</script>

<style scoped></style>