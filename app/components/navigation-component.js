import Ember from 'ember';

export default Ember.Component.extend({
  leftSideBarLockedOpen: false,
  actions : {
    toggle(leftSideBarLockedOpen) {
      console.log('sdflksdfjskldfj', leftSideBarLockedOpen);
      this.set('leftSideBarLockedOpen', !leftSideBarLockedOpen);
    }
  }
});
