define(['underscore', 'objTools', 'Xml', 
	'xsdval/nodeValidator/NodeValidator',
	'xsdval/nodeValidator/ComplexTypeNodeValidator', 
	'xsdval/nodeValidator/AnyTypeNodeValidator',
	'xsdval/nodeValidator/AnySimpleTypeNodeValidator',
	'xsdval/nodeValidator/FloatNodeValidator',
	'xsdval/nodeValidator/DecimalNodeValidator',
	'xsdval/nodeValidator/BooleanNodeValidator',
	'xsdval/nodeValidator/DateTimeNodeValidator', 
	'xsdval/nodeValidator/StringNodeValidator'],
function (_, objTools, Xml, NodeValidator, ComplexTypeNodeValidator, AnyTypeNodeValidator,
	AnySimpleTypeNodeValidator, FloatNodeValidator, DecimalNodeValidator, 
	BooleanNodeValidator, DateTimeNodeValidator, StringNodeValidator) {

	var nodeValidatorFactory = {
		init: function (xsdLibrary) {
			this.xsdLibrary = xsdLibrary;
			return this;
		},
		getValidator: function (xsdElement, node, type) {
			//looking up a typeDefinition (complexType, simpleType or null)
			type = type || this.xsdLibrary.getTypeFromNodeAttr(xsdElement, 'type');
			var xsdNode = type
				? this.xsdLibrary.findTypeDefinition(type.namespaceURI, type.name)
				: xsdElement.children[0];

			//if it is a base simple type, choose a pre-defined validator
			if (!xsdNode) {
				if (type && type.namespaceURI === Xml.xs && type.name in strMappings) {
					return new strMappings[type.name](node, xsdElement, this);
				}
			}
			//simple type
			else if (xsdNode.namespaceURI === Xml.xs && xsdNode.localName === 'simpleType') {
				var basetype = this.xsdLibrary.findBaseTypeFor(xsdNode);
				if (basetype in strMappings) {
					return new strMappings[basetype](node, xsdElement, this);
				}
			}
			//complex type
			else if (xsdNode.namespaceURI === Xml.xs && xsdNode.localName === 'complexType') {
				if (xsdNode.getAttribute('abstract') === true) {
					throw new TypeError('An abstract type should only be used for extension/restriction.');
				}
				return new ComplexTypeNodeValidator(node, xsdElement, this);
			}

			console.warn('No suitable validator found for "', xsdElement, '".');
			return new NodeValidator(node, xsdElement, this);
		}
	};

	var strMappings = {
		'anyType': AnyTypeNodeValidator,
		'anySimpleType': AnySimpleTypeNodeValidator,
		'string': StringNodeValidator,
		'float': FloatNodeValidator,
		'double': FloatNodeValidator,
		'decimal': DecimalNodeValidator,
		'dateTime': DateTimeNodeValidator,
		'boolean': BooleanNodeValidator
	};

	return function NodeValidatorFactory () {
		var obj = objTools.construct(nodeValidatorFactory, NodeValidatorFactory);
		return obj.init.apply(obj, arguments);
	};

});