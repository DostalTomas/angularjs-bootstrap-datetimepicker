(function(angular) {
  'use strict';
luxon.Settings.defaultLocale = luxon.DateTime.local().resolvedLocaleOpts().locale;
angular.module('bootstrapDatetimePickerExample', ['bootstrap-datetimepicker']);
})(window.angular);