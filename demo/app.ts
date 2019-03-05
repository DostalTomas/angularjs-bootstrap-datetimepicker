import register from '@kpsys/angularjs-register';
import {DateTime, Settings} from 'luxon';

import datetimePickerModule from './../dist/angularjs-bootstrap-datetimepicker';
import './../dist/angularjs-bootstrap-datetimepicker.css';

import DemoController from './demo.controller';

Settings.defaultLocale = DateTime.local().resolvedLocaleOpts().locale;

register('demo', [datetimePickerModule])
    .controller(DemoController.controllerName, DemoController);
