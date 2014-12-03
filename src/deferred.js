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
