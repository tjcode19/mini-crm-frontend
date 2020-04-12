<template>
  <div id="employees-table">

    <p>Page {{currentPage}} of {{ Math.round(totalPage) }}</p>
    <table class="table-auto w-full text-left">
  <thead>
    <tr>
      <th class="px-4 py-2">S/N</th>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="employee in sortedEmp" :key="employee.id">
      <td class="border px-4 py-2">{{employee.id}}</td>
      <td class="border px-4 py-2">{{ employee.name }}</td>
      <td class="border px-4 py-2">{{ employee.email }}</td>
      <td class="border px-4 py-2 text-center">
        <button v-on:click="getSingle(employee.id, 'view')"  class="bg-blue-500 hover:bg-blue-700 mr-1 text-white py-1 px-2 rounded-full">
          View
        </button>
        <button v-show="login" v-on:click="getSingle(employee.id, 'edit', 'employee')" class="bg-orange-500 mr-1 hover:bg-orange-700 text-white py-1 px-2 rounded-full" type="button">
          Edit
        </button>
        <button v-show="login" v-on:click="getSingle(employee.id, 'delete', 'employee')" class="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-full" type="button">
          Delete
        </button>
      </td>
    </tr>
  </tbody>
</table>
<p>
<button v-on:click="prevPage" class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full m-2">Previous</button> 
<button v-on:click="nextPage" class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full m-2">Next</button>
</p>
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
       login: false,
       pageSize:5,
        currentPage:1,
        currentSort:'id',
        currentSortDir:'asc',
        totalPage:0
      
    }
  },
  mounted () {
    HTTP
      .get('employee/all', { headers: {"Authorization" : `Bearer ${this.loginToken}`}})
      .then(response => (this.employees = response.data.data))
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
      .get('employee/'+id )
      .then(response => (this.show(response.data, action, type)))

    },

    show (data, action, type) {
    this.$root.$modal.show('view-details', { companyData: data.data, action: action, type:type });
    },
    hide () {
      this.$root.$modal.hide('view-details');
    },
    nextPage() {
      if((this.currentPage*this.pageSize) < this.employees.length) this.currentPage++;
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
    
  },
  computed:{
    
      sortedEmp:function() {
        
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.employees.sort((a,b) => {
          let modifier = 1;
          if(this.currentSortDir === 'desc') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
            let start = (this.currentPage-1)*this.pageSize;
            let end = this.currentPage*this.pageSize;
            this.totalPage =  this.employees.length/this.pageSize;
            if(index >= start && index < end) return true;
          });
      }
    }

  }
</script>

<style scoped></style>