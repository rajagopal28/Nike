import Ember from 'ember';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Ember.Route.extend(FindQuery, {
  model() {
   if(this.get('session.uid')) {
     return Ember.RSVP.hash({
       user: this.store.query('user', {orderBy : 'uid', equalTo: this.get('session.uid')}).then(function(users){
         return users.get('firstObject');
       }),
       tasks:  this.store.findAll('task')
     });
   }
   return [];
 },
 actions: {
   addTask(task, user) {
     console.log('route action', task, user);
     let taskItem = this.store.createRecord('task', task);
     user.get('tasks').addObject(taskItem);
     taskItem.save().then(function(){
       user.save();
     });
   }
 }
});
