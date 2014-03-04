define(['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor StringNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `string`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var stringNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends StringNodeValidator.prototype
	 */
	{
		type: 'string',
		/**
		 * Get the facets that are allowed to be used by this validator.
		 * @returns {string[]}
		 * @protected
		 */
		getAllowedFacets: function () {
			return [
				'length', 
				'minLength', 
				'maxLength', 
				'pattern', 
				'enumeration', 
				'assertion'
			];
		},
		/**
		 * Validates the `maxLength` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMaxLength: function (facetValue) {
			return this.getNodeValue().length <= facetValue;
		},
		/**
		 * Validates the `minLength` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMinLength: function (facetValue) {
			return this.getNodeValue().length >= facetValue;
		},
		/**
		 * Validates the `length` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateLength: function (facetValue) {
			return this.getNodeValue().length == facetValue;
		}
	});

	return objTools.makeConstructor(
		function StringNodeValidator () {}, 
		stringNodeValidator
	);

});