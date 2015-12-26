"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	var Promise = global.Promise || require("es6-promise").Promise;

	function deferred() {
		var promise = undefined,
		    resolver = undefined,
		    rejecter = undefined;

		promise = new Promise(function (resolve, reject) {
			resolver = resolve;
			rejecter = reject;
		});

		return { resolve: resolver, reject: rejecter, promise: promise };
	}

	var Channel = (function () {
		function Channel() {
			_classCallCheck(this, Channel);

			this.queue = [];
		}

		_createClass(Channel, [{
			key: "put",
			value: function put(arg) {
				var defer = deferred();

				if (!this.queue.length) {
					this.queue.push(arg);
					defer.resolve(["continue", null]);
				} else {
					defer.resolve(["pause", null]);
				}

				return defer.promise;
			}
		}, {
			key: "take",
			value: function take() {
				var defer = deferred();

				if (!this.queue.length) {
					defer.resolve(["pause", null]);
				} else {
					defer.resolve(["continue", this.queue.pop()]);
				}

				return defer.promise;
			}
		}]);

		return Channel;
	})();

	function factory() {
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
	}
})(typeof window !== "undefined" ? window : global);
