/**
 * Channel queue with Promises
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2015
 * @license BSD-3-Clause
 * @link http://avoidwork.github.io/cqueue
 * @version 1.0.0
 */
(function (global) {
const Promise = global.Promise || require("es6-promise").Promise;

function deferred () {
	let promise, resolver, rejecter;

	promise = new Promise(function (resolve, reject) {
		resolver = resolve;
		rejecter = reject;
	});

	return {resolve: resolver, reject: rejecter, promise: promise};
}

class Channel {
	constructor () {
		this.queue = [];
	}

	put (arg) {
		let defer = deferred();

		if (!this.queue.length) {
			this.queue.push(arg);
			defer.resolve(["continue", null]);
		} else {
			defer.resolve(["pause", null]);
		}

		return defer.promise;
	}

	take () {
		let defer = deferred();

		if (!this.queue.length) {
			defer.resolve(["pause", null]);
		} else {
			defer.resolve(["continue", this.queue.pop()]);
		}

		return defer.promise;
	}
}

function factory () {
	return new Channel();
}

factory.version = "1.0.0";

// Node, AMD & window supported
if (typeof exports !== "undefined") {
	module.exports = factory;
} else if (typeof define === "function" && define.amd) {
	define(function () {
		return factory;
	});
} else {
	global.cqueue = factory;
}}(typeof window !== "undefined" ? window : global));
