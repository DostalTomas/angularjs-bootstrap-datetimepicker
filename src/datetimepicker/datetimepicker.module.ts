import './stylesheets/datetimepicker.less';

import register from '@kpsys/angularjs-register';

import DateTimePickerConfigFactory from './datetimepicker-config.factory';
import DateTimePickerValidatorService from './datetimepicker-validator.service';
import DateTimePickerComponent from './datetimepicker.component';

/**
 * @ngdoc module
 * @name bootstrap-datetimepicker
 * @module bootstrap-datetimepicker
 *
 * @description
 * Native AngularJS date & time picker directive styled by Twitter Bootstrap. Based on [dalelotts/angularjs-bootstrap-datetimepicker](https://github.com/dalelotts/angularjs-bootstrap-datetimepicker).
 * Rewritten into TS with webpack bundler and Luxon.
 */

export default register('bootstrap-datetimepicker')
    .factory(DateTimePickerConfigFactory.factoryName, DateTimePickerConfigFactory)
    .service(DateTimePickerValidatorService.serviceName, DateTimePickerValidatorService)
    .component(DateTimePickerComponent.componentName, DateTimePickerComponent)
    .name();
