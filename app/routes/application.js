import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),
  beforeModel: function() {
    this.get('authentication');
    return this.get('session').fetch().catch(function() {
        console.log('not auth in home');
    });
  },
  model() {
    console.log('session',this.session,  this.get('session.uid'));
    if (this.get('session.uid')) {
      return this.store.findAll('user');
    }
    return [];
 },
 actions: {
   signIn: function(provider) {
     console.log('sigining in', provider);
     let authService = this.get('authentication');
     this.get('session').open('firebase', { provider: provider}).then(function(data) {
       console.log('user load');
       console.log(data.currentUser);
       authService.setAuthenticatedUser(data.currentUser.uid);
     });
   },
   signOut: function() {
     this.get('session').close();
   }
 }
});
