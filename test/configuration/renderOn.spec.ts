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

describe('renderOn', () => {
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
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ renderOn: \'\' }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('renderOn must not be an empty string'));
        });
        it('if value is numeric', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ renderOn: 3 }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('renderOn must be a string'));
        });
    });
    describe('does NOT throw exception', () => {
        it('if value is a string', () => {
            $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ renderOn: \'foo\' }"></datetimepicker>')($rootScope);
        });
    });
    describe('renderOn event', () => {
        it('causes view to re-render after event is received', () => {
            let selectable = true;

            $rootScope.config = {
                data: {
                    startView: 'year',
                    renderOn: 'valid-dates-changed'
                }
            };

            $rootScope.beforeRender = (dates) => {
                dates[2].selectable = selectable;
            };

            spyOn($rootScope, 'beforeRender').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model="date" data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="config.data"></datetimepicker>')($rootScope);
            $rootScope.$digest();

            let selectedElement = jQuery(jQuery('.year', element)[2]);
            expect(selectedElement.hasClass('disabled')).toBeFalsy();

            selectable = false;

            $rootScope.$broadcast('valid-dates-changed');
            $rootScope.$digest();

            expect($rootScope.beforeRender.calls.count()).toBe(2);

            selectedElement = jQuery(jQuery('.year', element)[2]);
            expect(selectedElement.hasClass('disabled')).toBeTruthy();
        });
    });
});
