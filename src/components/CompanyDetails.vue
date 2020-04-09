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
      <th class="px-4 py-2">Status</th>
      <th class="px-4 py-2">Views</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="company in companies.data" :key="company.id">
      <td class="border px-4 py-2"><img alt="Vue logo" src="../assets/logo.png" class="w-4 h-4 rounded-full mr-1"></td>
      <td class="border px-4 py-2">{{ company.name }}</td>
      <td class="border px-4 py-2">{{ company.status }}</td>
      <td class="border px-4 py-2">
        <button class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
          View Details
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
    }
  },
  mounted () {
    axios
      .get('http://localhost:8000/api/v1/company/all/')
      .then(response => (this.companies = response.data))
  }
  }
</script>

<style scoped></style>