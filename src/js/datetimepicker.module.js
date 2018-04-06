import '../scss/datetimepicker.scss';

import register from 'angularjs-register';

import DateTimePickerConfigFactory from './datetimepicker-config.factory';
import DateTimePickerValidatorService from './datetimepicker-validator.service';
import DateTimePickerComponent from './datetimepicker.component';

export default register('ui.bootstrap.datetimepicker')
    .factory(DateTimePickerConfigFactory.factoryName, DateTimePickerConfigFactory)
    .service(DateTimePickerValidatorService.serviceName, DateTimePickerValidatorService)
    .component(DateTimePickerComponent.componentName, DateTimePickerComponent)
    .name();