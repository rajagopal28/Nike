import Ember from 'ember';

export default Ember.Component.extend({
  memo: null,
  task: null, // task to which the memo belongs to
  didInsertElement() {
    var memo = {
      title: '',
      description: '',
      dateCreatedString: new Date().toISOString().slice(0, 10),
      dateCreated: new Date(),
      minDate: new Date()
    };
    if(this.inputMemo) {
      console.log('inside if memo...')
      var dateCreated =  new Date(this.get('inputMemo.dateCreated'));
      memo = {
        title: this.get('inputMemo.title'),
        description: this.get('inputMemo.description'),
        dateCreatedString: dateCreated.toISOString().slice(0, 10),
        dateCreated: dateCreated,
        minDate: new Date(),
        taskId:  this.get('inputMemo.taskId')
      };
    }
    this.set('memo', memo);
  },
  actions: {
    addMemo() {
     console.log('in component add memo', this.memo);
     let dateCreated = new Date(this.memo.dateCreated).getTime();
     this.sendAction('addNewMemo', this.get('task'), {
       title: this.memo.title,
       description: this.memo.description,
       dueDate: dateCreated,
       dateCreated: dateCreated,
       dateModifited: dateCreated,
       taskId: this.get('task.id')
     });
     this.set('memo.title', '');
     this.set('memo.description', '');
     this.set('memo.dateCreated', new Date());
     this.set('memo.dateCreatedString', new Date().toISOString().slice(0, 10));
   }
  }
});
