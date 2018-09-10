import register from 'angularjs-register';
import {DateTime, Settings} from 'luxon';
// @ts-ignore
import datetimePickerModule from '../../../dist/datetimepicker';

import 'bootstrap/less/bootstrap.less';
import '../../../dist/datetimepicker.css';

import DemoController from './demo.controller';

// @ts-ignore
Settings.defaultLocale = DateTime.local().resolvedLocaleOpts().locale;

register('demo', [datetimePickerModule])
    .controller(DemoController.controllerName, DemoController);
