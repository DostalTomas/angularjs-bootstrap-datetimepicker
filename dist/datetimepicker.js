(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angularjs-register"), require("angular"), require("luxon"));
	else if(typeof define === 'function' && define.amd)
		define(["angularjs-register", "angular", "luxon"], factory);
	else if(typeof exports === 'object')
		exports["angularjs-bootstrap-datetimepicker"] = factory(require("angularjs-register"), require("angular"), require("luxon"));
	else
		root["angularjs-bootstrap-datetimepicker"] = factory(root["angularjs-register"], root["angular"], root["luxon"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_angularjs_register__, __WEBPACK_EXTERNAL_MODULE_angular__, __WEBPACK_EXTERNAL_MODULE_luxon__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/date-object.js":
/*!*******************************!*\
  !*** ./src/js/date-object.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DateObject =
/*#__PURE__*/
function () {
  /**
   * @param {{dateTime: DateTime, active: boolean=, current: boolean=, future: boolean=, past: boolean=, display: string=, selectable: boolean=}}
   */
  function DateObject(_ref) {
    var _this = this;

    var dateTime = _ref.dateTime,
        rest = _objectWithoutProperties(_ref, ["dateTime"]);

    _classCallCheck(this, DateObject);

    this.dateTime = dateTime;
    this.selectable = true;
    var validProperties = ['active', 'current', 'display', 'future', 'past', 'selectable'];
    Object.keys(rest).filter(function (key) {
      return validProperties.includes(key);
    }).forEach(function (key) {
      _this[key] = rest[key];
    });
  }
  /**
   * @returns {DateTime}
   */


  _createClass(DateObject, [{
    key: "localDateValue",
    value: function localDateValue() {
      return this.dateTime.toLocal();
    }
  }]);

  return DateObject;
}();

exports.default = DateObject;

/***/ }),

/***/ "./src/js/datetimepicker-config.factory.js":
/*!*************************************************!*\
  !*** ./src/js/datetimepicker-config.factory.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DateTimePickerConfigFactory;

var _angular = _interopRequireDefault(__webpack_require__(/*! angular */ "angular"));

var _datetimepicker = __webpack_require__(/*! ./datetimepicker.constants */ "./src/js/datetimepicker.constants.js");

var _luxon = __webpack_require__(/*! luxon */ "luxon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DateTimePickerConfigFactory() {
  var defaultConfiguration = {
    configureOn: null,
    dropdownSelector: null,
    minuteStep: 5,
    minView: 'minute',
    renderOn: null,
    startView: 'day'
  };

  var screenReader = _datetimepicker.DEFAULT_LOCALIZATION[_luxon.Settings.defaultLocale.toLowerCase()];

  return _angular.default.extend({}, defaultConfiguration, {
    screenReader: screenReader
  });
}

DateTimePickerConfigFactory.factoryName = 'dateTimePickerConfig';

/***/ }),

/***/ "./src/js/datetimepicker-validator.service.js":
/*!****************************************************!*\
  !*** ./src/js/datetimepicker-validator.service.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _angular = _interopRequireDefault(__webpack_require__(/*! angular */ "angular"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DateTimePickerValidatorService =
/*#__PURE__*/
function () {
  DateTimePickerValidatorService.$inject = ["$log"];

  /*@ngInject*/
  function DateTimePickerValidatorService($log) {
    _classCallCheck(this, DateTimePickerValidatorService);

    this.$log = $log;
  }

  _createClass(DateTimePickerValidatorService, [{
    key: "validate",
    value: function validate(configuration) {
      var validOptions = ['configureOn', 'dropdownSelector', 'minuteStep', 'minView', 'renderOn', 'startView', 'screenReader'];
      var invalidOptions = Object.keys(configuration).filter(function (key) {
        return validOptions.indexOf(key) < 0;
      });

      if (invalidOptions.length) {
        throw new Error("Invalid options: ".concat(invalidOptions.join(', ')));
      } // Order of the elements in the validViews array is significant.


      var validViews = ['minute', 'hour', 'day', 'month', 'year'];

      if (validViews.indexOf(configuration.startView) < 0) {
        throw new Error("invalid startView value: ".concat(configuration.startView));
      }

      if (validViews.indexOf(configuration.minView) < 0) {
        throw new Error("invalid minView value: ".concat(configuration.minView));
      }

      if (validViews.indexOf(configuration.minView) > validViews.indexOf(configuration.startView)) {
        throw new Error('startView must be greater than minView');
      }

      if (!_angular.default.isNumber(configuration.minuteStep)) {
        throw new Error('minuteStep must be numeric');
      }

      if (configuration.minuteStep <= 0 || configuration.minuteStep >= 60) {
        throw new Error('minuteStep must be greater than zero and less than 60');
      }

      if (configuration.configureOn !== null && !_angular.default.isString(configuration.configureOn)) {
        throw new Error('configureOn must be a string');
      }

      if (configuration.configureOn !== null && configuration.configureOn.length < 1) {
        throw new Error('configureOn must not be an empty string');
      }

      if (configuration.renderOn !== null && !_angular.default.isString(configuration.renderOn)) {
        throw new Error('renderOn must be a string');
      }

      if (configuration.renderOn !== null && configuration.renderOn.length < 1) {
        throw new Error('renderOn must not be an empty string');
      }

      if (configuration.dropdownSelector !== null && !_angular.default.isString(configuration.dropdownSelector)) {
        throw new Error('dropdownSelector must be a string');
      }
    }
  }]);

  return DateTimePickerValidatorService;
}();

exports.default = DateTimePickerValidatorService;
Object.defineProperty(DateTimePickerValidatorService, "serviceName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'dateTimePickerValidator'
});

/***/ }),

/***/ "./src/js/datetimepicker.component.js":
/*!********************************************!*\
  !*** ./src/js/datetimepicker.component.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _angular = _interopRequireDefault(__webpack_require__(/*! angular */ "angular"));

var _luxon = __webpack_require__(/*! luxon */ "luxon");

var _datetimepickerTpl = _interopRequireDefault(__webpack_require__(/*! ../templates/datetimepicker.tpl.pug */ "./src/templates/datetimepicker.tpl.pug"));

var _dateObject = _interopRequireDefault(__webpack_require__(/*! ./date-object */ "./src/js/date-object.js"));

var _datetimepicker = __webpack_require__(/*! ./datetimepicker.constants */ "./src/js/datetimepicker.constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @typedef {object} DateModel
 * @property {string} previousView
 * @property {string} currentView
 * @property {string} nextView
 * @property {DateObject} previousViewDate
 * @property {DateObject} leftDate
 * @property {DateObject} rightDate
 * @property {Array} dates
 * @property dayNames
 * @property weeks
 */

/**
 * @property ngModelController
 * @property {function} beforeRender
 * @property {function} onSetTime
 * @property {string} viewFormat
 */
var DirectiveController =
/*#__PURE__*/
function () {
  DirectiveController.$inject = ["$scope", "$attrs", "dateTimePickerValidator", "dateTimePickerConfig"];

  /*@ngInject*/
  function DirectiveController($scope, $attrs, dateTimePickerValidator, dateTimePickerConfig) {
    _classCallCheck(this, DirectiveController);

    this.$scope = $scope;
    this.dateTimePickerValidator = dateTimePickerValidator;
    this.dateTimePickerConfig = dateTimePickerConfig;
    this.$attrs = $attrs;
  }

  _createClass(DirectiveController, [{
    key: "$onInit",
    value: function $onInit() {
      var _this = this;

      this.configuration = this.createConfiguration(this.$attrs, this.dateTimePickerConfig);
      this.screenReader = this.configuration.screenReader; // Behavior

      this.ngModelController.$render = this.$render.bind(this);

      if (this.configuration.configureOn) {
        this.$scope.$on(this.configuration.configureOn, function () {
          _this.configuration = _this.createConfiguration(_this.$attrs, _this.dateTimePickerConfig);
          _this.screenReader = _this.configuration.screenReader;

          _this.ngModelController.$render();
        });
      }

      if (this.configuration.renderOn) {
        this.$scope.$on(this.configuration.renderOn, this.ngModelController.$render);
      } // Implementation


      this.viewToModelFactory = {
        year: this.yearModelFactory.bind(this),
        month: this.monthModelFactory.bind(this),
        day: this.dayModelFactory.bind(this),
        hour: this.hourModelFactory.bind(this),
        minute: this.minuteModelFactory.bind(this),
        setTime: this.setTime.bind(this)
      };
    }
    /**
     * @param {string} viewName
     * @param {DateObject} dateObject
     * @param event
     */

  }, {
    key: "changeView",
    value: function changeView(viewName, dateObject, event) {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }

      if (viewName && dateObject.dateTime > -Infinity && dateObject.selectable && this.viewToModelFactory[viewName]) {
        var result = this.viewToModelFactory[viewName](dateObject.dateTime);
        var weekDates = [];

        if (result.weeks) {
          for (var i = 0; i < result.weeks.length; i += 1) {
            var week = result.weeks[i];

            for (var j = 0; j < week.dates.length; j += 1) {
              var weekDate = week.dates[j];
              weekDates.push(weekDate);
            }
          }
        }

        this.beforeRender({
          $view: result.currentView,
          $dates: result.dates || weekDates,
          $leftDate: result.leftDate,
          $upDate: result.previousViewDate,
          $rightDate: result.rightDate
        });
        this.data = result;
      }
    }
    /**
     * @param {DateTime} dateTime
     * @returns {{currentView: string, nextView: string, previousViewDate: DateObject, leftDate: DateObject, rightDate: DateObject, dates: Array}}
     */

  }, {
    key: "yearModelFactory",
    value: function yearModelFactory(dateTime) {
      var selectedDate = dateTime.startOf('year'); // View starts one year before the decade starts and ends one year after the decade ends
      // i.e. passing in a date of 1/1/2013 will give a range of 2009 to 2020
      // Truncate the last digit from the current year and subtract 1 to get the start of the decade

      var startDecade = parseInt(selectedDate.year / 10, 10) * 10;
      var startDate = this.startOfDecade(dateTime).minus({
        'years': 1
      }).startOf('year');
      var activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), _datetimepicker.YEAR_FORMAT);
      var currentFormat = this.getCurrentTimeFormatted(_datetimepicker.YEAR_FORMAT);
      var result = {
        currentView: 'year',
        nextView: this.configuration.minView === 'year' ? 'setTime' : 'month',
        previousViewDate: new _dateObject.default({
          dateTime: null,
          display: "".concat(startDecade, " - ").concat(startDecade + 9)
        }),
        leftDate: new _dateObject.default({
          dateTime: startDate.minus({
            'years': 9
          })
        }),
        rightDate: new _dateObject.default({
          dateTime: startDate.plus({
            'years': 11
          })
        }),
        dates: []
      };

      for (var i = 0; i < 12; i += 1) {
        var yearMoment = startDate.plus({
          'years': i
        });
        var dateValue = {
          active: yearMoment.toFormat(_datetimepicker.YEAR_FORMAT) === activeFormat,
          current: yearMoment.toFormat(_datetimepicker.YEAR_FORMAT) === currentFormat,
          display: yearMoment.toFormat(_datetimepicker.YEAR_FORMAT),
          future: yearMoment.year > startDecade + 9,
          past: yearMoment.year < startDecade,
          dateTime: yearMoment
        };
        result.dates.push(new _dateObject.default(dateValue));
      }

      return result;
    }
    /**
     *
     * @param {DateTime} dateTime
     * @returns {DateModel}
     */

  }, {
    key: "monthModelFactory",
    value: function monthModelFactory(dateTime) {
      var startDate = dateTime.startOf('year');
      var previousViewDate = this.startOfDecade(dateTime);
      var activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), _datetimepicker.MONTH_FORMAT);
      var currentFormat = this.getCurrentTimeFormatted(_datetimepicker.MONTH_FORMAT);
      var result = {
        previousView: 'year',
        currentView: 'month',
        nextView: this.configuration.minView === 'month' ? 'setTime' : 'day',
        previousViewDate: new _dateObject.default({
          dateTime: previousViewDate,
          display: startDate.toFormat('yyyy')
        }),
        leftDate: new _dateObject.default({
          dateTime: startDate.minus({
            'years': 1
          })
        }),
        rightDate: new _dateObject.default({
          dateTime: startDate.plus({
            'years': 1
          })
        }),
        dates: []
      };

      for (var i = 0; i < 12; i += 1) {
        var monthMoment = startDate.plus({
          'months': i
        });
        var dateValue = {
          active: monthMoment.toFormat(_datetimepicker.MONTH_FORMAT) === activeFormat,
          current: monthMoment.toFormat(_datetimepicker.MONTH_FORMAT) === currentFormat,
          display: monthMoment.toFormat('LLL'),
          dateTime: monthMoment
        };
        result.dates.push(new _dateObject.default(dateValue));
      }

      return result;
    }
    /**
     *
     * @param {DateTime} dateTime
     * @returns {{previousView: string, currentView: string, nextView: string, previousViewDate: DateObject, leftDate: DateObject, rightDate: DateObject, dayNames: Array, weeks: Array}}
     */

  }, {
    key: "dayModelFactory",
    value: function dayModelFactory(dateTime) {
      var selectedDate = dateTime;
      var previousViewDate = selectedDate.startOf('year');
      var startOfMonth = selectedDate.startOf('month');
      var endOfMonth = selectedDate.endOf('month');
      var startDate = startOfMonth.minus({
        'days': Math.abs(startOfMonth.weekday)
      });
      var activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), _datetimepicker.DAY_FORMAT);
      var currentFormat = this.getCurrentTimeFormatted(_datetimepicker.DAY_FORMAT);
      var result = {
        previousView: 'month',
        currentView: 'day',
        nextView: this.configuration.minView === 'day' ? 'setTime' : 'hour',
        previousViewDate: new _dateObject.default({
          dateTime: previousViewDate,
          display: startOfMonth.toFormat('yyyy-LLL')
        }),
        leftDate: new _dateObject.default({
          dateTime: startOfMonth.minus({
            'months': 1
          })
        }),
        rightDate: new _dateObject.default({
          dateTime: startOfMonth.plus({
            'months': 1
          })
        }),
        dayNames: [],
        weeks: []
      };

      for (var dayNumber = 0; dayNumber < 7; dayNumber += 1) {
        result.dayNames.push(_luxon.Info.weekdays('short')[dayNumber]);
      }

      for (var i = 0; i < 6; i++) {
        var week = {
          dates: []
        };

        for (var j = 1; j < 8; j++) {
          var dayMoment = startDate.plus({
            'days': i * 7 + j
          });
          var dateValue = {
            active: dayMoment.toFormat(_datetimepicker.DAY_FORMAT) === activeFormat,
            current: dayMoment.toFormat(_datetimepicker.DAY_FORMAT) === currentFormat,
            display: dayMoment.toFormat('d'),
            future: dayMoment > endOfMonth,
            past: dayMoment < startOfMonth,
            dateTime: dayMoment
          };
          week.dates.push(new _dateObject.default(dateValue));
        }

        result.weeks.push(week);
      }

      return result;
    }
    /**
     * @param {DateTime} dateTime
     * @returns {DateModel}
     */

  }, {
    key: "hourModelFactory",
    value: function hourModelFactory(dateTime) {
      var selectedDate = dateTime.startOf('day');
      var previousViewDate = selectedDate.startOf('month');
      var activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), _datetimepicker.HOUR_FORMAT);
      var currentFormat = this.getCurrentTimeFormatted(_datetimepicker.HOUR_FORMAT);
      var result = {
        previousView: 'day',
        currentView: 'hour',
        nextView: this.configuration.minView === 'hour' ? 'setTime' : 'minute',
        previousViewDate: new _dateObject.default({
          dateTime: previousViewDate,
          display: selectedDate.toFormat('DD')
        }),
        leftDate: new _dateObject.default({
          dateTime: selectedDate.minus({
            'days': 1
          })
        }),
        rightDate: new _dateObject.default({
          dateTime: selectedDate.plus({
            'days': 1
          })
        }),
        dates: []
      };

      for (var i = 0; i < 24; i += 1) {
        var hourMoment = selectedDate.plus({
          'hours': i
        });
        var dateValue = {
          active: hourMoment.toFormat(_datetimepicker.HOUR_FORMAT) === activeFormat,
          current: hourMoment.toFormat(_datetimepicker.HOUR_FORMAT) === currentFormat,
          display: hourMoment.toFormat('t'),
          dateTime: hourMoment
        };
        result.dates.push(new _dateObject.default(dateValue));
      }

      return result;
    }
    /**
     * @param {DateTime} dateTime
     * @returns {DateModel}
     */

  }, {
    key: "minuteModelFactory",
    value: function minuteModelFactory(dateTime) {
      var selectedDate = dateTime.startOf('hour');
      var previousViewDate = selectedDate.startOf('day');
      var activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), _datetimepicker.MINUTE_FORMAT);
      var currentFormat = this.getCurrentTimeFormatted(_datetimepicker.MINUTE_FORMAT);
      var result = {
        previousView: 'hour',
        currentView: 'minute',
        nextView: 'setTime',
        previousViewDate: new _dateObject.default({
          dateTime: previousViewDate,
          display: selectedDate.toFormat('ff')
        }),
        leftDate: new _dateObject.default({
          dateTime: selectedDate.minus({
            'hours': 1
          })
        }),
        rightDate: new _dateObject.default({
          dateTime: selectedDate.plus({
            'hours': 1
          })
        }),
        dates: []
      };
      var limit = 60 / this.configuration.minuteStep;

      for (var i = 0; i < limit; i += 1) {
        var hourMoment = selectedDate.plus({
          'minute': i * this.configuration.minuteStep
        });
        var dateValue = {
          active: hourMoment.toFormat(_datetimepicker.MINUTE_FORMAT) === activeFormat,
          current: hourMoment.toFormat(_datetimepicker.MINUTE_FORMAT) === currentFormat,
          display: hourMoment.toFormat('t'),
          dateTime: hourMoment
        };
        result.dates.push(new _dateObject.default(dateValue));
      }

      return result;
    }
    /**
     *
     * @param {DateTime} dateTime
     * @returns {*}
     */

  }, {
    key: "setTime",
    value: function setTime(dateTime) {
      var oldDate = this.ngModelController.$modelValue;

      if (this.viewFormat) {
        this.ngModelController.$setViewValue(dateTime.toFormat(this.viewFormat));
      } else {
        this.ngModelController.$setViewValue(dateTime.toISO());
      }

      this.onSetTime({
        newDate: dateTime.toJSDate(),
        oldDate: oldDate
      });
      return this.viewToModelFactory[this.configuration.startView](dateTime);
    }
  }, {
    key: "$render",
    value: function $render() {
      this.changeView(this.configuration.startView, new _dateObject.default({
        dateTime: this.toDateTime(this.ngModelController.$modelValue)
      }));
    }
    /**
     * @param {DateTime} dateTime
     * @returns {DateTime}
     */

  }, {
    key: "startOfDecade",
    value: function startOfDecade(dateTime) {
      var startYear = parseInt(dateTime.year / 10, 10) * 10;
      return dateTime.set({
        year: startYear
      }).startOf('year');
    }
    /**
     *
     * @param {DateTime=} dateTime
     * @param {string} formatString
     * @returns {string}
     */

  }, {
    key: "formatValue",
    value: function formatValue(dateTime, formatString) {
      if (dateTime) {
        return dateTime.toFormat(formatString);
      } else {
        return '';
      }
    }
    /**
     *
     * @param {string} format
     * @returns {string}
     */

  }, {
    key: "getCurrentTimeFormatted",
    value: function getCurrentTimeFormatted(format) {
      return _luxon.DateTime.fromJSDate(new Date()).toFormat(format);
    }
    /**
     * Converts a time value into a moment.
     *
     * This function is now necessary because moment logs a warning when parsing a string without a format.
     * @param {DateTime|Date} modelValue
     *  a time value in any of the supported formats (Date, moment, milliseconds, and string)
     * @returns {DateTime}
     *  representing the specified time value.
     */

  }, {
    key: "toDateTime",
    value: function toDateTime(modelValue) {
      if (typeof modelValue === 'string') {
        var dateTime = _luxon.DateTime.fromISO(modelValue);

        if (dateTime.isValid) {
          return dateTime;
        }
      }

      return _luxon.DateTime.fromJSDate(new Date());
    }
  }, {
    key: "createConfiguration",
    value: function createConfiguration($attrs, defaultConfig) {
      var directiveConfig = {};

      if ($attrs.datetimepickerConfig) {
        directiveConfig = this.$scope.$parent.$eval($attrs.datetimepickerConfig);
      }

      var configuration = _angular.default.extend({}, defaultConfig, directiveConfig);

      this.dateTimePickerValidator.validate(configuration);
      return configuration;
    }
  }]);

  return DirectiveController;
}();
/**
 * @ngdoc component
 * @name datetimepicker
 * @module ui.bootstrap.datetimepicker
 *
 * @param {expression} beforeRender
 * @param {expression} onSetTime
 * @param {string} viewFormat
 *
 * @description
 * Date and time picker component
 * blah blah blah... TODO...
 */


var DateTimePickerComponent = function DateTimePickerComponent() {
  _classCallCheck(this, DateTimePickerComponent);

  Object.defineProperty(this, "templateUrl", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: _datetimepickerTpl.default
  });
  Object.defineProperty(this, "controller", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: DirectiveController
  });
  Object.defineProperty(this, "controllerAs", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '$ctrl'
  });
  Object.defineProperty(this, "require", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: {
      ngModelController: 'ngModel'
    }
  });
  Object.defineProperty(this, "bindings", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: {
      beforeRender: '&',
      onSetTime: '&',
      viewFormat: '@?'
    }
  });
};

exports.default = DateTimePickerComponent;
Object.defineProperty(DateTimePickerComponent, "componentName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'datetimepicker'
});

/***/ }),

/***/ "./src/js/datetimepicker.constants.js":
/*!********************************************!*\
  !*** ./src/js/datetimepicker.constants.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_LOCALIZATION = exports.MINUTE_FORMAT = exports.HOUR_FORMAT = exports.DAY_FORMAT = exports.MONTH_FORMAT = exports.YEAR_FORMAT = void 0;
var YEAR_FORMAT = 'yyyy';
exports.YEAR_FORMAT = YEAR_FORMAT;
var MONTH_FORMAT = 'yyyy-LLL';
exports.MONTH_FORMAT = MONTH_FORMAT;
var DAY_FORMAT = 'yyyy-LLL-dd';
exports.DAY_FORMAT = DAY_FORMAT;
var HOUR_FORMAT = 'yyyy-LL-dd H';
exports.HOUR_FORMAT = HOUR_FORMAT;
var MINUTE_FORMAT = 'yyyy-LL-dd H:mm';
exports.MINUTE_FORMAT = MINUTE_FORMAT;
var DEFAULT_LOCALIZATION = {
  'bg': {
    previous: 'предишна',
    next: 'следваща'
  },
  'ca': {
    previous: 'anterior',
    next: 'següent'
  },
  'da': {
    previous: 'forrige',
    next: 'næste'
  },
  'de': {
    previous: 'vorige',
    next: 'weiter'
  },
  'en-au': {
    previous: 'previous',
    next: 'next'
  },
  'en-gb': {
    previous: 'previous',
    next: 'next'
  },
  'en': {
    previous: 'previous',
    next: 'next'
  },
  'es-us': {
    previous: 'atrás',
    next: 'siguiente'
  },
  'es': {
    previous: 'atrás',
    next: 'siguiente'
  },
  'fi': {
    previous: 'edellinen',
    next: 'seuraava'
  },
  'fr': {
    previous: 'précédent',
    next: 'suivant'
  },
  'hu': {
    previous: 'előző',
    next: 'következő'
  },
  'it': {
    previous: 'precedente',
    next: 'successivo'
  },
  'ja': {
    previous: '前へ',
    next: '次へ'
  },
  'ml': {
    previous: 'മുൻപുള്ളത്',
    next: 'അടുത്തത്'
  },
  'nl': {
    previous: 'vorige',
    next: 'volgende'
  },
  'pl': {
    previous: 'poprzednia',
    next: 'następna'
  },
  'pt-br': {
    previous: 'anteriores',
    next: 'próximos'
  },
  'pt': {
    previous: 'anterior',
    next: 'próximo'
  },
  'ro': {
    previous: 'anterior',
    next: 'următor'
  },
  'ru': {
    previous: 'предыдущая',
    next: 'следующая'
  },
  'sk': {
    previous: 'predošlá',
    next: 'ďalšia'
  },
  'sv': {
    previous: 'föregående',
    next: 'nästa'
  },
  'tr': {
    previous: 'önceki',
    next: 'sonraki'
  },
  'uk': {
    previous: 'назад',
    next: 'далі'
  },
  'zh-cn': {
    previous: '上一页',
    next: '下一页'
  },
  'zh-tw': {
    previous: '上一頁',
    next: '下一頁'
  },
  'cs-cz': {
    previous: 'Předchozí',
    next: 'Další'
  }
};
exports.DEFAULT_LOCALIZATION = DEFAULT_LOCALIZATION;

/***/ }),

/***/ "./src/js/datetimepicker.module.js":
/*!*****************************************!*\
  !*** ./src/js/datetimepicker.module.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(/*! ../scss/datetimepicker.scss */ "./src/scss/datetimepicker.scss");

var _angularjsRegister = _interopRequireDefault(__webpack_require__(/*! angularjs-register */ "angularjs-register"));

var _datetimepickerConfig = _interopRequireDefault(__webpack_require__(/*! ./datetimepicker-config.factory */ "./src/js/datetimepicker-config.factory.js"));

var _datetimepickerValidator = _interopRequireDefault(__webpack_require__(/*! ./datetimepicker-validator.service */ "./src/js/datetimepicker-validator.service.js"));

var _datetimepicker2 = _interopRequireDefault(__webpack_require__(/*! ./datetimepicker.component */ "./src/js/datetimepicker.component.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _angularjsRegister.default)('ui.bootstrap.datetimepicker').factory(_datetimepickerConfig.default.factoryName, _datetimepickerConfig.default).service(_datetimepickerValidator.default.serviceName, _datetimepickerValidator.default).component(_datetimepicker2.default.componentName, _datetimepicker2.default).name();

exports.default = _default;

/***/ }),

/***/ "./src/scss/datetimepicker.scss":
/*!**************************************!*\
  !*** ./src/scss/datetimepicker.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/templates/datetimepicker.tpl.pug":
/*!**********************************************!*\
  !*** ./src/templates/datetimepicker.tpl.pug ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var path = '/templates/datetimepicker.tpl.pug';
var html = "<div class=\"datetimepicker table-responsive\"><table class=\"table table-condensed {{ $ctrl.data.currentView }}-view\"><thead><tr><th class=\"left\" ng-show=\"$ctrl.data.leftDate.selectable\" ng-click=\"$ctrl.changeView($ctrl.data.currentView, $ctrl.data.leftDate, $event)\"><i class=\"glyphicon glyphicon-arrow-left\"><span class=\"sr-only\">{{ $ctrl.screenReader.previous }}</span></i></th><th class=\"switch\" colspan=\"5\" ng-show=\"$ctrl.data.previousViewDate.selectable\" ng-click=\"$ctrl.changeView($ctrl.data.previousView, $ctrl.data.previousViewDate, $event)\">{{ $ctrl.data.previousViewDate.display }}</th><th class=\"right\" ng-show=\"$ctrl.data.rightDate.selectable\" ng-click=\"$ctrl.changeView($ctrl.data.currentView, $ctrl.data.rightDate, $event)\"><i class=\"glyphicon glyphicon-arrow-right\"><span class=\"sr-only\">{{ $ctrl.screenReader.next }}</span></i></th></tr><tr><th class=\"dow\" ng-repeat=\"day in $ctrl.data.dayNames\">{{ day }}</th></tr></thead><tbody><tr ng-if=\"$ctrl.data.currentView !== 'day'\"><td colspan=\"7\"><span class=\"{{ $ctrl.data.currentView }}\" ng-repeat=\"dateObject in $ctrl.data.dates\" ng-class=\"{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}\" ng-click=\"$ctrl.changeView($ctrl.data.nextView, dateObject, $event)\">{{ dateObject.display }}\n</span></td></tr><tr ng-if=\"$ctrl.data.currentView === 'day'\" ng-repeat=\"week in $ctrl.data.weeks\"><td class=\"day\" ng-repeat=\"dateObject in week.dates\" ng-click=\"$ctrl.changeView($ctrl.data.nextView, dateObject, $event)\" ng-class=\"{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}\">{{ dateObject.display }}</td></tr></tbody></table></div>";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./src/js/datetimepicker.module.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/datetimepicker.module.js */"./src/js/datetimepicker.module.js");


/***/ }),

/***/ "angular":
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_angular__;

/***/ }),

/***/ "angularjs-register":
/*!*************************************!*\
  !*** external "angularjs-register" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_angularjs_register__;

/***/ }),

/***/ "luxon":
/*!************************!*\
  !*** external "luxon" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_luxon__;

/***/ })

/******/ });
});
//# sourceMappingURL=datetimepicker.js.map