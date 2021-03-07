export interface ForcastHttpResponse {
    DailyForecasts: Forecast[];
}

export interface Forecast {
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