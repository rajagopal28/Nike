import Ember from 'ember';

export default Ember.Component.extend({
  router: Ember.inject.service('-routing'),
  leftSideBarLockedOpen: false,
  leftSideBarOpen: false,
  showUserProfileDialog: false,
  isAuthenticated: false,
  actions : {
    toggle(property) {
      this.toggleProperty(property);
    },
    logout() {
      this.sendAction('signOutAction');
    },
    transitionTo(route) {
      console.log('transitioning to', route);
      //'action (mut leftSideBarOpen)'
      this.toggleProperty('leftSideBarLockedOpen');
      this.get('router').transitionTo(route);
    },
    updateProfileDialog() {
      this.toggleProperty('showUserProfileDialog');
    },
    login() {
      this.sendAction("loginAction", "github");
    }
  }
});
