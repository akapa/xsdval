define(['underscore', 'objTools', 'XsdLibrary', 'xsd', 'wgxpath'],
function (underscore, objTools, XsdLibrary, xsd) {

var xsdval_XmlValidationResult = function (_, objTools) {
        var xmlValidationResult = {
                init: function (errors) {
                    this.errors = errors ? [].concat(errors) : [];
                    this.checkSuccess();
                    return this;
                },
                add: function (errors) {
                    if (errors) {
                        this.errors = this.errors.concat(errors);
                        this.checkSuccess();
                    }
                },
                checkSuccess: function () {
                    this.success = this.errors.length === 0;
                }
            };
        return objTools.makeConstructor(function XmlValidationResult() {
        }, xmlValidationResult);
    }(underscore, objTools);
var xsdval_nodeValidator_NodeValidator = function (_, objTools, XmlValidationResult) {
        var nodeValidator = {
                init: function (node, definition, validatorFactory) {
                    this.node = node;
                    this.definition = definition;
                    this.validatorFactory = validatorFactory;
                    this.xsdLibrary = validatorFactory ? validatorFactory.xsdLibrary : null;
                    return this;
                },
                validate: function () {
                    return new XmlValidationResult();
                }
            };
        return objTools.makeConstructor(function NodeValidator() {
        }, nodeValidator);
    }(underscore, objTools, xsdval_XmlValidationResult);
var xsdval_XmlValidationError = function (_, objTools) {
        var xmlValidationError = {
                init: function (failingNode, failedXsdNode, type) {
                    this.failingNode = failingNode;
                    this.failedXsdNode = failedXsdNode;
                    this.type = type;
                    console.error('Validation error created:', this);
                    return this;
                }
            };
        return objTools.makeConstructor(function XmlValidationError() {
        }, xmlValidationError);
    }(underscore, objTools);
var xsdval_nodeValidator_ComplexTypeNodeValidator = function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {
        var complexTypeNodeValidator = objTools.make(NodeValidator, {
                validate: function () {
                    var res = new XmlValidationResult();
                    if (this.node.getAttributeNS(xsd.xs, 'nil') === 'true') {
                        if (this.definition.getAttribute('nillable') !== 'true') {
                            res.add(new XmlValidationError(elem, this.definition, 'nillable'));
                        }
                    } else {
                        var typeDef = this.definition.getAttribute('type') ? this.xsdLibrary.findTypeDefinitionFromNodeAttr(this.definition, 'type') : this.definition.children[0];
                        var xsdNow = this.getFirstElement(typeDef);
                        do {
                            res.add(this.validateChild(xsdNow));
                            xsdNow = this.getNextElement(xsdNow);
                        } while (xsdNow);
                        var assert = typeDef.getElementsByTagNameNS(xsd.xs, 'assert');
                        if (assert.length) {
                            res.add(this.validateAssert(assert));
                        }
                    }
                    return res;
                },
                validateChild: function (xsdNow) {
                    var errors = [];
                    var xmlNow = _(this.node.children).filter(function (elem) {
                            return elem.tagName === xsdNow.getAttribute('name');
                        });
                    var occurLimit = xsd.parseMinMaxOccurs(xsdNow);
                    if (xmlNow.length > occurLimit.max) {
                        errors.push(new XmlValidationError(this.node, xsdNow, 'maxOccurs'));
                    }
                    if (xmlNow.length < occurLimit.min) {
                        errors.push(new XmlValidationError(this.node, xsdNow, 'minOccurs'));
                    }
                    if (xmlNow.length) {
                        errors = errors.concat(this.callChildValidators(xmlNow, xsdNow));
                    }
                    return errors;
                },
                callChildValidators: function (xmlNodes, xsdNode) {
                    var errors = [];
                    var validator = this.validatorFactory.getValidator(xsdNode, xmlNodes[0]);
                    var nillable = xsdNode.getAttribute('nillable') === 'true';
                    _(xmlNodes).each(function (elem) {
                        if (elem.getAttributeNS(xsd.xsi, 'nil') === 'true') {
                            if (!nillable) {
                                errors.push(new XmlValidationError(elem, xsdNode, 'nillable'));
                            }
                        } else {
                            validator.node = elem;
                            var result = validator.validate();
                            if (!result.success) {
                                errors = errors.concat(result.errors);
                            }
                        }
                    });
                    return errors;
                },
                getFirstElement: function (xsdNode) {
                    var elems = xsdNode.getElementsByTagNameNS(xsdNode.namespaceURI, 'element');
                    return elems.length ? elems[0] : null;
                },
                getNextElement: function (childCurrent) {
                    var next = childCurrent.nextElementSibling;
                    if (next === null) {
                        var extension = xsd.getClosestAncestor(childCurrent, xsd.xs, 'extension');
                        if (extension) {
                            var extendedType = this.xsdLibrary.findTypeDefinitionFromNodeAttr(extension, 'base');
                            next = this.getFirstElement(extendedType);
                        }
                    }
                    return next;
                },
                validateAssert: function (assertNodes) {
                    var errors = [];
                    var el, xpath, res;
                    for (var i = 0, l = assertNodes.length; i < l; i++) {
                        el = assertNodes[i];
                        xpath = el.getAttribute('test');
                        res = document.evaluate(xpath, this.node, null, XPathResult.BOOLEAN_TYPE);
                        if (res.booleanValue === false) {
                            errors.push(new XmlValidationError(this.node, el, 'assert'));
                        }
                    }
                    return errors;
                }
            });
        return objTools.makeConstructor(function ComplexTypeNodeValidator() {
        }, complexTypeNodeValidator);
    }(underscore, objTools, xsd, xsdval_nodeValidator_NodeValidator, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_nodeValidator_AnyTypeNodeValidator = function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {
        var anyTypeNodeValidator = objTools.make(NodeValidator, {
                type: 'anyType',
                validate: function () {
                    var type = xsd.getTypeFromNodeAttr(this.node, 'type', xsd.xsi);
                    var validator = this.validatorFactory.getValidator(typeDef, this.node, type);
                    return validator.validate();
                }
            });
        return objTools.makeConstructor(function AnyTypeNodeValidator() {
        }, anyTypeNodeValidator);
    }(underscore, objTools, xsd, xsdval_nodeValidator_NodeValidator, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_nodeValidator_AnySimpleTypeNodeValidator = function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {
        var anySimpleTypeNodeValidator = objTools.make(NodeValidator, {
                type: 'anySimpleType',
                validate: function () {
                    var type = xsd.getTypeFromNodeAttr(this.node, 'type', xsd.xsi);
                    var xsdNode = this.xsdLibrary.findTypeDefinition(type.namespaceURI, type.name);
                    if (xsdNode.namespaceURI === xsd.xs && xsdNode.localName === 'complexType') {
                        return new XmlValidationResult([new XmlValidationError(this.node, this.definition, 'simpleType')]);
                    }
                    var validator = this.validatorFactory.getValidator(typeDef, this.node, type);
                    return validator.validate();
                }
            });
        return objTools.makeConstructor(function anySimpleTypeNodeValidator() {
        }, anySimpleTypeNodeValidator);
    }(underscore, objTools, xsd, xsdval_nodeValidator_NodeValidator, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_primitiveUnserializers = function (_) {
        return {
            'boolean': function (s) {
                return [
                    'true',
                    '1'
                ].indexOf(s) !== -1;
            },
            'float': function (s) {
                if (s === 'INF') {
                    return Number.POSITIVE_INFINITY;
                }
                if (s === '-INF') {
                    return Number.NEGATIVE_INFINITY;
                }
                return parseFloat(s);
            },
            'decimal': function (s) {
                return parseFloat(s);
            },
            'int': function (s) {
                return parseInt(s, 10);
            },
            'integer': function (s) {
                return this.int(s);
            },
            'dateTime': function (s) {
                return new Date(s);
            },
            'date': function (s) {
                return new Date(s);
            },
            'time': function (s) {
                var time = s.match(/(\d{2}):(\d{2}):(\d{2}).(\d{3})/);
                var d = new Date();
                d.setUTCHours(time[1]);
                d.setUTCMinutes(time[2]);
                d.setUTCSeconds(time[3]);
                d.setUTCMilliseconds(time[4]);
                return d;
            },
            'gYearMonth': function (s) {
                return new Date(s);
            },
            'gMonthDay': function (s) {
                return new Date('2004-' + s);
            },
            'gYear': function (s) {
                return this.int(s);
            },
            'gDay': function (s) {
                return this.int(s);
            },
            'gMonth': function (s) {
                return this.int(s);
            }
        };
    }(underscore);
var xsdval_nodeValidator_SimpleTypeNodeValidator = function (_, objTools, xsd, NodeValidator, primitiveUnserializers, XmlValidationResult, XmlValidationError) {
        var simpleTypeNodeValidator = objTools.make(NodeValidator, {
                type: '',
                getBaseFacets: function () {
                    return {};
                },
                getAllowedFacets: function () {
                    return [];
                },
                getFacets: function (extensions) {
                    return _(extensions).pick(this.getAllowedFacets());
                },
                validate: function () {
                    var res = new XmlValidationResult();
                    res.add([].concat(this.validateBaseType(), this.validateBaseFacets(), this.validateFacets()));
                    return res;
                },
                getNodeValue: function () {
                    return xsd.getNodeText(this.node);
                },
                getXpathValue: function () {
                    return this.getNodeValue();
                },
                getTypedNodeValue: function (type, value) {
                    var v = value || this.getNodeValue();
                    return type in primitiveUnserializers ? primitiveUnserializers[type](v) : v;
                },
                validateBaseType: function () {
                    return [];
                },
                validateBaseFacets: function () {
                    var findings = _(this.getBaseFacets()).map(_(function (value, name) {
                            this.invokeFacetValidation(name, value);
                        }).bind(this));
                    return _(findings).compact();
                },
                validateFacets: function () {
                    var errors = [];
                    var type = xsd.getTypeFromNodeAttr(this.definition, 'type');
                    var current = this.validatorFactory.getXsdDefinition(this.definition, type);
                    var findings, facets, enums;
                    var validatedFacets = [];
                    var facetMapper = _(function (elem) {
                            if (elem.localName === 'enumeration') {
                                enums.push(elem);
                            } else
                                return this.validateFacet(elem, validatedFacets);
                        }).bind(this);
                    while (current) {
                        facets = xsd.findRestrictingFacets(current);
                        enums = [];
                        findings = _(facets).map(facetMapper);
                        if (enums.length) {
                            findings.push(this.validateFacet(enums, validatedFacets));
                        }
                        errors = errors.concat(_(findings).compact());
                        type = xsd.getRestrictedType(current);
                        current = this.validatorFactory.getXsdDefinition(this.definition, type);
                    }
                    return errors;
                },
                validateFacet: function (facetNode, validatedFacets) {
                    var enumMode = _(facetNode).isArray();
                    var facetName = enumMode ? facetNode[0].localName : facetNode.localName;
                    var valueAttr = facetName === 'assertion' ? 'test' : 'value';
                    var facetValue = enumMode ? _(facetNode).map(function (elem) {
                            return elem.getAttribute(valueAttr);
                        }) : facetNode.getAttribute(valueAttr);
                    if (this.getAllowedFacets().indexOf(facetName) === -1) {
                        return;
                    }
                    var fixed = enumMode ? false : facetNode.getAttribute('fixed') === 'true';
                    if (!fixed && validatedFacets.indexOf(facetName) !== -1) {
                        return;
                    }
                    if (facetName !== 'assertion') {
                        validatedFacets.push(facetName);
                    }
                    return this.invokeFacetValidation(facetName, facetValue, facetNode);
                },
                invokeFacetValidation: function (facetName, facetValue, facetNode) {
                    var method = 'validate' + facetName[0].toUpperCase() + facetName.slice(1);
                    var text = facetNode ? facetName : 'baseType';
                    facetNode = facetNode || this.definition;
                    if (method in this) {
                        if (!this[method](facetValue)) {
                            return new XmlValidationError(this.node, facetNode, text);
                        }
                    }
                },
                validatePattern: function (facetValue) {
                    var r = _(facetValue).isRegExp() ? facetValue : new RegExp([
                            '^',
                            facetValue,
                            '$'
                        ].join(''));
                    return r.test(this.getNodeValue());
                },
                validateMaxInclusive: function (facetValue) {
                    return this.getTypedNodeValue(this.type) <= this.getTypedNodeValue(this.type, facetValue);
                },
                validateMinInclusive: function (facetValue) {
                    return this.getTypedNodeValue(this.type) >= this.getTypedNodeValue(this.type, facetValue);
                },
                validateMaxExclusive: function (facetValue) {
                    return this.getTypedNodeValue(this.type) < this.getTypedNodeValue(this.type, facetValue);
                },
                validateMinExclusive: function (facetValue) {
                    return this.getTypedNodeValue(this.type) > this.getTypedNodeValue(this.type, facetValue);
                },
                validateEnumeration: function (values) {
                    return values.indexOf(this.getNodeValue()) !== -1;
                },
                validateAssertion: function (xpath) {
                    xpath = xpath.replace(/\$value/, this.getXpathValue());
                    var res = document.evaluate(xpath, this.node, null, XPathResult.BOOLEAN_TYPE);
                    return res.booleanValue;
                }
            });
        return objTools.makeConstructor(function SimpleTypeNodeValidator() {
        }, simpleTypeNodeValidator);
    }(underscore, objTools, xsd, xsdval_nodeValidator_NodeValidator, xsdval_primitiveUnserializers, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_nodeValidator_FloatNodeValidator = function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
        var floatNodeValidator = objTools.make(SimpleTypeNodeValidator, {
                type: 'float',
                getBaseFacets: function () {
                    return { 'pattern': /^(\+|-)?([0-9]+(\.[0-9]*)?|\.[0-9]+)([Ee](\+|-)?[0-9]+)?|(\+|-)?INF|NaN$/ };
                },
                getAllowedFacets: function () {
                    return [
                        'pattern',
                        'enumeration',
                        'maxInclusive',
                        'minInclusive',
                        'maxExclusive',
                        'minExclusive',
                        'assertion'
                    ];
                }
            });
        return objTools.makeConstructor(function FloatNodeValidator() {
        }, floatNodeValidator);
    }(underscore, objTools, xsdval_nodeValidator_SimpleTypeNodeValidator, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_nodeValidator_DecimalNodeValidator = function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
        var decimalNodeValidator = objTools.make(SimpleTypeNodeValidator, {
                type: 'decimal',
                getBaseFacets: function () {
                    return { 'pattern': /^(\+|-)?([0-9]+(\.[0-9]*)?|\.[0-9]+)$/ };
                },
                getAllowedFacets: function () {
                    return [
                        'totalDigits',
                        'fractionDigits',
                        'pattern',
                        'enumeration',
                        'maxInclusive',
                        'maxExclusive',
                        'minInclusive',
                        'minExclusive',
                        'assertion'
                    ];
                },
                validateTotalDigits: function (facetValue) {
                    return this.getNodeValue().replace(/\D/g, '').length <= facetValue;
                },
                validateFractionDigits: function (facetValue) {
                    var v = this.getNodeValue();
                    var fracDigits = v.indexOf('.') === -1 ? 0 : v.split('.')[1].length;
                    return fracDigits <= facetValue;
                }
            });
        return objTools.makeConstructor(function DecimalNodeValidator() {
        }, decimalNodeValidator);
    }(underscore, objTools, xsdval_nodeValidator_SimpleTypeNodeValidator, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_nodeValidator_BooleanNodeValidator = function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
        var booleanNodeValidator = objTools.make(SimpleTypeNodeValidator, {
                type: 'boolean',
                getBaseFacets: function () {
                    return { 'pattern': /^true|false|1|0$/ };
                },
                getAllowedFacets: function () {
                    return [
                        'pattern',
                        'assertion'
                    ];
                }
            });
        return objTools.makeConstructor(function BooleanNodeValidator() {
        }, booleanNodeValidator);
    }(underscore, objTools, xsdval_nodeValidator_SimpleTypeNodeValidator, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_nodeValidator_DateTimeNodeValidator = function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
        var dateTimeNodeValidator = objTools.make(SimpleTypeNodeValidator, {
                type: 'dateTime',
                getBaseFacets: function () {
                    return { 'pattern': /^-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?|(24:00:00(\.0+)?))(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/ };
                },
                getAllowedFacets: function () {
                    return [
                        'pattern',
                        'enumeration',
                        'maxInclusive',
                        'minInclusive',
                        'maxExclusive',
                        'minExclusive',
                        'assertion'
                    ];
                }
            });
        return objTools.makeConstructor(function DateTimeNodeValidator() {
        }, dateTimeNodeValidator);
    }(underscore, objTools, xsdval_nodeValidator_SimpleTypeNodeValidator, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_nodeValidator_TimeNodeValidator = function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
        var timeNodeValidator = objTools.make(SimpleTypeNodeValidator, {
                type: 'time',
                getBaseFacets: function () {
                    return { 'pattern': /^(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?|(24:00:00(\.0+)?))(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/ };
                },
                getAllowedFacets: function () {
                    return [
                        'pattern',
                        'enumeration',
                        'maxInclusive',
                        'minInclusive',
                        'maxExclusive',
                        'minExclusive',
                        'assertion'
                    ];
                }
            });
        return objTools.makeConstructor(function TimeNodeValidator() {
        }, timeNodeValidator);
    }(underscore, objTools, xsdval_nodeValidator_SimpleTypeNodeValidator, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_nodeValidator_DateNodeValidator = function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
        var dateNodeValidator = objTools.make(SimpleTypeNodeValidator, {
                type: 'date',
                getBaseFacets: function () {
                    return { 'pattern': /^-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/ };
                },
                getAllowedFacets: function () {
                    return [
                        'pattern',
                        'enumeration',
                        'maxInclusive',
                        'minInclusive',
                        'maxExclusive',
                        'minExclusive',
                        'assertion'
                    ];
                }
            });
        return objTools.makeConstructor(function DateNodeValidator() {
        }, dateNodeValidator);
    }(underscore, objTools, xsdval_nodeValidator_SimpleTypeNodeValidator, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_nodeValidator_HexBinaryNodeValidator = function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
        var hexBinaryNodeValidator = objTools.make(SimpleTypeNodeValidator, {
                type: 'hexBinary',
                getBaseFacets: function () {
                    return { 'pattern': /^([0-9a-fA-F]{2})*$/ };
                },
                getAllowedFacets: function () {
                    return [
                        'length',
                        'minLength',
                        'maxLength',
                        'pattern',
                        'enumeration',
                        'assertion'
                    ];
                },
                validateTotalDigits: function (facetValue) {
                    return this.getNodeValue().replace(/\D/g, '').length <= facetValue;
                },
                validateFractionDigits: function (facetValue) {
                    var v = this.getNodeValue();
                    var fracDigits = v.indexOf('.') === -1 ? 0 : v.split('.')[1].length;
                    return fracDigits <= facetValue;
                },
                getNodeValueLength: function () {
                    return this.getNodeValue().length / 2;
                },
                validateMaxLength: function (facetValue) {
                    return this.getNodeValueLength() <= facetValue;
                },
                validateMinLength: function (facetValue) {
                    return this.getNodeValueLength() >= facetValue;
                },
                validateLength: function (facetValue) {
                    return this.getNodeValueLength() == facetValue;
                }
            });
        return objTools.makeConstructor(function HexBinaryNodeValidator() {
        }, hexBinaryNodeValidator);
    }(underscore, objTools, xsdval_nodeValidator_SimpleTypeNodeValidator, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_nodeValidator_StringNodeValidator = function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
        var stringNodeValidator = objTools.make(SimpleTypeNodeValidator, {
                type: 'string',
                getAllowedFacets: function () {
                    return [
                        'length',
                        'minLength',
                        'maxLength',
                        'pattern',
                        'enumeration',
                        'assertion'
                    ];
                },
                validateMaxLength: function (facetValue) {
                    return this.getNodeValue().length <= facetValue;
                },
                validateMinLength: function (facetValue) {
                    return this.getNodeValue().length >= facetValue;
                },
                validateLength: function (facetValue) {
                    return this.getNodeValue().length == facetValue;
                }
            });
        return objTools.makeConstructor(function StringNodeValidator() {
        }, stringNodeValidator);
    }(underscore, objTools, xsdval_nodeValidator_SimpleTypeNodeValidator, xsdval_XmlValidationResult, xsdval_XmlValidationError);
var xsdval_NodeValidatorFactory = function (_, objTools, xsd, NodeValidator, ComplexTypeNodeValidator, AnyTypeNodeValidator, AnySimpleTypeNodeValidator, FloatNodeValidator, DecimalNodeValidator, BooleanNodeValidator, DateTimeNodeValidator, TimeNodeValidator, DateNodeValidator, HexBinaryNodeValidator, StringNodeValidator) {
        var nodeValidatorFactory = {
                init: function (xsdLibrary) {
                    this.xsdLibrary = xsdLibrary;
                    this.strMappings = strMappings;
                    return this;
                },
                getValidator: function (xsdElement, node, type) {
                    type = type || xsd.getTypeFromNodeAttr(xsdElement, 'type');
                    var xsdNode = this.getXsdDefinition(xsdElement, type);
                    if (xsdNode === null) {
                        if (type && type.namespaceURI === xsd.xs && type.name in strMappings) {
                            return new strMappings[type.name](node, xsdElement, this);
                        }
                    } else if (xsdNode.namespaceURI === xsd.xs && xsdNode.localName === 'simpleType') {
                        var basetype = this.xsdLibrary.findBaseTypeFor(xsdNode);
                        if (basetype in strMappings) {
                            return new strMappings[basetype](node, xsdElement, this);
                        }
                    } else if (xsdNode.namespaceURI === xsd.xs && xsdNode.localName === 'complexType') {
                        if (xsdNode.getAttribute('abstract') === 'true') {
                            throw new TypeError('An abstract type should only be used for extension/restriction.');
                        }
                        return new ComplexTypeNodeValidator(node, xsdElement, this);
                    }
                    console.warn('No suitable validator found for "', xsdElement, '".');
                    return new NodeValidator(node, xsdElement, this);
                },
                getXsdDefinition: function (xsdElement, type) {
                    var node = type ? this.xsdLibrary.findTypeDefinition(type.namespaceURI, type.name) : xsdElement.children[0];
                    return node || null;
                }
            };
        var strMappings = {
                'anyType': AnyTypeNodeValidator,
                'anySimpleType': AnySimpleTypeNodeValidator,
                'string': StringNodeValidator,
                'float': FloatNodeValidator,
                'double': FloatNodeValidator,
                'decimal': DecimalNodeValidator,
                'dateTime': DateTimeNodeValidator,
                'time': TimeNodeValidator,
                'date': DateNodeValidator,
                'hexBinary': HexBinaryNodeValidator,
                'boolean': BooleanNodeValidator
            };
        return objTools.makeConstructor(function NodeValidatorFactory() {
        }, nodeValidatorFactory);
    }(underscore, objTools, xsd, xsdval_nodeValidator_NodeValidator, xsdval_nodeValidator_ComplexTypeNodeValidator, xsdval_nodeValidator_AnyTypeNodeValidator, xsdval_nodeValidator_AnySimpleTypeNodeValidator, xsdval_nodeValidator_FloatNodeValidator, xsdval_nodeValidator_DecimalNodeValidator, xsdval_nodeValidator_BooleanNodeValidator, xsdval_nodeValidator_DateTimeNodeValidator, xsdval_nodeValidator_TimeNodeValidator, xsdval_nodeValidator_DateNodeValidator, xsdval_nodeValidator_HexBinaryNodeValidator, xsdval_nodeValidator_StringNodeValidator);
var XmlValidator = function (objTools, XsdLibrary, NodeValidatorFactory, wgxpath) {
        var xmlValidator = {
                init: function (xsdLibrary, nodeValidatorFactory) {
                    this.xsdLibrary = xsdLibrary || new XsdLibrary();
                    this.nodeValidatorFactory = nodeValidatorFactory || new NodeValidatorFactory(this.xsdLibrary);
                    return this;
                },
                loadXsd: function (xsdDocument) {
                    this.xsdLibrary.addItem(xsdDocument);
                },
                validate: function (xmlNode) {
                    xmlNode = xmlNode instanceof Document ? xmlNode.documentElement : xmlNode;
                    var definition = this.xsdLibrary.findElement(xmlNode.namespaceURI, xmlNode.localName);
                    var validator = this.nodeValidatorFactory.getValidator(definition, xmlNode);
                    return validator.validate();
                }
            };
        return objTools.makeConstructor(function XmlValidator() {
        }, xmlValidator);
    }(objTools, XsdLibrary, xsdval_NodeValidatorFactory, wgxpath);

	return XmlValidator;

});