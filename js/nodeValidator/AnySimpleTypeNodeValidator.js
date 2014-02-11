define(['underscore', 'objTools', 'Xml', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, Xml, NodeValidator, XmlValidationResult, XmlValidationError) {
	
	var anySimpleTypeNodeValidator = objTools.make(NodeValidator, {
		type: 'anySimpleType',
		validate: function () {
			var type = this.xsdLibrary.getTypeFromNodeAttr(this.node, 'type', Xml.xsi);
			var xsdNode = this.xsdLibrary.findTypeDefinition(type.namespaceURI, type.name);
			if (xsdNode.namespaceURI === Xml.xs && xsdNode.localName === 'complexType') {
				return new XmlValidationResult([
					new XmlValidationError(this.node, this.definition, 'simpleType')
				]);
			}
			var validator = this.validatorFactory.getValidator(typeDef, this.node, type);
			return validator.validate();
		}
	});

	return function AnySimpleTypeNodeValidator () {
		var obj = objTools.construct(anySimpleTypeNodeValidator, AnySimpleTypeNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});