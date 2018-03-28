/* globals describe, beforeEach, it, expect, module, inject, jQuery, luxon */

/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT

 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

describe('current view displayed on the markup', function () {
  'use strict'

  var element

  beforeEach(module('ui.bootstrap.datetimepicker'))
  beforeEach(inject(function ($compile, $rootScope) {
    luxon.Settings.defaultLocale = 'zh-cn'
    $rootScope.date = luxon.DateTime.fromISO('2013-01-22T00:00:00.000').toJSDate()
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\'}" data-ng-model="date"></datetimepicker>')($rootScope)
    $rootScope.$digest()
  }))

  it('should have `.hour-view` class', function () {
    expect(jQuery('table', element).hasClass('hour-view')).toBeTruthy()
  })
})

describe('hour view with initial date of 2013-01-22', function () {
  'use strict'
  var rootScope
  var element
  beforeEach(module('ui.bootstrap.datetimepicker'))
  beforeEach(inject(function ($compile, $rootScope) {
    luxon.Settings.defaultLocale = 'zh-cn'
    rootScope = $rootScope
    $rootScope.date = luxon.DateTime.fromISO('2013-01-22').toJSDate()
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\'}" data-ng-model="date"></datetimepicker>')($rootScope)
    $rootScope.$digest()
  }))
  it('has `.switch` element with a value of 2013-1-22', function () {
    expect(jQuery('.switch', element).text()).toBe('2013年1月22日')
  })
  it('has 24 `.hour` elements', function () {
    expect(jQuery('.hour', element).length).toBe(24)
  })
  it('has 1 `.active` element with a value of 0:00', function () {
    expect(jQuery('.active', element).text()).toBe(moment(rootScope.date).format('LT'))
  })
  it('has a `<th class=`left`>` that contains a sr description set in simplified chinese', function () {
    expect(jQuery('th[class*=left] .sr-only', element).text()).toBe('上一页')
  })
  it('has a `<th class=`right`>` that contains a sr description set in simplified chinese', function () {
    expect(jQuery('th[class*=right] .sr-only', element).text()).toBe('下一页')
  })
})

describe('hour view with initial date of "2020-01-01T00:00:00.000", minView="hour", minuteStep: 15', function () {
  'use strict'
  var rootScope
  var element
  beforeEach(module('ui.bootstrap.datetimepicker'))
  beforeEach(inject(function ($compile, $rootScope) {
    rootScope = $rootScope
    $rootScope.date = luxon.DateTime.fromISO('2020-01-01T00:00:00.000').toJSDate()
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\', minView: \'hour\', minuteStep: 15 }" data-ng-model="date"></datetimepicker>')($rootScope)
    $rootScope.$digest()
  }))
  it('clicking the 4th `.hour` element will set the date value to 2020-01-01T03:00:00.000"', function () {
    expect(jQuery('.switch', element).text()).toBe('2020年1月1日')

    expect(jQuery('.active', element).length).toBe(1)
    expect(jQuery('.hour', element).length).toBe(24)

    var selectedElement = jQuery(jQuery('.hour', element)[3])
    selectedElement.trigger('click')

    expect(jQuery('.active', element).text()).toBe('03:00')
    expect(rootScope.date).toEqual(luxon.DateTime.fromISO('2020-01-01T03:00:00.000').toJSDate())
  })
})
