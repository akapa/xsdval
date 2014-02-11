define(['underscore', 'objTools', 'Xml', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, Xml, NodeValidator, XmlValidationResult, XmlValidationError) {
	
	var anyTypehNodeValidator = objTools.make(NodeValidator, {
		type: 'anyType',
		validate: function () {
			var type = this.xsdLibrary.getTypeFromNodeAttr(this.node, 'type', Xml.xsi);
			var validator = this.validatorFactory.getValidator(typeDef, this.node, type);
			return validator.validate();
		}
	});

	return function AnyTypeNodeValidator () {
		var obj = objTools.construct(anyTypeNodeValidator, AnyTypeNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});