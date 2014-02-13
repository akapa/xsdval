({
    baseUrl: 'js',
    exclude: ['underscore', 'objTools', 'Library', 'Xml', 'text'],
    paths: {
        'underscore': 'lib/underscore',
        'text': 'lib/text',
        'Xml': 'lib/Xml',
        'Library': 'lib/Library',
        'objTools': 'lib/objTools',
        'xsdval': '.'
    },
    name: 'xsdvalidator',
    optimize: 'none',
    out: 'dist/xsdvalidator.js'
})