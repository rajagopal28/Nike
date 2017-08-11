import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  beforeModel: function() {
    let _self = this;
    return this.get('session').fetch().catch(function() {
        console.log('not auth in home');
        _self.transitionTo('login');
    });
  },
  model() {
    if (this.session.isAuthenticated) {
      return this.store.findAll('user');
    }
    return [];
 }
});
