import DS from 'ember-data';

export default DS.Model.extend({
  displayName: DS.attr('string'),
  passKey: DS.attr('string'),
  joined: DS.attr('number'),
  uid: DS.attr('string'),
  tasks: DS.hasMany('task', { async: true, inverse: null })
});
