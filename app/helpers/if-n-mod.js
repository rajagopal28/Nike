import Ember from 'ember';

export function ifNMod([option, ...rest], hash) {
  var index = option + 1,
     nth = hash.nth;
  //console.log("index, nth", index, nth)
  if (index % nth === 0) {
    return true;
  }
  return false;
}

export default Ember.Helper.helper(ifNMod);
