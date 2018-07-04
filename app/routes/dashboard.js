import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),
  model() {
   if(this.get('session.uid')) {
     console.log('inside model if... dashboard');
     let authService = this.get('authentication');
     let user = authService.getUser();
     return user ? user.get('tasks') : [];
   }
   return {};
 },
});
