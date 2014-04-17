var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/Spec\.js$/.test(file)) {
			tests.push(file);
		}
	}
}

requirejs.config({
	baseUrl: '/base/js',
	paths: {
		'xsdval': '.',
		'underscore': 'lib/underscore',
		'text': 'lib/text',
		'xsd': 'lib/xsd',
		'xml': 'lib/xml',
		'Library': 'lib/Library',
		'XsdLibrary': 'lib/XsdLibrary',
		'objTools': 'lib/objTools',
		'primitiveUnserializers': 'lib/primitiveUnserializers',
		'wgxpath': 'lib/wgxpath'
	},
	shim: {
		'underscore': {
			exports: '_'
		}
	},
	deps: tests,
	callback: window.__karma__.start
});
