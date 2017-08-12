import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    login(provider) {
      this.sendAction('loginAction', provider);
    },
    logout() {
      this.sendAction('logoutAction');
    }
  }
});
