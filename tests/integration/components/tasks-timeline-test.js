import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tasks-timeline', 'Integration | Component | tasks timeline', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tasks-timeline}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tasks-timeline}}
      template block text
    {{/tasks-timeline}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
