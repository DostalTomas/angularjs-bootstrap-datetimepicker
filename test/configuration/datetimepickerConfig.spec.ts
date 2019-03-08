/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2014 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        11/15/2014
 */

/* tslint:disable:variable-name */
import {DateTime, Settings} from 'luxon';
import * as jQuery from 'jquery';
import dateTimePickerModule from './../../src/datetimepicker/datetimepicker.module';
import angular = require('angular');

describe('dateimePickerConfig', () => {
    let $rootScope;
    let $compile;

    beforeEach(() => angular.mock.module(dateTimePickerModule));

    beforeEach(inject((_$compile_, _$rootScope_) => {
        Settings.defaultLocale = 'en';
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    describe('retrieves information from', () => {
        it('function on scope', () => {
            const $scope = $rootScope.$new();
            $scope.date = DateTime.fromISO('2014-11-15T00:00:00.000').toJSDate();
            $scope.configFunction = () => ({startView: 'month'});

            spyOn($scope, 'configFunction').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="configFunction()" ></datetimepicker>')($scope);
            $scope.$digest();

            expect(jQuery('.switch', element).text()).toBe('2014');
            expect($scope.configFunction).toHaveBeenCalled();
        });

        it('property on scope', () => {
            const $scope = $rootScope.$new();
            $scope.date = DateTime.fromISO('2014-11-15T00:00:00.000').toJSDate();
            $scope.config = {
                datetimePicker: {
                    startView: 'year'
                }
            };

            spyOn($scope, 'config').and.callThrough();

            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="config.datetimePicker" ></datetimepicker>')($scope);
            $scope.$digest();

            expect(jQuery('.switch', element).text()).toBe('2010-2019');
        });
    });
});
