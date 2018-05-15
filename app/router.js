import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.authenticatedRoute('labels');
  this.route('tasks');
  this.route('users');
  this.route('task', { path: '/task/:task_id' });
  this.route('dashboard');
});

export default Router;
