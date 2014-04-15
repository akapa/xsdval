requirejs.config({
	paths: {
		'xsdval': '.',
		'underscore': 'lib/underscore',
        'xsd': 'lib/xsd',
        'xml': 'lib/xml',
        'primitiveUnserializers': 'lib/primitiveUnserializers',
        'Library': 'lib/Library',
        'XsdLibrary': 'lib/XsdLibrary',
        'objTools': 'lib/objTools',
        'wgxpath': 'lib/wgxpath'
    },
	shim: {
		'underscore': {
			exports: '_'
		}
	}
});

requirejs(['underscore', 'xml', 'XmlValidator'],
function (_, xml, XmlValidator) {

	var doValidate = function () {
		var xsd = xml.parseToDom(document.getElementById('xsd').value);
		var dom = xml.parseToDom(document.getElementById('show').value);
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
