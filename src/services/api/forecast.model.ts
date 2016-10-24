export class Forecast {
    current: any = {};

    constructor() {}

    assign(obj: any, codes: any): void {
        let today = (new Date()).toISOString().substring(0, 10)

        if (obj.weather && 'forecast' in obj.weather) {
            // Get weather code strings
            obj.weather.forecast.forEach((f) => {
                f.codeToString = codes[f.code].name;
                f.current = false;

                if  (obj.date === today) {
                    // Mark current weather forecast
                    let hour = (new Date()).getHours();
                    let period = f.period.split('-');

                    if (hour >= parseInt(period[0]) && hour < parseInt(period[1])) {
                        f.current = true;
                    }
                }
            });
        }

        // Transform tides array
        let tidesArray = [];
        for (let tide of ['low', 'high']) {
            for (let time of obj.tide[tide]) {
                tidesArray.push([time, tide]);
            }
        }

        tidesArray.sort(function (a, b) {
            return (a[0] > b[0]) ? 1 : ((b[0] > a[0]) ? -1 : 0);
        });

        obj.tide = tidesArray;

        Object.assign(this, obj);
    }
}
