/* globals define, jQuery, module, require, angular, moment */
/* jslint vars:true */

/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        2013-Jul-8
 */

;(function (root, factory) {
    'use strict';
    /* istanbul ignore if */
    if (typeof module !== 'undefined' && module.exports) {
        const ng = typeof angular === 'undefined' ? require('angular') : angular;
        const mt = typeof luxon === 'undefined' ? require('luxon') : luxon;
        factory(ng, mt);
        module.exports = 'ui.bootstrap.datetimepicker'
        /* istanbul ignore next */
    } else if (typeof define === 'function' && /* istanbul ignore next */ define.amd) {
        define(['angular', 'luxon'], factory)
    } else {
        factory(root.angular, root.luxon)
    }
}(this, function (angular, luxon) {
    'use strict';

    /********* CONSTS *********/
    const YEAR_FORMAT = 'yyyy';
    const MONTH_FORMAT = 'yyyy-LLL';
    const DAY_FORMAT = 'yyyy-LLL-dd';
    const HOUR_FORMAT = 'yyyy-LL-dd H';
    const MINUTE_FORMAT = 'yyyy-LL-dd H:mm';


    angular.module('ui.bootstrap.datetimepicker', [])
        .service('dateTimePickerConfig', DateTimePickerConfigProvider)
        .service('dateTimePickerValidator', DateTimePickerValidatorService)
        .directive('datetimepicker', DatetimepickerDirective);

    DatetimepickerDirective.$inject = ['dateTimePickerConfig', 'dateTimePickerValidator'];

    function DatetimepickerDirective(defaultConfig, configurationValidator) {
        const directiveDefinition = {
            bindToController: false,
            controller: DirectiveController,
            controllerAs: 'dateTimePickerController',
            replace: true,
            require: 'ngModel',
            restrict: 'E',
            scope: {
                beforeRender: '&',
                onSetTime: '&'
            },
            templateUrl: 'templates/datetimepicker.html'
        };

        DirectiveController.$inject = ['$scope', '$element', '$attrs'];

        function DirectiveController($scope, $element, $attrs) {
            // Configuration
            const ngModelController = $element.controller('ngModel');

            let configuration = createConfiguration();
            $scope.screenReader = configuration.screenReader;

            // Behavior
            $scope.changeView = changeView;
            ngModelController.$render = $render;

            if (configuration.configureOn) {
                $scope.$on(configuration.configureOn, function () {
                    configuration = createConfiguration();
                    $scope.screenReader = configuration.screenReader;
                    ngModelController.$render()
                })
            }

            if (configuration.renderOn) {
                $scope.$on(configuration.renderOn, ngModelController.$render)
            }

            // Implementation

            const viewToModelFactory = {
                year: yearModelFactory,

                month: monthModelFactory,

                day: dayModelFactory,

                hour: hourModelFactory,

                minute: minuteModelFactory,

                setTime: setTime
            };

            /**
             *
             * @param {string} viewName
             * @param {DateObject} dateObject
             * @param event
             */
            function changeView(viewName, dateObject, event) {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault()
                }

                if (viewName && (dateObject.dateTime > -Infinity) && dateObject.selectable && viewToModelFactory[viewName]) {
                    const result = viewToModelFactory[viewName](dateObject.dateTime);

                    const weekDates = [];
                    if (result.weeks) {
                        for (let i = 0; i < result.weeks.length; i += 1) {
                            const week = result.weeks[i];
                            for (let j = 0; j < week.dates.length; j += 1) {
                                const weekDate = week.dates[j];
                                weekDates.push(weekDate)
                            }
                        }
                    }

                    $scope.beforeRender({
                        $view: result.currentView,
                        $dates: result.dates || weekDates,
                        $leftDate: result.leftDate,
                        $upDate: result.previousViewDate,
                        $rightDate: result.rightDate
                    });

                    $scope.data = result
                }
            }

            /**
             * @param {DateTime} dateTime
             * @returns {DateModel}
             */
            function yearModelFactory(dateTime) {
                const selectedDate = dateTime.startOf('year');
                // View starts one year before the decade starts and ends one year after the decade ends
                // i.e. passing in a date of 1/1/2013 will give a range of 2009 to 2020
                // Truncate the last digit from the current year and subtract 1 to get the start of the decade
                const startDecade = parseInt(selectedDate.year / 10, 10) * 10;
                const startDate = startOfDecade(dateTime).minus({'years': 1}).startOf('year');

                const activeFormat = formatValue(toDateTime(ngModelController.$modelValue), YEAR_FORMAT);
                const currentFormat = getCurrentTimeFormatted(YEAR_FORMAT);

                const result = {
                    currentView: 'year',
                    nextView: configuration.minView === 'year' ? 'setTime' : 'month',
                    previousViewDate: new DateObject({
                        dateTime: null,
                        display: startDecade + '-' + (startDecade + 9)
                    }),
                    leftDate: new DateObject({dateTime: startDate.minus({'years': 9})}),
                    rightDate: new DateObject({dateTime: startDate.plus({'years': 11})}),
                    dates: []
                };

                for (let i = 0; i < 12; i += 1) {
                    const yearMoment = startDate.plus({'years': i});
                    const dateValue = {
                        active: yearMoment.toFormat(YEAR_FORMAT) === activeFormat,
                        current: yearMoment.toFormat(YEAR_FORMAT) === currentFormat,
                        display: yearMoment.toFormat(YEAR_FORMAT),
                        future: yearMoment.year > startDecade + 9,
                        past: yearMoment.year < startDecade,
                        dateTime: yearMoment
                    };

                    result.dates.push(new DateObject(dateValue))
                }

                return result;
            }

            /**
             *
             * @param {DateTime} dateTime
             * @returns {DateModel}
             */
            function monthModelFactory(dateTime) {
                const startDate = dateTime.startOf('year');
                const previousViewDate = startOfDecade(dateTime);

                const activeFormat = formatValue(toDateTime(ngModelController.$modelValue), MONTH_FORMAT);
                const currentFormat = getCurrentTimeFormatted(MONTH_FORMAT);

                const result = {
                    previousView: 'year',
                    currentView: 'month',
                    nextView: configuration.minView === 'month' ? 'setTime' : 'day',
                    previousViewDate: new DateObject({
                        dateTime: previousViewDate,
                        display: startDate.toFormat('yyyy')
                    }),
                    leftDate: new DateObject({dateTime: startDate.minus({'years': 1})}),
                    rightDate: new DateObject({dateTime: startDate.plus({'years': 1})}),
                    dates: []
                };

                for (let i = 0; i < 12; i += 1) {
                    const monthMoment = startDate.plus({'months': i});
                    const dateValue = {
                        active: monthMoment.toFormat(MONTH_FORMAT) === activeFormat,
                        current: monthMoment.toFormat(MONTH_FORMAT) === currentFormat,
                        display: monthMoment.toFormat('LLL'),
                        dateTime: monthMoment
                    };

                    result.dates.push(new DateObject(dateValue))
                }

                return result
            }

            /**
             *
             * @param {DateTime} dateTime
             * @returns {DateModel}
             */
            function dayModelFactory(dateTime) {
                const selectedDate = dateTime;
                const previousViewDate = selectedDate.startOf('year');

                const startOfMonth = selectedDate.startOf('month');
                const endOfMonth = selectedDate.endOf('month');

                const startDate = startOfMonth.minus({'days': Math.abs(startOfMonth.weekday)});

                const activeFormat = formatValue(toDateTime(ngModelController.$modelValue), DAY_FORMAT);
                const currentFormat = getCurrentTimeFormatted(DAY_FORMAT);

                const result = {
                    previousView: 'month',
                    currentView: 'day',
                    nextView: configuration.minView === 'day' ? 'setTime' : 'hour',
                    previousViewDate: new DateObject({
                        dateTime: previousViewDate,
                        display: startOfMonth.toFormat('yyyy-LLL')
                    }),
                    leftDate: new DateObject({dateTime: startOfMonth.minus({'months': 1})}),
                    rightDate: new DateObject({dateTime: startOfMonth.plus({'months': 1})}),
                    dayNames: [],
                    weeks: []
                };

                for (let dayNumber = 0; dayNumber < 7; dayNumber += 1) {
                    result.dayNames.push(luxon.Info.weekdays('short')[dayNumber])
                }

                for (let i = 0; i < 6; i += 1) {
                    const week = {dates: []};
                    for (let j = 0; j < 7; j += 1) {
                        const dayMoment = startDate.plus({'days': (i * 7) + j});
                        const dateValue = {
                            active: dayMoment.toFormat(DAY_FORMAT) === activeFormat,
                            current: dayMoment.toFormat(DAY_FORMAT) === currentFormat,
                            display: dayMoment.toFormat('d'),
                            future: dayMoment > endOfMonth,
                            past: dayMoment < startOfMonth,
                            dateTime: dayMoment
                        };
                        week.dates.push(new DateObject(dateValue))
                    }
                    result.weeks.push(week)
                }

                return result;
            }

            /**
             * @param {DateTime} dateTime
             * @returns {DateModel}
             */
            function hourModelFactory(dateTime) {
                const selectedDate = dateTime.startOf('day');
                const previousViewDate = selectedDate.startOf('month');

                const activeFormat = formatValue(toDateTime(ngModelController.$modelValue), HOUR_FORMAT);
                const currentFormat = getCurrentTimeFormatted(HOUR_FORMAT);

                const result = {
                    previousView: 'day',
                    currentView: 'hour',
                    nextView: configuration.minView === 'hour' ? 'setTime' : 'minute',
                    previousViewDate: new DateObject({
                        dateTime: previousViewDate,
                        display: selectedDate.toFormat('DD')
                    }),
                    leftDate: new DateObject({dateTime: selectedDate.minus({'days': 1})}),
                    rightDate: new DateObject({dateTime: selectedDate.plus({'days': 1})}),
                    dates: []
                };

                for (let i = 0; i < 24; i += 1) {
                    const hourMoment = selectedDate.plus({'hours': i});
                    const dateValue = {
                        active: hourMoment.toFormat(HOUR_FORMAT) === activeFormat,
                        current: hourMoment.toFormat(HOUR_FORMAT) === currentFormat,
                        display: hourMoment.toFormat('t'),
                        dateTime: hourMoment
                    };

                    result.dates.push(new DateObject(dateValue))
                }

                return result
            }

            /**
             * @param {DateTime} dateTime
             * @returns {DateModel}
             */
            function minuteModelFactory(dateTime) {
                const selectedDate = dateTime.startOf('hour');
                const previousViewDate = selectedDate.startOf('day');

                const activeFormat = formatValue(toDateTime(ngModelController.$modelValue), MINUTE_FORMAT);
                const currentFormat = getCurrentTimeFormatted(MINUTE_FORMAT);

                const result = {
                    previousView: 'hour',
                    currentView: 'minute',
                    nextView: 'setTime',
                    previousViewDate: new DateObject({
                        dateTime: previousViewDate,
                        display: selectedDate.toFormat('ff')
                    }),
                    leftDate: new DateObject({dateTime: selectedDate.minus({'hours': 1})}),
                    rightDate: new DateObject({dateTime: selectedDate.plus({'hours': 1})}),
                    dates: []
                };

                const limit = 60 / configuration.minuteStep;

                for (let i = 0; i < limit; i += 1) {
                    const hourMoment = selectedDate.plus({'minute': i * configuration.minuteStep});
                    const dateValue = {
                        active: hourMoment.toFormat(MINUTE_FORMAT) === activeFormat,
                        current: hourMoment.toFormat(MINUTE_FORMAT) === currentFormat,
                        display: hourMoment.toFormat('t'),
                        dateTime: hourMoment
                    };

                    result.dates.push(new DateObject(dateValue))
                }

                return result
            }

            /**
             *
             * @param {DateTime} dateTime
             * @returns {*}
             */
            function setTime(dateTime) {
                const oldDate = ngModelController.$modelValue;
                ngModelController.$setViewValue(dateTime.toJSDate());

                if (configuration.dropdownSelector) {
                    // TODO remove this
                    jQuery(configuration.dropdownSelector).dropdown('toggle')
                }

                $scope.onSetTime({newDate: dateTime.toJSDate(), oldDate: oldDate});

                return viewToModelFactory[configuration.startView](dateTime)
            }

            function $render() {
                $scope.changeView(configuration.startView, new DateObject({dateTime: toDateTime(ngModelController.$viewValue)}))
            }

            /**
             * @param {DateTime} dateTime
             * @returns {DateTime}
             */
            function startOfDecade(dateTime) {
                const startYear = (parseInt(dateTime.year / 10, 10) * 10);
                return dateTime.set({year: startYear}).startOf('year')
            }

            /**
             *
             * @param {DateTime=} dateTime
             * @param {string} formatString
             * @returns {string}
             */
            function formatValue(dateTime, formatString) {
                if (dateTime) {
                    return dateTime.toFormat(formatString)
                } else {
                    return ''
                }
            }

            /**
             *
             * @param {string} format
             * @returns {string}
             */
            function getCurrentTimeFormatted(format) {
                return luxon.DateTime.fromJSDate(new Date()).toFormat(format);
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

            function toDateTime(modelValue) {
                if(modelValue) {

                    if (modelValue instanceof Date) {
                        return luxon.DateTime.fromJSDate(modelValue);
                    } else if (modelValue instanceof luxon.DateTime) {
                        return modelValue;
                    }

                    return luxon.DateTime.invalid('Invalid model value');
                }

                return luxon.DateTime.fromJSDate(new Date());
            }

            function createConfiguration() {
                let directiveConfig = {};

                if ($attrs.datetimepickerConfig) {
                    directiveConfig = $scope.$parent.$eval($attrs.datetimepickerConfig)
                }

                const configuration = angular.extend({}, defaultConfig, directiveConfig);

                configurationValidator.validate(configuration);

                return configuration
            }
        }

        class DateObject {

            /**
             *
             * @param {{dateTime: DateTime, active: boolean=, current: boolean=, future: boolean=, past: boolean=, display: string=, selectable: boolean=}}
             */
            constructor({dateTime, ...rest}) {
                this.dateTime = dateTime;
                this.selectable = true;

                const validProperties = ['active', 'current', 'display', 'future', 'past', 'selectable'];

                Object.keys(rest)
                    .filter((key) => validProperties.includes(key))
                    .forEach((key) => {
                        this[key] = rest[key]
                    });
            }

            /**
             * @returns {DateTime}
             */
            localDateValue() {
                return this.dateTime.toLocal();
            }
        }

        return directiveDefinition
    }

    function DateTimePickerConfigProvider() {
        const defaultConfiguration = {
            configureOn: null,
            dropdownSelector: null,
            minuteStep: 5,
            minView: 'minute',
            parseFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZZ',
            renderOn: null,
            startView: 'day'
        };

        const defaultLocalization = {
            'bg': {previous: 'предишна', next: 'следваща'},
            'ca': {previous: 'anterior', next: 'següent'},
            'da': {previous: 'forrige', next: 'næste'},
            'de': {previous: 'vorige', next: 'weiter'},
            'en-au': {previous: 'previous', next: 'next'},
            'en-gb': {previous: 'previous', next: 'next'},
            'en': {previous: 'previous', next: 'next'},
            'es-us': {previous: 'atrás', next: 'siguiente'},
            'es': {previous: 'atrás', next: 'siguiente'},
            'fi': {previous: 'edellinen', next: 'seuraava'},
            'fr': {previous: 'précédent', next: 'suivant'},
            'hu': {previous: 'előző', next: 'következő'},
            'it': {previous: 'precedente', next: 'successivo'},
            'ja': {previous: '前へ', next: '次へ'},
            'ml': {previous: 'മുൻപുള്ളത്', next: 'അടുത്തത്'},
            'nl': {previous: 'vorige', next: 'volgende'},
            'pl': {previous: 'poprzednia', next: 'następna'},
            'pt-br': {previous: 'anteriores', next: 'próximos'},
            'pt': {previous: 'anterior', next: 'próximo'},
            'ro': {previous: 'anterior', next: 'următor'},
            'ru': {previous: 'предыдущая', next: 'следующая'},
            'sk': {previous: 'predošlá', next: 'ďalšia'},
            'sv': {previous: 'föregående', next: 'nästa'},
            'tr': {previous: 'önceki', next: 'sonraki'},
            'uk': {previous: 'назад', next: 'далі'},
            'zh-cn': {previous: '上一页', next: '下一页'},
            'zh-tw': {previous: '上一頁', next: '下一頁'},
            'cs-cz': {previous: 'Předchozí', next: 'Další'}
        };

        const screenReader = defaultLocalization[luxon.Settings.defaultLocale.toLowerCase()];

        return angular.extend({}, defaultConfiguration, {screenReader: screenReader})
    }

    DateTimePickerValidatorService.$inject = ['$log'];

    function DateTimePickerValidatorService($log) {
        return {
            validate: validator
        };

        function validator(configuration) {
            const validOptions = [
                'configureOn',
                'dropdownSelector',
                'minuteStep',
                'minView',
                'parseFormat',
                'renderOn',
                'startView',
                'screenReader'
            ];

            const invalidOptions = Object.keys(configuration).filter(function (key) {
                return (validOptions.indexOf(key) < 0)
            });

            if (invalidOptions.length) {
                throw new Error('Invalid options: ' + invalidOptions.join(', '))
            }

            // Order of the elements in the validViews array is significant.
            const validViews = ['minute', 'hour', 'day', 'month', 'year'];

            if (validViews.indexOf(configuration.startView) < 0) {
                throw new Error('invalid startView value: ' + configuration.startView)
            }

            if (validViews.indexOf(configuration.minView) < 0) {
                throw new Error('invalid minView value: ' + configuration.minView)
            }

            if (validViews.indexOf(configuration.minView) > validViews.indexOf(configuration.startView)) {
                throw new Error('startView must be greater than minView')
            }

            if (!angular.isNumber(configuration.minuteStep)) {
                throw new Error('minuteStep must be numeric')
            }
            if (configuration.minuteStep <= 0 || configuration.minuteStep >= 60) {
                throw new Error('minuteStep must be greater than zero and less than 60')
            }
            if (configuration.configureOn !== null && !angular.isString(configuration.configureOn)) {
                throw new Error('configureOn must be a string')
            }
            if (configuration.configureOn !== null && configuration.configureOn.length < 1) {
                throw new Error('configureOn must not be an empty string')
            }
            if (configuration.renderOn !== null && !angular.isString(configuration.renderOn)) {
                throw new Error('renderOn must be a string')
            }
            if (configuration.renderOn !== null && configuration.renderOn.length < 1) {
                throw new Error('renderOn must not be an empty string')
            }
            if (configuration.dropdownSelector !== null && !angular.isString(configuration.dropdownSelector)) {
                throw new Error('dropdownSelector must be a string')
            }

            /* istanbul ignore next */
            if (configuration.dropdownSelector !== null && ((typeof jQuery === 'undefined') || (typeof jQuery().dropdown !== 'function'))) {
                $log.error('Please DO NOT specify the dropdownSelector option unless you are using jQuery AND Bootstrap.js. ' +
                    'Please include jQuery AND Bootstrap.js, or write code to close the dropdown in the on-set-time callback. \n\n' +
                    'The dropdownSelector configuration option is being removed because it will not function properly.');
                delete configuration.dropdownSelector
            }
        }
    }
})); // eslint-disable-line semi

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