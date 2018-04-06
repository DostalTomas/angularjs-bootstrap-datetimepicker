import angular from 'angular';
import {Info, DateTime} from 'luxon';

import template from '../templates/datetimepicker.tpl.pug';

import DateObject from './date-object';
import {DAY_FORMAT, HOUR_FORMAT, MINUTE_FORMAT, MONTH_FORMAT, YEAR_FORMAT} from './datetimepicker.constants';

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
 * @property beforeRender
 * @property onSetTime
 */
class DirectiveController {

    /*@ngInject*/
    constructor($scope, $element, $attrs, dateTimePickerValidator, dateTimePickerConfig) {
        this.$scope = $scope;
        this.dateTimePickerValidator = dateTimePickerValidator;
        this.dateTimePickerConfig = dateTimePickerConfig;
        this.$attrs = $attrs;
    }

    $onInit() {
        this.configuration = this.createConfiguration(this.$attrs, this.dateTimePickerConfig);
        this.screenReader = this.configuration.screenReader;

        // Behavior
        this.ngModelController.$render = this.$render.bind(this);

        if (this.configuration.configureOn) {
            this.$scope.$on(this.configuration.configureOn, () => {
                this.configuration = this.createConfiguration(this.$attrs, this.dateTimePickerConfig);
                this.screenReader = this.configuration.screenReader;
                this.ngModelController.$render()
            })
        }

        if (this.configuration.renderOn) {
            this.$scope.$on(this.configuration.renderOn, this.ngModelController.$render)
        }

        // Implementation

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
    changeView(viewName, dateObject, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault()
        }

        if (viewName && (dateObject.dateTime > -Infinity) && dateObject.selectable && this.viewToModelFactory[viewName]) {
            const result = this.viewToModelFactory[viewName](dateObject.dateTime);

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

            this.beforeRender({
                $view: result.currentView,
                $dates: result.dates || weekDates,
                $leftDate: result.leftDate,
                $upDate: result.previousViewDate,
                $rightDate: result.rightDate
            });

            this.data = result
        }
    }

    /**
     * @param {DateTime} dateTime
     * @returns {{currentView: string, nextView: string, previousViewDate: DateObject, leftDate: DateObject, rightDate: DateObject, dates: Array}}
     */
    yearModelFactory(dateTime) {
        const selectedDate = dateTime.startOf('year');
        // View starts one year before the decade starts and ends one year after the decade ends
        // i.e. passing in a date of 1/1/2013 will give a range of 2009 to 2020
        // Truncate the last digit from the current year and subtract 1 to get the start of the decade
        const startDecade = parseInt(selectedDate.year / 10, 10) * 10;
        const startDate = this.startOfDecade(dateTime).minus({'years': 1}).startOf('year');

        const activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), YEAR_FORMAT);
        const currentFormat = this.getCurrentTimeFormatted(YEAR_FORMAT);

        const result = {
            currentView: 'year',
            nextView: this.configuration.minView === 'year' ? 'setTime' : 'month',
            previousViewDate: new DateObject({
                dateTime: null,
                display: `${startDecade} - ${startDecade + 9}`
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
    monthModelFactory(dateTime) {
        const startDate = dateTime.startOf('year');
        const previousViewDate = this.startOfDecade(dateTime);

        const activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), MONTH_FORMAT);
        const currentFormat = this.getCurrentTimeFormatted(MONTH_FORMAT);

        const result = {
            previousView: 'year',
            currentView: 'month',
            nextView: this.configuration.minView === 'month' ? 'setTime' : 'day',
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
     * @returns {{previousView: string, currentView: string, nextView: string, previousViewDate: DateObject, leftDate: DateObject, rightDate: DateObject, dayNames: Array, weeks: Array}}
     */
    dayModelFactory(dateTime) {
        const selectedDate = dateTime;
        const previousViewDate = selectedDate.startOf('year');

        const startOfMonth = selectedDate.startOf('month');
        const endOfMonth = selectedDate.endOf('month');

        const startDate = startOfMonth.minus({'days': Math.abs(startOfMonth.weekday)});

        const activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), DAY_FORMAT);
        const currentFormat = this.getCurrentTimeFormatted(DAY_FORMAT);

        const result = {
            previousView: 'month',
            currentView: 'day',
            nextView: this.configuration.minView === 'day' ? 'setTime' : 'hour',
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
            result.dayNames.push(Info.weekdays('short')[dayNumber])
        }

        for (let i = 0; i < 6; i++) {
            const week = {dates: []};
            for (let j = 1; j < 8; j++) {
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
    hourModelFactory(dateTime) {
        const selectedDate = dateTime.startOf('day');
        const previousViewDate = selectedDate.startOf('month');

        const activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), HOUR_FORMAT);
        const currentFormat = this.getCurrentTimeFormatted(HOUR_FORMAT);

        const result = {
            previousView: 'day',
            currentView: 'hour',
            nextView: this.configuration.minView === 'hour' ? 'setTime' : 'minute',
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
    minuteModelFactory(dateTime) {
        const selectedDate = dateTime.startOf('hour');
        const previousViewDate = selectedDate.startOf('day');

        const activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), MINUTE_FORMAT);
        const currentFormat = this.getCurrentTimeFormatted(MINUTE_FORMAT);

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

        const limit = 60 / this.configuration.minuteStep;

        for (let i = 0; i < limit; i += 1) {
            const hourMoment = selectedDate.plus({'minute': i * this.configuration.minuteStep});
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
    setTime(dateTime) {
        const oldDate = this.ngModelController.$modelValue;
        this.ngModelController.$setViewValue(dateTime.toISO());

        this.onSetTime({newDate: dateTime.toJSDate(), oldDate});

        return this.viewToModelFactory[this.configuration.startView](dateTime)
    }

    $render() {
        this.changeView(this.configuration.startView, new DateObject({dateTime: this.toDateTime(this.ngModelController.$modelValue)}))
    }

    /**
     * @param {DateTime} dateTime
     * @returns {DateTime}
     */
    startOfDecade(dateTime) {
        const startYear = parseInt(dateTime.year / 10, 10) * 10;
        return dateTime.set({year: startYear}).startOf('year')
    }

    /**
     *
     * @param {DateTime=} dateTime
     * @param {string} formatString
     * @returns {string}
     */
    formatValue(dateTime, formatString) {
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
    getCurrentTimeFormatted(format) {
        return DateTime.fromJSDate(new Date()).toFormat(format);
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

    toDateTime(modelValue) {
        if (typeof modelValue === 'string') {
            const dateTime = DateTime.fromISO(modelValue);

            if (dateTime.isValid) {
                return dateTime;
            }
        }

        return DateTime.fromJSDate(new Date());
    }

    createConfiguration($attrs, defaultConfig) {
        let directiveConfig = {};

        if ($attrs.datetimepickerConfig) {
            directiveConfig = this.$scope.$parent.$eval($attrs.datetimepickerConfig)
        }

        const configuration = angular.extend({}, defaultConfig, directiveConfig);

        this.dateTimePickerValidator.validate(configuration);

        return configuration
    }
}


export default class DateTimePickerComponent {
    static componentName = 'datetimepicker';

    templateUrl = template;
    controller = DirectiveController;
    controllerAs = '$ctrl';

    require = {
        ngModelController: 'ngModel'
    };

    bindings = {
        beforeRender: '&',
        onSetTime: '&'
    }
}