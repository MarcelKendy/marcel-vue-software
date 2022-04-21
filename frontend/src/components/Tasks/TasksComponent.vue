<template>
  <div>
    <v-list-item
      :class="item.done ? 'blue lighten-4' : ''"
      @click="doneTask"
    >
            <template v-slot:default="{}">
              <v-list-item-action>
                <v-checkbox :input-value="item.done"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title :class="item.done ? 'text-decoration-line-through' : ''">{{item.title}}</v-list-item-title>
                <v-list-item-subtitle>{{item.subtitle}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
              <tasks-menu @taskEdited="edited_task" @taskDeleted="deleted_task" :task="item"></tasks-menu> 
             </v-list-item-action>
            </template>
    </v-list-item>
  </div>      
</template>

<script>
import TasksMenu from '../Tasks/TasksMenu.vue'

export default {
  components: {TasksMenu},
  props: ['task'],
  data () {
    return {
      item: {},
      activeItem: true
    }
  },
  created() {
    this.item = this.task
  },
  methods: {
    edited_task(task) {
      this.item = task
    },
    deleted_task(id) {
      this.activeItem = false
      this.$emit('taskDeleted', id)  
    },
    doneTask() {
      this.item.done = !this.item.done
      this.$http.put(`done_task/${this.item.id}`, this.item).then((response)=>{
        console.log(response.data) 
      })     
    }
  }
}
</script>

<style>

</style>