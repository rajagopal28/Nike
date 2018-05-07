import Ember from 'ember';

export default Ember.Component.extend({
  imageURLOdd : 'https://codyhouse.co/demo/vertical-timeline/img/cd-icon-picture.svg',
  imageURLEven: 'https://codyhouse.co/demo/vertical-timeline/img/cd-icon-movie.svg',
  selectedTask: null,
  showDeleteWarning: false,
  showEditTaskDialog: false,
  filteredTasks : Ember.A(),
  filterLabels: Ember.A(),
  disableFiltering: false,
  deleteTaskWarningContent: 'Are you sure want to delete this task/memo?',
  didInsertElement() {
    this.filterTasksWithLabels();
  },
  filterTasksWithLabels(){
    let filteredTasks = this.tasks;
    let _self = this;
    console.log('this.filterLabels', this.get('filterLabels').toArray());
    if(this.filterLabels.length > 0) {
      let mappedFilter = _self.get('filterLabels').map((a) => a.name);
      filteredTasks = this.get('tasks').filter((ta) =>  _self.arrayContainsArray(ta.get('labels') || [], mappedFilter));
    }
    this.set('filteredTasks', filteredTasks);
  },
  arrayContainsArray (superset, subset) {
    if (0 === subset.length || 0 === superset.length) {
      return false;
    }
    return subset.every((value) => superset.indexOf(value) >= 0);
  },
  actions: {
    deleteTask(task) {
     console.log('in component delete task', this.task);
     this.sendAction('removeTask', task);
     console.log('Sent action to delete task...');
     this.set('showDeleteWarning', false);
   },
   deleteTaskWarning(task) {
     this.set('selectedTask', task);
     this.set('showDeleteWarning', true);
   },
   hideDialog() {
     this.set('showDeleteWarning', false);
     this.set('showEditTaskDialog', false);
   },
   editTask(task) {
    console.log('new Date(task.dueDate)', task.get('dueDate'));
    task.set('dueDateString', new Date(task.get('dueDate')).toISOString().slice(0, 10));
    this.set('selectedTask', task);
    this.set('showEditTaskDialog', true);
   },
   updateTaskData(taskContent) {
     console.log('updating task content', taskContent);
     console.log('selected task content', this.selectedTask);
     this.sendAction('updateTask', this.selectedTask, taskContent);
     this.set('showEditTaskDialog', false);
   },
   addLabel(label) {
     if(this.filterLabels.indexOf(label) === -1) {
       var labels = this.filterLabels;
       labels.pushObject({ name: label.get('name')});
       this.set('filterLabels', labels);
       console.log('Added label ..', label.get('name'), this.filterLabels.length);
     } else {
       console.log('Label already added....')
     }
   },
   removeLabel(label) {
       console.log('removing label', label);
       let targetIndex = this.filterLabels.indexOf(label);
       if(targetIndex !== -1) {
         var labels = this.filterLabels;
         // labels.arrayContentWillChange(0, labels.length-1, labels.length-1);
         labels.removeObject(label);
         // labels.arrayContentWillChange(0, labels.length-1, labels.length-2);
         this.set('filterLabels', labels);
       } else {
         console.log('Label should be added....')
       }
   },
   applyFilter() {
     this.filterTasksWithLabels();
   },
   viewTask(task) {
     console.log('task_id', task.get('id'));
     this.sendAction('viewTask', task);
   }
  }
});
