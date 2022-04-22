<template>
    <div>
            
        <v-toolbar
        color="#d15c79"
        dark
        >

            <v-toolbar-title>Tasks List</v-toolbar-title>
         
                 
              
            <div style="padding-left: 40px">
                <v-icon>mdi-magnify</v-icon>
            </div>
             
              
            <div style="padding-left: 18px; padding-top: 20px">
                <v-text-field class="search"  placeholder="Search..." v-model="search">
                </v-text-field>  
               

            </div>      
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
        </v-toolbar>
        <v-spacer></v-spacer>
            <drop-list :items="items" @reorder="$event.apply(items)">
                                <template v-slot:item="{item, reorder}">
                                    <drag :key="item.id" :data="item">
                                        <tasks-component  @taskDeleted="deleted_task"
                                        :task="item"
                                        style="background-color: white" :style="reorder ? {borderLeft: '6px solid #1976D2', marginLeft:'-2px'} : {}"
                                        ></tasks-component>
                                        <v-divider/>
                                    </drag>
                                </template>                 
            </drop-list>
            <v-divider color="black"></v-divider>
       <br>
        
        <v-snackbar
            v-model="snackbar_delete_activate"
            timeout="2500"
            elevation="24"
            rounded="pill"
            color="red"
            >
            <strong style="padding-left: 35px" class="white--text">Data has been removed successfully</strong>
        </v-snackbar>
  </div>
</template>

<script>
import {Drag,DropList} from "vue-easy-dnd";
import TasksComponent from './TasksComponent.vue'
export default {
    components: {  Drag, DropList, TasksComponent },
    props: ['tasks'],
    data() {
        return {
            snackbar_delete_activate: false,
            items: [],
            search: ''
        }
    },
    created () {
       this.items = this.tasks
    },
    methods: {
        filterDeleted (id) {
            return this.tasks.filter(function( task ) {
                return task.id !== id;
            })
        },
        deleted_task(id) {
            this.items = this.filterDeleted(id)
            this.snackbar_delete_activate = true
        }
    }
       /*watch: {
        tasks: function () {
          this.items = this.tasks
       }
    },*/
}
</script>

<style>
    .search {
        padding-top: 150px;
    }
</style>