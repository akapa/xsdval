define(['underscore'], function (_) {
	var objTools = {
		make: function (proto, extensions) {
			var obj = _(proto).isFunction() ? new proto() : Object.create(proto);
			if (extensions) {
				_(obj).extend(extensions);
			}
			return obj;
		},
		construct: function (obj, func) {
			func.prototype = obj;
			var obj = Object.create(obj, {
				constructor: { value: func }
			});
			return obj;
		}
	};
	return objTools;
});