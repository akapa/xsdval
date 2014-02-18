define(['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	var decimalNodeValidator = objTools.make(SimpleTypeNodeValidator, {
		type: 'decimal',
		getBaseFacets: function () {
			return {
				'pattern': /^(\+|-)?([0-9]+(\.[0-9]*)?|\.[0-9]+)$/
			};
		},
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
		validateTotalDigits: function (facetValue) {
			return this.getValue().replace(/\D/g, '').length <= facetValue;
		},
		validateFractionDigits: function (facetValue) {
			var v = this.getValue();
			var fracDigits = v.indexOf('.') === -1
				? 0
				: v.split('.')[1].length;
			return fracDigits <= facetValue;
		}
	});

	return function DecimalNodeValidator () {
		var obj = objTools.construct(decimalNodeValidator, DecimalNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});