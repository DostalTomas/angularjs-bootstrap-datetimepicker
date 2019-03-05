import {DateTime, Info} from 'luxon';

import DateObject from './date-object';
import {
    DateTimeLocalization,
    DAY_FORMAT,
    HOUR_FORMAT,
    MINUTE_FORMAT,
    MONTH_FORMAT,
    YEAR_FORMAT
} from './datetimepicker.constants';
import {IAttributes, INgModelController, IOnInit, IScope} from 'angular';
import {DateTimePickerConfiguration} from './datetimepicker-config.factory';
import DateTimePickerValidatorService from './datetimepicker-validator.service';
import angular = require('angular');

export type TDateTimePickerViews = 'minute' | 'hour' | 'day' | 'month' | 'year' | 'setTime';

type TModelFactoryFunction = (dateTime: DateTime) => DateTimeModel;

export interface DateTimeModel {
    previousView?: TDateTimePickerViews;
    currentView: TDateTimePickerViews;
    nextView?: TDateTimePickerViews;
    previousViewDate: DateObject;
    leftDate: DateObject;
    rightDate: DateObject;
    dates?: DateObject[];
    dayNames?: string[];
    weeks?: Array<{ dates: DateObject[] }>;
}

export abstract class DirectiveController implements IOnInit {
    public ngModelController: INgModelController;
    public viewFormat: string;
    public data: DateTimeModel;
    private viewToModelFactory: { year: TModelFactoryFunction; month: TModelFactoryFunction; day: TModelFactoryFunction; hour: TModelFactoryFunction; minute: TModelFactoryFunction; setTime: TModelFactoryFunction; };
    private configuration: DateTimePickerConfiguration;
    private screenReader: DateTimeLocalization;

    /*@ngInject*/
    constructor(private $scope: IScope, private $attrs: IAttributes, private dateTimePickerValidator: DateTimePickerValidatorService, private dateTimePickerConfig: DateTimePickerConfiguration) {
    }

    public abstract beforeRender(locals: { $view: any; $dates: any; $leftDate: any; $upDate: any; $rightDate: any; }): void;

    public abstract onSetTime(locals: { newDate: any; oldDate: any; }): void;

    public $onInit() {
        this.configuration = this.createConfiguration(this.$attrs, this.dateTimePickerConfig);
        this.screenReader = this.configuration.screenReader;

        // Behavior
        this.ngModelController.$render = this.$render.bind(this);

        if (this.configuration.configureOn) {
            this.$scope.$on(this.configuration.configureOn, () => {
                this.configuration = this.createConfiguration(this.$attrs, this.dateTimePickerConfig);
                this.screenReader = this.configuration.screenReader;
                this.ngModelController.$render();
            });
        }

        if (this.configuration.renderOn) {
            this.$scope.$on(this.configuration.renderOn, this.ngModelController.$render);
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

    public changeView(viewName: string, dateObject: DateObject, event?: JQueryEventObject) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        // @ts-ignore
        if (viewName && (dateObject.dateTime > -Infinity) && dateObject.selectable && this.viewToModelFactory[viewName]) {
            const result: DateTimeModel = this.viewToModelFactory[viewName](dateObject.dateTime);

            const weekDates = [];
            if (result.weeks) {
                for (const week of result.weeks) {
                    for (const weekDate of week.dates) {
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

    public yearModelFactory(dateTime: DateTime): DateTimeModel {
        const selectedDate = dateTime.startOf('year');
        /* View starts one year before the decade starts and ends one year after the decade ends
        i.e. passing in a date of 1/1/2013 will give a range of 2009 to 2020
        Truncate the last digit from the current year and subtract 1 to get the start of the decade */
        // @ts-ignore
        const startDecade = parseInt(selectedDate.year / 10, 10) * 10;
        const startDate = this.startOfDecade(dateTime).minus({years: 1}).startOf('year');

        const activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), YEAR_FORMAT);
        const currentFormat = this.getCurrentTimeFormatted(YEAR_FORMAT);

        const result: DateTimeModel = {
            currentView: 'year',
            nextView: this.configuration.minView === 'year' ? 'setTime' : 'month',
            previousViewDate: new DateObject({
                dateTime: null,
                display: `${startDecade} - ${startDecade + 9}`
            }),
            leftDate: new DateObject({dateTime: startDate.minus({years: 9})}),
            rightDate: new DateObject({dateTime: startDate.plus({years: 11})}),
            dates: []
        };

        for (let i = 0; i < 12; i += 1) {
            const yearMoment = startDate.plus({years: i});
            const dateValue = {
                active: yearMoment.toFormat(YEAR_FORMAT) === activeFormat,
                current: yearMoment.toFormat(YEAR_FORMAT) === currentFormat,
                display: yearMoment.toFormat(YEAR_FORMAT),
                future: yearMoment.year > startDecade + 9,
                past: yearMoment.year < startDecade,
                dateTime: yearMoment
            };

            result.dates.push(new DateObject(dateValue));
        }

        return result;
    }

    public monthModelFactory(dateTime: DateTime): DateTimeModel {
        const startDate = dateTime.startOf('year');
        const previousViewDate = this.startOfDecade(dateTime);

        const activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), MONTH_FORMAT);
        const currentFormat = this.getCurrentTimeFormatted(MONTH_FORMAT);

        const result: DateTimeModel = {
            previousView: 'year',
            currentView: 'month',
            nextView: this.configuration.minView === 'month' ? 'setTime' : 'day',
            previousViewDate: new DateObject({
                dateTime: previousViewDate,
                display: startDate.toFormat('yyyy')
            }),
            leftDate: new DateObject({dateTime: startDate.minus({years: 1})}),
            rightDate: new DateObject({dateTime: startDate.plus({years: 1})}),
            dates: []
        };

        for (let i = 0; i < 12; i += 1) {
            const monthMoment = startDate.plus({months: i});
            const dateValue = {
                active: monthMoment.toFormat(MONTH_FORMAT) === activeFormat,
                current: monthMoment.toFormat(MONTH_FORMAT) === currentFormat,
                display: monthMoment.toFormat('LLL'),
                dateTime: monthMoment
            };

            result.dates.push(new DateObject(dateValue));
        }

        return result;
    }

    public dayModelFactory(dateTime: DateTime): DateTimeModel {
        const selectedDate = dateTime;
        const previousViewDate = selectedDate.startOf('year');

        const startOfMonth = selectedDate.startOf('month');
        const endOfMonth = selectedDate.endOf('month');

        const startDate = startOfMonth.minus({days: Math.abs(startOfMonth.weekday)});

        const activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), DAY_FORMAT);
        const currentFormat = this.getCurrentTimeFormatted(DAY_FORMAT);

        const result: DateTimeModel = {
            previousView: 'month',
            currentView: 'day',
            nextView: this.configuration.minView === 'day' ? 'setTime' : 'hour',
            previousViewDate: new DateObject({
                dateTime: previousViewDate,
                display: startOfMonth.toFormat('yyyy-LLL')
            }),
            leftDate: new DateObject({dateTime: startOfMonth.minus({months: 1})}),
            rightDate: new DateObject({dateTime: startOfMonth.plus({months: 1})}),
            dayNames: [],
            weeks: []
        };

        for (let dayNumber = 0; dayNumber < 7; dayNumber += 1) {
            result.dayNames.push(Info.weekdays('short')[dayNumber]);
        }

        for (let i = 0; i < 6; i++) {
            const week = {dates: []};
            for (let j = 1; j < 8; j++) {
                const dayMoment = startDate.plus({days: (i * 7) + j});
                const dateValue = {
                    active: dayMoment.toFormat(DAY_FORMAT) === activeFormat,
                    current: dayMoment.toFormat(DAY_FORMAT) === currentFormat,
                    display: dayMoment.toFormat('d'),
                    future: dayMoment > endOfMonth,
                    past: dayMoment < startOfMonth,
                    dateTime: dayMoment
                };
                week.dates.push(new DateObject(dateValue));
            }
            result.weeks.push(week);
        }

        return result;
    }

    public hourModelFactory(dateTime: DateTime): DateTimeModel {
        const selectedDate = dateTime.startOf('day');
        const previousViewDate = selectedDate.startOf('month');

        const activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), HOUR_FORMAT);
        const currentFormat = this.getCurrentTimeFormatted(HOUR_FORMAT);

        const result: DateTimeModel = {
            previousView: 'day',
            currentView: 'hour',
            nextView: this.configuration.minView === 'hour' ? 'setTime' : 'minute',
            previousViewDate: new DateObject({
                dateTime: previousViewDate,
                display: selectedDate.toFormat('DD')
            }),
            leftDate: new DateObject({dateTime: selectedDate.minus({days: 1})}),
            rightDate: new DateObject({dateTime: selectedDate.plus({days: 1})}),
            dates: []
        };

        for (let i = 0; i < 24; i += 1) {
            const hourMoment = selectedDate.plus({hours: i});
            const dateValue = {
                active: hourMoment.toFormat(HOUR_FORMAT) === activeFormat,
                current: hourMoment.toFormat(HOUR_FORMAT) === currentFormat,
                display: hourMoment.toFormat('t'),
                dateTime: hourMoment
            };

            result.dates.push(new DateObject(dateValue));
        }

        return result;
    }

    public minuteModelFactory(dateTime: DateTime): DateTimeModel {
        const selectedDate = dateTime.startOf('hour');
        const previousViewDate = selectedDate.startOf('day');

        const activeFormat = this.formatValue(this.toDateTime(this.ngModelController.$modelValue), MINUTE_FORMAT);
        const currentFormat = this.getCurrentTimeFormatted(MINUTE_FORMAT);

        const result: DateTimeModel = {
            previousView: 'hour',
            currentView: 'minute',
            nextView: 'setTime',
            previousViewDate: new DateObject({
                dateTime: previousViewDate,
                display: selectedDate.toFormat('ff')
            }),
            leftDate: new DateObject({dateTime: selectedDate.minus({hours: 1})}),
            rightDate: new DateObject({dateTime: selectedDate.plus({hours: 1})}),
            dates: []
        };

        const limit = 60 / this.configuration.minuteStep;

        for (let i = 0; i < limit; i += 1) {
            const hourMoment = selectedDate.plus({minute: i * this.configuration.minuteStep});
            const dateValue = {
                active: hourMoment.toFormat(MINUTE_FORMAT) === activeFormat,
                current: hourMoment.toFormat(MINUTE_FORMAT) === currentFormat,
                display: hourMoment.toFormat('t'),
                dateTime: hourMoment
            };

            result.dates.push(new DateObject(dateValue));
        }

        return result;
    }

    public setTime(dateTime: DateTime): DateTimeModel {
        const oldDate = this.ngModelController.$modelValue;
        if (this.viewFormat) {
            this.ngModelController.$setViewValue(dateTime.toFormat(this.viewFormat));
        } else {
            this.ngModelController.$setViewValue(dateTime.toISO());
        }

        this.onSetTime({newDate: dateTime.toJSDate(), oldDate});
        if (this.$attrs.ngChange) {
            this.$scope.$eval(this.$attrs.ngChange);
        }

        return this.viewToModelFactory[this.configuration.startView](dateTime);
    }

    private $render() {
        this.changeView(this.configuration.startView, new DateObject({dateTime: this.toDateTime(this.ngModelController.$modelValue)}));
    }

    private startOfDecade(dateTime: DateTime): DateTime {
        // @ts-ignore
        const startYear = parseInt(dateTime.year / 10, 10) * 10;
        return dateTime.set({year: startYear}).startOf('year');
    }

    private formatValue(dateTime: DateTime, formatString: string): string {
        if (dateTime) {
            return dateTime.toFormat(formatString);
        } else {
            return '';
        }
    }

    private getCurrentTimeFormatted(format: string): string {
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
    private toDateTime(modelValue: DateTime | Date | string): DateTime {
        if (typeof modelValue === 'string') {
            const dateTime = DateTime.fromISO(modelValue);

            if (dateTime.isValid) {
                return dateTime;
            }
        }

        return DateTime.fromJSDate(new Date());
    }

    private createConfiguration($attrs: IAttributes, defaultConfig: DateTimePickerConfiguration): DateTimePickerConfiguration {
        let directiveConfig = {};

        if ($attrs.datetimepickerConfig) {
            directiveConfig = this.$scope.$parent.$eval($attrs.datetimepickerConfig);
        }

        const configuration = angular.extend({}, defaultConfig, directiveConfig);

        this.dateTimePickerValidator.validate(configuration);

        return configuration;
    }
}

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
export default class DateTimePickerComponent {
    public static componentName = 'datetimepicker';

    public templateUrl = require('./datetimepicker.tpl.pug');
    public controller = DirectiveController;
    public controllerAs = '$ctrl';

    public require = {
        ngModelController: 'ngModel'
    };

    public bindings = {
        beforeRender: '&',
        onSetTime: '&',
        viewFormat: '@?'
    };
}
