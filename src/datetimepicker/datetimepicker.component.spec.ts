import dateTimePickerModule from './datetimepicker.module';
import * as angular from 'angular';
import {ICompileService, IDocumentService, IScope} from 'angular';
import {DateTime, FixedOffsetZone, Settings} from 'luxon';

Settings.defaultLocale = DateTime.local().resolvedLocaleOpts().locale;
Settings.defaultZoneName = FixedOffsetZone.utcInstance;

interface Scope extends IScope {
    model: string;
}

describe('date time picker', () => {

    let $scope: Scope;
    let $compile: ICompileService;
    let $document: IDocumentService;

    beforeEach(() => {
        angular.mock.module(dateTimePickerModule);

        // tslint:disable-next-line:variable-name
        inject((_$compile_, _$rootScope_, _$document_) => {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $document = _$document_;
        });
    });

    it('should render the component', () => {

        const template = '<datetimepicker ng-model="model"></datetimepicker>';
        const element = angular.element($document[0].body).append(angular.element(template));
        $compile(element)($scope);

        $scope.model = '2022-02-22T22:22:22.000Z';

        $scope.$apply();

        let tdElement = angular.element($document[0].querySelector('.day-view tbody tr:nth-of-type(2) td:first-child'));
        tdElement.triggerHandler('click');

        tdElement = angular.element($document[0].querySelector('.hour-view tbody tr span:nth-of-type(2)'));
        tdElement.triggerHandler('click');

        tdElement = angular.element($document[0].querySelector('.minute-view tbody tr span:nth-of-type(1)'));
        tdElement.triggerHandler('click');

        expect($scope.model).toBe('2022-02-07T01:00:00.000Z');
    });

});
