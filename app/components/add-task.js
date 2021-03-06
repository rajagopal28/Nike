import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Component.extend({
  task: null,
  labels:[],
  memoMode: false,
  showTitle: false,
  statusList: Ember.A(),
  taskService: service('task-service'),
  init() {
    this._super(...arguments);
    this.set('statusList', this.get('taskService').getStatuses());
  },
  didInsertElement() {
    var task = {
      title: '',
      description: '',
      dueDateString: new Date().toISOString().slice(0, 10),
      labels: Ember.A(),// array
      status: this.get('taskService').getInitialStatus(), // new
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
      console.log('status', this.get('inputTask.status'));
      task = {
        title: this.get('inputTask.title'),
        description: this.get('inputTask.description'),
        dueDateString: dueDate.toISOString().slice(0, 10),
        labels: labels,
        status: this.get('inputTask.status'),
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
     console.log('maped label names', labels);
     console.log('this.task.dueDate', new Date(this.task.dueDate));
     this.sendAction('addNewTask', {
       title: this.task.title,
       description: this.task.description,
       dueDate: new Date(this.task.dueDate).getTime(),
       labels: labels,
       dateCreated: now,
       logs:[],
       status : this.task.status,
       dateModifited: now
     });
     this.set('task.title', '');
     this.set('task.description', '');
     this.set('task.labels', Ember.A());
     this.set('task.dueDate', new Date());
     this.set('task.status', this.statusList[0]);
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
