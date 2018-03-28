/* globals describe, beforeEach, it, expect, module, inject, jQuery, luxon, spyOn */

/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        11/8/2013
 */
describe('onSetTime', function () {
  'use strict'
  var $rootScope
  var $compile
  beforeEach(module('ui.bootstrap.datetimepicker'))
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_
    $rootScope = _$rootScope_
    $rootScope.date = null
  }))

  describe('does not throw exception', function () {
    it('when onSetTime is missing', function () {
      $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope)
    })
    it('when onSetTime is not a function', function () {
      $compile('<datetimepicker data-ng-model="date" data-onSetTime="foo"></datetimepicker>')($rootScope)
    })
  })

  describe('calls onSetTime when date is selected', function () {
    it('onSetTime accepts date parameter', function () {
      $rootScope.setTimeFunction = function (selectedDate) {
        expect(selectedDate).toEqual(luxon.DateTime.fromISO('2009-01-01T00:00:00.000').toJSDate())
      }

      spyOn($rootScope, 'setTimeFunction').and.callThrough()

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-on-set-time=\'setTimeFunction(newDate)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope)
      $rootScope.$digest()

      var selectedElement = jQuery('.past', element)
      selectedElement.trigger('click')
      expect($rootScope.setTimeFunction).toHaveBeenCalled()
      expect($rootScope.date).toEqual(luxon.DateTime.fromISO('2009-01-01T00:00:00.000').toJSDate())
    })
  })

  describe('ignores onSetTime', function () {
    it('if onSetTime is not a function', function () {
      $rootScope.setTimeFunction = 'notAFunction'

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-on-set-time=\'setTimeFunction\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope)
      $rootScope.$digest()

      var selectedElement = jQuery('.future', element)
      selectedElement.trigger('click')
    })
  })

  describe('accepts additional parameter for onSetTime', function () {
    it('if onSetTime is not a function', function () {
      $rootScope.setTimeFunction = function (index, oldDate, newDate) {
        expect(oldDate).toBe(null)
        expect(oldDate).not.toEqual(newDate)
        expect(newDate).toEqual(luxon.DateTime.fromISO('2020-01-01T00:00:00.000').toJSDate())
        expect(index).toEqual(3)
      }

      spyOn($rootScope, 'setTimeFunction').and.callThrough()

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-on-set-time=\'setTimeFunction(3, oldDate, newDate, "foo")\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope)
      $rootScope.$digest()

      var selectedElement = jQuery('.future', element)
      selectedElement.trigger('click')
      expect($rootScope.setTimeFunction).toHaveBeenCalled()
    })
  })
})
