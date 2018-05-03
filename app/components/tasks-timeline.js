import Ember from 'ember';

export default Ember.Component.extend({
  imageURLOdd : 'https://codyhouse.co/demo/vertical-timeline/img/cd-icon-picture.svg',
  imageURLEven: 'https://codyhouse.co/demo/vertical-timeline/img/cd-icon-movie.svg',
  selectedTask: null,
  showDeleteWarning: false,
  showEditTaskDialog: false,
  deleteTaskWarningContent: 'Are you sure want to delete this task?',
  actions: {
    deleteTask(task) {
     console.log('in component delete task', this.task);
     let now = new Date().getTime();
     this.sendAction('removeTask', task);
     console.log('Sent action to delete task...');
     this.set('showDeleteWarning', false);
   },
   deleteTaskWarning(task) {
     this.set('selectedTask', task);
     this.set('showDeleteWarning', true);
   },
   hideDialog() {
     this.set('showDeleteWarning', false);
     this.set('showEditTaskDialog', false);
   },
   editTask(task) {
    console.log('new Date(task.dueDate)', task.get('dueDate'));
    task.set('dueDateString', new Date(task.get('dueDate')).toISOString().slice(0, 10));
    this.set('selectedTask', task);
    this.set('showEditTaskDialog', true);
   },
   updateTaskData(taskContent) {
     console.log('updating task content', taskContent);
     console.log('selected task content', this.selectedTask);
     this.sendAction('updateTask', this.selectedTask, taskContent);
     this.set('showEditTaskDialog', false);
   }
  }
});
