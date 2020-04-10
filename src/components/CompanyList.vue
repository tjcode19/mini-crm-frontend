<template>
  <div id="companies-table">
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
      <th class="px-4 py-2">Logo</th>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Status</th>
      <th class="px-4 py-2">Views</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="company in companies.data" :key="company.id">
      <td class="border px-4 py-2"><img alt="Vue logo" src="../assets/logo.png" class="w-4 h-4 rounded-full mr-1"></td>
      <td class="border px-4 py-2">{{ company.name }}</td>
      <td class="border px-4 py-2">{{ company.email }}</td>
      <td class="border px-4 py-2">{{ company.status }}</td>
      <td class="border px-4 py-2">
        <button v-on:click="getSingle(company.company_id, 'view', 'company')" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full" type="button">
          View 
        </button>
        <button v-show="login" v-on:click="getSingle(company.company_id, 'edit', 'company')" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full" type="button">
          Edit
        </button>
        <button v-show="login" v-on:click="getSingle(company.company_id, 'delete', 'company')" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full" type="button">
          Delete
        </button>
      </td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'companies-table',
    
    data () {
    return {
      companies: [],
      companyD:[],
       loginToken : localStorage.getItem('token'),
       login: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:8000/api/v1/company/all/')
      .then(response => (this.companies = response.data))
        if(this.loginToken!=""){
          this.login = true
        }
        else{
          this.login = false;
        }
  },
  methods: {
    getSingle(id, action, type){
        axios
        .get('http://localhost:8000/api/v1/company/'+id )
        .then(response => (this.show(response.data, action, type)))    

    },

    show (data, action, type) {
    this.$root.$modal.show('view-details', { companyData: data.data, action: action, type:type });
    },
    hide () {
      this.$root.$modal.hide('view-details');
    }

  },
  }
</script>

<style scoped></style>
