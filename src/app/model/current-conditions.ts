export interface CurrentConditions {
    WeatherText: string;
    WeatherIcon: number;
    Temperature: Temperature;

}

export interface Temperature {
    Metric: Metric;
}

export interface Metric {
    Value: number;
    Unit: string;
}