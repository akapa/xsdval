define(['underscore', 'objTools', 'Xml', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, Xml, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	var dateTimeNodeValidator = objTools.make(SimpleTypeNodeValidator, {
		type: 'dateTime',
		getBaseFacets: function () {
			return {
				'pattern': /^-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?|(24:00:00(\.0+)?))(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/
			};
		},
		getAllowedFacets: function () {
			return [
				'pattern', 
				'enumeration',
				'maxInclusive',
				'minInclusive',
				'maxExclusive',
				'minExclusive',
				'assertions'
			];
		}
	});

	return function DateTimeNodeValidator () {
		var obj = objTools.construct(dateTimeNodeValidator, DateTimeNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});