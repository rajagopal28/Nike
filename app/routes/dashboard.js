import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),
  model() {
   if(this.get('session.uid')) {
     console.log('inside model if...');
     let authService = this.get('authentication');
     let user = this.get('authentication').getUser();
     return user.get('tasks');
   }
   return {};
 },
});
