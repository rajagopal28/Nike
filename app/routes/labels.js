import Ember from 'ember';

export default Ember.Route.extend({
  model() {
   if(this.get('session.uid')) {
     return this.store.findAll('label');
   }
   return [];
 },
 getNameFromValue: function(text) {
   if(text && text.length > 0) {
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
       dateCreated: new Date().getTime(),
       dateModified: new Date().getTime()
     });
     newLabel.save();
   },
   editLabel(label) {
     console.log('displayName', label.get('displayName'))
     label.set('name', this.getNameFromValue(''+label.get('displayName')));
     label.set('dateModified', new Date().getTime());
     label.save();
   },
   deleteLabel(label) {
     label.destroyRecord();
   },
   accessDenied() {
     this.transitionTo('home');
   }
  }
});
