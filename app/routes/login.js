import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
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
