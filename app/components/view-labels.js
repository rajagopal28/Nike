import Ember from 'ember';

export default Ember.Component.extend({
  showDeletedWarning: false,
  showEditDialog: false,
  selectedLabel: null,
  actions:{
    editLabelDialog(labelItem) {
      console.log('editing label', labelItem);
      this.set('selectedLabel', labelItem);
      this.set('showEditDialog', true);
    },
    deleteLabelDialog(labelItem) {
      console.log('deleting label', labelItem);
      this.set('selectedLabel', labelItem);
      this.set('showDeletedWarning', true);
    },
    editLabel(labelItem) {
      this.sendAction("editLabelItem", labelItem);
      this.set('showEditDialog', false);
    },
    deleteLabel(labelItem) {
      this.sendAction("deleteLabelItem", labelItem);
      this.set('showDeletedWarning', false);
    },
    hideDialog() {
      this.set('showDeletedWarning', false);
      this.set('showEditDialog', false);
    }
  }
});
