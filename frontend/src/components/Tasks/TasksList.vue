<template>
    <div>
       <v-card
        
        elevation="12"
        outlined
        :shaped="no_tasks"
        class="mx-auto my-12"
        width="98%"
        >
         
        <v-toolbar color="#d15c79" dark>
            <v-toolbar-title>Tasks List</v-toolbar-title>
            <div style="padding-left: 40px">
                <v-icon>mdi-magnify</v-icon>
            </div>
            <div style="padding-left: 18px; padding-top: 20px">
                <v-text-field class="search"  placeholder="Search..." :disabled="loading" v-model="search"></v-text-field>  
            </div>      
            <v-spacer></v-spacer>
            
            <div v-if="this.$vuetify.breakpoint.name != 'xs'" class="tooltip">
                <span>{{this.done_filter ? 'Tasks Done ' : 'All Tasks '}}</span>
                <v-btn :loading="done_filter_loading" icon @click="filterDone" >
                    <v-icon>{{this.done_filter ? 'mdi-checkbox-marked-circle' : 'mdi-checkbox-marked-circle-outline'}}</v-icon>
                </v-btn><span class="tooltiptext">{{this.done_filter ? 'Show All Tasks' : 'Show tasks done'}}</span>
            </div>     
             <v-btn v-else :loading="done_filter_loading" icon @click="filterDone" >
                <v-icon>{{this.done_filter ? 'mdi-checkbox-marked-circle' : 'mdi-checkbox-marked-circle-outline'}}</v-icon>
            </v-btn>   
            
                
            
        </v-toolbar>
        <v-spacer></v-spacer>
            <div v-if="loading" align="center" justify="center" style="padding-bottom: 20px;padding-top: 20px;">
                <v-progress-circular 
                :size="40"
                :width="7"
                color="red"
                indeterminate
                ></v-progress-circular>
            </div>    
            <div v-else-if="no_tasks" class="mt-16 animate__animated animate__bounceInUp" >
                <center style="padding-bottom: 60px">
                    <v-icon size="50" color="red lighten-1">mdi-emoticon-sad</v-icon>
                    <div class="text-h7 red--text">No tasks included</div>
                </center>
            </div>
            <drop-list v-else :items="items" @reorder="$event.apply(items)">
                                <template v-slot:item="{item, reorder}">
                                    <drag :key="item.id" :data="item">
                                        <tasks-component  @taskDeleted="deleted_task" @taskEdited="edited_task" @doneEdited="edited_done"
                                        :task="item"
                                        style="background-color: white" :style="reorder ? {borderLeft: '6px solid #1976D2', marginLeft:'-2px'} : {}"
                                        ></tasks-component>
                                        <v-divider/>
                                    </drag>
                                </template>                 
            </drop-list>
       
        </v-card>
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
    props: ['tasks', 'loading'],
    data() {
        return {
            snackbar_delete_activate: false,
            items: [],
            tasksMutable: [],
            search: '',
            done_filter: false,
            done_filter_loading: false,
            no_tasks: false
        }
    },
    created () {
        this.items = this.tasks
        this.tasksMutable = this.tasks
    },
    methods: {
        edited_task (task) {
            this.$emit('taskEdited', task)
            this.filterEdited(task)
        },
        edited_done (id) {
            if (this.done_filter) {
                this.items = this.items.filter(( task )=>{
                    return task.id !== id  
                })
            } 
        },
        deleted_task (id) {
            this.$emit('taskDeleted', id)
            this.filterDeleted(id)
            this.snackbar_delete_activate = true
        },
        filterDeleted (id) {
            this.tasksMutable = this.tasksMutable.filter(function( task ) {
                return task.id !== id
            })
            this.watchSearch()
        },
        filterEdited (task) {
            this.tasksMutable = this.tasksMutable.map(taskMutable => taskMutable.id !== task.id ? taskMutable : task)
            this.watchSearch()
        },
        filterTasks () {
            this.items = []
            if (this.done_filter) {
                this.items = this.tasksMutable.filter(( task )=>{
                    return ((this.search.toLowerCase().split(' ').every(search_char => task.title.toLowerCase().includes(search_char))) && (task.done))
                })
            } else {
                this.items = this.tasksMutable.filter(( task )=>{
                    return this.search.toLowerCase().split(' ').every(search_char => task.title.toLowerCase().includes(search_char))
                })
            }
            this.done_filter_loading = false
        },
        filterDone () {
            this.done_filter_loading =  true,
            this.done_filter = !this.done_filter
            if (this.done_filter) {
                this.items = this.items.filter(( task )=>{
                    return task.done  
                })
                this.done_filter_loading = false
            } else {
                this.watchSearch()    
            }
        },
        watchSearch () {
            if (this.search.length > 0) {
                this.filterTasks()
            } else {
                this.items = []
                if (this.done_filter) {
                    this.items = this.tasksMutable.filter(( task )=>{
                        return task.done  
                    })
                } else {
                    this.items = this.tasksMutable
                }
                this.done_filter_loading = false
            }
        },
        watchItemsLength () {
            if (!this.items.length) {
                this.no_tasks = true
            } else {
                if(this.no_tasks){
                    this.no_tasks = false
                }
            } 
        }
    },
    watch: {
        search: function () {
            this.watchSearch()
        },
        items: function () {
            this.watchItemsLength()
        },
        tasks: function () {
            this.tasksMutable = []
            this.tasksMutable = this.tasks
            this.watchSearch()
        }
    }
}
</script>

<style>
    .search {
        padding-top: 150px;
    }
    .tooltip {
        position: relative;
        display: inline-block;
    }
    .tooltip .tooltiptext {
        visibility: hidden;
        width: 140px;
        background-color: rgb(44, 44, 44);
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        position: absolute;
        z-index: 1;
        top: -40px;
        bottom: auto;
        right: -10%;
        opacity: 0;
        transition: opacity 0.3s;
    }
    .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: rgb(44, 44, 44) transparent transparent transparent;
    }
    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }

</style>