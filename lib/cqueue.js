/**
 * Channel queue with Promises
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2014 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/cqueue/master/LICENSE>
 * @link http://avoidwork.github.io/cqueue
 * @module cqueue
 * @version 0.1.2
 */
if ( Promise === undefined ) {
	var Promise = require( "es6-promise" ).Promise;
}

( function ( global, Promise ) {
"use strict";

/**
 * "Unboxed" Promise factory
 *
 * @method deferred
 * @return {Object} Deferred
 */
function deferred () {
	var promise, pCatch, pResolve, pReject, pThen;

	promise = new Promise( function ( resolve, reject ) {
		pResolve = resolve;
		pReject  = reject;
	} );

	pCatch = function () {
		return promise["catch"].apply( promise, arguments );
	};

	pThen = function () {
		return promise.then.apply( promise, arguments );
	};

	return {"catch": pCatch, resolve: pResolve, reject: pReject, then: pThen};
}

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
	var defer = deferred();

	if ( !this.queue.length ) {
		this.queue.push( arg );
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
	var defer = deferred();

	if ( !this.queue.length ) {
		defer.resolve( ["pause", null] );
	}
	else {
		defer.resolve( ["continue", this.queue.pop()] );
	}

	return defer;
};

/**
 * Version property
 *
 * @type {String}
 */
Channel.prototype.version = "0.1.2";

// Node, AMD & window supported
if ( typeof exports != "undefined" ) {
	module.exports = channel;
}
else if ( typeof define == "function" ) {
	define( function () {
		return channel;
	} );
}
else {
	global.cqueue = channel;
}
} )( this, Promise );
