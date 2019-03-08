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

describe('startView', () => {
    let $rootScope;
    let $compile;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
    }));

    describe('throws exception', () => {
        it('if value is not a valid value', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'foo\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('invalid startView value: foo'));
        });
        it('if value is a numeric value', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: -1 }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('invalid startView value: -1'));
        });
        it('if value is less than minView', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'hour\',  minView: \'day\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('startView must be greater than minView'));
        });
    });
    describe('does NOT throw exception for valid values', () => {
        it('if value is between 1 and 59', () => {
            const validViews = ['year', 'month', 'day', 'hour', 'minute'];

            for (let i = 0; i < validViews.length; i += 1) {
                $compile(`<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: '${validViews[i]}' }"></datetimepicker>`)($rootScope);
            }
        });
    });
});
