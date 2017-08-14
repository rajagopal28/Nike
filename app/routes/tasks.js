import Ember from 'ember';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Ember.Route.extend(FindQuery, {
  authentication: Ember.inject.service(),
  model() {
   if(this.get('session.uid')) {
     let authService = this.get('authentication');
     return Ember.RSVP.hash({
       tasks: new Ember.RSVP.Promise(function(resolve, reject) {
         let user = authService.getUser();
         resolve(user ? user.get('tasks') : {});
         reject({error: 'cant find something'});
       })
     });
   }
   return [];
 },
 actions: {
   addTask(task) {
     let user = this.get('authentication').getUser();
     let taskItem = this.store.createRecord('task', task);
     user.get('tasks').addObject(taskItem);
     taskItem.save().then(function(){
       user.save();
     });
   }
 }
});
