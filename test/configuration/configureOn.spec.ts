/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

/* tslint:disable:variable-name */
import * as jQuery from 'jquery';
import dateTimePickerModule from './../../src/datetimepicker/datetimepicker.module';
import angular = require('angular');

describe('configureOn', () => {
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
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ configureOn: \'\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('configureOn must not be an empty string'));
        });
        it('if value is numeric', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ configureOn: 3 }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('configureOn must be a string'));
        });
    });
    describe('does NOT throw exception', () => {
        it('if value is a string', () => {
            $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ configureOn: \'foo\' }"></datetimepicker>')($rootScope);
        });
    });
    describe('configureOn event', () => {
        it('causes view to reflect changes to configuration', () => {
            $rootScope.config = {
                data: {
                    configureOn: 'config-changed'
                }
            };

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="config.data"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            expect(jQuery('.day-view', element).length).toBe(1);

            $rootScope.config.data.startView = 'minute';

            $rootScope.$broadcast('config-changed');
            $rootScope.$digest();

            expect(jQuery('.day-view', element).length).toBe(0);
        });
    });
});
