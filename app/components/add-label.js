import Ember from 'ember';

export default Ember.Component.extend({
  displayText: null,
  actions: {
    addLabel() {
     console.log('in component add label');
     this.sendAction('addNewLabel', this.displayText);
     this.set('displayText', '');
    }
  }
});
