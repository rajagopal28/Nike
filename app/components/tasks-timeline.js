import Ember from 'ember';

export default Ember.Component.extend({
  imageURLOdd : 'https://codyhouse.co/demo/vertical-timeline/img/cd-icon-picture.svg',
  imageURLEven: 'https://codyhouse.co/demo/vertical-timeline/img/cd-icon-movie.svg',
  selectedTask: null,
  showDeleteWarning: false,
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
   }
  }
});
