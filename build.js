({
    baseUrl: 'js',
    exclude: ['underscore', 'objTools', 'Library', 'xml', 'xsd', 'text', 'wgxpath'],
    paths: {
        'underscore': 'lib/underscore',
        'text': 'lib/text',
        'xsd': 'lib/xsd',
        'xml': 'lib/xml',
        'Library': 'lib/Library',
        'objTools': 'lib/objTools',
        'wgxpath': 'lib/wgxpath',
        'xsdval': '.'
    },
    name: 'xsdvalidator',
    optimize: 'none',
    out: 'dist/xsdvalidator.js'
})