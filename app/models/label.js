import DS from 'ember-data';

export default DS.Model.extend({
  displayName: DS.attr('string'),
  name: DS.attr('string'),
  dateCreated: DS.attr('number'),
  dateModified: DS.attr('number')
});
