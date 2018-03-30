/*globals angular, luxon, $ */
(function () {
  'use strict';

  angular
    .module('demo.demoController', [])
    .controller('demoController', demoController);

  demoController.$inject = ['$scope', '$log'];

  function demoController ($scope, $log) {

      const validViews = ['year', 'month', 'day', 'hour', 'minute'];
      let selectable = true;

      $scope.controllerName = 'demoController';

    /* Bindable functions
     -----------------------------------------------*/
    $scope.beforeRender = beforeRender;
    $scope.changeConfig = changeConfig;
    $scope.checkboxOnTimeSet = checkboxOnTimeSet;
    $scope.configFunction = configFunction;
    $scope.endDateBeforeRender = endDateBeforeRender;
    $scope.endDateOnSetTime = endDateOnSetTime;
    $scope.getLocale = getLocale;
    $scope.guardianOnSetTime = guardianOnSetTime;
    $scope.inputOnTimeSet = inputOnTimeSet;
    $scope.renderOnBeforeRender = renderOnBeforeRender;
    $scope.renderOnClick = renderOnClick;
    $scope.setLocale = setLocale;
    $scope.startDateBeforeRender = startDateBeforeRender;
    $scope.startDateOnSetTime = startDateOnSetTime;

    luxon.Settings.defaultLocale = 'en-us';

    $scope.config = {
      datetimePicker: {
        startView: 'year'
      }
    };

    $scope.data = {
      guardians: [
        {
          name: 'Peter Quill',
          dob: null
        },
        {
          name: 'Groot',
          dob: null
        }
      ]
    };

    $scope.config = {
      configureOnConfig: {
        startView: 'year',
        configureOn: 'config-changed'
      },
      renderOnConfig: {
        startView: 'year',
        renderOn: 'valid-dates-changed'
      }
    };

    function checkboxOnTimeSet () {
      $scope.data.checked = false;
    }

    function inputOnTimeSet (newDate) {
      // If you are not using jQuery or bootstrap.js,
      // this will throw an error.
      // However, can write this function to take any
      // action necessary once the user has selected a
      // date/time using the picker
      $log.info(newDate);
      $('#dropdown3').dropdown('toggle');
    }

    function getLocale () {
      return luxon.Settings.defaultLocale;
    }

    function setLocale (newLocale) {
      luxon.Settings.defaultLocale = newLocale;
    }

    function guardianOnSetTime ($index, guardian, newDate, oldDate) {
      $log.info($index);
      $log.info(guardian.name);
      $log.info(newDate);
      $log.info(oldDate);
      angular.element('#guardian' + $index).dropdown('toggle');
    }

    function beforeRender ($dates) {
        const index = Math.ceil($dates.length / 2);
        $log.info(index);
      $dates[index].selectable = false;
    }

    function configFunction () {
      return {startView: 'month'};
    }

    function changeConfig () {
        let newIndex = validViews.indexOf($scope.config.configureOnConfig.startView) + 1;
        console.log(newIndex);
      if (newIndex >= validViews.length) {
        newIndex = 0;
      }
      $scope.config.configureOnConfig.startView = validViews[newIndex];
      $scope.$broadcast('config-changed');
    }

    function renderOnBeforeRender ($dates) {
      angular.forEach($dates, function (dateObject) {
        dateObject.selectable = selectable;
      });
    }

    function renderOnClick () {
      selectable = (!selectable);
      $scope.$broadcast('valid-dates-changed');
    }

    function startDateOnSetTime () {
      $scope.$broadcast('start-date-changed');
    }

    function endDateOnSetTime () {
      $scope.$broadcast('end-date-changed');
    }

    function startDateBeforeRender ($dates) {
      if ($scope.dateRangeEnd) {
          const activeDate = luxon.DateTime.utc($scope.dateRangeEnd);

          $dates.filter(function (date) {
          return date.localDateValue() >= activeDate.valueOf()
        }).forEach(function (date) {
          date.selectable = false;
        })
      }
    }

    function endDateBeforeRender ($view, $dates) {
      if ($scope.dateRangeStart) {
          const o = {};
          o[$view] = 1;
          const activeDate = luxon.DateTime.utc($scope.dateRangeStart).minus(o).plus({minutes: 1});

          $dates.filter(function (date) {
          return date.localDateValue() <= activeDate.valueOf()
        }).forEach(function (date) {
          date.selectable = false;
        })
      }
    }
  }
})();
