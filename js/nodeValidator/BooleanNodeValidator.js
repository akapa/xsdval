define(['underscore', 'objTools', 'Xml', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, Xml, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
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
				'assertions'
			];
		}
	});

	return function BooleanNodeValidator () {
		var obj = objTools.construct(booleanNodeValidator, BooleanNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});