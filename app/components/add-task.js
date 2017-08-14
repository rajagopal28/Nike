import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addTask() {
     console.log('in component add task');
     let now = new Date().getTime();
     this.sendAction('addNewTask', {
       title: this.title,
       description: this.description,
       dateCreated: now,
       dateModifited: now
     });
     this.set('title', '');
     this.set('description', '');
    }
  }
});
