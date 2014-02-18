define(['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	var booleanNodeValidator = objTools.make(SimpleTypeNodeValidator, {
		type: 'boolean',
		getBaseFacets: function () {
			return {
				'pattern': /^true|false|1|0$/
			};
		},
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
	}

});