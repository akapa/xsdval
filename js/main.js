requirejs.config({
	paths: {
		'xsdval': '.',
		'underscore': 'lib/underscore',
        'text': 'lib/text',
        'Xml': 'lib/Xml',
        'Library': 'lib/Library',
        'objTools': 'lib/objTools'
    },
	shim: {
		'underscore': {
			exports: '_'
		}
	}
});

requirejs(['underscore', 'Xml', 'xsdval/XmlValidator'],
function (_, Xml, XmlValidator) {

	var doValidate = function () {
		var xsd = Xml.parseXml(document.getElementById('xsd').value);
		var dom = Xml.parseXml(document.getElementById('show').value);
		console.group('XML Validation on ', dom, ' with ', xsd);

		var validator = new XmlValidator();
		validator.loadXsd(xsd);
		console.log(validator);

		var validationResult = validator.validate(dom);
		console.log(validationResult);

		console.groupEnd();
	};
	doValidate();
	document.getElementById('validate').addEventListener('click', doValidate);

});
