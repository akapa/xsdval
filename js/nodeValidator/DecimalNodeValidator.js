define(['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor DecimalNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `decimal`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var decimalNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends DecimalNodeValidator.prototype
	 */
	{
		type: 'decimal',
		/**
		 * Get the base facets used by this validator.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {
				'pattern': /^(\+|-)?([0-9]+(\.[0-9]*)?|\.[0-9]+)$/
			};
		},
		/**
		 * Get the facets that are allowed to be used by this validator.
		 * @returns {string[]}
		 * @protected
		 */
		getAllowedFacets: function () {
			return [
				'totalDigits',
				'fractionDigits',
				'pattern', 
				'enumeration',
				'maxInclusive',
				'maxExclusive',
				'minInclusive',
				'minExclusive',
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
		}
	});

	return function DecimalNodeValidator () {
		var obj = objTools.construct(decimalNodeValidator, DecimalNodeValidator);
		return obj.init.apply(obj, arguments);
	};

});