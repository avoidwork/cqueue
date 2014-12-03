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
