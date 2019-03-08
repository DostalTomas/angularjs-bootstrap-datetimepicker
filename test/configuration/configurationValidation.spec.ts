/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        8/4/13
 */

/* tslint:disable:variable-name */
import dateTimePickerModule from './../../src/datetimepicker/datetimepicker.module';
import angular = require('angular');

describe('configuration validation', () => {
    let $rootScope;
    let $compile;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
    }));

    describe('does not throw exception', () => {
        it('when no configuration is specified', () => {
            $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
        });
        it('when ng-model value is a valid date string (as if coming from json api)', () => {
            $rootScope.date = '2013-08-04T23:00:00';
            $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
            $rootScope.$digest();
        });
    });

    describe('throws exception', () => {
        it('if ng-model is not specified', () => {
            function compile() {
                $compile('<datetimepicker></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            // Can't specify the error message here because it changed starting with 1.2.x
            expect(compile).toThrow();
        });
        it('if invalid option name is specified', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minview: \'year\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('Invalid options: minview'));
        });

        it('if multiple invalid option names are specified', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minview: \'year\', foo: \'bar\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('Invalid options: minview, foo'));
        });
    });
});
