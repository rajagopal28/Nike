import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
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
     this.get('session').open('firebase', { provider: provider}).then(function(data) {
       console.log('user load');
       console.log(data.currentUser);
     });
   },
   signOut: function() {
     this.get('session').close();
   }
 }
});
