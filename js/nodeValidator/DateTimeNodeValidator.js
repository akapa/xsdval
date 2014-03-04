define(['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor DateTimeNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `dateTime`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var dateTimeNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends DateTimeNodeValidator.prototype
	 */
	{
		type: 'dateTime',
		/**
		 * Get the base facets used by this validator.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {
				'pattern': /^-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?|(24:00:00(\.0+)?))(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/
			};
		},
		/**
		 * Get the facets that are allowed to be used by this validator.
		 * @returns {string[]}
		 * @protected
		 */
		getAllowedFacets: function () {
			return [
				'pattern', 
				'enumeration',
				'maxInclusive',
				'minInclusive',
				'maxExclusive',
				'minExclusive',
				'assertion'
			];
		}
	});

	return objTools.makeConstructor(
		function DateTimeNodeValidator () {}, 
		dateTimeNodeValidator
	);

});