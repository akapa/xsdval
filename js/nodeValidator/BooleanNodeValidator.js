define(['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor BooleanNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `boolean`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var booleanNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends BooleanNodeValidator.prototype
	 */
	{
		type: 'boolean',
		/**
		 * Get the base facets used by this validator.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {
				'pattern': /^true|false|1|0$/
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
				'assertion'
			];
		}
	});

	return function BooleanNodeValidator () {
		var obj = objTools.construct(booleanNodeValidator, BooleanNodeValidator);
		return obj.init.apply(obj, arguments);
	};

});