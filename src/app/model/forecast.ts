export interface ForecastsHttpResponse {
    DailyForecasts: ForecastHttpResponse[];
}

export interface ForecastHttpResponse {
    Date: string;
    Temperature: {
        Minimum: {
            Value: number;
        }
    },
    Day: {
        Icon: number;
    }
}

export interface Forecast {
    title: string;
    temperature: number
}