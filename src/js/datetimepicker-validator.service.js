import angular from 'angular';

export default class DateTimePickerValidatorService {
    static serviceName = 'dateTimePickerValidator';

    /*@ngInject*/
    constructor($log) {
        this.$log = $log;
    }

    validate(configuration) {
        const validOptions = [
            'configureOn',
            'dropdownSelector',
            'minuteStep',
            'minView',
            'renderOn',
            'startView',
            'screenReader'
        ];

        const invalidOptions = Object.keys(configuration).filter((key) => validOptions.indexOf(key) < 0);

        if (invalidOptions.length) {
            throw new Error(`Invalid options: ${invalidOptions.join(', ')}`)
        }

        // Order of the elements in the validViews array is significant.
        const validViews = ['minute', 'hour', 'day', 'month', 'year'];

        if (validViews.indexOf(configuration.startView) < 0) {
            throw new Error(`invalid startView value: ${configuration.startView}`)
        }

        if (validViews.indexOf(configuration.minView) < 0) {
            throw new Error(`invalid minView value: ${configuration.minView}`)
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
    }
}