import {DateTime} from 'luxon';

const TTL_THRESHOLD = 10;

export default class DateTimePickerController {
    private switchElement: Element;
    private minutesElementMap: { [minute: number]: HTMLElement };
    private hoursElementMap: { [hour: number]: HTMLElement };
    private monthsElementMap: { [month: number]: HTMLElement };

    constructor(private dateTimePickerElement: HTMLElement) {
        this.switchElement = dateTimePickerElement.querySelector('th.switch');
    }

    public enterToViewMode(viewType: ViewType) {
        let ttl = 0;

        // current view type has higher granularity, e.g. I want day, but it's in year mode.
        while (this.getOrdinal(this.getCurrentViewType()) < this.getOrdinal(viewType)) {
            this.getCurrent().click();
            ttl++;
            if (ttl >= TTL_THRESHOLD) {
                throw new Error('It seems that datetimepicker has disabled desired view type');
            }
        }

        ttl = 0;
        // current view type has lower granularity, e.g. I want year, but it's in day mode.
        while (this.getOrdinal(this.getCurrentViewType()) > this.getOrdinal(viewType)) {
            this.dateTimePickerElement.querySelector<HTMLElement>('.switch').click();
            ttl++;
            if (ttl >= TTL_THRESHOLD) {
                throw new Error('It seems that datetimepicker has disabled desired view type');
            }
        }
    }

    public getCurrentViewType(): ViewType {
        const classList = this.dateTimePickerElement
            .querySelector('table')
            .classList;

        for (const type in ViewType) {
            if (Object.prototype.hasOwnProperty.call(ViewType, type) && classList.contains(ViewType[type])) {
                return ViewType[type];
            }
        }
    }

    public getCurrent(): HTMLElement {
        return this.dateTimePickerElement.querySelector('.active');
    }

    public selectDate(year: number, month?: number, day?: number, hour?: number, minute?: number) {
        if (arguments.length === 0) {
            throw new Error('At least one date parameter has to be specified.');
        }

        this.enterToViewMode(ViewType.YEAR);

        if (year) {
            this.selectYear(year);
        }

        if (month) {
            this.selectMonth(month);
        }

        if (day) {
            this.selectDay(day);
        }

        if (hour) {
            this.selectHour(hour);
        }

        if (minute) {
            this.selectMinute(minute);
        }
    }

    public selectMinute(minute: number) {
        if (this.getCurrentViewType() !== ViewType.MINUTE) {
            throw new Error(`Invalid current view type. minute-view vs. ${this.getCurrentViewType()}`);
        }

        if (!this.minutesElementMap) {
            this.minutesElementMap = {};

            this.dateTimePickerElement.querySelectorAll('.minute-view .minute')
                .forEach((element) => {
                    const minuteNumber = Number.parseInt(element.textContent.split(':')[1], 10);
                    if (minuteNumber < 0 || minuteNumber > 59) {
                        throw new Error('Error parsing minute number');
                    }

                    this.minutesElementMap[minuteNumber] = (element as HTMLElement);
                });
        }

        if (!this.minutesElementMap[minute]) {
            throw new Error('Desired minute has not been found. Maybe too big "minuteStep" configuration option');
        }

        this.minutesElementMap[minute].click();
    }

    public selectHour(hour: number) {
        if (this.getCurrentViewType() !== ViewType.HOUR) {
            throw new Error(`Invalid current view type. hour-view vs. ${this.getCurrentViewType()}`);
        }

        if (!this.hoursElementMap) {
            this.hoursElementMap = {};

            this.dateTimePickerElement.querySelectorAll('.hour-view .hour')
                .forEach((element) => {
                    const hourNumber = Number.parseInt(element.textContent.split(':')[0], 10);
                    if (hourNumber < 0 || hourNumber > 23) {
                        throw new Error('Error parsing hour number');
                    }

                    this.hoursElementMap[hourNumber] = (element as HTMLElement);
                });
        }

        if (!this.hoursElementMap[hour]) {
            throw new Error('Desired hour has not been found.');
        }

        this.hoursElementMap[hour].click();
    }

    public selectDay(day: number) {
        if (this.getCurrentViewType() !== ViewType.DAY) {
            throw new Error(`Invalid current view type. day-view vs. ${this.getCurrentViewType()}`);
        }

        const daysMap: { [day: number]: HTMLElement } = {};

        this.dateTimePickerElement.querySelectorAll('.day-view .day:not(.past):not(.future)')
            .forEach((element) => {
                const dayNumber = Number.parseInt(element.textContent, 10);
                if (dayNumber < 0 || dayNumber > 31) {
                    throw new Error('Error parsing month number');
                }

                daysMap[dayNumber] = (element as HTMLElement);
            });

        if (!daysMap[day]) {
            throw new Error('Desired hour has not been found. Probably current month has different count of days.');
        }

        daysMap[day].click();
    }

    public selectMonth(month: number) {
        if (this.getCurrentViewType() !== ViewType.MONTH) {
            throw new Error(`Invalid current view type. month-view vs. ${this.getCurrentViewType()}`);
        }

        if (!this.monthsElementMap) {
            this.monthsElementMap = {};

            this.dateTimePickerElement.querySelectorAll('.month-view .month')
                .forEach((element) => {
                    const monthDate = DateTime.fromFormat(element.textContent, 'LLL');
                    if (!monthDate.isValid) {
                        throw new Error('Error parsing month number');
                    }

                    this.monthsElementMap[monthDate.month] = (element as HTMLElement);
                });
        }

        if (!this.monthsElementMap[month]) {
            throw new Error('Desired month has not been found.');
        }

        this.monthsElementMap[month].click();
    }

    public selectYear(year: number) {
        if (this.getCurrentViewType() !== ViewType.YEAR) {
            throw new Error(`Invalid current view type. year-view vs. ${this.getCurrentViewType()}`);
        }

        const yearsMap: { [year: number]: HTMLElement } = {};

        let firstYear: number = Number.MAX_SAFE_INTEGER;
        let lastYear: number = Number.MIN_SAFE_INTEGER;

        while (!(firstYear < year && year < lastYear)) {
            firstYear = Number.parseInt(this.dateTimePickerElement.querySelector<HTMLElement>('.year-view .year.past').textContent, 10);
            lastYear = Number.parseInt(this.dateTimePickerElement.querySelector<HTMLElement>('.year-view .year.future').textContent, 10);

            if (firstYear >= year) {
                this.previousDateTimeWindow();
            }

            if (lastYear <= year) {
                this.nextDateTimeWindow();
            }
        }

        this.dateTimePickerElement.querySelectorAll('.year-view .year')
            .forEach((element) => {
                const yearNumber = Number.parseInt(element.textContent, 10);
                if (yearNumber < 1000) {
                    // tslint:disable-next-line:no-console
                    console.warn('Parsed year is probably wrong:', yearNumber);
                }
                if (yearNumber < 0) {
                    throw new Error('Error parsing year number');
                }

                yearsMap[yearNumber] = (element as HTMLElement);
            });

        yearsMap[year].click();
    }

    public nextDateTimeWindow() {
        this.dateTimePickerElement.querySelector<HTMLElement>('.right').click();
    }

    public previousDateTimeWindow() {
        this.dateTimePickerElement.querySelector<HTMLElement>('.left').click();
    }

    private getOrdinal(viewType: ViewType): number {
        return Object.values(ViewType).indexOf(viewType);
    }
}

export enum ViewType {
    YEAR = 'year-view',
    MONTH = 'month-view',
    DAY = 'day-view',
    HOUR = 'hour-view',
    MINUTE = 'minute-view'
}

export interface DateConfig {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]
