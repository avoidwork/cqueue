# cqueue

cqueue is a Channel queue for holding a msg/value until it's taken. Promises are used for concurrent operations against the queue.

[![build status](https://secure.travis-ci.org/avoidwork/cqueue.png)](http://travis-ci.org/avoidwork/cqueue)

## How do I use it?

Put something in the queue, and then take it at some point in the future. The queue can only hold 1 value, and the response will indicate what your machine should do, i.e. "continue" or "pause".

```javascript
var cqueue = require("cqueue"),
    chan   = cqueue();

chan.take().then(function ( arg ) {
	if ( arg[0] === "pause" ) {
		console.log("empty"); // this runs
	}
	else {
		console.log(arg[1]);
	}
});

chan.put("hello world");

chan.take().then(function ( arg ) {
	if ( arg[0] === "pause" ) {
		console.log("empty");
	}
	else {
		console.log(arg[1]);  // this runs (hello world)
	}
});
```

## API

### queue
#### Property

Array which can hold 1 value

### put
#### Method

 Puts an item into the Channel
 
 	method put
 	param  {Mixed} arg Item
 	return {Array}     Deferred

```javascript
chan.put(arg).then(function(state) {
	if (state[0] === "continue") {
		// arg was added to the channel
	}
	else {
		// arg is not in the channel
	}
});
```

### take
#### Method

Takes an item from the Channel

	method take
 	return {Array} Deferred

```javascript
chan.take().then(function(state) {
	if (state[0] === "continue") {
		// state[1] was taken from the channel
	}
	else {
		// state[1] is null
	}
});
```

## License
Copyright (c) 2013 Jason Mulligan  
Licensed under the BSD-3 license.