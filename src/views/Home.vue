<template>
  <div class="home container mx-auto px-1">
    
    <!-- Two columns -->
      <div class="flex mb-4">
        <div class="shadow-md rounded w-2/3 mx-1 bg-gray-100"><CompanyCard /></div>
        <div class="bg-white shadow-md rounded w-1/3 mx-1"><LoginCard /></div>
      </div>
    
    
  </div>
</template>

<script>
import LoginCard from '@/components/LoginForm.vue'
import CompanyCard from '@/components/CompanyList.vue'

export default {
  name: 'Home',
  components: {
    LoginCard,
    CompanyCard
  }
}
</script>
