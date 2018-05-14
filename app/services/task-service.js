import Ember from 'ember';

export default Ember.Service.extend({
  statuses:['new', 'taken', 'done', 're-new'],
  INITIAL_STATUS_INDEX : 0,
  FINAL_STATUS_INDEX : 2,
  getStatuses() {
    return this.get('statuses');
  },
  getInitialStatus() {
    return this.get('statuses')[this.INITIAL_STATUS_INDEX];
  },
  getFinalStatus() {
    return this.get('statuses')[this.FINAL_STATUS_INDEX];
  }
});
