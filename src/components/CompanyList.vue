<template>
  <div id="companies-table">
    <button v-show="login" v-on:click="addNewComp" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full" type="button">
          Add New Company
        </button>
    <table class="table-auto">
  <thead>
    <tr>
      <th class="px-4 py-2">Logo</th>
      <th class="px-4 py-2" @click="sort('name')">Name</th>
      <th class="px-4 py-2" @click="sort('email')">Email</th>
      <th class="px-4 py-2">Status</th>
      <th class="px-4 py-2"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="company in sortedCats" :key="company.id">
      <td class="border px-4 py-2"><img alt="Vue logo" src="../assets/logo.png" class="w-4 h-4 rounded-full mr-1"></td>
      <td class="border px-4 py-2">{{ company.name }}</td>
      <td class="border px-4 py-2">{{ company.email }}</td>
      <td class="border px-4 py-2">{{ company.status }}</td>
      <td class="border px-4 py-2">
        <button v-on:click="getSingle(company.company_id, 'view', 'company')" class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full" type="button">
          View 
        </button>
        <button v-show="login" v-on:click="getSingle(company.company_id, 'edit', 'company')" class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full" type="button">
          Edit
        </button>
        <button v-show="login" v-on:click="getSingle(company.company_id, 'delete', 'company')" class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full" type="button">
          Delete
        </button>
      </td>
    </tr>

  </tbody>
</table>
<!-- <paginated-list :list-data="companies"/>  
<div>
  <ul>
    <li v-for="p in paginatedData" :key="p.id">
      {{p.first}} 
      {{p.last}}  
      {{p.suffix}}
    </li>
  </ul>
  <button @click="prevPage">
    Previous
  </button>
  <button @click="nextPage">
    Next
  </button>
</div> -->

debug: sort={{currentSort}}, dir={{currentSortDir}}, page={{currentPage}}

<p>
<button v-on:click="prevPage">Previous</button> 
<button v-on:click="nextPage">Next</button>
</p>
  </div>
</template>

<script>
  import axios from 'axios';
  let baseURL= 'http://localhost:8000/api/v1/company/';
  export default {
    name: 'companies-table',
    
    data () {
    return {
      companies: [],
      companyD:[],
       loginToken : localStorage.getItem('token'),
       login: false,
       pageSize:5,
  currentPage:1,
  currentSort:'id',
  currentSortDir:'asc'
      // pageNumber: 0,
    }
  },
  mounted () {
    axios
      .get(baseURL+ 'all/')
      .then(response => (this.companies = response.data.data))
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
    },
    addNewComp(){
      this.$root.$modal.show('view-details', {type:'company',companyData: [], action: 'new', });
    },
    nextPage() {
      if((this.currentPage*this.pageSize) < this.companies.length) this.currentPage++;
    },
    prevPage() {
      if(this.currentPage > 1) this.currentPage--;
    },
    sort:function(s) {
    //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    }
    // nextPage(){
    //      this.pageNumber++;
    //   },
    //   prevPage(){
    //     this.pageNumber--;
    //   }

  },

  computed:{
      sortedCats:function() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.companies.sort((a,b) => {
          let modifier = 1;
          if(this.currentSortDir === 'desc') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
            let start = (this.currentPage-1)*this.pageSize;
            let end = this.currentPage*this.pageSize;
            if(index >= start && index < end) return true;
          });
      }
    }
  }
</script>

<style scoped></style>
