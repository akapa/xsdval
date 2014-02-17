define(['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {
	
	var anyTypehNodeValidator = objTools.make(NodeValidator, {
		type: 'anyType',
		validate: function () {
			var type = xsd.getTypeFromNodeAttr(this.node, 'type', xsd.xsi);
			var validator = this.validatorFactory.getValidator(typeDef, this.node, type);
			return validator.validate();
		}
	});

	return function AnyTypeNodeValidator () {
		var obj = objTools.construct(anyTypeNodeValidator, AnyTypeNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});