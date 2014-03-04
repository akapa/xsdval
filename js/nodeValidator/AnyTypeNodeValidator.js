define(['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor AnyTypeNodeValidator
	 * @classdesc A validator for an element marked `anyType`.
	 * @extends NodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */	
	var anyTypeNodeValidator = objTools.make(NodeValidator, 
	/**
	 * @lends AnyTypeNodeValidator.prototype
	 */	
	{
		type: 'anyType',
		/**
		 * Checks the `type` attribute for the real type of the element, spawns and runs the fitting validator.
		 * @returns {XmlValidationResult}
		 */
		validate: function () {
			var type = xsd.getTypeFromNodeAttr(this.node, 'type', xsd.xsi);
			var validator = this.validatorFactory.getValidator(typeDef, this.node, type);
			return validator.validate();
		}
	});

	return objTools.makeConstructor(
		function AnyTypeNodeValidator () {}, 
		anyTypeNodeValidator
	);

});