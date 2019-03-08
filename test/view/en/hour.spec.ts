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
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\'}" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));

    it('should have `.hour-view` class', () => {
        expect(jQuery('table', element).hasClass('hour-view')).toBeTruthy();
    });
});

describe('hour view with initial date of 2013-01-22', () => {
    let rootScope;
    let element;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        Settings.defaultLocale = 'en';
        rootScope = $rootScope;
        $rootScope.date = DateTime.fromISO('2013-01-22').toJSDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\'}" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('has `.switch` element with a value of 2013-1-22', () => {
        expect(jQuery('.switch', element).text()).toBe('Jan 22, 2013');
    });
    it('has 24 `.hour` elements', () => {
        expect(jQuery('.hour', element).length).toBe(24);
    });
    /*  it('has 1 `.active` element with a value of 0:00', () => {
        expect(jQuery('.active', element).text()).toBe(moment(rootScope.date).format('LT')); TODO
      });*/
    it('has a `<th class="`left`">` that contains a sr description set in english', () => {
        expect(jQuery('th[class*=left] .sr-only', element).text()).toBe('previous');
    });
    it('has a `<th class="`right`">` that contains a sr description set in english', () => {
        expect(jQuery('th[class*=right] .sr-only', element).text()).toBe('next');
    });
});

describe('hour view with initial date of "2020-01-01T00:00:00.000", minView="hour", minuteStep: 15', () => {
    let rootScope;
    let element;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        rootScope = $rootScope;
        $rootScope.date = DateTime.fromISO('2020-01-01T00:00:00.000').toJSDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\', minView: \'hour\', minuteStep: 15 }" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('clicking the 4th `.hour` element will set the date value to 2020-01-01T03:00:00.000"', () => {
        expect(jQuery('.switch', element).text()).toBe('Jan 1, 2020');

        expect(jQuery('.active', element).length).toBe(1);
        expect(jQuery('.hour', element).length).toBe(24);

        const selectedElement = jQuery(jQuery('.hour', element)[3]);
        selectedElement.trigger('click');

        expect(jQuery('.active', element).text()).toBe('3:00 AM');
        expect(rootScope.date).toEqual(DateTime.fromISO('2020-01-01T03:00:00.000').toJSDate());
    });
});
