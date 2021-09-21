export function setCoordsGeolocation(coords) {
  const mock = buildMock((success) => Promise.resolve(success({ coords })));
  setGeolocation(mock);
}

export function blockGeolocation() {
  const mock = buildMock((success, rejected) => Promise.resolve(rejected()));
  setGeolocation(mock);
}

export function notSupportedGeolocation() {
  setGeolocation(undefined);
}

function buildMock(callback) {
  return {
    getCurrentPosition: jest.fn().mockImplementationOnce(callback),
  };
}

function setGeolocation(geolocation) {
  (global.navigator as any).geolocation = geolocation;
}
