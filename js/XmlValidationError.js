define(['underscore', 'objTools'], function (_, objTools) {
	var xmlValidationError = {
		init: function (failingNode, failedXsdNode, type) {
			this.failingNode = failingNode || null;
			this.failedXsdNode = failedXsdNode || null;
			this.type = type;
			console.error('Validation error created:', this);
			return this;
		}
	};
	return function XmlValidationError () {
		var obj = objTools.construct(xmlValidationError, XmlValidationError);
		return obj.init.apply(obj, arguments);
	}
});