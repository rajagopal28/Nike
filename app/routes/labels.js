import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model() {
   if(this.session.uuid) {
     return this.store.findAll('label');
   }
   return [];
 },
 getNameFromValue: function(text) {
   if(text && text.trim().length > 0) {
     return text.toLowerCase().split(" ").join("_");
   }
   return "";
 },
  actions : {
    addLabel(displayText) {
     console.log('adding label in route');
     var newLabel = this.get("store").createRecord('label', {
       displayName: displayText,
       name: this.getNameFromValue(displayText),
       addedOn: new Date().getTime()
     });
     newLabel.save();
   },
   accessDenied() {
     this.transitionTo('login');
   }
  }
});
