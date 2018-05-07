import Ember from 'ember';

export default Ember.Component.extend({
  task: null,
  labels:[],
  disableFiltering: false,
  didInsertElement() {
    var task = {
      title: '',
      description: '',
      dueDateString: new Date().toISOString().slice(0, 10),
      labels: Ember.A(),// array
      dueDate: new Date(),
      minDate: new Date()
    };
    if(this.inputTask) {
      console.log('inside if...')
      var dueDate =  new Date(this.get('inputTask.dueDate'));
      console.log(this.get('inputTask.labels'));
      let labels = this.get('inputTask.labels') || [];
      labels = labels.map((la) => {
        return {name: la};
      });
      console.log('something', labels);
      task = {
        title: this.get('inputTask.title'),
        description: this.get('inputTask.description'),
        dueDateString: dueDate.toISOString().slice(0, 10),
        labels: labels,
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
     let labels = this.get('task.labels').map((la) => la.name);
     console.log('maped label names', labels)
     this.sendAction('addNewTask', {
       title: this.task.title,
       description: this.task.description,
       dueDate: this.task.dueDate.getTime(),
       labels: labels,
       dateCreated: now,
       logs:{},
       dateModifited: now
     });
     this.set('task.title', '');
     this.set('task.description', '');
     this.set('task.labels', Ember.A());
     this.set('task.dueDate', new Date());
     this.set('task.dueDateString', new Date().toISOString().slice(0, 10));
   },
   addLabel(label) {
     if(this.task.labels.indexOf(label) === -1) {
       var labels = this.task.labels;
       labels.pushObject({ name: label.get('name')});
       this.set('task.labels', labels);
       console.log('Added label ..', label.get('name'), this.task.labels.length);
     } else {
       console.log('Label already added....')
     }
   },
   removeLabel(label) {
       console.log('removing label', label);
       let targetIndex = this.task.labels.indexOf(label);
       if(targetIndex !== -1) {
         var labels = this.task.labels;
         // labels.arrayContentWillChange(0, labels.length-1, labels.length-1);
         labels.removeObject(label);
         // labels.arrayContentWillChange(0, labels.length-1, labels.length-2);
         this.set('task.labels', labels);
       } else {
         console.log('Label should be added....')
       }
   }
  }
});
