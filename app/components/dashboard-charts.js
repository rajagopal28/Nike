import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Component.extend({
   timelineType: 'days',
  taskService: service('task-service'),
   init() {
     this._super(...arguments);
     this.setDataForChartGroupCountByStatus();
     this.setDataForChartGroupCountByCompletedOnTime();
     this.setDataForChartGroupCountByMemoCount();
     this.setDataForChartGroupCountByDate();
     this.setDataForChartGroupCountByEndDuration();
   },
   setDataForChartGroupCountByStatus() {
     let data = this.data.reduce((ag, item) =>{
       let status = item.get('status') || 'NA';
       console.log(ag, item, status);
       ag = ag || {} ;
       ag[status] =  ag[status] || 0;
       ag[status] += 1;
       return ag;
     });
     let countsByStatus = [['Status', 'Count']];
     Object.keys(data).forEach((key) => {
       countsByStatus.push([key, data[key]]);
     });
     console.log('data1', data);
     console.log('countsByStatus', countsByStatus);
     this.set('countsByStatus', countsByStatus);
     this.set('options1', {
      title: 'Number of tasks by status',
      pieHole: 0.4,
    });
   },
   setDataForChartGroupCountByCompletedOnTime() {
     let categories = ['Early', 'OnTime', 'Late'];
     let data = this.data.reduce((ag, item) =>{
       let status = item.get('status') || 'NA';
       if(this.get('taskService').isFinalStatus(status)) {
         let dueDate = new Date(item.get('dueDate'));
         let completionDate = new Date(item.get('dateModified'));
         dueDate.setHours(0, 0, 0, 0);
         completionDate.setHours(0, 0, 0, 0);
         let completionDateTS = completionDate.getTime();
         let dueDateTS = dueDate.getTime();
         let category = categories[0];
         if(completionDateTS === dueDateTS) {
           category = categories[1];
         }
         if(completionDateTS > dueDateTS) {
           category = categories[2];
         }
         console.log(ag, item, category);
         ag = ag || {} ;
         ag[category] =  ag[category] || 0;
         ag[category] += 1;
       }
       return ag;
     });
     let countsByCompletedOnTime = [['Time Completed', 'Count']];
     categories.forEach((key) => {
       countsByCompletedOnTime.push([key, data[key]]);
     });
     console.log('data2', data);
     console.log('countsByCompletedOnTime', countsByCompletedOnTime);
     this.set('countsByCompletedOnTime', countsByCompletedOnTime);
     this.set('options3', {
      title: 'Number of tasks by Completed Time',
      pieHole: 0.4,
    });
   },
   setDataForChartGroupCountByMemoCount() {
     let categories = ['Lazy', 'Normal', 'Active'];
     let data = this.data.reduce((ag, item) =>{
       let memoCount = item.get('logs').length || 0;
       let dueDate = new Date(item.get('dueDate'));
       let dateCreated = new Date(item.get('dateCreated'));
       dueDate.setHours(0, 0, 0, 0);
       dateCreated.setHours(0, 0, 0, 0);
       let daysDifference = (dueDate - dateCreated)/(1000 * 3600 * 24);
       if(daysDifference > 0) {
         let category = categories[1];
         if(memoCount < daysDifference/2) {
           category = categories[0];
         }
         if(memoCount > daysDifference/2) {
           category = categories[2];
         }
         console.log(ag, item, category);
         ag = ag || {} ;
         ag[category] =  ag[category] || 0;
         ag[category] += 1;
       }
       return ag;
     });
     let countsByMemoCount = [['Activity Status', 'Count']];
     categories.forEach((key) => {
       countsByMemoCount.push([key, data[key]]);
     });
     console.log('data3', data);
     console.log('countsByMemoCount', countsByMemoCount);
     this.set('countsByMemoCount', countsByMemoCount);
     this.set('options2', {
      title: 'Number of tasks by Activity status'
    });
   },
   setDataForChartGroupCountByDate() {
     let timelineType = this.get('timelineType');
     let data = this.data.reduce((ag, item) =>{
       let memoCount = item.get('logs').length || 0;
       let dueDate = new Date(item.get('dueDate'));
       dueDate.setHours(0, 0, 0, 0);
       let dateString = dueDate.toDateString();
       let timeKey = dateString; //'' + dueDate.getDate() + '-'+ (dueDate.getMonth()+1) +'-'+ dueDate.getFullYear();
       if(timelineType === 'weeks') {
        timeKey = 'WeekNumber-Year String';
        var onejan = new Date(dueDate.getFullYear(),0,1);
        var millisecsInDay = 86400000;
        var weekNum = Math.ceil((((dueDate - onejan) /millisecsInDay) + onejan.getDay()+1)/7);
        timeKey = 'Week ' + weekNum + '-' + dueDate.getFullYear();
       }
       if(timelineType === 'months') {
          let stringMonth = dateString.split(" ")[1];
          timeKey = stringMonth + '-' + dueDate.getFullYear();
       }
       console.log(ag, item, timeKey);
       ag = ag || {} ;
       ag[timeKey] =  ag[timeKey] || 0;
       ag[timeKey] += 1;
       return ag;
     });
     let countsByDate = [['Time Period', 'Count']];
     Object.keys(data).sort().forEach((key) => {
       countsByDate.push([key, data[key]]);
     });
     console.log('data4', data);
     console.log('countsByDate', countsByDate);
     this.set('countsByDate', countsByDate);
     this.set('options4', {
      title: 'Number of tasks by Timeline'
    });
   },
   setDataForChartGroupCountByEndDuration() {
     let categories = ['Short', 'Medium', 'Long'];
     let data = this.data.reduce((ag, item) =>{
       let memoCount = item.get('logs').length || 0;
       let dueDate = new Date(item.get('dueDate'));
       let dateCreated = new Date(item.get('dateCreated'));
       dueDate.setHours(0, 0, 0, 0);
       dateCreated.setHours(0, 0, 0, 0);
       let daysDifference = (dueDate - dateCreated)/(1000 * 3600 * 24);
       if(daysDifference > 0) {
         let category = categories[1];
         if(daysDifference < 10/*Days*/) {
           category = categories[0];
         }
         if(daysDifference > 30/*Days*/) {
           category = categories[2];
         }
         console.log(ag, item, category);
         ag = ag || {} ;
         ag[category] =  ag[category] || 0;
         ag[category] += 1;
       }
       return ag;
     });
     let countsByDuration = [['Duration Type', 'Count']];
     categories.forEach((key) => {
       countsByDuration.push([key, data[key]]);
     });
     console.log('data5', data);
     console.log('countsByDuration', countsByDuration);
     this.set('countsByDuration', countsByDuration);
     this.set('options5', {
      title: 'Number of tasks by Duration type'
    });
   },
   actions: {
     toggleTimelineType(timelineType) {
       console.log('timelineType', timelineType);
       this.set('timelineType', timelineType);
       this.setDataForChartGroupCountByDate();
     }
   }
});
