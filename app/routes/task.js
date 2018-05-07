import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),
  model(params) {
    console.log('params', params);
    if(this.get('session.uid') && params.task_id) {
      return this.store.findRecord('task', params.task_id);
    }
    return {};
  }
});
