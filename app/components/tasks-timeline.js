import Ember from 'ember';

export default Ember.Component.extend({
  imageURLOdd : 'https://codyhouse.co/demo/vertical-timeline/img/cd-icon-picture.svg',
  imageURLEven: 'https://codyhouse.co/demo/vertical-timeline/img/cd-icon-movie.svg',
  actions: {
    deleteTask(task) {
     console.log('in component delete task', this.task);
     let now = new Date().getTime();
     this.sendAction('removeTask', task);
     console.log('Sent action to delete task...');
    }
  }
});
