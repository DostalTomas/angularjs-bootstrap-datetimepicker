export default class DateObject {

    /**
     * @param {{dateTime: DateTime, active: boolean=, current: boolean=, future: boolean=, past: boolean=, display: string=, selectable: boolean=}}
     */
    constructor({dateTime, ...rest}) {
        this.dateTime = dateTime;
        this.selectable = true;

        const validProperties = ['active', 'current', 'display', 'future', 'past', 'selectable'];

        Object.keys(rest)
            .filter((key) => validProperties.includes(key))
            .forEach((key) => {
                this[key] = rest[key]
            });
    }

    /**
     * @returns {DateTime}
     */
    localDateValue() {
        return this.dateTime.toLocal();
    }
}