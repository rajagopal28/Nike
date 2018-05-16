import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Component.extend({
  data1 : [
     ['Task', 'Hours per Day'],
     ['Work', 11],
     ['Eat', 2],
     ['Commute', 2],
     ['Watch TV', 2],
     ['Sleep', 7],
   ],
   timelineType: 'days',
   donutOptions : {
    title: 'Number of tasks by status',
    pieHole: 0.4,
  },
  taskService: service('task-service'),
   init() {
     this._super(...arguments);
     this.setDataForChartGroupCountByStatus();
     this.setDataForChartGroupCountByCompletedOnTime();
     this.setDataForChartGroupCountByMemoCount();
     this.setDataForChartGroupCountByDate();
   },
   setDataForChartGroupCountByStatus() {
     let data1 = this.data.reduce((ag, item) =>{
       let status = item.get('status') || 'NA';
       console.log(ag, item, status);
       ag = ag || {} ;
       ag[status] =  ag[status] || 0;
       ag[status] += 1;
       return ag;
     });
     let countsByStatus = [['Status', 'Count']];
     Object.keys(data1).forEach((key) => {
       countsByStatus.push([key, data1[key]]);
     });
     console.log('data1', data1);
     console.log('countsByStatus', countsByStatus);
     this.set('data1', countsByStatus);
   },
   setDataForChartGroupCountByCompletedOnTime() {
     let categories = ['Early', 'OnTime', 'Late'];
     let data1 = this.data.reduce((ag, item) =>{
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
     let countsByStatus = [['Time Completed', 'Count']];
     categories.forEach((key) => {
       countsByStatus.push([key, data1[key]]);
     });
     console.log('data2', data1);
     console.log('countsByStatus', countsByStatus);
     this.set('data2', countsByStatus);
   },
   setDataForChartGroupCountByMemoCount() {
     let categories = ['Lazy', 'Normal', 'Active'];
     let data1 = this.data.reduce((ag, item) =>{
       let memoCount = item.get('logs').length || 0;
       let dueDate = new Date(item.get('dueDate'));
       let dateCreated = new Date(item.get('dateCreated'));
       dueDate.setHours(0, 0, 0, 0);
       dateCreated.setHours(0, 0, 0, 0);
       let daysDifference = dueDate - dateCreated;
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
     let countsByStatus = [['Activity Status', 'Count']];
     categories.forEach((key) => {
       countsByStatus.push([key, data1[key]]);
     });
     console.log('data3', data1);
     console.log('countsByStatus', countsByStatus);
     this.set('data3', countsByStatus);
   },
   setDataForChartGroupCountByDate() {
     let timelineType = this.get('timelineType');
     let data1 = this.data.reduce((ag, item) =>{
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
     Object.keys(data1).sort().forEach((key) => {
       countsByDate.push([key, data1[key]]);
     });
     console.log('data4', data1);
     console.log('countsByDate', countsByDate);
     this.set('data4', countsByDate);
   },
   actions: {
     toggleTimelineType(timelineType) {
       console.log('timelineType', timelineType);
       this.set('timelineType', timelineType);
       this.setDataForChartGroupCountByDate();
     }
   }
});
