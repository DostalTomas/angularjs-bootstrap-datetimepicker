/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

/* tslint:disable:variable-name */
import {DateTime, Settings} from 'luxon';
import * as jQuery from 'jquery';
import dateTimePickerModule from './../../../src/datetimepicker/datetimepicker.module';
import angular = require('angular');

describe('current view displayed on the markup', () => {
    let element;

    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        Settings.defaultLocale = 'de';
        $rootScope.date = DateTime.fromISO('2013-01-22T00:00:00.000').toJSDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'month\'}" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));

    it('should have `.month-view` class', () => {
        expect(jQuery('table', element).hasClass('month-view')).toBeTruthy();
    });
});

describe('month view with initial date of 2010-10-01', () => {
    let element;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        Settings.defaultLocale = 'de';
        $rootScope.date = DateTime.fromISO('2010-10-01').toJSDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'month\'}" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('has `.switch` element with a value of 2010', () => {
        expect(jQuery('.switch', element).text()).toBe('2010');
    });
    it('has 12 `.month` elements', () => {
        expect(jQuery('.month', element).length).toBe(12);
    });
    it('has 1 `.active` element with a value of Oct', () => {
        expect(jQuery('.active', element).text()).toBe('Okt.');
    });
    it('has a `<th class="`left`">` that contains a sr description set in german', () => {
        expect(jQuery('th[class*=left] .sr-only', element).text()).toBe('vorige');
    });
    it('has a `<th class="`right`">` that contains a sr description set in english', () => {
        expect(jQuery('th[class*=right] .sr-only', element).text()).toBe('weiter');
    });
});

describe('month view with initial date of "2020-01-01T00:00:00.000" and minView="month"', () => {
    let rootScope;
    let element;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        rootScope = $rootScope;
        $rootScope.date = DateTime.fromISO('2020-01-01T00:00:00.000').toJSDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'month\', minView: \'month\' }" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('clicking the 12th `.month` element will set the date value to 2020-12-01T00:00:00.000"', () => {
        expect(jQuery('.switch', element).text()).toBe('2020');

        expect(jQuery('.month', element).length).toBe(12);

        const selectedElement = jQuery(jQuery('.month', element)[11]);
        selectedElement.trigger('click');

        expect(jQuery('.active', element).text()).toBe('Dez.');
        expect(rootScope.date).toEqual(DateTime.fromISO('2020-12-01T00:00:00.000').toJSDate());
    });
});
