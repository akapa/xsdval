({
    baseUrl: 'js',
    exclude: ['underscore', 'objTools', 'Library', 'xml', 'xsd', 'text'],
    paths: {
        'underscore': 'lib/underscore',
        'text': 'lib/text',
        'xsd': 'lib/xsd',
        'xml': 'lib/xml',
        'Library': 'lib/Library',
        'objTools': 'lib/objTools',
        'xsdval': '.'
    },
    name: 'xsdvalidator',
    optimize: 'none',
    out: 'dist/xsdvalidator.js'
})