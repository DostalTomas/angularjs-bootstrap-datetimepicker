(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("luxon"), require("@kpsys/angularjs-register"));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "luxon", "@kpsys/angularjs-register"], factory);
	else if(typeof exports === 'object')
		exports["@kpsys/angularjs-bootstrap-datetimepicker"] = factory(require("angular"), require("luxon"), require("@kpsys/angularjs-register"));
	else
		root["@kpsys/angularjs-bootstrap-datetimepicker"] = factory(root["angular"], root["luxon"], root["@kpsys/angularjs-register"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__6__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YEAR_FORMAT = 'yyyy';
exports.MONTH_FORMAT = 'LLL';
exports.DAY_FORMAT = 'd';
exports.TIME_FORMAT = 'T';
exports.MINUTE_FORMAT = 'mm';
exports.FULL_MONTH_FORMAT = 'LLL yyyy';
exports.FULL_DAY_FORMAT = 'd LLL yyyy';
exports.FULL_HOUR_FORMAT = 'd LLL yyyy H\':00\'';
exports.FULL_MINUTE_FORMAT = 'd LLL yyyy H:mm';
exports.DEFAULT_LOCALIZATION = {
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(5);

var angularjs_register_1 = __webpack_require__(6);

var datetimepicker_config_factory_1 = __webpack_require__(7);

var datetimepicker_validator_service_1 = __webpack_require__(8);

var datetimepicker_component_1 = __webpack_require__(9);
/**
 * @ngdoc module
 * @name bootstrap-datetimepicker
 * @module bootstrap-datetimepicker
 *
 * @description
 * Native AngularJS date & time picker directive styled by Twitter Bootstrap. Based on [dalelotts/angularjs-bootstrap-datetimepicker](https://github.com/dalelotts/angularjs-bootstrap-datetimepicker).
 * Rewritten into TS with webpack bundler and Luxon.
 */


exports.default = angularjs_register_1.default('bootstrap-datetimepicker').factory(datetimepicker_config_factory_1.default.factoryName, datetimepicker_config_factory_1.default).service(datetimepicker_validator_service_1.default.serviceName, datetimepicker_validator_service_1.default).component(datetimepicker_component_1.default.componentName, datetimepicker_component_1.default).name();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var datetimepicker_constants_1 = __webpack_require__(1);

var luxon_1 = __webpack_require__(2);

var angular = __webpack_require__(0);

function DateTimePickerConfigFactory() {
  var defaultConfiguration = {
    configureOn: null,
    minuteStep: 5,
    minView: 'minute',
    renderOn: null,
    startView: 'day'
  };
  var screenReader = datetimepicker_constants_1.DEFAULT_LOCALIZATION[luxon_1.Settings.defaultLocale.toLowerCase()];
  return angular.extend({}, defaultConfiguration, {
    screenReader: screenReader
  });
}

exports.default = DateTimePickerConfigFactory;
DateTimePickerConfigFactory.factoryName = 'dateTimePickerConfig';

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var angular = __webpack_require__(0);

var DateTimePickerValidatorService =
/*#__PURE__*/
function () {
  function DateTimePickerValidatorService() {
    _classCallCheck(this, DateTimePickerValidatorService);
  }

  _createClass(DateTimePickerValidatorService, [{
    key: "validate",

    /**
     * Validate configuration
     * @param {DateTimePickerConfiguration} configuration
     *
     * @throws {Error} Error if configuration is invalid
     */
    value: function validate(configuration) {
      var validOptions = ['configureOn', 'minuteStep', 'minView', 'renderOn', 'startView', 'screenReader'];
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

      if (!angular.isNumber(configuration.minuteStep)) {
        throw new Error('minuteStep must be numeric');
      }

      if (configuration.minuteStep <= 0 || configuration.minuteStep >= 60) {
        throw new Error('minuteStep must be greater than zero and less than 60');
      }

      if (configuration.configureOn !== null && !angular.isString(configuration.configureOn)) {
        throw new Error('configureOn must be a string');
      }

      if (configuration.configureOn !== null && configuration.configureOn.length < 1) {
        throw new Error('configureOn must not be an empty string');
      }

      if (configuration.renderOn !== null && !angular.isString(configuration.renderOn)) {
        throw new Error('renderOn must be a string');
      }

      if (configuration.renderOn !== null && configuration.renderOn.length < 1) {
        throw new Error('renderOn must not be an empty string');
      }
    }
  }]);

  return DateTimePickerValidatorService;
}();

exports.default = DateTimePickerValidatorService;
DateTimePickerValidatorService.serviceName = 'dateTimePickerValidator';

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var luxon_1 = __webpack_require__(2);

var date_object_1 = __webpack_require__(10);

var datetimepicker_constants_1 = __webpack_require__(1);

var angular = __webpack_require__(0);

var DirectiveController =
/*#__PURE__*/
function () {
  DirectiveController.$inject = ["$scope", "$attrs", "dateTimePickerValidator", "dateTimePickerConfig"];

  /*@ngInject*/
  function DirectiveController($scope, $attrs, dateTimePickerValidator, dateTimePickerConfig) {
    _classCallCheck(this, DirectiveController);

    this.$scope = $scope;
    this.$attrs = $attrs;
    this.dateTimePickerValidator = dateTimePickerValidator;
    this.dateTimePickerConfig = dateTimePickerConfig;
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
  }, {
    key: "changeView",
    value: function changeView(viewName, dateObject, event) {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      } // @ts-ignore


      if (viewName && dateObject.dateTime > -Infinity && dateObject.selectable && this.viewToModelFactory[viewName]) {
        var result = this.viewToModelFactory[viewName](dateObject.dateTime);
        var weekDates = [];

        if (result.weeks) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = result.weeks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var week = _step.value;
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = week.dates[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var weekDate = _step2.value;
                  weekDates.push(weekDate);
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
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
  }, {
    key: "yearModelFactory",
    value: function yearModelFactory(dateTime) {
      var selectedDate = dateTime.startOf('year');
      /* View starts one year before the decade starts and ends one year after the decade ends
      i.e. passing in a date of 1/1/2013 will give a range of 2009 to 2020
      Truncate the last digit from the current year and subtract 1 to get the start of the decade */
      // @ts-ignore

      var startDecade = parseInt(selectedDate.year / 10, 10) * 10;
      var startDate = this.startOfDecade(dateTime).minus({
        years: 1
      }).startOf('year');
      var activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), datetimepicker_constants_1.YEAR_FORMAT);
      var currentFormat = this.getCurrentTimeFormatted(datetimepicker_constants_1.YEAR_FORMAT);
      var result = {
        currentView: 'year',
        nextView: this.configuration.minView === 'year' ? 'setTime' : 'month',
        previousViewDate: new date_object_1.default({
          dateTime: null,
          display: "".concat(startDecade, " - ").concat(startDecade + 9)
        }),
        leftDate: new date_object_1.default({
          dateTime: startDate.minus({
            years: 9
          })
        }),
        rightDate: new date_object_1.default({
          dateTime: startDate.plus({
            years: 11
          })
        }),
        dates: []
      };

      for (var i = 0; i < 12; i += 1) {
        var yearMoment = startDate.plus({
          years: i
        });
        var dateValue = {
          active: yearMoment.toFormat(datetimepicker_constants_1.YEAR_FORMAT) === activeFormat,
          current: yearMoment.toFormat(datetimepicker_constants_1.YEAR_FORMAT) === currentFormat,
          display: yearMoment.toFormat(datetimepicker_constants_1.YEAR_FORMAT),
          future: yearMoment.year > startDecade + 9,
          past: yearMoment.year < startDecade,
          dateTime: yearMoment
        };
        result.dates.push(new date_object_1.default(dateValue));
      }

      return result;
    }
  }, {
    key: "monthModelFactory",
    value: function monthModelFactory(dateTime) {
      var startDate = dateTime.startOf('year');
      var previousViewDate = this.startOfDecade(dateTime);
      var activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), datetimepicker_constants_1.FULL_MONTH_FORMAT);
      var currentFormat = this.getCurrentTimeFormatted(datetimepicker_constants_1.FULL_MONTH_FORMAT);
      var result = {
        previousView: 'year',
        currentView: 'month',
        nextView: this.configuration.minView === 'month' ? 'setTime' : 'day',
        previousViewDate: new date_object_1.default({
          dateTime: previousViewDate,
          display: startDate.toFormat(datetimepicker_constants_1.YEAR_FORMAT)
        }),
        leftDate: new date_object_1.default({
          dateTime: startDate.minus({
            years: 1
          })
        }),
        rightDate: new date_object_1.default({
          dateTime: startDate.plus({
            years: 1
          })
        }),
        dates: []
      };

      for (var i = 0; i < 12; i += 1) {
        var monthMoment = startDate.plus({
          months: i
        });
        var dateValue = {
          active: monthMoment.toFormat(datetimepicker_constants_1.FULL_MONTH_FORMAT) === activeFormat,
          current: monthMoment.toFormat(datetimepicker_constants_1.FULL_MONTH_FORMAT) === currentFormat,
          display: monthMoment.toFormat(datetimepicker_constants_1.MONTH_FORMAT),
          dateTime: monthMoment
        };
        result.dates.push(new date_object_1.default(dateValue));
      }

      return result;
    }
  }, {
    key: "dayModelFactory",
    value: function dayModelFactory(dateTime) {
      var selectedDate = dateTime;
      var previousViewDate = selectedDate.startOf('year');
      var startOfMonth = selectedDate.startOf('month');
      var endOfMonth = selectedDate.endOf('month');
      var startDate = startOfMonth.minus({
        days: Math.abs(startOfMonth.weekday)
      });
      var activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), datetimepicker_constants_1.FULL_DAY_FORMAT);
      var currentFormat = this.getCurrentTimeFormatted(datetimepicker_constants_1.FULL_DAY_FORMAT);
      var result = {
        previousView: 'month',
        currentView: 'day',
        nextView: this.configuration.minView === 'day' ? 'setTime' : 'hour',
        previousViewDate: new date_object_1.default({
          dateTime: previousViewDate,
          display: startOfMonth.toFormat(datetimepicker_constants_1.FULL_MONTH_FORMAT)
        }),
        leftDate: new date_object_1.default({
          dateTime: startOfMonth.minus({
            months: 1
          })
        }),
        rightDate: new date_object_1.default({
          dateTime: startOfMonth.plus({
            months: 1
          })
        }),
        dayNames: [],
        weeks: []
      };

      for (var dayNumber = 0; dayNumber < 7; dayNumber += 1) {
        result.dayNames.push(luxon_1.Info.weekdays('short')[dayNumber]);
      }

      for (var i = 0; i < 6; i++) {
        var week = {
          dates: []
        };

        for (var j = 1; j < 8; j++) {
          var dayMoment = startDate.plus({
            days: i * 7 + j
          });
          var dateValue = {
            active: dayMoment.toFormat(datetimepicker_constants_1.FULL_DAY_FORMAT) === activeFormat,
            current: dayMoment.toFormat(datetimepicker_constants_1.FULL_DAY_FORMAT) === currentFormat,
            display: dayMoment.toFormat(datetimepicker_constants_1.DAY_FORMAT),
            future: dayMoment > endOfMonth,
            past: dayMoment < startOfMonth,
            dateTime: dayMoment
          };
          week.dates.push(new date_object_1.default(dateValue));
        }

        result.weeks.push(week);
      }

      return result;
    }
  }, {
    key: "hourModelFactory",
    value: function hourModelFactory(dateTime) {
      var selectedDate = dateTime.startOf('day');
      var previousViewDate = selectedDate.startOf('month');
      var activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), datetimepicker_constants_1.FULL_HOUR_FORMAT);
      var currentFormat = this.getCurrentTimeFormatted(datetimepicker_constants_1.FULL_HOUR_FORMAT);
      var result = {
        previousView: 'day',
        currentView: 'hour',
        nextView: this.configuration.minView === 'hour' ? 'setTime' : 'minute',
        previousViewDate: new date_object_1.default({
          dateTime: previousViewDate,
          display: selectedDate.toFormat(datetimepicker_constants_1.FULL_DAY_FORMAT)
        }),
        leftDate: new date_object_1.default({
          dateTime: selectedDate.minus({
            days: 1
          })
        }),
        rightDate: new date_object_1.default({
          dateTime: selectedDate.plus({
            days: 1
          })
        }),
        dates: []
      };

      for (var i = 0; i < 24; i += 1) {
        var hourMoment = selectedDate.plus({
          hours: i
        });
        var dateValue = {
          active: hourMoment.toFormat(datetimepicker_constants_1.FULL_HOUR_FORMAT) === activeFormat,
          current: hourMoment.toFormat(datetimepicker_constants_1.FULL_HOUR_FORMAT) === currentFormat,
          display: hourMoment.toFormat(datetimepicker_constants_1.TIME_FORMAT),
          dateTime: hourMoment
        };
        result.dates.push(new date_object_1.default(dateValue));
      }

      return result;
    }
  }, {
    key: "minuteModelFactory",
    value: function minuteModelFactory(dateTime) {
      var selectedDate = dateTime.startOf('hour');
      var previousViewDate = selectedDate.startOf('day');
      var activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), datetimepicker_constants_1.FULL_MINUTE_FORMAT);
      var currentFormat = this.getCurrentTimeFormatted(datetimepicker_constants_1.FULL_MINUTE_FORMAT);
      var result = {
        previousView: 'hour',
        currentView: 'minute',
        nextView: 'setTime',
        previousViewDate: new date_object_1.default({
          dateTime: previousViewDate,
          display: selectedDate.toFormat(datetimepicker_constants_1.FULL_HOUR_FORMAT)
        }),
        leftDate: new date_object_1.default({
          dateTime: selectedDate.minus({
            hours: 1
          })
        }),
        rightDate: new date_object_1.default({
          dateTime: selectedDate.plus({
            hours: 1
          })
        }),
        dates: []
      };
      var limit = 60 / this.configuration.minuteStep;

      for (var i = 0; i < limit; i += 1) {
        var hourMoment = selectedDate.plus({
          minute: i * this.configuration.minuteStep
        });
        var dateValue = {
          active: hourMoment.toFormat(datetimepicker_constants_1.FULL_MINUTE_FORMAT) === activeFormat,
          current: hourMoment.toFormat(datetimepicker_constants_1.FULL_MINUTE_FORMAT) === currentFormat,
          display: hourMoment.toFormat(limit > 20 ? datetimepicker_constants_1.MINUTE_FORMAT : datetimepicker_constants_1.TIME_FORMAT),
          dateTime: hourMoment,
          narrow: limit > 20
        };
        result.dates.push(new date_object_1.default(dateValue));
      }

      return result;
    }
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

      if (this.$attrs.ngChange) {
        this.$scope.$eval(this.$attrs.ngChange);
      }

      return this.viewToModelFactory[this.configuration.startView](dateTime);
    }
  }, {
    key: "$render",
    value: function $render() {
      this.changeView(this.configuration.startView, new date_object_1.default({
        dateTime: this.toDateTime(this.ngModelController.$modelValue)
      }));
    }
  }, {
    key: "startOfDecade",
    value: function startOfDecade(dateTime) {
      // @ts-ignore
      var startYear = parseInt(dateTime.year / 10, 10) * 10;
      return dateTime.set({
        year: startYear
      }).startOf('year');
    }
  }, {
    key: "formatValue",
    value: function formatValue(dateTime, formatString) {
      if (dateTime) {
        return dateTime.toFormat(formatString);
      } else {
        return '';
      }
    }
  }, {
    key: "getCurrentTimeFormatted",
    value: function getCurrentTimeFormatted(format) {
      return luxon_1.DateTime.fromJSDate(new Date()).toFormat(format);
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
        var dateTime = luxon_1.DateTime.fromISO(modelValue);

        if (dateTime.isValid) {
          return dateTime;
        }
      }

      return luxon_1.DateTime.fromJSDate(new Date());
    }
  }, {
    key: "createConfiguration",
    value: function createConfiguration($attrs, defaultConfig) {
      var directiveConfig = {};

      if ($attrs.datetimepickerConfig) {
        directiveConfig = this.$scope.$parent.$eval($attrs.datetimepickerConfig);
      }

      var configuration = angular.extend({}, defaultConfig, directiveConfig);
      this.dateTimePickerValidator.validate(configuration);
      return configuration;
    }
  }]);

  return DirectiveController;
}();

exports.DirectiveController = DirectiveController;
/**
 * @ngdoc component
 * @name datetimepicker
 * @module bootstrap-datetimepicker
 *
 * @requires ng.type.ngModel.NgModelController
 *
 * @param {expression=} beforeRender If the value of the before-render attribute is a function, the date time picker will call this function before rendering a new view, passing in data about the view.
 * ```
 *  <datetimepicker data-ng-model="data.date" data-before-render="beforeRender($view, $dates, $leftDate, $upDate, $rightDate)"></datetimepicker>
 *  ```
 *  This function will be called every time a new view is rendered.
 *  ```
 *  $scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
 *      const index = Math.floor(Math.random() * $dates.length);
 *      $dates[index].selectable = false;
 *  }
 * ```
 * Setting the `.selectable` property of a {@link type:DateObject} to false will prevent the user from being able to select that date value.
 *
 * @param {string} beforeRender.$view the name of the view to be rendered
 * @param {DateObject[]} beforeRender.$dates a (possibly empty) array of DateObject's (see source) that the user can select in the view.
 * @param {DateObject} beforeRender.$leftDate the DateObject selected if the user clicks the left arrow.
 * @param {DateObject} beforeRender.$upDate the DateObject selected if the user clicks the text between the arrows.
 * @param {DateObject} beforeRender.$rightDate the DateObject selected if the user clicks the right arrow.
 *
 * @param {expression=} onSetTime If the value of the on-set-time attribute is a function, the date time picker will call this function passing in the selected value and previous value.
 * ```
 * <datetimepicker data-ng-model="data.date" data-on-set-time="onTimeSet(newDate, oldDate)"></datetimepicker>
 * ```
 * This function will be called when the user selects a value on the minView.
 * ```
 * $scope.onTimeSet = function (newDate, oldDate) {
 *      console.log(newDate);
 *      console.log(oldDate);
 * }
 * ```
 * `data-on-set-time="onTimeSet()"` <-- This will work
 *
 * `data-on-set-time="onTimeSet"` <-- This will NOT work, the ()'s are required
 *
 * @param {Date} onSetTime.newDate New date. Probably JS Date object.
 * @param {Date} onSetTime.oldDate Old date. Probably JS Date object.
 *
 * @param {string=} viewFormat Luxon format. If defined, ngModel will be formatted to this format. By default ngModel is formatted to ISO standard.
 * @param {DateTimePickerConfiguration=} datetimepickerConfig Datetime picker configuration.
 *
 * @description
 * Native AngularJS date & time picker directive styled by Twitter Bootstrap. Based on [dalelotts/angularjs-bootstrap-datetimepicker](https://github.com/dalelotts/angularjs-bootstrap-datetimepicker).
 *
 * **! It is important to set locale in Luxon !**
 * ```
 * import {DateTime, Settings} from 'luxon';
 * Settings.defaultLocale = DateTime.local().resolvedLocaleOpts().locale;
 * ```
 *
 * @example
 * @example
 * <example name="bootstrapDatetimePickerExample" module="bootstrapDatetimePickerExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main class="container-fluid">
 *              <datetimepicker ng-model="datetime"></datetimepicker>
 *              <div class="row">
 *                  <div class="col-lg-3">
 *                      <input class="form-control" disabled="true" ng-model="datetime">
 *                  </div>
 *              </div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         luxon.Settings.defaultLocale = luxon.DateTime.local().resolvedLocaleOpts().locale;
 *         angular.module('bootstrapDatetimePickerExample', ['bootstrap-datetimepicker']);
 *     </file>
 * </example>
 */

var DateTimePickerComponent = function DateTimePickerComponent() {
  _classCallCheck(this, DateTimePickerComponent);

  this.templateUrl = __webpack_require__(11);
  this.controller = DirectiveController;
  this.controllerAs = '$ctrl';
  this.require = {
    ngModelController: 'ngModel'
  };
  this.bindings = {
    beforeRender: '&',
    onSetTime: '&',
    viewFormat: '@?'
  };
};

exports.default = DateTimePickerComponent;
DateTimePickerComponent.componentName = 'datetimepicker';

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @ngdoc type
 * @name DateObject
 * @module bootstrap-datetimepicker
 *
 * @property {DateTime} dateTime Luxon DateTime value of this date object.
 * @property {boolean} selectable Indicates that date value is selectable by the user.
 * @property {boolean} active Indicates that date object is part of the model value.
 * @property {boolean} future Indicates that date value is after the date range of the current view.
 * @property {boolean} past Indicates that date value is prior to the date range of the current view.
 * @property {string} display The way this value will be displayed on the calendar.
 */

var DateObject =
/*#__PURE__*/
function () {
  function DateObject(_ref) {
    var _this = this;

    var dateTime = _ref.dateTime,
        rest = _objectWithoutProperties(_ref, ["dateTime"]);

    _classCallCheck(this, DateObject);

    this.dateTime = dateTime;
    this.selectable = true;
    var validProperties = ['active', 'current', 'display', 'future', 'past', 'selectable', 'narrow'];
    Object.keys(rest).filter(function (key) {
      return validProperties.includes(key);
    }).forEach(function (key) {
      _this[key] = rest[key];
    });
  }

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
/* 11 */
/***/ (function(module, exports) {

var path = '/datetimepicker/datetimepicker.tpl.pug';
var html = "<div class=\"datetimepicker table-responsive\"><table class=\"table table-condensed {{ $ctrl.data.currentView }}-view\"><thead><tr><th class=\"left\" ng-show=\"$ctrl.data.leftDate.selectable\" ng-click=\"$ctrl.changeView($ctrl.data.currentView, $ctrl.data.leftDate, $event)\"><i class=\"glyphicon glyphicon-arrow-left\"><span class=\"sr-only\">{{ $ctrl.screenReader.previous }}</span></i></th><th class=\"switch\" colspan=\"5\" ng-show=\"$ctrl.data.previousViewDate.selectable\" ng-click=\"$ctrl.changeView($ctrl.data.previousView, $ctrl.data.previousViewDate, $event)\">{{ $ctrl.data.previousViewDate.display }}</th><th class=\"right\" ng-show=\"$ctrl.data.rightDate.selectable\" ng-click=\"$ctrl.changeView($ctrl.data.currentView, $ctrl.data.rightDate, $event)\"><i class=\"glyphicon glyphicon-arrow-right\"><span class=\"sr-only\">{{ $ctrl.screenReader.next }}</span></i></th></tr><tr><th class=\"dow\" ng-repeat=\"day in $ctrl.data.dayNames\">{{ day }}</th></tr></thead><tbody><tr ng-if=\"$ctrl.data.currentView !== 'day'\"><td colspan=\"7\"><span class=\"{{ $ctrl.data.currentView }}\" ng-repeat=\"dateObject in $ctrl.data.dates\" ng-class=\"{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable, narrow: dateObject.narrow}\" ng-click=\"$ctrl.changeView($ctrl.data.nextView, dateObject, $event)\">{{ dateObject.display }}</span></td></tr><tr ng-if=\"$ctrl.data.currentView === 'day'\" ng-repeat=\"week in $ctrl.data.weeks\"><td class=\"day\" ng-repeat=\"dateObject in week.dates\" ng-click=\"$ctrl.changeView($ctrl.data.nextView, dateObject, $event)\" ng-class=\"{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}\">{{ dateObject.display }}</td></tr></tbody></table></div>";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ })
/******/ ]);
});