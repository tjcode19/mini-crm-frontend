<template>
  <div id="companies-table" class=" p-3">
       <table class="table-auto text-left text-gray-700 w-full">
        <thead>
          <tr>
            <th class="px-4 py-2" colspan="">Company Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-4 py-2">Name</td>
            <td class="border px-4 py-2">{{ company.name }}</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Email</td>
            <td class="border px-4 py-2">{{ company.email }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
 // import axios from 'axios';
  export default {
    name: 'companies-table',
    
    data () {
    return {
      company: [],
      user: JSON.parse(localStorage.getItem('userCompany'))

    }
  },
  mounted () {
    // axios
    //   .get('http://localhost:8000/api/v1/company/1/' , { headers: {"Authorization" : `Bearer ${this.loginToken}`}})
    //   .then(response => (this.company = response.data.data))
    this.company = this.user
  }
  }
</script>

<style scoped></style>