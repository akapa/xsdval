define(['underscore', 'objTools', 'Library', 'xsd', 'wgxpath'],
function (underscore, objTools, Library, xsd) {

var text_xsdval_basetypesxsd = '<?xml version=\'1.0\'?>\n<!DOCTYPE xs:schema SYSTEM "../namespace/XMLSchema.dtd" [\n\n<!--\n     keep this schema XML1.0 DTD valid\n  -->\n        <!ENTITY % schemaAttrs \'xmlns:hfp CDATA #IMPLIED\'>\n\n        <!ELEMENT hfp:hasFacet EMPTY>\n        <!ATTLIST hfp:hasFacet\n                name NMTOKEN #REQUIRED>\n\n        <!ELEMENT hfp:hasProperty EMPTY>\n        <!ATTLIST hfp:hasProperty\n                name NMTOKEN #REQUIRED\n                value CDATA #REQUIRED>\n\n]>\n<xs:schema\n  xmlns:hfp="http://www.w3.org/2001/XMLSchema-hasFacetAndProperty"\n  xmlns:xs="http://www.w3.org/2001/XMLSchema"\n  elementFormDefault="qualified" \n  xml:lang="en" \n  targetNamespace="http://www.w3.org/2001/XMLSchema">\n <xs:annotation>\n    <xs:documentation>\n      This document contains XML representations for the \n     ordinary non-primitive built-in datatypes\n    </xs:documentation>\n  </xs:annotation>\n  <xs:simpleType name="normalizedString" id="normalizedString">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#normalizedString"/>\n    </xs:annotation>\n    <xs:restriction base="xs:string">\n      <xs:whiteSpace value="replace" id="normalizedString.whiteSpace"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="token" id="token">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#token"/>\n    </xs:annotation>\n    <xs:restriction base="xs:normalizedString">\n      <xs:whiteSpace value="collapse" id="token.whiteSpace"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="language" id="language">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#language"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*" id="language.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.ietf.org/rfc/bcp/bcp47.txt">\n            pattern specifies the content of section 2.12 of XML 1.0e2\n            and RFC 3066 (Revised version of RFC 1766).  N.B. RFC 3066 is now\n            obsolete; the grammar of RFC4646 is more restrictive.  So strict\n            conformance to the rules for language codes requires extra checking\n            beyond validation against this type.\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="IDREFS" id="IDREFS">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#IDREFS"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:IDREF"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="IDREFS.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="ENTITIES" id="ENTITIES">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ENTITIES"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:ENTITY"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="ENTITIES.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NMTOKEN" id="NMTOKEN">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NMTOKEN"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="\\c+" id="NMTOKEN.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml#NT-Nmtoken">\n            pattern matches production 7 from the XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NMTOKENS" id="NMTOKENS">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NMTOKENS"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:NMTOKEN"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="NMTOKENS.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="Name" id="Name">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#Name"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="\\i\\c*" id="Name.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml#NT-Name">\n            pattern matches production 5 from the XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NCName" id="NCName">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NCName"/>\n    </xs:annotation>\n    <xs:restriction base="xs:Name">\n      <xs:pattern value="[\\i-[:]][\\c-[:]]*" id="NCName.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml-names/#NT-NCName">\n            pattern matches production 4 from the Namespaces in XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="ID" id="ID">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ID"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="IDREF" id="IDREF">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#IDREF"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="ENTITY" id="ENTITY">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ENTITY"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="integer" id="integer">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#integer"/>\n    </xs:annotation>\n    <xs:restriction base="xs:decimal">\n      <xs:fractionDigits fixed="true" value="0" id="integer.fractionDigits"/>\n      <xs:pattern value="[\\-+]?[0-9]+" id="integer.pattern"/>\n      \n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="nonPositiveInteger" id="nonPositiveInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#nonPositiveInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:maxInclusive value="0" id="nonPositiveInteger.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="negativeInteger" id="negativeInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#negativeInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonPositiveInteger">\n      <xs:maxInclusive value="-1" id="negativeInteger.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="long" id="long">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasProperty name="bounded" value="true"/>\n        <hfp:hasProperty name="cardinality" value="finite"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#long"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:minInclusive value="-9223372036854775808" id="long.minInclusive"/>\n      <xs:maxInclusive value="9223372036854775807" id="long.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="int" id="int">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#int"/>\n    </xs:annotation>\n    <xs:restriction base="xs:long">\n      <xs:minInclusive value="-2147483648" id="int.minInclusive"/>\n      <xs:maxInclusive value="2147483647" id="int.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="short" id="short">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#short"/>\n    </xs:annotation>\n    <xs:restriction base="xs:int">\n      <xs:minInclusive value="-32768" id="short.minInclusive"/>\n      <xs:maxInclusive value="32767" id="short.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="byte" id="byte">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#byte"/>\n    </xs:annotation>\n    <xs:restriction base="xs:short">\n      <xs:minInclusive value="-128" id="byte.minInclusive"/>\n      <xs:maxInclusive value="127" id="byte.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="nonNegativeInteger" id="nonNegativeInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#nonNegativeInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:minInclusive value="0" id="nonNegativeInteger.minInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedLong" id="unsignedLong">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasProperty name="bounded" value="true"/>\n        <hfp:hasProperty name="cardinality" value="finite"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedLong"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonNegativeInteger">\n      <xs:maxInclusive value="18446744073709551615" id="unsignedLong.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedInt" id="unsignedInt">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedInt"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedLong">\n      <xs:maxInclusive value="4294967295" id="unsignedInt.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedShort" id="unsignedShort">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedShort"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedInt">\n      <xs:maxInclusive value="65535" id="unsignedShort.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedByte" id="unsignedByte">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedByte"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedShort">\n      <xs:maxInclusive value="255" id="unsignedByte.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="positiveInteger" id="positiveInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#positiveInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonNegativeInteger">\n      <xs:minInclusive value="1" id="positiveInteger.minInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n\n  <xs:simpleType name="yearMonthDuration">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#yearMonthDuration">\n        This type includes just those durations expressed in years and months.\n        Since the pattern given excludes days, hours, minutes, and seconds,\n        the values of this type have a seconds property of zero.  They are\n        totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:duration">\n      <xs:pattern id="yearMonthDuration.pattern" value="[^DT]*"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="dayTimeDuration">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#dayTimeDuration">\n        This type includes just those durations expressed in days, hours, minutes, and seconds.\n        The pattern given excludes years and months, so the values of this type \n        have a months property of zero.  They are totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:duration">\n      <xs:pattern id="dayTimeDuration.pattern" value="[^YM]*(T.*)?"/>\n     </xs:restriction>\n  </xs:simpleType>\n    <xs:simpleType name="dateTimeStamp" id="dateTimeStamp">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#dateTimeStamp">\n        This datatype includes just those dateTime values Whose explicitTimezone\n        is present.  They are totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:dateTime">\n      <xs:explicitTimezone fixed="true"\n        id="dateTimeStamp.explicitTimezone" value="required"/>\n     </xs:restriction>\n  </xs:simpleType>\n\n</xs:schema>';
var xsdval_XsdLibrary = function (_, objTools, Library, xsd, basetypesXsd) {
        var xsdLibrary = objTools.make(Library, {
                init: function (defs) {
                    defs = defs || [];
                    var initDefs = [xsd.parseToDom(basetypesXsd)].concat(defs);
                    return new Library().init.call(this, initDefs);
                },
                addItem: function (def, name) {
                    var ns = name || def.documentElement.getAttributeNS(null, 'targetNamespace');
                    var xsdCollection = this.exists(ns) ? this.getItem(ns) : [];
                    xsdCollection.push(def);
                    this.items[ns] = xsdCollection;
                },
                findElement: function (namespace, name) {
                    var xsds = this.getItem(namespace) || [];
                    var element;
                    for (var i = 0, l = xsds.length; i < l; i++) {
                        element = xsd.findElement(xsds[i], name);
                        if (element) {
                            return element;
                        }
                    }
                    return null;
                },
                findTypeDefinition: function (namespace, name) {
                    var xsds = this.getItem(namespace) || [];
                    var xsdNodes;
                    for (var i = 0, l = xsds.length; i < l; i++) {
                        xsdNodes = xsd.findTypeDefinition(xsds[i], name);
                        if (xsdNodes.length > 0) {
                            return xsdNodes[0];
                        }
                    }
                    return null;
                },
                findTypeDefinitionFromNodeAttr: function (node, typeAttr, typeAttrNS) {
                    var type = xsd.getTypeFromNodeAttr(node, typeAttr, typeAttrNS);
                    return type ? this.findTypeDefinition(type.namespaceURI, type.name) : null;
                },
                findBaseTypeFor: function (node) {
                    var xsdNow = node;
                    var basetype;
                    do {
                        basetype = xsd.getRestrictedType(xsdNow);
                        xsdNow = this.findTypeDefinition(basetype.namespaceURI, basetype.name);
                    } while (xsdNow !== null);
                    return basetype.name;
                }
            });
        return objTools.makeConstructor(function XsdLibrary() {
        }, xsdLibrary);
    }(underscore, objTools, Library, xsd, text_xsdval_basetypesxsd);
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
                        var typeDef = this.xsdLibrary.findTypeDefinitionFromNodeAttr(this.definition, 'type');
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
                init: function () {
                    this.xsdLibrary = new XsdLibrary();
                    this.nodeValidatorFactory = new NodeValidatorFactory(this.xsdLibrary);
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
    }(objTools, xsdval_XsdLibrary, xsdval_NodeValidatorFactory, wgxpath);

	return XmlValidator;

});