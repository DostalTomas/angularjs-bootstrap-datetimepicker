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
import {DateTime, Settings} from 'luxon';
import dateTimePickerModule from './../../../src/datetimepicker/datetimepicker.module';
import angular = require('angular');

Settings.defaultLocale = 'de';

describe('current view displayed on the markup', () => {
    let element;

    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        $rootScope.date = DateTime.fromISO('2013-01-22T00:00:00.000').toISO();
        element = $compile('<datetimepicker ng-model="date" datetimepicker-config="{ startView: \'year\' }"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));

    it('should have `.year-view` class', () => {
        expect(jQuery('table', element).hasClass('year-view')).toBeTruthy();
    });
});

describe('year view with ng-model = null', () => {
    let rootScope;
    let element;

    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        Settings.defaultLocale = 'de';
        rootScope = $rootScope;
        $rootScope.date = null;
        element = $compile('<datetimepicker ng-model="date" datetimepicker-config="{ startView: \'year\' }"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));

    // this feels rather fragile - the implementation details are not important - consider deleting.
    describe('where initial structure', () => {
        it('is a `<div>` element', () => {
            expect(element.prop('tagName')).toBe('DATETIMEPICKER');
        });
        it('`<div>` element has a `datetimepicker` class', () => {
            expect(element.find('> div').hasClass('datetimepicker')).toBe(true);
        });
        it('has a `<div>` that contains a table element', () => {
            expect(element.find('table').length).toBe(1);
        });
        it('has a `<table>` that contains a thead element', () => {
            expect(element.find('table').find('thead').length).toBe(1);
        });
        it('has a `<thead>` that contains two tr elements', () => {
            expect(element.find('table').find('thead').find('tr').length).toBe(2);
        });
        it('has a `<tr>` that contains a <th class="`left`"> element', () => {
            expect(jQuery('th[class*=left]', element).length).toBe(1);
        });
        it('has a `<th class="`left`">` that contains a <i class="`icon-arrow-left`"> element', () => {
            expect(jQuery('th[class*=left] > i[class*=icon-arrow-left]', element).length).toBe(1);
        });
        it('has a `<tr>` that contains a <th class="`switch`" colspan="5"> element', () => {
            expect(jQuery('th[class*=switch][colspan=5]', element).length).toBe(1);
        });
        it('has a `<tr>` that contains a <th class="`right`"> element', () => {
            expect(jQuery('th[class*=right]', element).length).toBe(1);
        });
        it('has a `<th class="`right`">` that contains a <i class="`icon-arrow-right`"> element', () => {
            expect(jQuery('th[class*=right] > i[class*=icon-arrow-right]', element).length).toBe(1);
        });
        it('has a `<th class="`left`">` that contains a sr description set in german', () => {
            expect(jQuery('th[class*=left] .sr-only', element).text()).toBe('vorige');
        });
        it('has a `<th class="`right`">` that contains a sr description set in english', () => {
            expect(jQuery('th[class*=right] .sr-only', element).text()).toBe('weiter');
        });
        it('has a `<table>` that contains a tbody element', () => {
            expect(element.find('table').find('tbody').length).toBe(1);
        });
    });

    describe('where year view', () => {
        it('has a `<th class="switch">` element that contains the current decade range (2010-2019)', () => {
            expect(jQuery('thead th[class*=switch]', element).html()).toBe('2010 - 2019');
        });
        it('has a total of 12 `<span class="year">` elements', () => {
            expect(jQuery('tbody span[class*=year]', element).length).toBe(12);
        });
        it('does not have a `<span class="year active">` element', () => {
            // At this point there is not date set, so there is no active date.
            expect(jQuery('tbody span[class*=year][class*=active]', element).length).toBe(0);
        });
        it('has a `<span class="year past">` element that contains a year value prior to the current decade', () => {
            expect(jQuery('tbody span[class*=year][class*=past]', element).length).toBe(1);
            expect(jQuery('tbody span[class*=year][class*=past]', element).text()).toBe('2009');
        });
        it('has a `<span class="year future">` element that contains a year value after to the current decade', () => {
            expect(jQuery('tbody span[class*=year][class*=future]', element).length).toBe(1);
            expect(jQuery('tbody span[class*=year][class*=future]', element).text()).toBe('2020');
        });
        it('has a `<th class="left">` element that, when clicked, changes the title to the previous decade.', () => {
            jQuery('.left', element).trigger('click');
            expect(jQuery('.switch', element).html()).toBe('2000 - 2009');
        });
        it('has a `<th class="right">` element that, when clicked, changes the title to the previous decade.', () => {
            jQuery('.right', element).trigger('click');
            expect(jQuery('.switch', element).html()).toBe('2020 - 2029');
        });
        it('has a `<th class="switch">` element that, when clicked, changes nothing while in the year view.', () => {
            jQuery('.switch', element).trigger('click');
            expect(jQuery('.switch', element).html()).toBe('2010 - 2019');
        });
        it('has a `<span class="year past">` element that, when clicked, changes the calendar to the month view for the selected year.', () => {
            const pastElement = jQuery('.past', element);
            pastElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe(pastElement.text());
        });
        it('has a `<span class="year future">` element that, when clicked, changes the calendar to the month view for the selected year.', () => {
            const futureElement = jQuery('.future', element);
            futureElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe(futureElement.text());
        });
        it('has a `<th class="switch">` element that, when clicked, changes the calendar to the previous view.', () => {
            // First, click a given date
            const pastElement = jQuery('.past', element);
            pastElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe(pastElement.text());
            // Second, click .switch and the view should update
            jQuery('.switch', element).trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2000 - 2009');
        });

        it('has one `.active` element with a value of 2010 when view is month and date is 2010', () => {
            expect(jQuery('.active', element).length).toBe(0);

            rootScope.date = DateTime.fromISO('2010-10-01').toISO();
            rootScope.$apply();

            expect(jQuery('.active', element).length).toBe(1);
            expect(jQuery('.active', element).text()).toBe('2010');
        });
    });

    describe('where month view', () => {
        beforeEach(() => {
            rootScope.date = DateTime.fromISO('2010-10-01').toISO();
            rootScope.$digest();
            // Switch to month view...
            const pastElement = jQuery('.past', element);
            pastElement.trigger('click');
        });
        it('has one `.right` element, when clicked, changes the view to the next year', () => {
            // Starts on 2009 because the setup clicks the .past element.
            const rightElement = jQuery('.right', element);
            rightElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010');
        });
        it('has one `.left` element, when clicked, changes the view to the next year', () => {
            const rightElement = jQuery('.left', element);
            rightElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2008');
        });
        it('has one `.switch` element, when clicked, changes the view to year view', () => {
            const rightElement = jQuery('.switch', element);
            rightElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2000 - 2009');
        });
        it('has zero `.past` elements', () => {
            expect(jQuery('.past', element).length).toBe(0);
        });
        it('has zero `.future` elements', () => {
            expect(jQuery('.future', element).length).toBe(0);
        });
        it('has one `.active` element with a value of 2010 when view is month and date is 2010', () => {
            expect(jQuery('.active', element).length).toBe(0);

            const rightElement = jQuery('.right', element);
            rightElement.trigger('click');
            expect(jQuery('.active', element).length).toBe(1);
            expect(jQuery('.switch', element).text()).toBe('2010');

            jQuery('.active', element).trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010-Okt');
            expect(jQuery('.active', element).length).toBe(1);
            expect(jQuery('.active', element).text()).toBe('1');
        });
    });

    describe('where day view', () => {
        beforeEach(inject(() => {
            rootScope.date = DateTime.fromISO('2010-10-01').toISO();
            rootScope.$digest();
            // Switch to day view...
            let pastElement = jQuery('.active', element);
            pastElement.trigger('click');
            pastElement = jQuery('.active', element);
            pastElement.trigger('click');
        }));
        it('has one `.active` element with a value of 1 when view is day and date is 2010', () => {
            expect(jQuery('.active', element).length).toBe(1);
            expect(jQuery('.active', element).text()).toBe('1');
        });
        it('has one `.left` element, when clicked, changes the view to the previous month', () => {
            const selectedElement = jQuery('.left', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010-Sep');
        });
        it('has one `.right` element, when clicked, changes the view to the next month', () => {
            const selectedElement = jQuery('.right', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010-Nov');
        });
        it('has one `.switch` element, when clicked, changes the view to month view', () => {
            const selectedElement = jQuery('.switch', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010');
        });
        it('changes to hour view after clicking a `.past` element', () => {
            const selectedElement = jQuery(jQuery('.past', element)[0]);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('27. Sept. 2010');
        });
        it('changes to hour view after clicking a `.future` element', () => {
            const selectedElement = jQuery(jQuery('.future', element)[0]);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('1. Nov. 2010');
        });
        it('has 42 `.day` elements when date is oct-2010', () => {
            expect(jQuery('.day', element).length).toBe(42);
        });

        it('has 5 `.past` elements when date is oct-2010', () => {
            expect(jQuery('.past', element).length).toBe(4);
        });

        it('has 6 `.future` elements when date is oct-2010', () => {
            expect(jQuery('.future', element).length).toBe(7);
        });
    });

    describe('where hour view', () => {
        beforeEach(inject(() => {
            rootScope.date = DateTime.fromISO('2010-10-01').toISO();
            rootScope.$digest();
            // Switch to day view...
            let selectedElement = jQuery('.active', element);
            selectedElement.trigger('click');
            selectedElement = jQuery('.active', element);
            selectedElement.trigger('click');
            selectedElement = jQuery('.active', element);
            selectedElement.trigger('click');
        }));
        it('has one `.active` element with a value of 0:00 when view is hour and date is 2010-Oct-01 00:00', () => {
            expect(jQuery('.active', element).length).toBe(1);
            // expect(jQuery('.active', element).text()).toBe(moment(rootScope.date).format('LT')); TODO
        });
        it('changes the view to the previous day when `.left` element is clicked', () => {
            const selectedElement = jQuery('.left', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('30. Sept. 2010');
        });
        it('changes the view to the next day when `.right` element is clicked', () => {
            const selectedElement = jQuery('.right', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2. Okt. 2010');
        });
        it('changes the view to day view when `.switch` element is clicked', () => {
            const selectedElement = jQuery('.switch', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010-Okt');
        });
        it('changes the view to minute view when `.active` element is clicked', () => {
            const selectedElement = jQuery('.active', element);
            selectedElement.trigger('click');
            expect(jQuery('.minute', element).length).toBe(12);
        });
    });
});

describe('year view with with ng-model = null and minView="year"', () => {
    let rootScope;
    let element;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        rootScope = $rootScope;
        $rootScope.date = null;
        element = $compile('<datetimepicker datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('clicking the `.future` element will set the date value to 2020-01-01T00:00:00.000"', () => {
        expect(jQuery('.switch', element).text()).toBe('2010 - 2019');

        const selectedElement = jQuery('.future', element);
        selectedElement.trigger('click');

        expect(jQuery('.active', element).text()).toBe('2020');
        expect(rootScope.date).toEqual(DateTime.fromISO('2020-01-01T00:00:00.000').toISO());
    });
});

describe('year view with with ng-model = 1970-1-1 (unix date of zero) and minView="year"', () => {
    let rootScope;
    let element;
    beforeEach(() => angular.mock.module(dateTimePickerModule));
    beforeEach(() => inject(($compile, $rootScope) => {
        rootScope = $rootScope;
        $rootScope.date = DateTime.fromISO('1970-01-01T00:00:00.000').toISO();
        element = $compile('<datetimepicker datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('clicking the `.left` element will change the view to 1960-1969"', () => {
        expect(jQuery('.switch', element).text()).toBe('1970 - 1979');

        const selectedElement = jQuery('.left', element);
        selectedElement.trigger('click');

        expect(jQuery('.switch', element).text()).toBe('1960 - 1969');
        expect(rootScope.date).toEqual(DateTime.fromISO('1970-01-01T00:00:00.000').toISO());
    });
});
