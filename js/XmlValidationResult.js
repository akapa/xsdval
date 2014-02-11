define(['underscore', 'objTools'], function (_, objTools) {
	var xmlValidationResult = {
		init: function (errors) {
			errors = errors || [];
			this.errors = errors;
			this.success = errors.length === 0;
			return this;
		}
	};
	return function XmlValidationResult () {
		var obj = objTools.construct(xmlValidationResult, XmlValidationResult);
		return obj.init.apply(obj, arguments);
	}
});