import Ember from 'ember';

export default Ember.Component.extend({
  leftSideBarLockedOpen: true,
  actions : {
    toggle(leftSideBarLockedOpen) {
      console.log('sdflksdfjskldfj', leftSideBarLockedOpen);
      this.set('leftSideBarLockedOpen', !leftSideBarLockedOpen);
    }
  }
});
