/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

/* tslint:disable:variable-name */
import {DateTime} from 'luxon';
import * as jQuery from 'jquery';
import dateTimePickerModule from './../../src/datetimepicker/datetimepicker.module';
import angular = require('angular');

describe('dropdownSelector', () => {
    let $rootScope;
    let $compile;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
    }));

    describe('throws exception', () => {
        it('if value is not a string', () => {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ dropdownSelector: 0 }"></datetimepicker>')($rootScope);
                $rootScope.$digest();
            }

            expect(compile).toThrow(new Error('dropdownSelector must be a string'));
        });
    });
    describe('does NOT throw exception', () => {
        it('if value is a string', () => {
            $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ dropdownSelector: \'.dropdown\' }"></datetimepicker>')($rootScope);
        });
    });
    describe('toggles dropdown', () => {
        it('if value is a string', () => {
            const element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'year\', minView: \'year\', dropdownSelector: \'#dropdown\' }"></datetimepicker>')($rootScope);
            $rootScope.$digest();
            const pastElement = jQuery('.past', element);
            pastElement.trigger('click');
            expect($rootScope.date).not.toEqual(null);
        });
        it('and calls bootstrap methods', () => {
            const html = '<div class="dropdown">' +
                '<a class="dropdown-toggle" id="dropdown" role="button" data-toggle="dropdown" data-target=".dropdown" href="#">' +
                ' <div class="input-group">' +
                '   <input type="text" class="form-control" data-ng-model="data.dateDropDownInputNoFormatting">' +
                '   <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>' +
                ' </div>' +
                '</a>' +
                '<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">' +
                ' <datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'year\', minView: \'year\', dropdownSelector: \'#dropdown\' }"></datetimepicker>' +
                '</ul>' +
                '</div>';

            const element = $compile(html)($rootScope);
            $rootScope.$digest();

            expect($rootScope.date).toEqual(null);

            const dropdownLink = jQuery('#dropdown', element);
            const parent = dropdownLink.parent('div.dropdown');
            expect(parent.hasClass('open')).toBeFalsy();

            dropdownLink.dropdown().trigger('click');
            expect(parent.hasClass('open')).toBeTruthy();

            const dropDownSpy = spyOn(jQuery.fn, 'dropdown').and.callThrough();

            const pastElement = jQuery('.past', element);
            pastElement.trigger('click');

            expect($rootScope.date).toEqual(DateTime.fromISO('2009-01-01T00:00:00.000').toJSDate());
            expect(dropDownSpy).toHaveBeenCalledWith('toggle');
        });
    });
    describe('does NOT toggle dropdown', () => {
        it('if dropdownSelector is NOT specified', () => {
            const html = '<div class="dropdown">' +
                '<a class="dropdown-toggle" id="dropdown" role="button" data-toggle="dropdown" data-target=".dropdown" href="#">' +
                ' <div class="input-group">' +
                '   <input type="text" class="form-control" data-ng-model="data.dateDropDownInputNoFormatting">' +
                '   <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>' +
                ' </div>' +
                '</a>' +
                '<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">' +
                ' <datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }"></datetimepicker>' +
                '</ul>' +
                '</div>';

            const element = $compile(html)($rootScope);
            $rootScope.$digest();

            expect($rootScope.date).toEqual(null);

            const dropdownLink = jQuery('#dropdown', element);
            const parent = dropdownLink.parent('div.dropdown');
            expect(parent.hasClass('open')).toBeFalsy();

            dropdownLink.dropdown().trigger('click');
            expect(parent.hasClass('open')).toBeTruthy();

            const dropDownSpy = spyOn(jQuery.fn, 'dropdown').and.callThrough();

            const pastElement = jQuery('.past', element);
            pastElement.trigger('click');

            expect($rootScope.date).toEqual(DateTime.fromISO('2009-01-01T00:00:00.000').toJSDate());
            expect(dropDownSpy).not.toHaveBeenCalled();
        });
    });
});
