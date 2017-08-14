import Ember from 'ember';

export default Ember.Component.extend({
  task: {
    title: '',
    description: '',
    dueDate: new Date()
  },
  actions: {
    addTask() {
     console.log('in component add task', this.task);
     let now = new Date().getTime();
     this.sendAction('addNewTask', {
       title: this.task.title,
       description: this.task.description,
       dueDate: this.task.dueDate,
       dateCreated: now,
       dateModifited: now
     });
     this.set('task.title', '');
     this.set('task.description', '');
    }
  }
});
