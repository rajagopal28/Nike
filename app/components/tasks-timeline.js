import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Component.extend({
  imageURLOdd : 'https://file.ac/EFrrZnCjY9M/cd-icon-picture.svg',
  imageURLEven: 'https://file.ac/EFrrZnCjY9M/cd-icon-movie.svg',
  taskService: service('task-service'),
  selectedTask: null,
  showDeleteWarning: false,
  showEditTaskDialog: false,
  showAddTaskDialog: false,
  filteredTasks : Ember.A(),
  filterLabels: Ember.A(),
  disableFiltering: false,
  deleteTaskWarningContent: 'Are you sure want to delete this task/memo?',
  completeTaskWarningContent: 'Are you sure want to Complete this task?',
  filterStatus: '',
  init() {
      this._super(...arguments);
      let taskService = this.get('taskService');
      this.set('finalTaskStatusValue', taskService.getFinalStatus());
      this.set('statusList', taskService.getStatuses());
  },
  didInsertElement() {
    this.set('tasks', this.get('tasks').sortBy('dueDate'));
    this.filterTasksWithLabels();
    if(!this.disableFiltering) {
      // memo mode has disableFiltering=true
      this.setAnalyticsOfTasksNeedingAttention();
    }
  },
  filterTasksWithLabels(){
    let filteredTasks = this.get('tasks');
    let _self = this;
    console.log('this.filterLabels', this.get('filterLabels').toArray());
    if(this.filterLabels.length > 0) {
      let mappedFilter = _self.get('filterLabels').map((a) => a.name);
      filteredTasks = filteredTasks.filter((ta) =>  _self.arrayContainsArray(ta.get('labels') || [], mappedFilter));
    }
    if(_self.filterStatus !== '') {
      console.log('status not empty', _self.filterStatus);
      filteredTasks = filteredTasks.filter((ta) =>  _self.filterStatus === ta.get('status'));
    }
    this.set('filteredTasks', filteredTasks);
  },
  arrayContainsArray (superset, subset) {
    if (0 === subset.length || 0 === superset.length) {
      return false;
    }
    return subset.every((value) => superset.indexOf(value) >= 0);
  },
  setAnalyticsOfTasksNeedingAttention() {
    let isInitialized = false;
    let data = this.tasks.reduce((ag, item) =>{
      let status = item.get('status') || 'NA';
      console.log(ag, item, status);
      ag = isInitialized ? ag : {
        late : {count: 0, label: 'exposure-zero'},
        tooLate: {count: 0, label: 'exposure-zero'},
        upcoming: {count: 0, label: 'exposure-zero'},
        onTrack: {count: 0, label: 'exposure-zero'}
      };
      isInitialized = true;
      console.log(ag, item, status);
      let agKey = '';
      let now = new Date().getTime();
      if(!this.get('taskService').isFinalStatus(status)) {
        let daysFactor = 1000*60*60*24; // milliseconds to days
        let daysDifference = (item.get('dueDate')-now)/ daysFactor;
        if(item.get('dueDate')<now) { // late or too late
          daysDifference *= -1;
          if (daysDifference >0 && daysDifference <=10) {
            agKey = 'late';
          }
          if (daysDifference > 10) {
            agKey='tooLate';
          }
        } else { // on track or needs attention
          if (daysDifference > 0 && daysDifference <=10) {
            agKey='upcoming';
          }
          if (daysDifference > 10) {
            agKey='onTrack';
          }
        }
        if(agKey !== '') {
          console.log('ag=', ag, ' agKey=', agKey);
          let newCount = ag[agKey].count+1;
          let _te = newCount < 10 ? newCount : '9-plus';
          ag[agKey].label = 'filter-' + _te;
          ag[agKey].count = newCount;
        }
      }
      return ag;
    });
    console.log('manipulating..statusCount', data);
    this.set('statusCount', data);
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
     this.set('showCompleteTaskDialog', false);
     this.set('showAddTaskDialog', false);
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
   resetFilter() {
     this.set('filterLabels', []);
     this.set('filterStatus', '');
     this.filterTasksWithLabels();
   },
   viewTask(task) {
     console.log('task_id', task.get('id'));
     this.sendAction('viewTask', task);
   },
   completeTaskWarning(task) {
     this.set('showCompleteTaskDialog', true);
     this.set('selectedTask', task);
   },
   completeTask() {
     this.set('selectedTask.status', this.get('taskService').getFinalStatus());
     this.sendAction('updateTask', this.selectedTask);
     this.set('showCompleteTaskDialog', false);
   },
   addTaskDialog() {
     this.set('showAddTaskDialog', true);
   },
   addTaskItem(item) {
     console.log('in addTaskItem of timeine-component', item);
     this.sendAction('addTaskCall', item);
     this.set('showAddTaskDialog', false);
   }
  }
});
