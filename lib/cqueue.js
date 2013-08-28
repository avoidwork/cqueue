/**
 * cqueue
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2013 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/cqueue/master/LICENSE>
 * @link http://avoidwork.github.io/cqueue
 * @module cqueue
 * @version 0.1.0
 */
( function () {
"use strict";

var assure = require( "assure" );

/**
 * Channel factory
 *
 * @method channel
 * @return {Object} Channel instance
 */
var channel = function () {
	return new Channel();
};

/**
 * Channel
 *
 * @constructor
 * @private
 * @namespace abaaso
 */
function Channel () {
	this.queue = [];
}

// Setting constructor loop
Channel.prototype.constructor = Channel;

/**
 * Puts an item into the Channel
 *
 * @method put
 * @param  {Mixed} arg Item
 * @return {Array}     Deferred
 */
Channel.prototype.put = function ( arg ) {
	var defer = assure();

	if ( this.queue.length === 0 ) {
		this.queue.unshift( arg );

		defer.resolve( ["continue", null] );
	}
	else {
		defer.resolve( ["pause", null] );
	}

	return defer;
};

/**
 * Takes an item from the Channel
 *
 * @method take
 * @return {Array} Deferred
 */
Channel.prototype.take = function () {
	var defer = assure();

	if ( this.queue.length === 0 ) {
		defer.resolve( ["pause", null] );
	}
	else {
		defer.resolve( ["continue", this.queue.pop()] );
	}

	return defer;
};

module.exports = channel;
})();
