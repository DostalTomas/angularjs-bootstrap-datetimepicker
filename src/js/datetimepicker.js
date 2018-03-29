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
            luxon.Settings.defaultLocale = 'cs-CZ';
            luxon.Settings.defaultLocale = 'en-US';

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

            function changeView(viewName, dateObject, event) {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault()
                }

                if (viewName && (dateObject.utcDateValue > -Infinity) && dateObject.selectable && viewToModelFactory[viewName]) {
                    const result = viewToModelFactory[viewName](dateObject.utcDateValue);

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

            function yearModelFactory(milliseconds) {
                const selectedDate = luxon.DateTime.fromMillis(milliseconds).startOf('year');
                // View starts one year before the decade starts and ends one year after the decade ends
                // i.e. passing in a date of 1/1/2013 will give a range of 2009 to 2020
                // Truncate the last digit from the current year and subtract 1 to get the start of the decade
                const startDecade = parseInt(selectedDate.year / 10, 10) * 10;
                const startDate = startOfDecade(milliseconds).minus({'years': 1}).startOf('year');

                const yearFormat = 'yyyy';
                const activeFormat = formatValue(ngModelController.$modelValue, yearFormat);
                const currentFormat = luxon.DateTime.utc().toFormat(yearFormat);

                const result = {
                    'currentView': 'year',
                    'nextView': configuration.minView === 'year' ? 'setTime' : 'month',
                    'previousViewDate': new DateObject({
                        utcDateValue: null,
                        display: startDecade + '-' + (startDecade + 9)
                    }),
                    'leftDate': new DateObject({utcDateValue: startDate.minus({'years': 9}).valueOf()}),
                    'rightDate': new DateObject({utcDateValue: startDate.plus({'years': 11}).valueOf()}),
                    'dates': []
                };

                for (let i = 0; i < 12; i += 1) {
                    const yearMoment = startDate.plus({'years': i});
                    const dateValue = {
                        'active': yearMoment.toFormat(yearFormat) === activeFormat,
                        'current': yearMoment.toFormat(yearFormat) === currentFormat,
                        'display': yearMoment.toFormat(yearFormat),
                        'future': yearMoment.year > startDecade + 9,
                        'past': yearMoment.year < startDecade,
                        'utcDateValue': yearMoment.valueOf()
                    };

                    result.dates.push(new DateObject(dateValue))
                }

                return result
            }

            function monthModelFactory(milliseconds) {
                const startDate = luxon.DateTime.fromMillis(milliseconds).startOf('year');
                const previousViewDate = startOfDecade(milliseconds);

                const monthFormat = 'yyyy-LLL';
                const activeFormat = formatValue(ngModelController.$modelValue, monthFormat);
                const currentFormat = luxon.DateTime.local().toFormat(monthFormat);

                const result = {
                    'previousView': 'year',
                    'currentView': 'month',
                    'nextView': configuration.minView === 'month' ? 'setTime' : 'day',
                    'previousViewDate': new DateObject({
                        utcDateValue: previousViewDate.valueOf(),
                        display: startDate.toFormat('yyyy')
                    }),
                    'leftDate': new DateObject({utcDateValue: startDate.minus({'years': 1}).valueOf()}),
                    'rightDate': new DateObject({utcDateValue: startDate.plus({'years': 1}).valueOf()}),
                    'dates': []
                };

                for (let i = 0; i < 12; i += 1) {
                    const monthMoment = startDate.plus({'months': i});
                    const dateValue = {
                        'active': monthMoment.toFormat(monthFormat) === activeFormat,
                        'current': monthMoment.toFormat(monthFormat) === currentFormat,
                        'display': monthMoment.toFormat('LLL'),
                        'utcDateValue': monthMoment.valueOf()
                    };

                    result.dates.push(new DateObject(dateValue))
                }

                return result
            }

            function dayModelFactory(milliseconds) {
                const selectedDate = luxon.DateTime.fromMillis(milliseconds);
                const startOfMonth = selectedDate.startOf('month');
                const previousViewDate = selectedDate.startOf('year');
                const endOfMonth = selectedDate.endOf('month');

                const startDate = startOfMonth.minus({'days': Math.abs(startOfMonth.weekday)});

                const dayFormat = 'yyyy-LLL-dd';
                const activeFormat = formatValue(ngModelController.$modelValue, dayFormat);
                const currentFormat = luxon.DateTime.local().toFormat(dayFormat);

                const result = {
                    'previousView': 'month',
                    'currentView': 'day',
                    'nextView': configuration.minView === 'day' ? 'setTime' : 'hour',
                    'previousViewDate': new DateObject({
                        utcDateValue: previousViewDate.valueOf(),
                        display: startOfMonth.toFormat('yyyy-LLL')
                    }),
                    'leftDate': new DateObject({utcDateValue: startOfMonth.minus({'months': 1}).valueOf()}),
                    'rightDate': new DateObject({utcDateValue: startOfMonth.plus({'months': 1}).valueOf()}),
                    'dayNames': [],
                    'weeks': []
                };

                for (let dayNumber = 0; dayNumber < 7; dayNumber += 1) {
                    result.dayNames.push(luxon.Info.weekdays('short')[dayNumber])
                }

                for (let i = 0; i < 6; i += 1) {
                    const week = {dates: []};
                    for (let j = 0; j < 7; j += 1) {
                        const dayMoment = startDate.plus({'days': (i * 7) + j});
                        const dateValue = {
                            'active': dayMoment.toFormat(dayFormat) === activeFormat,
                            'current': dayMoment.toFormat(dayFormat) === currentFormat,
                            'display': dayMoment.toFormat('d'),
                            'future': dayMoment > endOfMonth,
                            'past': dayMoment < startOfMonth,
                            'utcDateValue': dayMoment.valueOf()
                        };
                        week.dates.push(new DateObject(dateValue))
                    }
                    result.weeks.push(week)
                }

                return result
            }

            function hourModelFactory(milliseconds) {
                const selectedDate = luxon.DateTime.fromMillis(milliseconds).startOf('day');
                const previousViewDate = selectedDate.startOf('month');

                const hourFormat = 'yyyy-LL-dd H';
                const activeFormat = formatValue(ngModelController.$modelValue, hourFormat);
                const currentFormat = luxon.DateTime.local().toFormat(hourFormat);

                const result = {
                    'previousView': 'day',
                    'currentView': 'hour',
                    'nextView': configuration.minView === 'hour' ? 'setTime' : 'minute',
                    'previousViewDate': new DateObject({
                        utcDateValue: previousViewDate.valueOf(),
                        display: selectedDate.toFormat('DD')
                    }),
                    'leftDate': new DateObject({utcDateValue: selectedDate.minus({'days': 1}).valueOf()}),
                    'rightDate': new DateObject({utcDateValue: selectedDate.plus({'days': 1}).valueOf()}),
                    'dates': []
                };

                for (let i = 0; i < 24; i += 1) {
                    const hourMoment = selectedDate.plus({'hours': i});
                    const dateValue = {
                        'active': hourMoment.toFormat(hourFormat) === activeFormat,
                        'current': hourMoment.toFormat(hourFormat) === currentFormat,
                        'display': hourMoment.toFormat('t'),
                        'utcDateValue': hourMoment.valueOf()
                    };

                    result.dates.push(new DateObject(dateValue))
                }

                return result
            }

            function minuteModelFactory(milliseconds) {
                const selectedDate = luxon.DateTime.fromMillis(milliseconds).startOf('hour');
                const previousViewDate = selectedDate.startOf('day');

                const minuteFormat = 'yyyy-LL-dd H:mm';
                const activeFormat = formatValue(ngModelController.$modelValue, minuteFormat);
                const currentFormat = luxon.DateTime.local().toFormat(minuteFormat);

                const result = {
                    'previousView': 'hour',
                    'currentView': 'minute',
                    'nextView': 'setTime',
                    'previousViewDate': new DateObject({
                        utcDateValue: previousViewDate.valueOf(),
                        display: selectedDate.toFormat('ff')
                    }),
                    'leftDate': new DateObject({utcDateValue: selectedDate.minus({'hours': 1}).valueOf()}),
                    'rightDate': new DateObject({utcDateValue: selectedDate.plus({'hours': 1}).valueOf()}),
                    'dates': []
                };

                const limit = 60 / configuration.minuteStep;

                for (let i = 0; i < limit; i += 1) {
                    const hourMoment = selectedDate.plus({'minute': i * configuration.minuteStep});
                    const dateValue = {
                        'active': hourMoment.toFormat(minuteFormat) === activeFormat,
                        'current': hourMoment.toFormat(minuteFormat) === currentFormat,
                        'display': hourMoment.toFormat('t'),
                        'utcDateValue': hourMoment.valueOf()
                    };

                    result.dates.push(new DateObject(dateValue))
                }

                return result
            }

            function setTime(milliseconds) {
                const lux = luxon.DateTime.fromMillis(milliseconds);
                let newDate;
                switch (configuration.modelType) {
                    case 'Date':
                        newDate = lux.toJSDate();
                        break;
                    case 'moment':
                        break;
                    case 'milliseconds':
                        newDate = lux.valueOf();
                        break;
                    default: // It is assumed that the modelType is a formatting string.
                        newDate = lux.toFormat(configuration.modelType)
                }

                const oldDate = ngModelController.$modelValue;
                ngModelController.$setViewValue(newDate);

                if (configuration.dropdownSelector) {
                    // TODO remove this
                    jQuery(configuration.dropdownSelector).dropdown('toggle')
                }

                $scope.onSetTime({newDate: newDate, oldDate: oldDate});

                return viewToModelFactory[configuration.startView](milliseconds)
            }

            function $render() {
                $scope.changeView(configuration.startView, new DateObject({utcDateValue: getUTCTime(ngModelController.$viewValue)}))
            }

            /**
             * @param {number} milliseconds
             * @returns {DateTime}
             */
            function startOfDecade(milliseconds) {
                const startYear = (parseInt(luxon.DateTime.fromMillis(milliseconds).year / 10, 10) * 10);
                return luxon.DateTime.fromMillis(milliseconds).set({year: startYear}).startOf('year')
            }

            function formatValue(timeValue, formatString) {
                if (timeValue) {
                    return getMoment(timeValue).toFormat(formatString)
                } else {
                    return ''
                }
            }

            /**
             * Converts a time value into a moment.
             *
             * This function is now necessary because moment logs a warning when parsing a string without a format.
             * @param modelValue
             *  a time value in any of the supported formats (Date, moment, milliseconds, and string)
             * @returns {DateTime}
             *  representing the specified time value.
             */

            function getMoment(modelValue) {
                if(typeof modelValue === 'number') {
                    return luxon.DateTime.fromMillis(modelValue)
                } else if(typeof modelValue === 'object' && modelValue instanceof Date) {
                    return luxon.DateTime.fromJSDate(modelValue)
                } else if(typeof modelValue === 'string') {
                    let retVal = luxon.DateTime.fromFormat(modelValue, configuration.parseFormat);
                    if(!retVal.isValid) {
                        retVal = luxon.DateTime.fromISO(modelValue);
                    }
                    if(!retVal.isValid) {
                        retVal = luxon.DateTime.fromRFC2822(modelValue)
                    }

                    return retVal;
                }

                return luxon.DateTime.invalid('Invalid model value');
            }

            /**
             * Converts a time value to UCT/GMT time.
             * @param modelValue
             *  a time value in any of the supported formats (Date, moment, milliseconds, and string)
             * @returns {number}
             *  number of milliseconds since 1/1/1970
             */

            function getUTCTime(modelValue) {
                let tempDate = luxon.DateTime.fromJSDate(new Date());
                if (modelValue) {
                    const tempMoment = getMoment(modelValue);
                    if (tempMoment.isValid) {
                        tempDate = tempMoment;
                    } else {
                        throw new Error('Invalid date: ' + modelValue)
                    }
                }
                const utc = tempDate.toUTC();
                return utc.valueOf();
                // podtud spravne
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

        function DateObject(input) {
            this.utcDateValue = input.utcDateValue;
            this.selectable = true;

            this.localDateValue = function localDateValue() {
                return luxon.DateTime.fromMillis(this.utcDateValue).toLocal().valueOf();
            };

            const validProperties = ['active', 'current', 'display', 'future', 'past', 'selectable', 'utcDateValue'];

            const constructorObject = input;

            Object.keys(constructorObject).filter(function (key) {
                return validProperties.indexOf(key) >= 0
            }).forEach(function (key) {
                this[key] = constructorObject[key]
            }, this)
        }

        return directiveDefinition
    }

    function DateTimePickerConfigProvider() {
        const defaultConfiguration = {
            configureOn: null,
            dropdownSelector: null,
            minuteStep: 5,
            minView: 'minute',
            modelType: 'Date',
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
            'zh-tw': {previous: '上一頁', next: '下一頁'}
        };

        const screenReader = defaultLocalization[luxon.DateTime.local().locale.toLowerCase()];

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
                'modelType',
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
            if (configuration.modelType !== null && !angular.isString(configuration.modelType)) {
                throw new Error('modelType must be a string')
            }
            if (configuration.modelType !== null && configuration.modelType.length < 1) {
                throw new Error('modelType must not be an empty string')
            }
            if (configuration.modelType !== 'Date' && configuration.modelType !== 'moment' && configuration.modelType !== 'milliseconds') {
                // modelType contains string format, overriding parseFormat with modelType
                configuration.parseFormat = configuration.modelType
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
