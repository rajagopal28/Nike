import Ember from 'ember';

export default Ember.Component.extend({
  task: {
    title: '',
    description: '',
    dueDateString: new Date().toISOString().slice(0, 10),
    dueDate: new Date(),
    minDate: new Date()
  },
  actions: {
    addTask() {
     console.log('in component add task', this.task);
     let now = new Date().getTime();
     this.sendAction('addNewTask', {
       title: this.task.title,
       description: this.task.description,
       dueDate: this.task.dueDate.getTime(),
       dateCreated: now,
       dateModifited: now
     });
     this.set('task.title', '');
     this.set('task.description', '');
     this.set('task.dueDate', new Date());
     this.set('task.dueDateString', new Date().toISOString().slice(0, 10));
    }
  }
});
