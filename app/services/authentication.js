import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  isLoading : false,
  authenticatedUser:  {isUserAuthourized : false},

  init() {
    this._super(...arguments);
    console.log('in auth service init');
  },
  isUserAuthourized() {
    return this.get('authenticatedUser.isUserAuthourized');
  },
  getUser() {
    return this.get('authenticatedUser.user');
  },
  reset() {
    if(!this.isLoading) {
      this.set('authenticatedUser', {isUserAuthourized : false});
    }
  },
  setAuthenticatedUser(userUid) {
    if(this.get('store')) {
      console.log('setting auth user');
      let _self = this;
      this.set('isLoading', false);
      this.get('store').query('user', {orderBy : 'uid', equalTo: this.get('session.uid')}).then((users) => {
        let user = users.get('firstObject');
        if(user) {
          _self.set('authenticatedUser', {isUserAuthourized: true, user: user});
        }
        _self.set('isLoading', false);
      })

    }
  }
});
