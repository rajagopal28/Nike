import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    editLabel(labelItem) {
      console.log('editing label', labelItem);
    }
  }
});
