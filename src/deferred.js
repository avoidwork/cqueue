function deferred() {
  let resolver;
  let rejecter;

  const promise = new Promise(function(resolve, reject) {
    resolver = resolve;
    rejecter = reject;
  });

  return {resolve: resolver, reject: rejecter, promise: promise};
}
