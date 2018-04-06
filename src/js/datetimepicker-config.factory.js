import angular from 'angular';
import {DEFAULT_LOCALIZATION} from './datetimepicker.constants';
import {Settings} from 'luxon';

export default function DateTimePickerConfigFactory() {
    const defaultConfiguration = {
        configureOn: null,
        dropdownSelector: null,
        minuteStep: 5,
        minView: 'minute',
        renderOn: null,
        startView: 'day'
    };

    const screenReader = DEFAULT_LOCALIZATION[Settings.defaultLocale.toLowerCase()];

    return angular.extend({}, defaultConfiguration, {screenReader})
}
DateTimePickerConfigFactory.factoryName = 'dateTimePickerConfig';