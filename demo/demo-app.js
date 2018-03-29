/*globals angular */
// luxon.Settings.defaultLocale = 'cs-CZ';
//luxon.Settings.defaultLocale = 'en-GB';

angular.module('demo',
  [
    'demo.demoController',
    'ui.bootstrap.datetimepicker'
  ])
  .config([
    function () {
      'use strict';

      // Configure the app here.

    }
  ]);
