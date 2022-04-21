import db from '../services/localbase'
export default {
    addTask({commit}, data) {
        if (data.title && data.subtitle) {
          db.collection('tasks').add({
            id: new Date().getTime(), 
            title: data.title, 
            subtitle: data.subtitle, 
            done: false
          }).then(() => {
            commit('getTasks')
          })
        }
      },
      editTask({commit}, data) {
        if (data.title && data.subtitle) { 
          db.collection('tasks').doc({
            id: data.id, 
          }).update({
            title: data.title, 
            subtitle: data.subtitle 
          }).then(() => {
            commit('getTasks')
          })
        }
      },
      doneTask({commit}, data) {
        if (data) { 
          db.collection('tasks').doc({
            id: data.id, 
          }).update({
            done: !data.done 
          }).then(() => {
            commit('getTasks')
          })
        }
      },
      deleteTask({commit}, id) {
        if (id) { 
          db.collection('tasks').doc({id}).delete().then(() => {
            commit('getTasks')
          })
        }
      }
}