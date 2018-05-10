import Ember from 'ember';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Ember.Route.extend(FindQuery, {
  authentication: Ember.inject.service(),
  model() {
   if(this.get('session.uid')) {
     console.log('inside model if...');
     let authService = this.get('authentication');
     let user = this.get('authentication').getUser();
     return Ember.RSVP.hash({
      tasks: user ? user.get('tasks') : [],
      labels: this.store.findAll('label'),
    });
   }
   return Ember.RSVP.hash({
      tasks: [],
      labels: [],
    });
 },
 setupController(controller, model) {
   this._super(...arguments);
   Ember.set(controller, 'tasks', model.tasks);
   Ember.set(controller, 'labels', model.labels);
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
     taskRecord.set('dateModified',new Date().getTime());
     taskRecord.set('status',updatedTaskContent.status);
     taskRecord.set('minDate',updatedTaskContent.minDate);
     taskRecord.set('labels',updatedTaskContent.labels);
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
            console.log('ERROR in delete Task CALL:', e);
          });
       });
     });
   },
   viewTaskItem(task) {
     this.transitionTo('task', task.get('id'));
   }
 }
});
