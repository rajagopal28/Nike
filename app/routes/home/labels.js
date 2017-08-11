import Ember from 'ember';

export default Ember.Route.extend({
  model() {
   return this.store.findAll('label');
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
    }
  }
});
