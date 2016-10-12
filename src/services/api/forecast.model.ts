export class Forecast {
    constructor(private data: any, private codes: any) {
        for (var property in this.data) {
            this[property] = this.data[property];
        }

        // Get `name` string for weather code.
        if (this.data.weather && 'forecast' in this.data.weather) {
            this.data.weather.forecast.forEach((f) => {
                f.codeToString = this.codes[f.code].name;
            });
        }
    }

    getDate() {
        /* just testing... */
        return this.data.date;
    }
}
