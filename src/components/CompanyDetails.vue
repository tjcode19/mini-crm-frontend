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
      <td class="border px-4 py-2">Name</td>
      <td class="border px-4 py-2">{{ company.name }}</td>
    </tr>
    <tr v-for="company in companies.data" :key="company.id">
      <td class="border px-4 py-2">Name</td>
      <td class="border px-4 py-2">{{ company.name }}</td>
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
      .get('http://localhost:8000/api/v1/company/1/')
      .then(response => (this.companies = response.data))
  }
  }
</script>

<style scoped></style>