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

describe('ngModelController', () => {
    beforeEach(() => angular.mock.module(dateTimePickerModule));

    describe('remove $pristine when date set', () => {
        it('if value is not a string', inject(($compile, $rootScope) => {
            $rootScope.data = {};

            $rootScope.setTimeFunction = () => {
                // Nothing to validate here.
                return undefined;
            };

            spyOn($rootScope, 'setTimeFunction');

            const formElement = $compile('<form name="pickerform"><datetimepicker data-ng-model="data.dateValue" name="dateValue" data-on-set-time="setTimeFunction(newDate)" required data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" ></datetimepicker></form>')($rootScope);
            $rootScope.$digest();

            expect(formElement.hasClass('ng-pristine')).toBeTruthy();

            const picker = jQuery(jQuery('.datetimepicker', formElement));
            expect(picker.hasClass('ng-invalid')).toBeTruthy();
            expect(picker.hasClass('ng-dirty')).toBeFalsy();
            expect(picker.hasClass('ng-valid')).toBeFalsy();

            jQuery(jQuery('.day', picker)[2]).trigger('click');

            expect($rootScope.setTimeFunction).toHaveBeenCalled();

            expect(picker.hasClass('ng-invalid')).toBeFalsy();
            expect(picker.hasClass('ng-pristine')).toBeFalsy();
            expect(picker.hasClass('ng-dirty')).toBeTruthy();
            expect(picker.hasClass('ng-valid')).toBeTruthy();

            expect(formElement.hasClass('ng-pristine')).toBeFalsy();
            expect(formElement.hasClass('ng-dirty')).toBeTruthy();
        }));
    });
});
