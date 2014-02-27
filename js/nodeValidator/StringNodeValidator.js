define(['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	 'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	var stringNodeValidator = objTools.make(SimpleTypeNodeValidator, {
		type: 'string',
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
		validateMaxLength: function (facetValue) {
			return this.getNodeValue().length <= facetValue;
		},
		validateMinLength: function (facetValue) {
			return this.getNodeValue().length >= facetValue;
		},
		validateLength: function (facetValue) {
			return this.getNodeValue().length == facetValue;
		}
	});

	return function StringNodeValidator () {
		var obj = objTools.construct(stringNodeValidator, StringNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});