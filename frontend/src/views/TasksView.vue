<template>
  <div>
    <v-subheader>Add a new task</v-subheader>
    <v-col
      cols="12"
    >
      <v-text-field
        label="Task name"
        placeholder="Type the name"
        outlined
        v-model="new_task.title"
        dense
      ></v-text-field>
      <v-text-field
        label="Description"
        placeholder="Type the description"
        outlined
        v-model="new_task.subtitle"
        dense
        @keyup.enter="addTask"
      ></v-text-field>
    </v-col>
    <div v-if="no_tasks" class="mt-16 animate__animated animate__bounceInUp" >
      <center>
        <v-icon size="100" color="red lighten-1">mdi-emoticon-sad</v-icon>
        <div class="text-h5 red--text">No tasks included</div>
      </center>
    </div>
    <tasks-list v-else-if="!loading_tasks" :tasks="items"></tasks-list>
    <div v-else class="progress">
      <v-progress-circular 
      :size="70"
      :width="7"
      color="red"
      indeterminate
      ></v-progress-circular>
      
      <span class="loading"><strong>Loading</strong></span>
    </div>  
    <v-snackbar
      v-model="snackbarActivate"
      timeout="2500"
      elevation="24"
      rounded="pill"
      color="success"
    >
      <strong style="padding-left: 35px" class="white--text">{{ text_included }}</strong>
    </v-snackbar>
      
  </div>
</template>

<script>
//<v-icon size="100" color="red lighten-1">mdi-emoticon-sad</v-icon> <v-img src="../assets/images/thamaraespeio.png" max-width="100px" max-height="150px"></v-img>
 import TasksList from '../components/Tasks/TasksList.vue'

  export default {
    name: 'TasksView',
    components: {
     TasksList
    },
    data () {
      return {
        new_task: {title: '', subtitle: ''},
        items: [],
        snackbarActivate: false,
        text_included: 'Data has been saved successfully!',
        no_tasks: false,
        loading_tasks: true
      }
    },
    methods: {
      addTask () {
        //this.$store.dispatch('addTask', this.new_task) 
        this.$http.post('add_task', this.new_task).then((response)=>{
          console.log(response.data)
          this.items.push(response.data)
          this.no_tasks = false
          this.snackbarActivate = true
        })
        this.new_task.title = ''
        this.new_task.subtitle = ''
      },
      getTasks() {
        this.$http.get('get_tasks').then((response)=>{
          this.items = response.data;  
          this.loading_tasks = false
          if (!this.items.length) {
            this.no_tasks = true
          }
        })
      },
    },
    created () {
      this.getTasks();
      //this.$store.commit('getTasks') 
    }
  }
  //sm="6" md="4"
</script>
<style scoped>
  .progress {
    display: flex;
    align-items: center;
    justify-content: center;  
  }
  .loading {
    position: relative;
    top: 72px;
    right: 58px; 
  }
</style>