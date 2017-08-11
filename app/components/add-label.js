import Ember from 'ember';

export default Ember.Component.extend({
  displayText: null,
  store: Ember.inject.service('store'),
  actions: {
    addLabel() {
     console.log('in component add label');
     this.sendAction('addNewLabel', this.displayText);
     this.set('displayText', '');
    }
  }
});
