import Ember from 'ember';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Ember.Route.extend(FindQuery, {
  authentication: Ember.inject.service(),
  model() {
   if(this.get('session.uid')) {
     let authService = this.get('authentication');
     return new Ember.RSVP.Promise((resolve, reject) => {
       let user = authService.getUser();
       resolve(user ? user.get('tasks') : {});
       reject({error: 'cant find something'});
     });
   }
   return [];
 },
 actions: {
   addTask(task) {
     let user = this.get('authentication').getUser();
     let taskItem = this.store.createRecord('task', task);
     user.get('tasks').addObject(taskItem);
     taskItem.save().then(() => user.save());
   },
   updateTaskItem(taskRecord, updatedTaskContent) {
     taskRecord.set('title',updatedTaskContent.title);
     taskRecord.set('description',updatedTaskContent.description);
     taskRecord.set('dueDate',updatedTaskContent.dueDate);
     taskRecord.set('minDate',updatedTaskContent.minDate);
     taskRecord.save();
   },
   deleteTaskItem(task) {
    let user = this.get('authentication').getUser();
     this.store.find('task', task.id).then((found) => {
       found.destroyRecord().then(() => {
         var deletions = user.get('tasks').map((t) => {
           return t.id === task.id ? t.destroyRecord() : false;
          });
          Ember.RSVP.all(deletions)
            .then(function() {
            return user.save();
          })
          .catch(function(e) {
            // Handle errors
          });
       });
     });
   }
 }
});
