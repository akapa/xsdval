define(['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor AnySimpleTypeNodeValidator
	 * @classdesc A validator for an element marked `anySimpleType`.
	 * @extends NodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */	
	var anySimpleTypeNodeValidator = objTools.make(NodeValidator, 
	/**
	 * @lends AnySimpleTypeNodeValidator.prototype
	 */
		{
		type: 'anySimpleType',
		/**
		 * Checks the `type` attribute for the real type of the element, spawns and runs the fitting validator.
		 * Fails validation if a complex type is given in the `type` attribute.
		 * @returns {XmlValidationResult}
		 */
		validate: function () {
			var type = xsd.getTypeFromNodeAttr(this.node, 'type', xsd.xsi);
			var xsdNode = this.xsdLibrary.findTypeDefinition(type.namespaceURI, type.name);
			if (xsdNode.namespaceURI === xsd.xs && xsdNode.localName === 'complexType') {
				return new XmlValidationResult([
					new XmlValidationError(this.node, this.definition, 'simpleType')
				]);
			}
			var validator = this.validatorFactory.getValidator(typeDef, this.node, type);
			return validator.validate();
		}
	});

	return objTools.makeConstructor(
		function anySimpleTypeNodeValidator () {}, 
		anySimpleTypeNodeValidator
	);

});