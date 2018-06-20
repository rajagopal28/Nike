import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.authenticatedRoute('labels');
  this.authenticatedRoute('tasks');
  this.route('users');
  this.authenticatedRoute('task', { path: '/task/:task_id' });
  this.authenticatedRoute('dashboard');
  this.route('home');
});

export default Router;
