/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        11/8/2013
 */

/* tslint:disable:variable-name */
import {DateTime} from 'luxon';
import * as jQuery from 'jquery';
import dateTimePickerModule from './../../src/datetimepicker/datetimepicker.module';
import angular = require('angular');

describe('onSetTime', () => {
    let $rootScope;
    let $compile;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
    }));

    describe('does not throw exception', () => {
        it('when onSetTime is missing', () => {
            $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
        });
        it('when onSetTime is not a function', () => {
            $compile('<datetimepicker data-ng-model="date" data-onSetTime="foo"></datetimepicker>')($rootScope);
        });
    });

    describe('calls onSetTime when date is selected', () => {
        it('onSetTime accepts date parameter', () => {
            $rootScope.setTimeFunction = (selectedDate) => {
                expect(selectedDate).toEqual(DateTime.fromISO('2009-01-01T00:00:00.000').toJSDate());
            };

            spyOn($rootScope, 'setTimeFunction').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-on-set-time=\'setTimeFunction(newDate)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery('.past', element);
            selectedElement.trigger('click');
            expect($rootScope.setTimeFunction).toHaveBeenCalled();
            expect($rootScope.date).toEqual(DateTime.fromISO('2009-01-01T00:00:00.000').toJSDate());
        });
    });

    describe('ignores onSetTime', () => {
        it('if onSetTime is not a function', () => {
            $rootScope.setTimeFunction = 'notAFunction';

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-on-set-time=\'setTimeFunction\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery('.future', element);
            selectedElement.trigger('click');
        });
    });

    describe('accepts additional parameter for onSetTime', () => {
        it('if onSetTime is not a function', () => {
            $rootScope.setTimeFunction = (index, oldDate, newDate) => {
                expect(oldDate).toBe(null);
                expect(oldDate).not.toEqual(newDate);
                expect(newDate).toEqual(DateTime.fromISO('2020-01-01T00:00:00.000').toJSDate());
                expect(index).toEqual(3);
            };

            spyOn($rootScope, 'setTimeFunction').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model=\'date\' data-on-set-time=\'setTimeFunction(3, oldDate, newDate, "foo")\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
            $rootScope.$digest();

            const selectedElement = jQuery('.future', element);
            selectedElement.trigger('click');
            expect($rootScope.setTimeFunction).toHaveBeenCalled();
        });
    });
});
