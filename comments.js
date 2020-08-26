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
 *//**
 * @ngdoc type
 * @name DateTimePickerConfiguration
 * @module bootstrap-datetimepicker
 *
 * @property {string=} startView The view that the datetimepicker should show when it is opened. Default `'day'`.
 * @property {string=} minView The view that will trigger date selection when the user clicks on one of the date/time values. Default `'minute'`.
 * @property {number=} minuteStep The increment used to build the hour view. A button is created for each minuteStep minutes. Default `5`
 * @property {string=} renderOn Accepts any string value
 *                              Causes the date/time picker to re-render its view when the specified event is received.
 *                              For example, if you want to disable any dates or times that are in the past. You can $broadcast the event at an interval to disable times in the past (or any other time valid dates change).
 * @property {string=} configureOn Accepts any string value.
 *                                  Causes the date/time picker to re-read its configuration when the specified event is received.
 *                                  For example, perhaps the startView option in the configuration has changed and you would like the new configuration to be used. You can $broadcast the event to cause this directive to use the new configuration.
 *//**
     * Validate configuration
     * @param {DateTimePickerConfiguration} configuration
     *
     * @throws {Error} Error if configuration is invalid
     */
/* Order of the elements in the validViews array is significant.*//* tslint:disable-next-line:variable-name*//*@ngInject*/
/* Behavior*/
/* Implementation*/
/* @ts-ignore*/
/* View starts one year before the decade starts and ends one year after the decade ends
        i.e. passing in a date of 1/1/2013 will give a range of 2009 to 2020
        Truncate the last digit from the current year and subtract 1 to get the start of the decade */
/* @ts-ignore*/
/* @ts-ignore*/
/**
     * Converts a time value into a moment.
     *
     * This function is now necessary because moment logs a warning when parsing a string without a format.
     * @param {DateTime|Date} modelValue
     *  a time value in any of the supported formats (Date, moment, milliseconds, and string)
     * @returns {DateTime}
     *  representing the specified time value.
     */
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
 *//**
 * @ngdoc module
 * @name bootstrap-datetimepicker
 * @module bootstrap-datetimepicker
 *
 * @description
 * Native AngularJS date & time picker directive styled by Twitter Bootstrap. Based on [dalelotts/angularjs-bootstrap-datetimepicker](https://github.com/dalelotts/angularjs-bootstrap-datetimepicker).
 * Rewritten into TS with webpack bundler and Luxon.
 *//* current view type has higher granularity, e.g. I want day, but it's in year mode.*/
/* current view type has lower granularity, e.g. I want year, but it's in day mode.*/
/* tslint:disable-next-line:no-console*/