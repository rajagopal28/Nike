import DS from 'ember-data';

export default DS.Model.extend({
  displayName: DS.attr('string'),
  name: DS.attr('string'),
  addedOn: DS.attr('number')
});
