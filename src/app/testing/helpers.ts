export function handleSubscribeComplete(done) {
  return [
    () => {
      done.fail(new Error('Should have been failed'));
    },
    () => {
      done.fail(new Error('Should have been failed'));
    },
    () => {
      done();
    },
  ];
}
