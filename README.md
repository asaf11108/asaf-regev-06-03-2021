# Weather App

This project presents the weather of different locations around the world and cache the history of locations serach.<br/>
The initial location is being fetched by the Web Geolocation API, [link](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).<br/>
[Deployed App](https://master.dgskas777y5a5.amplifyapp.com/)

## API notes
1. I used the following API to fetch data: https://developer.accuweather.com/.
2. Please note that you'll need to [enable cors](https://cors-anywhere.herokuapp.com/corsdemo).
3. This free API enables `50 requests` per day for some API key, if a request failed the app we'll fetch `mock data`.

## Code notes

1. All `components` are in `onPush` mode.
2. The code of `temperature type` toggle is related to language change. [link](https://github.com/asaf11108/asaf-regev-06-03-2021/blob/master/src/app/pipes/temperature.pipe.ts)
3. The loading is being done by `HTTP interceptor` and a new feature in Angular 12 (context). [link](https://github.com/asaf11108/asaf-regev-06-03-2021/blob/master/src/app/services/loader.interceptor.ts)
4. The `structure of the project` is simple. Usually, I like to divide each page into modules and use nrwl nx but for an overly simple project, it seems unnecessary. BTW in Angular 13 NgModules might be optional.
5. The `table` component is flexible, so it could fit to different inputs of data. [link](https://github.com/asaf11108/asaf-regev-06-03-2021/tree/master/src/app/components/table).
6. `Advance TS` example, [link](https://github.com/asaf11108/asaf-regev-06-03-2021/blob/master/src/app/state/weather-locations/weather-location.model.ts).
7. `Media breakpoints`: 'xs': 600px, 'sm': 960px, 'md': 1280px, 'lg': 1920px.
8. The `Home component` contains `unit tests`.
9. The `toolbar` supports desktop and mobile devices, [link](https://github.com/asaf11108/asaf-regev-06-03-2021/blob/master/src/app/components/toolbar/toolbar.component.html)
