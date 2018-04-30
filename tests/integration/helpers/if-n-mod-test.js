
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('if-n-mod', 'helper:if-n-mod', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{if-n-mod inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

