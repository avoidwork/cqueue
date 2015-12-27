class Channel {
	constructor() {
  this.queue = [];
	}

	put(arg) {
  let defer = deferred();

  if (!this.queue.length) {
    this.queue.push(arg);
    defer.resolve(['continue', null]);
  } else {
    defer.resolve(['pause', null]);
  }

  return defer.promise;
	}

	take() {
  let defer = deferred();

  if (!this.queue.length) {
    defer.resolve(['pause', null]);
  } else {
    defer.resolve(['continue', this.queue.pop()]);
  }

  return defer.promise;
	}
}
