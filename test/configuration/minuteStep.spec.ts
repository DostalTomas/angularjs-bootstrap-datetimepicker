/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

/* tslint:disable:variable-name */
import dateTimePickerModule from './../../src/datetimepicker/datetimepicker.module';
import angular = require('angular');

describe('minuteStep', () => {
    let $rootScope;
    let $compile;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
    }));

    describe('throws exception', () => {
        it('if value is zero', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: 0 }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('minuteStep must be greater than zero and less than 60'));
        });
        it('if value is less than zero', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: -1 }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('minuteStep must be greater than zero and less than 60'));
        });
        it('if value is 60', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: 60 }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('minuteStep must be greater than zero and less than 60'));
        });
        it('if value is greater 60', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: 61 }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('minuteStep must be greater than zero and less than 60'));
        });
        it('if value is not numeric', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: \'5\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('minuteStep must be numeric'));
        });
    });
    describe('does NOT throw exception', () => {
        it('if value is between 1 and 59', () => {
            for (let i = 1; i < 60; i += 1) {
                $compile(`<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: ${i} }"></datetimepicker>`)($rootScope);
            }
        });
    });
});
