import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  title: DS.attr('string'),
  dateCreated: DS.attr('number'),
  dateModified: DS.attr('number'),
  dueDate: DS.attr('number'),
  labels: DS.attr(),
  user: DS.belongsTo('user', { async: true, inverse: null })
});
