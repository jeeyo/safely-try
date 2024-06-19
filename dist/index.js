function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && 'then' in obj && typeof obj.then === 'function';
}
function safelyTry(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    try {
        // try calling the function
        var x = fn.apply(void 0, args);
        // asynchronous functions
        if (isPromise(x)) {
            // @ts-ignore
            return Promise.resolve(x)
                .then(function (value) { return ({ data: value, error: undefined }); }, function (error) { return ({ data: undefined, error: error }); });
        }
        // synchronous functions
        // @ts-ignore
        return { data: x, error: undefined };
    }
    catch (error) {
        // @ts-ignore
        return { data: undefined, error: error };
    }
}
;
export default safelyTry;
