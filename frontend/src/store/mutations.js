import db from '../services/localbase'
export default {
    getTasks (state) {
        db.collection('tasks').get().then(tasks => {
          state.tasks = tasks
        })  
    }   
}