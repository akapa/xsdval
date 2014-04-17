define(['underscore', 'objTools', 'xsd', 
	'xsdval/nodeValidator/NodeValidator',
	'xsdval/nodeValidator/ComplexTypeNodeValidator', 
	'xsdval/nodeValidator/AnyTypeNodeValidator',
	'xsdval/nodeValidator/AnySimpleTypeNodeValidator',
	'xsdval/nodeValidator/FloatNodeValidator',
	'xsdval/nodeValidator/DecimalNodeValidator',
	'xsdval/nodeValidator/BooleanNodeValidator',
	'xsdval/nodeValidator/DateTimeNodeValidator',
	'xsdval/nodeValidator/TimeNodeValidator',
	'xsdval/nodeValidator/DateNodeValidator',
	'xsdval/nodeValidator/HexBinaryNodeValidator',
	'xsdval/nodeValidator/StringNodeValidator'],
function (_, objTools, xsd, NodeValidator, ComplexTypeNodeValidator, AnyTypeNodeValidator,
	AnySimpleTypeNodeValidator, FloatNodeValidator, DecimalNodeValidator, 
	BooleanNodeValidator, DateTimeNodeValidator, TimeNodeValidator, 
	DateNodeValidator, HexBinaryNodeValidator, StringNodeValidator) {

	/**
	 * @lends NodeValidatorFactory.prototype
	 */
	var nodeValidatorFactory = {
		/**
		 * @constructor NodeValidatorFactory
		 * @classdesc Can choose a NodeValidator qualified to validate a certain node.
		 * @param {XsdLibrary} xsdLibrary - The XSD library used to resolve type definitions, inheritance, etc..
		 */
		init: function (xsdLibrary) {
			/**
			 * The validation library that contains XSD documents.
			 * @member {XsdLibrary} NodeValidatorFactory#xsdLibrary
			 */
			this.xsdLibrary = xsdLibrary;
			/**
			 * Mapping nodeValidators to XSD type strings.
			 * @member {Object} NodeValidatorFactory#strMappings
			 */
			this.strMappings = strMappings;
			return this;
		},
		/**
		 * Finds an appropriate NodeValidator object.
		 * @param {Element} xsdElement - The XSD Element that should be used to validate the XML node.
		 * @param {Element} node - The XML node that want to validate with the resulting validator.
		 * @param {Element} [type] - The XSD type node to use if you want to override the type found based on the XSD Element. 
		 * @returns {NodeValidator} A NodeValidator that is capable of validating the given node.
		 */
		getValidator: function (xsdElement, node, type) {
			type = type || this.xsdLibrary.findElementType(xsdElement);

			if (type.localName === 'complexType') {
				if (type.getAttribute('abstract') === 'true') {
					throw new TypeError('An abstract type should only be used for extension/restriction.');
				}
				return new ComplexTypeNodeValidator(node, xsdElement, this);
			}
			else if (type.localName === 'simpleType') {
				var basetype = this.xsdLibrary.findBaseTypeFor(type);
				if (basetype in strMappings) {
					return new strMappings[basetype](node, xsdElement, this);
				}
			}

			console.warn('No suitable validator found for "', xsdElement, '".');
			return new NodeValidator(node, xsdElement, this);
		},
		/**
		 * Attempts to find an XSD type definition either by the given type object, or embedded in the given XSD Element.
		 * @param {Element} xsdElement - An XSD &lt;element&gt; node.
		 * @param {{ namespaceURI: string, name: string }} type - A type object (namespaceURI and name).
		 * @returns {Element|null}
		 */
		getXsdDefinition: function (xsdElement, type) {
			var node = type ?
				this.xsdLibrary.findTypeDefinition(type.namespaceURI, type.name) :
				xsdElement.children[0];
			return node || null;
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
		'time': TimeNodeValidator,
		'date': DateNodeValidator,
		'hexBinary': HexBinaryNodeValidator,
		'boolean': BooleanNodeValidator
	};

	return objTools.makeConstructor(
		function NodeValidatorFactory () {}, 
		nodeValidatorFactory
	);

});