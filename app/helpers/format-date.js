import Ember from 'ember';

export function formatDate([value, ...rest], hash) {
  var date = new Date(value);
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  console.log('hash', hash);

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  var formattedValue = day + ' ' + monthNames[monthIndex] + ' ' + year;
  return formattedValue;
}

export default Ember.Helper.helper(formatDate);
