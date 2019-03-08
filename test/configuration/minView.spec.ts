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

describe('minView', () => {
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
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minView: \'bar\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('invalid minView value: bar'));
        });
        it('if value is a numeric value', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minView: 0 }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('invalid minView value: 0'));
        });
        it('if value is greater than startView', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'month\',  minView: \'year\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('startView must be greater than minView'));
        });
    });
    describe('does NOT throw exception for valid values', () => {
        it('if value is between 1 and 59', () => {
            const validViews = ['year', 'month', 'day', 'hour', 'minute'];

            for (let i = 0; i < validViews.length; i += 1) {
                $compile(`<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: 'year', minView: '${validViews[i]}' }"></datetimepicker>`)($rootScope);
            }
        });
    });
});
