<template>
<div>
  <Nav/>
  <div class="dashboard mx-auto px-1">
    <h1>This is an about page</h1>
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
//import axios from 'axios';

export default {
  name: 'Home',
  components: {
    CompanyCard,
    EmployeeDetailsCard,
    Nav
  }
}
</script>
