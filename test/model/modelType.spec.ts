/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

/* tslint:disable:variable-name */
import {DateTime, Settings} from 'luxon';
import * as jQuery from 'jquery';
import dateTimePickerModule from './../../src/datetimepicker/datetimepicker.module';
import angular = require('angular');

describe('modelType', () => {
    let $rootScope;
    let $compile;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
    }));

    describe('throws exception', () => {
        it('if value is an empty string', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('modelType must not be an empty string'));
        });
        it('if value is numeric', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: 3 }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('modelType must be a string'));
        });
    });
    describe('does NOT throw exception', () => {
        it('if value is a string', () => {
            $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'foo\' }"></datetimepicker>')($rootScope);
        });
    });
    describe('value of Date', () => {
        it('is the default', () => {
            $rootScope.date = DateTime.fromISO('2015-11-17').toJSDate();

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toEqual(DateTime.fromISO('2009-01-01').toJSDate());
        });
        it('accepts Date from model and returns Date', () => {
            $rootScope.date = DateTime.fromISO('2005-11-17').toJSDate();

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'Date\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toEqual(DateTime.fromISO('1999-01-01').toJSDate());
        });
        it('accepts valid date string from model and returns Date', () => {
            $rootScope.date = '2005-11-17';

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'Date\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toEqual(DateTime.fromISO('1999-01-01').toJSDate());
        });
        it('accepts milliseconds from model and returns Date (crazy!)', () => {
            $rootScope.date = 1132185600000; // '2005-11-17'

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'Date\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toEqual(DateTime.fromISO('1999-01-01').toJSDate());
        });
        it('throws an exception if invalid date string is in the model', () => {
            $rootScope.date = 'invalid-date';

            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'Date\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('Invalid date: invalid-date'));
        });
    });
    describe('value of luxon', () => {
        it('accepts Date from model and returns a luxon', () => {
            $rootScope.date = DateTime.fromISO('2005-11-17').toJSDate();

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'moment\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect(+DateTime.fromISO('1999-01-01') === +$rootScope.date).toBeTruthy();
        });
        it('accepts valid date string from model and returns a luxon', () => {
            $rootScope.date = '2015-11-17';

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'moment\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect(+DateTime.fromISO('2009-01-01') === +$rootScope.date).toBeTruthy();
        });
        it('accepts milliseconds from model and returns Date (crazy!)', () => {
            $rootScope.date = 1132185600000;   // '2005-11-17'

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'moment\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect(+DateTime.fromISO('1999-01-01') === +$rootScope.date).toBeTruthy();
        });
        it('returns a luxon DateTime with correct time zone', () => {
            $rootScope.date = 1132185600000;   // '2005-11-17'
            Settings.defaultZoneName = 'America/Los_Angeles';

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'moment\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect(+DateTime.fromISO('1999-01-01T00:00:00-08:00') === +$rootScope.date).toBeTruthy();
        });
        it('returns a luxon with correct time zone', () => {
            $rootScope.date = 1132185600000;   // '2005-11-17'
            Settings.defaultZoneName = 'America/New_York';

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'moment\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect(+DateTime.fromISO('1999-01-01T00:00:00-05:00') === +$rootScope.date).toBeTruthy();
        });
        it('throws an exception if invalid date string is in the model', () => {
            $rootScope.date = 'invalid-date';

            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'moment\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('Invalid date: invalid-date'));
        });
    });
    describe('value of milliseconds', () => {
        it('accepts Date from model and returns milliseconds', () => {
            $rootScope.date = DateTime.fromISO('2005-11-17').toJSDate();

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'milliseconds\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toBe(new Date('1999-01-01').getTime());
        });
        it('accepts valid date string from model and returns milliseconds', () => {
            $rootScope.date = '2015-11-17';

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'milliseconds\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toBe(new Date('2009-01-01').getTime());
        });
        it('accepts milliseconds from model and returns Date (crazy!)', () => {
            $rootScope.date = 1132185600000;   // '2005-11-17'

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'milliseconds\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toBe(new Date('1999-01-01').getTime());
        });
        it('throws an exception if numeric string is in the model', () => {
            $rootScope.date = '1132185600000';

            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'milliseconds\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('Invalid date: 1132185600000'));
        });
        it('throws an exception if invalid date string is in the model', () => {
            $rootScope.date = 'invalid-date';

            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'milliseconds\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('Invalid date: invalid-date'));
        });
    });
    describe('value of format string', () => {
        it('accepts Date from model and returns formatted string', () => {
            $rootScope.date = DateTime.fromISO('2005-11-17').toJSDate();

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'MM-DD-YYYY\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toBe('01-01-1999');
        });
        it('accepts date string (in matching format) from model and returns formatted string', () => {
            $rootScope.date = '2015-11-17';

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'YYYY-MM-DD\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toBe('2009-01-01');
        });
        it('accepts milliseconds from model and returns formatted string (crazy!)', () => {
            $rootScope.date = 1132185600000;   // '2005-11-17'

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'YYYY-MM-DD\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toBe('1999-01-01');
        });
        it('accepts any formatting string and returns date using that format)', () => {
            $rootScope.date = 1132185600000;   // This will only work if input from model is not a string

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'gibberish\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toBe('gibb5ri012');
        });
        it('returns formatted string in correct time zone', () => {
            $rootScope.date = DateTime.fromISO('2005-11-17').toJSDate();
            Settings.defaultZoneName = 'America/Los_Angeles';

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'MM-DD-YYYY Z\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toBe('01-01-1999 -08:00');
        });
        it('returns formatted string in correct time zone', () => {
            $rootScope.date = DateTime.fromISO('2005-11-17').toJSDate();
            Settings.defaultZoneName = 'America/New_York';

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'MM-DD-YYYY Z\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[0]);
            selectedElement.trigger('click');

            expect($rootScope.date).toBe('01-01-1999 -05:00');
        });
        it('throws an exception if numeric string is in the model', () => {
            $rootScope.date = '1132185600000';

            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'YYYY-MM-DD\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('Invalid date: 1132185600000'));
        });
        it('throws an exception if incorrectly formatted date string is in the model', () => {
            $rootScope.date = '10-18-1970';

            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'YYYY-MM-DD\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('Invalid date: 10-18-1970'));
        });
        it('throws an exception if invalid date string is in the model', () => {
            $rootScope.date = 'invalid-date';

            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ modelType: \'YYYY-MM-DD\', startView: \'year\', minView: \'year\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('Invalid date: invalid-date'));
        });
    });
});
