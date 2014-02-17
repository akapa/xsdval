define(['underscore', 'objTools', 'xsdval/XmlValidationResult'],
function (_, objTools, XmlValidationResult) {
	var nodeValidator = {
		init: function (node, definition, validatorFactory) {
			this.node = node;
			this.definition = definition;
			this.validatorFactory = validatorFactory;
			this.xsdLibrary = validatorFactory ? validatorFactory.xsdLibrary : null;
			return this;
		},
		validate: function () {
			return new XmlValidationResult();
		}
	};

	return function NodeValidator () {
		var obj = objTools.construct(nodeValidator, NodeValidator);
		return obj.init.apply(obj, arguments);
	}
});