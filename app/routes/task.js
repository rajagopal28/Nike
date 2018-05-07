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
        memoRecord.set('title',updatedMemoContent.title);
        memoRecord.set('description',updatedMemoContent.description);
        memoRecord.set('dueDate',updatedMemoContent.dueDate);
        memoRecord.set('dateCreated',updatedMemoContent.dueDate);
        memoRecord.set('dateModified',new Date().getTime());
        memoRecord.set('minDate',updatedMemoContent.minDate);
        memoRecord.save();
    },
    deleteMemoItem(memo) {
      this.store.find('memo', memo.id).then((foundMemo) => {
        let taskId = memo.get('taskId');
        foundMemo.destroyRecord().then((rec) => {
          this.store.find('task', taskId).then((foundTask) => {
            let deletions = foundTask.get('logs').map((l) => {
              return l.id === memo.id ? l.destroyRecord() : false;
             });
             Ember.RSVP.all(deletions)
               .then(() => foundTask.save())
               .catch((e) => console.log('ERROR in delete Task CALL:', e));
          });
        });
      });
    },
    viewMemoItem(memo) {
      // this.transitionTo('task', task.get('id'));
    }
  }
});
