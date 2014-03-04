define(['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor HexBinaryNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `hexBinary`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var hexBinaryNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends HexBinaryNodeValidator.prototype
	 */
	{
		type: 'hexBinary',
		/**
		 * Get the base facets used by this validator.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {
				'pattern': /^([0-9a-fA-F]{2})*$/
			};
		},
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
		 * Validates the `totalDigits` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateTotalDigits: function (facetValue) {
			return this.getNodeValue().replace(/\D/g, '').length <= facetValue;
		},
		/**
		 * Validates the `fractionDigits` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateFractionDigits: function (facetValue) {
			var v = this.getNodeValue();
			var fracDigits = (v.indexOf('.') === -1) ? 0 : v.split('.')[1].length;
			return fracDigits <= facetValue;
		},
		/**
		 * Returns the length of the value of the XML node.
		 * @returns {number}
		 * @protected
		 */
		getNodeValueLength: function () {
			return this.getNodeValue().length / 2;
		},
		/**
		 * Validates the `maxLength` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMaxLength: function (facetValue) {
			return this.getNodeValueLength() <= facetValue;
		},
		/**
		 * Validates the `minLength` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMinLength: function (facetValue) {
			return this.getNodeValueLength() >= facetValue;
		},
		/**
		 * Validates the `length` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateLength: function (facetValue) {
			return this.getNodeValueLength() == facetValue;
		}
	});

	return objTools.makeConstructor(
		function HexBinaryNodeValidator () {}, 
		hexBinaryNodeValidator
	);

});