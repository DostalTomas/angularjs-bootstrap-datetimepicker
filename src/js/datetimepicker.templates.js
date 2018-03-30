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
				<th class="left" data-ng-click="$ctrl.changeView($ctrl.data.currentView, $ctrl.data.leftDate, $event)"
					data-ng-show="data.leftDate.selectable">
					<i class="glyphicon glyphicon-arrow-left">
						<span class="sr-only">{{ $ctrl.screenReader.previous }}</span>
					</i>
				</th>

				<th class="switch" colspan="5" data-ng-show="$ctrl.data.previousViewDate.selectable"
					data-ng-click="$ctrl.changeView($ctrl.data.previousView, $ctrl.data.previousViewDate, $event)">
					{{ $ctrl.data.previousViewDate.display }}
				</th>

				<th class="right" data-ng-click="$ctrl.changeView($ctrl.data.currentView, $ctrl.data.rightDate, $event)"
					data-ng-show="$ctrl.data.rightDate.selectable">
					<i class="glyphicon glyphicon-arrow-right">
						<span class="sr-only">{{ $ctrl.screenReader.next }}</span>
					</i>
				</th>
			</tr>

			<tr>
				<th class="dow" data-ng-repeat="day in $ctrl.data.dayNames">{{ day }}</th>
			</tr>
		</thead>

		<tbody>
			<tr data-ng-if="$ctrl.data.currentView !== 'day'">
				<td colspan="7">
					<span class="{{ $ctrl.data.currentView }}" data-ng-repeat="dateObject in $ctrl.data.dates"
						  data-ng-class="{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}"
						  data-ng-click="$ctrl.changeView($ctrl.data.nextView, dateObject, $event)">{{ dateObject.display }}</span>
				</td>
			</tr>

			<tr data-ng-if="$ctrl.data.currentView === 'day'" data-ng-repeat="week in $ctrl.data.weeks">
				<td data-ng-repeat="dateObject in week.dates"
					data-ng-click="$ctrl.changeView($ctrl.data.nextView, dateObject, $event)"
					class="day"
					data-ng-class="{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}">
					{{ dateObject.display }}
				</td>
			</tr>
		</tbody>
	</table>
</div>
    `)
  }])
})); // eslint-disable-line semi
