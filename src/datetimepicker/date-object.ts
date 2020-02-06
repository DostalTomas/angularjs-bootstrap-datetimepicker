import {DateTime} from 'luxon';

/**
 * @ngdoc type
 * @name DateObject
 * @module bootstrap-datetimepicker
 *
 * @property {DateTime} dateTime Luxon DateTime value of this date object.
 * @property {boolean} selectable Indicates that date value is selectable by the user.
 * @property {boolean} active Indicates that date object is part of the model value.
 * @property {boolean} future Indicates that date value is after the date range of the current view.
 * @property {boolean} past Indicates that date value is prior to the date range of the current view.
 * @property {string} display The way this value will be displayed on the calendar.
 */
export default class DateObject {
    public dateTime: DateTime;
    public selectable: boolean;
    public active?: boolean;
    public current?: boolean;
    public future?: boolean;
    public past?: boolean;
    public display?: string;

    constructor({dateTime, ...rest}: { dateTime: DateTime, active?: boolean, current?: boolean, future?: boolean, past?: boolean, display?: string, selectable?: boolean, narrow?: boolean }) {
        this.dateTime = dateTime;
        this.selectable = true;

        const validProperties = ['active', 'current', 'display', 'future', 'past', 'selectable', 'narrow'];

        Object.keys(rest)
            .filter((key) => validProperties.includes(key))
            .forEach((key) => {
                this[key] = rest[key];
            });
    }

    public localDateValue(): DateTime {
        return this.dateTime.toLocal();
    }
}
