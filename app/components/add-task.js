import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addTask() {
     console.log('in component add task');
     console.log(this.get('user'));
     this.sendAction('addNewTask', {
       title: this.title,
       description: this.description,
       dateCreated: new Date().getTime(),
       dateModifited: new Date().getTime()
     }, this.get('user'));
     this.set('title', '');
     this.set('description', '');
    }
  }
});
