/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        11/8/2014
 */

/* tslint:disable:variable-name */
import {DateTime, Settings} from 'luxon';
import * as jQuery from 'jquery';
import dateTimePickerModule from './../../src/datetimepicker/datetimepicker.module';
import angular = require('angular');

describe('beforeRender', () => {
    let $rootScope;
    let $compile;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject((_$compile_, _$rootScope_) => {
        Settings.defaultLocale = 'en';
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    describe('does not throw exception', () => {
        it('when beforeRender is missing', () => {
            $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
        });
        it('when beforeRender is not a function', () => {
            $compile('<datetimepicker data-ng-model="date" data-beforeRender="foo"></datetimepicker>')($rootScope);
        });
    });

    describe('called before a new view is rendered', () => {
        it('in year view $dates parameter contains 12 members', () => {
            $rootScope.date = DateTime.fromISO('2008-01-01T00:00:00.000').toISO();
            $rootScope.beforeRender = (dates) => {
                expect(dates.length).toBe(12);
            };

            spyOn($rootScope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[2]);

            expect(selectedElement.hasClass('disabled')).toBeFalsy();
            selectedElement.trigger('click');
            expect($rootScope.date).toEqual(DateTime.fromISO('2001-01-01T00:00:00.000').toISO());

            expect($rootScope.beforeRender).toHaveBeenCalled();
        });

        it('in month view $dates parameter contains 12 members', () => {
            $rootScope.date = DateTime.fromISO('2008-01-01T00:00:00.000').toISO();
            $rootScope.beforeRender = (dates) => {
                expect(dates.length).toBe(12);
            };

            spyOn($rootScope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="{ startView: \'month\', minView: \'month\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.month', element)[4]);

            expect(selectedElement.hasClass('disabled')).toBeFalsy();
            selectedElement.trigger('click');
            expect($rootScope.date).toEqual(DateTime.fromISO('2008-05-01T00:00:00.000').toISO());

            expect($rootScope.beforeRender).toHaveBeenCalled();
        });

        it('in day view $dates parameter contains 42 members', () => {
            $rootScope.date = DateTime.fromISO('2014-01-01T00:00:00.000').toISO();

            const offsetDate = new Date();

            $rootScope.beforeRender = (dates) => {
                expect(dates.length).toBe(42);
                expect(dates[0].utcDateValue).toBe(1388275200000);
                offsetDate.setTime(dates[0].utcDateValue);
                expect(dates[0].localDateValue()).toBe(1388275200000 + (offsetDate.getTimezoneOffset() * 60000));
                expect(dates[11].utcDateValue).toBe(1389225600000);
                offsetDate.setTime(dates[11].utcDateValue);
                expect(dates[11].localDateValue()).toBe(1389225600000 + (offsetDate.getTimezoneOffset() * 60000));
            };

            spyOn($rootScope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            expect($rootScope.date).toEqual(DateTime.fromISO('2014-01-01T00:00:00.000').toISO());

            const selectedElement = jQuery(jQuery('.day', element)[11]);
            expect(jQuery(jQuery('.day', element)[0]).text()).toBe('29');
            expect(selectedElement.text()).toBe('9');
            expect(selectedElement.hasClass('disabled')).toBeFalsy();

            selectedElement.trigger('click');
            expect($rootScope.date).toEqual(DateTime.fromISO('2014-01-09T00:00:00.000').toISO());

            expect($rootScope.beforeRender).toHaveBeenCalled();
        });

        it('dates parameter has 12 members', () => {
            $rootScope.date = DateTime.fromISO('2008-01-01T00:00:00.000').toISO();
            $rootScope.beforeRender = (dates) => {
                expect(dates).not.toBeUndefined();
                expect(dates.length).toEqual(12);
            };

            spyOn($rootScope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[2]);
            expect(selectedElement.hasClass('disabled')).toBeFalsy();
            selectedElement.trigger('click');

            expect($rootScope.beforeRender).toHaveBeenCalled();
        });

        it('view parameter is "year"', () => {
            $rootScope.date = DateTime.fromISO('2008-01-01T00:00:00.000');
            $rootScope.beforeRender = (view) => {
                expect(view).toEqual('year');
            };

            spyOn($rootScope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($view)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[2]);
            selectedElement.trigger('click');

            expect($rootScope.beforeRender).toHaveBeenCalled();
        });

        it('$leftDate parameter is the beginning of the previous view', () => {
            $rootScope.date = DateTime.fromISO('2008-01-01T00:00:00.000').toISO();
            $rootScope.beforeRender = ($leftDate) => {
                expect($leftDate).not.toBeUndefined();
            };

            spyOn($rootScope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($leftDate)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[2]);
            selectedElement.trigger('click');

            expect($rootScope.beforeRender).toHaveBeenCalled();
            expect($rootScope.beforeRender.calls.argsFor(0)[0].utcDateValue).toEqual(631152000000); // 1990-01-01
        });

        it('$rightDate parameter is the beginning of the next view', () => {
            $rootScope.date = DateTime.fromISO('2014-04-01T00:00:00.000').toISO();
            $rootScope.beforeRender = ($rightDate) => {
                expect($rightDate).not.toBeUndefined();
            };

            spyOn($rootScope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($rightDate)\' data-datetimepicker-config="{ startView: \'month\', minView: \'month\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.month', element)[2]);
            selectedElement.trigger('click');

            expect($rootScope.beforeRender).toHaveBeenCalled();
            expect($rootScope.beforeRender.calls.argsFor(0)[0].utcDateValue).toEqual(1420070400000); // 2015-01-01
        });

        it('startview = "day" and $upDate parameter is the beginning of the next view up ', () => {
            // i.e. minute -> hour -> day -> month -> year
            $rootScope.date = DateTime.fromISO('2014-10-18T13:00:00.000').toISO();

            $rootScope.beforeRender = ($upDate) => {
                expect($upDate).not.toBeUndefined();
            };

            spyOn($rootScope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($upDate)\' data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            expect($rootScope.beforeRender).toHaveBeenCalled();

            expect($rootScope.beforeRender.calls.argsFor(0)[0].utcDateValue).toEqual(1388534400000); // 2014-01-01 - the start of the 'month' view.

            const selectedElement = jQuery(jQuery('.day', element)[2]);
            selectedElement.trigger('click');
        });

        it('startview = "hour" and $upDate parameter is the beginning of the next view up ', () => {
            // i.e. minute -> hour -> day -> month -> year
            const $scope = $rootScope.$new();

            $scope.date = DateTime.fromISO('2014-10-18T13:00:00.000').toISO();

            $scope.beforeRender = ($upDate) => {
                expect($upDate).not.toBeUndefined();
            };

            spyOn($scope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($upDate)\' data-datetimepicker-config="{ startView: \'hour\', minView: \'hour\' }" ></datetimepicker>')($scope);
            $rootScope.$digest();

            expect($scope.beforeRender).toHaveBeenCalled();
            expect($scope.beforeRender.calls.argsFor(0)[0].utcDateValue).toEqual(1412121600000); // 2014-10-01 12:00 the start of the 'day' view

            const selectedElement = jQuery(jQuery('.hour', element)[2]);
            selectedElement.trigger('click');
        });

        it('startview = "minute" and $upDate parameter is the beginning of the next view up ', () => {
            // i.e. minute -> hour -> day -> month -> year
            $rootScope.date = DateTime.fromISO('2014-10-18T13:00:00.000').toISO();
            $rootScope.beforeRender = ($upDate) => {
                expect($upDate).not.toBeUndefined();
            };

            spyOn($rootScope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($upDate)\' data-datetimepicker-config="{ startView: \'minute\', minView: \'minute\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            expect($rootScope.beforeRender).toHaveBeenCalled();
            expect($rootScope.beforeRender.calls.argsFor(0)[0].utcDateValue).toEqual(1413590400000);   // 2014-10-18 00:00 Z

            const selectedElement = jQuery(jQuery('.minute', element)[2]);
            selectedElement.trigger('click');
        });

        it('year view and 2001 date is disabled', () => {
            $rootScope.date = DateTime.fromISO('2008-01-01T00:00:00.000').toISO();
            $rootScope.beforeRender = (dates) => {
                dates[2].selectable = false;
            };

            spyOn($rootScope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery(jQuery('.year', element)[2]);
            expect(selectedElement.hasClass('disabled')).toBeTruthy();
            selectedElement.trigger('click'); // No change if clicked!

            expect($rootScope.beforeRender).toHaveBeenCalled();
            expect($rootScope.date).toEqual(DateTime.fromISO('2008-01-01T00:00:00.000').toISO());
        });
    });
});
