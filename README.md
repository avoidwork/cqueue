# cqueue

cqueue is a Channel queue for holding a msg/value until it's taken. Promises are used for concurrent operations against the queue.

[![build status](https://secure.travis-ci.org/avoidwork/cqueue.png)](http://travis-ci.org/avoidwork/cqueue)

## How do I use it?

Put something in the queue, and then take it at some point in the future. The queue can only hold one value, and the response will indicate what your machine should do, i.e. "continue" or "pause".

```javascript
const cqueue = require("cqueue");
let chan = cqueue();

function handle (arg) {
    console.log(arg[1] || "empty");
}

chan.take().then(handle); // "empty"
chan.put("hello world");
chan.take().then(handle); // "hello world"
```

## API

### queue
#### Property

Array which can hold 1 value

### put
#### Method

 Puts an item into the Channel, and the Promise receives an Array
 
 	method put
 	param  {Mixed} arg Item
 	return {Object}    Promise

```javascript
chan.put(arg).then(function(state) {
	if (state[0] === "continue") {
		// arg was added to the channel
	} else {
		// arg is not in the channel
	}
});
```

### take
#### Method

Takes an item from the Channel, and the Promise receives an Array

	method take
 	return {Object} Promise

```javascript
chan.take().then(function(state) {
	if (state[0] === "continue") {
		// state[1] was taken from the channel
	} else {
		// state[1] is null
	}
});
```

## License
Copyright (c) 2015 Jason Mulligan
Licensed under the BSD-3 license.
