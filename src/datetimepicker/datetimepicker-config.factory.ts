import {DateTimeLocalization, DEFAULT_LOCALIZATION} from './datetimepicker.constants';
import {Settings} from 'luxon';
import angular = require('angular');

/**
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
 */
export interface DateTimePickerConfiguration {
    startView: string;
    renderOn: string;
    configureOn: string;
    minuteStep: number;
    minView: string;
    screenReader: DateTimeLocalization;
}

export default function DateTimePickerConfigFactory(): DateTimePickerConfiguration {
    const defaultConfiguration = {
        configureOn: null,
        minuteStep: 5,
        minView: 'minute',
        renderOn: null,
        startView: 'day'
    };

    const screenReader = DEFAULT_LOCALIZATION[Settings.defaultLocale.toLowerCase()];

    return angular.extend({}, defaultConfiguration, {screenReader});
}
DateTimePickerConfigFactory.factoryName = 'dateTimePickerConfig';
