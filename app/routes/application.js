import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),
  beforeModel() {
    this.get('authentication');
    return this.get('session').fetch().catch(() => {
        console.log('not auth in home');
    });
  },
  model() {
    console.log('session',this.session,  this.get('session.uid'));
    if (this.get('session.uid')) {
      this.get('authentication').setAuthenticatedUser(this.get('session.uid'));
      return this.store.findAll('user');
    }
    return [];
 },
 actions: {
   signIn(provider) {
     console.log('sigining in', provider);
     let authService = this.get('authentication');
     let _self = this;
     this.get('session').open('firebase', { provider: provider}).then((data) => {
       console.log('user load');
       console.log(data.currentUser);
       authService.setAuthenticatedUser(data.currentUser.uid);
       _self.transitionTo('dashboard');
     });
   },
   signOut() {
     this.get('session').close();
     this.get('authentication').reset();
   }
 }
});
