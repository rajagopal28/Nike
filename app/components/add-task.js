import Ember from 'ember';

export default Ember.Component.extend({
  task: null,
  didInsertElement() {
    var task = {
      title: '',
      description: '',
      dueDateString: new Date().toISOString().slice(0, 10),
      dueDate: new Date(),
      minDate: new Date()
    };
    if(this.inputTask) {
      console.log('inside if...')
      var dueDate =  new Date(this.get('inputTask.dueDate'));
      task = {
        title: this.get('inputTask.title'),
        description: this.get('inputTask.description'),
        dueDateString: dueDate.toISOString().slice(0, 10),
        dueDate: dueDate,
        minDate: dueDate
      };
    }
    this.set('task', task);
  },
  actions: {
    addTask() {
     console.log('in component add task', this.task);
     let now = new Date().getTime();
     this.sendAction('addNewTask', {
       title: this.task.title,
       description: this.task.description,
       dueDate: this.task.dueDate.getTime(),
       dateCreated: now,
       dateModifited: now
     });
     this.set('task.title', '');
     this.set('task.description', '');
     this.set('task.dueDate', new Date());
     this.set('task.dueDateString', new Date().toISOString().slice(0, 10));
    }
  }
});
