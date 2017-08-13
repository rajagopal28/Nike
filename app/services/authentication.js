import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  authenticatedUser: null,

  init() {
    this._super(...arguments);
    console.log('in auth service init');
    this.reset();
  },
  isUserAuthourized() {
    return this.get('authenticatedUser.isUserAuthourized');
  },
  getUser() {
    return this.get('authenticatedUser.user');
  },
  reset() {
    this.set('authenticatedUser', {isUserAuthourized : false});
  },
  setAuthenticatedUser(userUid) {
    console.log('uid', userUid);
    if(this.get('store')) {
      console.log('store irrukku...');
      let _self = this;
      this.get('store').query('user', {orderBy : 'uid', equalTo: this.get('session.uid')}).then(function(users){
        let user = users.get('firstObject');
        if(user) {
          _self.set('authenticatedUser', {isUserAuthourized: true, user: user});
        }
      })

    }
  }
});
