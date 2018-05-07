import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),
  model(params) {
    console.log('params', params);
    if(this.get('session.uid') && params.task_id) {
      return this.store.findRecord('task', params.task_id);
    }
    return {};
  },
  actions: {
    addMemoItem(task, memo) {
    //   let user = this.get('authentication').getUser();
    //   let taskItem = this.store.createRecord('task', task);
    //   user.get('tasks').addObject(taskItem);
    //   taskItem.save().then(() => user.save());
      let memoRecord = this.store.createRecord('memo', memo);
      this.store.findRecord('task', task.id).then((item) => {
        memoRecord.save().then(()=> {
          item.get('logs').addObject(memoRecord);
          item.save();
        });
      });
      console.log('adding memo..', memo);
    },
    updateMemoItem(memoRecord, updatedMemoContent) {
    },
    deleteMemoItem(memo) {
    //  let user = this.get('authentication').getUser();
    //   this.store.find('task', task.id).then((found) => {
    //     found.destroyRecord().then(() => {
    //       var deletions = user.get('tasks').map((t) => {
    //         return t.id === task.id ? t.destroyRecord() : false;
    //        });
    //        Ember.RSVP.all(deletions)
    //          .then(function() {
    //          return user.save();
    //        })
    //        .catch(function(e) {
    //          // Handle errors
    //          console.log('ERROR in delete Task CALL:', e);
    //        });
    //     });
    //   });
    },
    viewMemoItem(memo) {
      // this.transitionTo('task', task.get('id'));
    }
  }
});
