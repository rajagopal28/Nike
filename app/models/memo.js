import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  title: DS.attr('string'),
  dueDate: DS.attr('number'),
  dateCreated: DS.attr('number'),
  dateModified: DS.attr('number'),
  task: DS.belongsTo('task', { async: true, inverse: null })
});
