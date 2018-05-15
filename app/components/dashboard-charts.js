import Ember from 'ember';

export default Ember.Component.extend({
  data1 : [
     ['Task', 'Hours per Day'],
     ['Work', 11],
     ['Eat', 2],
     ['Commute', 2],
     ['Watch TV', 2],
     ['Sleep', 7],
   ],
   donutOptions : {
    title: 'Number of tasks by status',
    pieHole: 0.4,
  },
   init() {
     this._super(...arguments);
     let data1 = this.data.reduce((ag, item) =>{
       let status = item.get('status') || 'NA';
       console.log(ag, item, status);
       if (!ag){
         ag = {};
       }
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
   }
});
