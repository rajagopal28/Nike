import Ember from 'ember';

export default Ember.Component.extend({
  dialogContent: 'This is a dialog rendered into a specific element. Clicking outside the dialog will close it.',
  content: '',
  hideOkButton: false,
  didInsertElement() {
    let content = this.get('content');
    if(content && content.trim()!=='') {
      this.set('dialogContent', content);
    }
  },
  actions: {
    closeDialog(action) {
      console.log('Closing dialog with action:', action);
      if(action === 'ok') {
        this.sendAction('onConfirm');
      } else {
        this.sendAction('onCancel');
      }
    }
  }
});
