define(['underscore', 'objTools'], function (_, objTools) {

	var xmlValidationResult = {
		init: function (errors) {
			this.errors = errors || [];
			this.checkSuccess();
			return this;
		},
		add: function (errors) {
			if (errors) {
				this.errors = this.errors.concat(errors);
				this.checkSuccess();
			}
		},
		checkSuccess: function () {
			this.success = this.errors.length === 0;
		}
	};

	return function XmlValidationResult () {
		var obj = objTools.construct(xmlValidationResult, XmlValidationResult);
		return obj.init.apply(obj, arguments);
	};

});