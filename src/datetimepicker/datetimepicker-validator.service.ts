import {DateTimePickerConfiguration} from './datetimepicker-config.factory';
import angular = require('angular');

export default class DateTimePickerValidatorService {
    public static serviceName = 'dateTimePickerValidator';

    /**
     * Validate configuration
     * @param {DateTimePickerConfiguration} configuration
     *
     * @throws {Error} Error if configuration is invalid
     */
    public validate(configuration: DateTimePickerConfiguration) {
        const validOptions = [
            'configureOn',
            'minuteStep',
            'minView',
            'renderOn',
            'startView',
            'screenReader'
        ];

        const invalidOptions = Object.keys(configuration).filter((key) => validOptions.indexOf(key) < 0);

        if (invalidOptions.length) {
            throw new Error(`Invalid options: ${invalidOptions.join(', ')}`);
        }

        // Order of the elements in the validViews array is significant.
        const validViews = ['minute', 'hour', 'day', 'month', 'year'];

        if (validViews.indexOf(configuration.startView) < 0) {
            throw new Error(`invalid startView value: ${configuration.startView}`);
        }

        if (validViews.indexOf(configuration.minView) < 0) {
            throw new Error(`invalid minView value: ${configuration.minView}`);
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
}
