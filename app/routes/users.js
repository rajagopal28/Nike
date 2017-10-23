import Ember from 'ember';

export default Ember.Route.extend({
  tasks : [
    {
				"id": "task1",
				"title": "First Task to Display",
				"description": "Some long long long description goes here.. Long way",
				"dateCreated": "2017-08-08",
				"dateModified": "2017-08-08"
			},{
				"id": "task2",
				"title": "Second Task to Display",
				"description": "Some long long long description goes here.. Long way",
				"dateCreated": "2017-08-08",
				"dateModified": "2017-08-08"
			},{
				"id": "task3",
				"title": "Third Task to Display",
				"description": "Some long long long description goes here.. Long way",
				"dateCreated": "2017-08-08",
				"dateModified": "2017-08-08"
			},{
				"id": "task4",
				"title": "Fourth Task to Display",
				"description": "Some long long long description goes here.. Long way",
				"dateCreated": "2017-08-08",
				"dateModified": "2017-08-08"
			}],
  model() {
     return new Ember.RSVP.Promise((resolve, reject) => {
       resolve(this.tasks);
       reject({error: 'cant find something'});
     });
 }
});
