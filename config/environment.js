/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    firebase: {
      apiKey: 'xyz',
     authDomain: 'YOUR-FIREBASE-APP.firebaseapp.com',
     databaseURL: 'https://YOUR-FIREBASE-APP.firebaseio.com',
     storageBucket: 'YOUR-FIREBASE-APP.appspot.com',
    torii: {
      sessionServiceName: 'session',
      providers: {
        'github-oauth2': {
          apiKey: '<Client-Id>',
          redirectUri: 'https://rajagopal28.github.io/Nike',
          scope: 'user'
        }
    }
    },
    modulePrefix: 'nike',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.torii.providers['github-oauth2'].redirectUri = 'http://localhost:4200/login';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.rootURL = '/Nike/';
    ENV.locationType = 'hash';
  }

  return ENV;
};
