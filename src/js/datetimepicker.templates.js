/* globals define, module, require, angular */

/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author       Dale "Ducky" Lotts
 * @since        2016-Jan-31
 */

;(function (root, factory) {
  'use strict';
  /* istanbul ignore if */
  if (typeof module !== 'undefined' && module.exports) {
      const ng = typeof angular === 'undefined' ? require('angular') : angular;
      factory(ng);
    module.exports = 'ui.bootstrap.datetimepicker.templates'
    /* istanbul ignore next */
  } else if (typeof define === 'function' && /* istanbul ignore next */ define.amd) {
    define(['angular'], factory)
  } else {
    factory(root.angular, root.moment)
  }
}(this, function (angular) {
  'use strict';
  angular.module('ui.bootstrap.datetimepicker').run(['$templateCache', function ($templateCache) {
    $templateCache.put('templates/datetimepicker.html', `
    <div class="datetimepicker table-responsive">
	<table class="table table-condensed {{ $ctrl.data.currentView }}-view">
		<thead>
			<tr>
				<th class="left" ng-click="$ctrl.changeView($ctrl.data.currentView, $ctrl.data.leftDate, $event)"
					ng-show="$ctrl.data.leftDate.selectable">
					<i class="glyphicon glyphicon-arrow-left">
						<span class="sr-only">{{ $ctrl.screenReader.previous }}</span>
					</i>
				</th>

				<th class="switch" colspan="5" ng-show="$ctrl.data.previousViewDate.selectable"
					ng-click="$ctrl.changeView($ctrl.data.previousView, $ctrl.data.previousViewDate, $event)">
					{{ $ctrl.data.previousViewDate.display }}
				</th>

				<th class="right" ng-click="$ctrl.changeView($ctrl.data.currentView, $ctrl.data.rightDate, $event)"
					ng-show="$ctrl.data.rightDate.selectable">
					<i class="glyphicon glyphicon-arrow-right">
						<span class="sr-only">{{ $ctrl.screenReader.next }}</span>
					</i>
				</th>
			</tr>

			<tr>
				<th class="dow" ng-repeat="day in $ctrl.data.dayNames">{{ day }}</th>
			</tr>
		</thead>

		<tbody>
			<tr ng-if="$ctrl.data.currentView !== 'day'">
				<td colspan="7">
					<span class="{{ $ctrl.data.currentView }}" ng-repeat="dateObject in $ctrl.data.dates"
						  ng-class="{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}"
						  ng-click="$ctrl.changeView($ctrl.data.nextView, dateObject, $event)">{{ dateObject.display }}</span>
				</td>
			</tr>

			<tr ng-if="$ctrl.data.currentView === 'day'" ng-repeat="week in $ctrl.data.weeks">
				<td ng-repeat="dateObject in week.dates"
					ng-click="$ctrl.changeView($ctrl.data.nextView, dateObject, $event)"
					class="day"
					ng-class="{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}">
					{{ dateObject.display }}
				</td>
			</tr>
		</tbody>
	</table>
</div>
    `)
  }])
})); // eslint-disable-line semi
