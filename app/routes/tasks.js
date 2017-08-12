import Ember from 'ember';

export default Ember.Route.extend({
  model() {
   if(this.get('session.uid')) {
     return this.store.findAll('task');
   }
   return [];
 }
});
