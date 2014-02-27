define(['underscore', 'objTools', 'xsdval/XmlValidationResult'],
function (_, objTools, XmlValidationResult) {

	/**
	 * @lends NodeValidator.prototype
	 */
	var nodeValidator = {
		/**
		 * @constructor NodeValidator
		 * @classdesc A dummy NodeValidator, always validates. Serves as a base for all other node validators.
		 * @param {Element} node - The XML node validated by this validator.
		 * @param {Element} definition - The XSD node to be used for validation by this validator.
		 * @param {NodeValidatorFactory} [validatorFactory] - The validator factory that can be used to spawn further validators if needed.
		 */
		init: function (node, definition, validatorFactory) {
			this.node = node;
			this.definition = definition;
			this.validatorFactory = validatorFactory;
			this.xsdLibrary = validatorFactory ? validatorFactory.xsdLibrary : null;
			return this;
		},
		/**
		 * Validates the XML node against the XSD node.
		 * @returns {XmlValidationResult}
		 */
		validate: function () {
			return new XmlValidationResult();
		}
	};

	return function NodeValidator () {
		var obj = objTools.construct(nodeValidator, NodeValidator);
		return obj.init.apply(obj, arguments);
	}

});