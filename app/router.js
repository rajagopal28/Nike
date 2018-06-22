import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.authenticatedRoute('labels');
  this.authenticatedRoute('tasks');
  this.authenticatedRoute('users');
  this.authenticatedRoute('task', { path: '/task/:task_id' });
  this.authenticatedRoute('dashboard');
});

export default Router;
