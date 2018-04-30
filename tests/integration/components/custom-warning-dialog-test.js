import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('custom-warning-dialog', 'Integration | Component | custom-warning-dialog', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{custom-warning-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#custom-warning-dialog}}
      template block text
    {{/custom-warning-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
