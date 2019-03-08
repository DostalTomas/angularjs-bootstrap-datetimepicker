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
        Settings.defaultLocale = 'en';
        $rootScope.date = DateTime.fromISO('2013-01-22T00:00:00.000').toJSDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'day\'}" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));

    it('should have `.day-view` class', () => {
        expect(jQuery('table', element).hasClass('day-view')).toBeTruthy();
    });
});

describe('English day view with initial date of 2013-01-22', () => {
    let element;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        Settings.defaultLocale = 'en';
        $rootScope.date = DateTime.fromISO('2013-01-22T00:00:00.000').toJSDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'day\'}" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('has `.switch` element with a value of 2013-1', () => {
        expect(jQuery('.switch', element).text()).toBe('2013-Jan');
    });
    it('has 42 `.day` elements', () => {
        expect(jQuery('.day', element).length).toBe(42);
    });
    it('has 2 `.past` elements', () => {
        expect(jQuery('.past', element).length).toBe(2);
    });
    it('has 9 `.future` elements', () => {
        expect(jQuery('.future', element).length).toBe(9);
    });
    it('has 1 `.active` element with a value of 22', () => {
        expect(jQuery('.active', element).text()).toBe('22');
    });
    it('has a `<th class="`left`">` that contains a sr description set in english', () => {
        expect(jQuery('th[class*=left] .sr-only', element).text()).toBe('previous');
    });
    it('has a `<th class="`right`">` that contains a sr description set in english', () => {
        expect(jQuery('th[class*=right] .sr-only', element).text()).toBe('next');
    });
});

describe('day with initial date of "2020-01-01T00:00:00.000" and minView="day"', () => {
    let rootScope;
    let element;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        rootScope = $rootScope;
        $rootScope.date = DateTime.fromISO('2020-01-01T00:00:00.000').toJSDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('clicking the 14th `.day` element will set the date value to 2020-01-11T00:00:00.000"', () => {
        expect(jQuery('.switch', element).text()).toBe('2020-Jan');

        expect(jQuery('.active', element).length).toBe(1);
        expect(jQuery('.day', element).length).toBe(42);

        const selectedElement = jQuery(jQuery('.day', element)[13]);
        selectedElement.trigger('click');

        expect(jQuery('.active', element).text()).toBe('11');
        expect(rootScope.date).toEqual(DateTime.fromISO('2020-01-11T00:00:00.000').toJSDate());
    });
});

describe('day with initial date of "2008-02-01T00:00:00.000" (leap year) and minView="day"', () => {
    let rootScope;
    let element;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        rootScope = $rootScope;
        $rootScope.date = DateTime.fromISO('2008-02-01T00:00:00.000').toJSDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('clicking the 34th `.day` element will set the date value to 2008-29-11T00:00:00.000"', () => {
        expect(jQuery('.switch', element).text()).toBe('2008-Feb');

        expect(jQuery('.active', element).length).toBe(1);
        expect(jQuery('.active', element).text()).toBe('1');
        expect(jQuery('.day', element).length).toBe(42);
        expect(jQuery('.past', element).length).toBe(5);

        expect(jQuery('.future', element).length).toBe(8);
        const selectedElement = jQuery(jQuery('.day', element)[33]);

        selectedElement.trigger('click');
        expect(jQuery('.active', element).text()).toBe('29');
        expect(rootScope.date).toEqual(DateTime.fromISO('2008-02-29T00:00:00.000').toJSDate());
    });
});
