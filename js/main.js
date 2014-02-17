requirejs.config({
	paths: {
		'xsdval': '.',
		'underscore': 'lib/underscore',
        'text': 'lib/text',
        'xsd': 'lib/xsd',
        'xml': 'lib/xml',
        'Library': 'lib/Library',
        'objTools': 'lib/objTools',
        'xsdvalidator': 'XmlValidator'
    },
	shim: {
		'underscore': {
			exports: '_'
		}
	}
});

requirejs(['underscore', 'xsd', 'xsdvalidator'],
function (_, xsd, XmlValidator) {

	var doValidate = function () {
		var xsd = xml.parseXml(document.getElementById('xsd').value);
		var dom = xml.parseXml(document.getElementById('show').value);
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
