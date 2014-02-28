define(['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	var hexBinaryNodeValidator = objTools.make(SimpleTypeNodeValidator, {
		type: 'hexBinary',
		getBaseFacets: function () {
			return {
				'pattern': /^([0-9a-fA-F]{2})*$/
			};
		},
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
		validateTotalDigits: function (facetValue) {
			return this.getNodeValue().replace(/\D/g, '').length <= facetValue;
		},
		validateFractionDigits: function (facetValue) {
			var v = this.getNodeValue();
			var fracDigits = (v.indexOf('.') === -1) ? 0 : v.split('.')[1].length;
			return fracDigits <= facetValue;
		},
		getNodeValueLength: function () {
			return this.getNodeValue().length / 2;
		},
		validateMaxLength: function (facetValue) {
			return this.getNodeValueLength() <= facetValue;
		},
		validateMinLength: function (facetValue) {
			return this.getNodeValueLength() >= facetValue;
		},
		validateLength: function (facetValue) {
			return this.getNodeValueLength() == facetValue;
		}
	});

	return function HexBinaryNodeValidator () {
		var obj = objTools.construct(hexBinaryNodeValidator, HexBinaryNodeValidator);
		return obj.init.apply(obj, arguments);
	};

});