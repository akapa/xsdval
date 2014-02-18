
define('text!xsdval/basetypes.xsd',[],function () { return '<?xml version=\'1.0\'?>\n<!DOCTYPE xs:schema SYSTEM "../namespace/XMLSchema.dtd" [\n\n<!--\n     keep this schema XML1.0 DTD valid\n  -->\n        <!ENTITY % schemaAttrs \'xmlns:hfp CDATA #IMPLIED\'>\n\n        <!ELEMENT hfp:hasFacet EMPTY>\n        <!ATTLIST hfp:hasFacet\n                name NMTOKEN #REQUIRED>\n\n        <!ELEMENT hfp:hasProperty EMPTY>\n        <!ATTLIST hfp:hasProperty\n                name NMTOKEN #REQUIRED\n                value CDATA #REQUIRED>\n\n]>\n<xs:schema\n  xmlns:hfp="http://www.w3.org/2001/XMLSchema-hasFacetAndProperty"\n  xmlns:xs="http://www.w3.org/2001/XMLSchema"\n  elementFormDefault="qualified" \n  xml:lang="en" \n  targetNamespace="http://www.w3.org/2001/XMLSchema">\n <xs:annotation>\n    <xs:documentation>\n      This document contains XML representations for the \n     ordinary non-primitive built-in datatypes\n    </xs:documentation>\n  </xs:annotation>\n  <xs:simpleType name="normalizedString" id="normalizedString">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#normalizedString"/>\n    </xs:annotation>\n    <xs:restriction base="xs:string">\n      <xs:whiteSpace value="replace" id="normalizedString.whiteSpace"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="token" id="token">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#token"/>\n    </xs:annotation>\n    <xs:restriction base="xs:normalizedString">\n      <xs:whiteSpace value="collapse" id="token.whiteSpace"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="language" id="language">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#language"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*" id="language.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.ietf.org/rfc/bcp/bcp47.txt">\n            pattern specifies the content of section 2.12 of XML 1.0e2\n            and RFC 3066 (Revised version of RFC 1766).  N.B. RFC 3066 is now\n            obsolete; the grammar of RFC4646 is more restrictive.  So strict\n            conformance to the rules for language codes requires extra checking\n            beyond validation against this type.\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="IDREFS" id="IDREFS">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#IDREFS"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:IDREF"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="IDREFS.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="ENTITIES" id="ENTITIES">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ENTITIES"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:ENTITY"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="ENTITIES.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NMTOKEN" id="NMTOKEN">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NMTOKEN"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="\\c+" id="NMTOKEN.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml#NT-Nmtoken">\n            pattern matches production 7 from the XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NMTOKENS" id="NMTOKENS">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NMTOKENS"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:NMTOKEN"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="NMTOKENS.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="Name" id="Name">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#Name"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="\\i\\c*" id="Name.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml#NT-Name">\n            pattern matches production 5 from the XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NCName" id="NCName">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NCName"/>\n    </xs:annotation>\n    <xs:restriction base="xs:Name">\n      <xs:pattern value="[\\i-[:]][\\c-[:]]*" id="NCName.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml-names/#NT-NCName">\n            pattern matches production 4 from the Namespaces in XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="ID" id="ID">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ID"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="IDREF" id="IDREF">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#IDREF"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="ENTITY" id="ENTITY">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ENTITY"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="integer" id="integer">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#integer"/>\n    </xs:annotation>\n    <xs:restriction base="xs:decimal">\n      <xs:fractionDigits fixed="true" value="0" id="integer.fractionDigits"/>\n      <xs:pattern value="[\\-+]?[0-9]+" id="integer.pattern"/>\n      \n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="nonPositiveInteger" id="nonPositiveInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#nonPositiveInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:maxInclusive value="0" id="nonPositiveInteger.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="negativeInteger" id="negativeInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#negativeInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonPositiveInteger">\n      <xs:maxInclusive value="-1" id="negativeInteger.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="long" id="long">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasProperty name="bounded" value="true"/>\n        <hfp:hasProperty name="cardinality" value="finite"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#long"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:minInclusive value="-9223372036854775808" id="long.minInclusive"/>\n      <xs:maxInclusive value="9223372036854775807" id="long.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="int" id="int">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#int"/>\n    </xs:annotation>\n    <xs:restriction base="xs:long">\n      <xs:minInclusive value="-2147483648" id="int.minInclusive"/>\n      <xs:maxInclusive value="2147483647" id="int.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="short" id="short">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#short"/>\n    </xs:annotation>\n    <xs:restriction base="xs:int">\n      <xs:minInclusive value="-32768" id="short.minInclusive"/>\n      <xs:maxInclusive value="32767" id="short.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="byte" id="byte">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#byte"/>\n    </xs:annotation>\n    <xs:restriction base="xs:short">\n      <xs:minInclusive value="-128" id="byte.minInclusive"/>\n      <xs:maxInclusive value="127" id="byte.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="nonNegativeInteger" id="nonNegativeInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#nonNegativeInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:minInclusive value="0" id="nonNegativeInteger.minInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedLong" id="unsignedLong">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasProperty name="bounded" value="true"/>\n        <hfp:hasProperty name="cardinality" value="finite"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedLong"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonNegativeInteger">\n      <xs:maxInclusive value="18446744073709551615" id="unsignedLong.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedInt" id="unsignedInt">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedInt"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedLong">\n      <xs:maxInclusive value="4294967295" id="unsignedInt.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedShort" id="unsignedShort">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedShort"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedInt">\n      <xs:maxInclusive value="65535" id="unsignedShort.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedByte" id="unsignedByte">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedByte"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedShort">\n      <xs:maxInclusive value="255" id="unsignedByte.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="positiveInteger" id="positiveInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#positiveInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonNegativeInteger">\n      <xs:minInclusive value="1" id="positiveInteger.minInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n\n  <xs:simpleType name="yearMonthDuration">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#yearMonthDuration">\n        This type includes just those durations expressed in years and months.\n        Since the pattern given excludes days, hours, minutes, and seconds,\n        the values of this type have a seconds property of zero.  They are\n        totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:duration">\n      <xs:pattern id="yearMonthDuration.pattern" value="[^DT]*"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="dayTimeDuration">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#dayTimeDuration">\n        This type includes just those durations expressed in days, hours, minutes, and seconds.\n        The pattern given excludes years and months, so the values of this type \n        have a months property of zero.  They are totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:duration">\n      <xs:pattern id="dayTimeDuration.pattern" value="[^YM]*(T.*)?"/>\n     </xs:restriction>\n  </xs:simpleType>\n    <xs:simpleType name="dateTimeStamp" id="dateTimeStamp">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#dateTimeStamp">\n        This datatype includes just those dateTime values Whose explicitTimezone\n        is present.  They are totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:dateTime">\n      <xs:explicitTimezone fixed="true"\n        id="dateTimeStamp.explicitTimezone" value="required"/>\n     </xs:restriction>\n  </xs:simpleType>\n\n</xs:schema>';});

define('xsdval/XsdLibrary',['underscore', 'objTools', 'Library', 'xsd', 'text!xsdval/basetypes.xsd'],
function (_, objTools, Library, xsd, basetypesXsd) {

	var xsdLibrary = objTools.make(Library, {
		init: function (defs) {
			defs = defs || [];
			var initDefs = [xsd.parseToDom(basetypesXsd)].concat(defs);
			return (new Library).init.call(this, initDefs);
		},
		addItem: function (def, name) {
			var ns = name || def.documentElement.getAttributeNS(null, 'targetNamespace');
			var xsdCollection = this.exists(ns)	? this.getItem(ns) : [];
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
			return this.findTypeDefinition(type.namespaceURI, type.name);
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

	return function XsdLibrary () {
		var obj = objTools.construct(xsdLibrary, XsdLibrary);
		return obj.init.apply(obj, arguments);
	};
});
define('xsdval/XmlValidationResult',['underscore', 'objTools'], function (_, objTools) {
	var xmlValidationResult = {
		init: function (errors) {
			errors = errors || [];
			this.errors = errors;
			this.success = errors.length === 0;
			return this;
		}
	};
	return function XmlValidationResult () {
		var obj = objTools.construct(xmlValidationResult, XmlValidationResult);
		return obj.init.apply(obj, arguments);
	}
});
define('xsdval/nodeValidator/NodeValidator',['underscore', 'objTools', 'xsdval/XmlValidationResult'],
function (_, objTools, XmlValidationResult) {
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

	return function NodeValidator () {
		var obj = objTools.construct(nodeValidator, NodeValidator);
		return obj.init.apply(obj, arguments);
	}
});
define('xsdval/XmlValidationError',['underscore', 'objTools'], function (_, objTools) {
	var xmlValidationError = {
		init: function (failingNode, failedXsdNode, type) {
			this.failingNode = failingNode || null;
			this.failedXsdNode = failedXsdNode || null;
			this.type = type;
			console.error('Validation error created:', this);
			return this;
		}
	};
	return function XmlValidationError () {
		var obj = objTools.construct(xmlValidationError, XmlValidationError);
		return obj.init.apply(obj, arguments);
	}
});
define('xsdval/nodeValidator/ComplexTypeNodeValidator',['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	 'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {
	var complexTypeNodeValidator = objTools.make(NodeValidator, {
		validate: function () {
			var errors = [];

			//check if the whole node is nil
			if (this.node.getAttributeNS(xsd.xs, 'nil') === 'true') {
 				if (this.definition.getAttribute('nillable') !== 'true') {
 					errors.push(new XmlValidationError(elem, this.definition, 'nillable'));
				}
			}
			else {
				var typeDef = this.xsdLibrary.findTypeDefinitionFromNodeAttr(this.definition, 'type');
				var xsdNow = this.getFirstElement(typeDef);
				do {
					errors = errors.concat(this.validateChild(xsdNow));
				} while (xsdNow = this.getNextElement(xsdNow));
			}

			return new XmlValidationResult(errors);
		},
		validateChild: function (xsdNow) {
			var errors = [];

			//collecting XML nodes that are to be validated by the current XSD node
			var xmlNow = _(this.node.children).filter(function (elem) {
				return elem.tagName === xsdNow.getAttribute('name');
			});

			//minOccurs, maxOccurs check
			var occurLimit = this.parseMinMaxOccurs(xsdNow);
			if (xmlNow.length > occurLimit.max) {
				errors.push(new XmlValidationError(this.node, xsdNow, 'maxOccurs'));
			}
			if (xmlNow.length < occurLimit.min) {
				errors.push(new XmlValidationError(this.node, xsdNow, 'minOccurs'));
			}

			//calling the right validators for all nodes
			if (xmlNow.length) {
				errors = errors.concat(this.callChildValidators(xmlNow, xsdNow));
			}
			return errors;
		},
		callChildValidators: function (xmlNodes, xsdNode) {
			var errors = [];
			//selecting the right validator for the job
			var validator = this.validatorFactory.getValidator(xsdNode, xmlNodes[0]);
			var nillable = xsdNode.getAttribute('nillable') === 'true';

			_(xmlNodes).each(function (elem) {
				//check for nil elements
				if (elem.getAttributeNS(xsd.xsi, 'nil') === 'true') {
 					if (!nillable) {
 						errors.push(new XmlValidationError(elem, xsdNode, 'nillable'));
 					}
				}
				else {
					//running the chosen validator on the element
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
			//if there are no more elements, let's get to possible extended defs
			if (next === null) {
				//find closest extension parent
				var extension = xsd.getClosestAncestor(childCurrent, xsd.xs, 'extension');
				if (extension) {
					var extendedType = this.xsdLibrary
						.findTypeDefinitionFromNodeAttr(extension, 'base');
					next = this.getFirstElement(extendedType);
				}
			}
			return next;
		},
		parseMinMaxOccurs: function (xsdNode) {
			var min = xsdNode.getAttribute('minOccurs');
			if (min === null || min === '') {
				min = 1;
			}
			else {
				min = parseInt(min, 10);
			}
			var max = xsdNode.getAttribute('maxOccurs');
			if (max === null || max === '') {
				max = 1;
			}
			else if (max === 'unbounded') {
				max = Infinity;
			}
			else {
				max = parseInt(max, 10);
			}
			return { min: min, max: max	};
		}
	});

	return function ComplexTypeNodeValidator () {
		var obj = objTools.construct(complexTypeNodeValidator, ComplexTypeNodeValidator);
		return obj.init.apply(obj, arguments);
	}
});
define('xsdval/nodeValidator/AnyTypeNodeValidator',['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {
	
	var anyTypehNodeValidator = objTools.make(NodeValidator, {
		type: 'anyType',
		validate: function () {
			var type = xsd.getTypeFromNodeAttr(this.node, 'type', xsd.xsi);
			var validator = this.validatorFactory.getValidator(typeDef, this.node, type);
			return validator.validate();
		}
	});

	return function AnyTypeNodeValidator () {
		var obj = objTools.construct(anyTypeNodeValidator, AnyTypeNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});
define('xsdval/nodeValidator/AnySimpleTypeNodeValidator',['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {
	
	var anySimpleTypeNodeValidator = objTools.make(NodeValidator, {
		type: 'anySimpleType',
		validate: function () {
			var type = xsd.getTypeFromNodeAttr(this.node, 'type', xsd.xsi);
			var xsdNode = this.xsdLibrary.findTypeDefinition(type.namespaceURI, type.name);
			if (xsdNode.namespaceURI === xsd.xs && xsdNode.localName === 'complexType') {
				return new XmlValidationResult([
					new XmlValidationError(this.node, this.definition, 'simpleType')
				]);
			}
			var validator = this.validatorFactory.getValidator(typeDef, this.node, type);
			return validator.validate();
		}
	});

	return function AnySimpleTypeNodeValidator () {
		var obj = objTools.construct(anySimpleTypeNodeValidator, AnySimpleTypeNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});
define('xsdval/primitiveUnserializers',['underscore'], function (_) {

	return {
		'boolean': function (s) {
			return ['true', '1'].indexOf(s) !== -1;
		},
		'float': function (s) {
			switch (s) {
				case 'INF':
					return Number.POSITIVE_INFINITY;
				break;
				case '-INF':
					return Number.NEGATIVE_INFINITY;
				break;
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

});
define('xsdval/nodeValidator/SimpleTypeNodeValidator',['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/primitiveUnserializers', 'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, primitiveUnserializers,
	XmlValidationResult, XmlValidationError) {
	
	var simpleTypeNodeValidator = objTools.make(NodeValidator, {
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
			var errors = [];
			errors = errors.concat(
				this.validateBaseType(), 
				this.validateBaseFacets(), 
				this.validateFacets()
			);
			return new XmlValidationResult(errors);
		},
		getValue: function () {
			return xsd.getNodeText(this.node);
		},
		getRealValue: function (type, value) {
			var v = value || this.getValue();
			return type in primitiveUnserializers 
				? primitiveUnserializers[type](v)
				: v;
		},
		validateBaseType: function () {
			return [];
		},
		validateBaseFacets: function () {
			var findings = _(this.getBaseFacets())
				.map(_(function (value, name) { 
					this.invokeFacetValidation(name, value);
				}).bind(this));
			return _(findings).compact();
		},
		validateFacets: function () {
			var errors = [];	
			var type = xsd.getTypeFromNodeAttr(this.definition, 'type');
			var current, findings, facets, enums;
			var validatedFacets = [];
			while (current = type 
				? this.xsdLibrary.findTypeDefinition(type.namespaceURI, type.name)
				: this.definition[0]) {
					facets = xsd.findRestrictingFacets(current);
					enums = [];
					findings = _(facets).map(_(function (elem) {
						if (elem.localName === 'enumeration') {
							enums.push(elem);
						}
						else return this.validateFacet(elem, validatedFacets);
					}).bind(this));
					if (enums.length) {
						findings.push(this.validateFacet(enums, validatedFacets));
					}
					errors = errors.concat(_(findings).compact());
					type = xsd.getRestrictedType(current);
			}
			return errors;
		},
		validateFacet: function (facetNode, validatedFacets) {
			var enumMode = _(facetNode).isArray();
			var facetName = enumMode ? facetNode[0].localName : facetNode.localName;
			var facetValue = enumMode 
				? _(facetNode).map(function (elem) {
						return elem.getAttribute('value');
					})
				: facetNode.getAttribute('value');
			
			if (this.getAllowedFacets().indexOf(facetName) === -1) {
				return;
			}
			
			var fixed = enumMode ? false : facetNode.getAttribute('fixed') === 'true';
			if (!fixed && validatedFacets.indexOf(facetName) !== -1) {
				return;
			}

			validatedFacets.push(facetName);
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
			var r = _(facetValue).isRegExp() 
				? facetValue 
				: new RegExp(['^', facetValue, '$'].join(''));
			return r.test(this.getValue());
		},
		validateMaxInclusive: function (facetValue) {
			return this.getRealValue(this.type) <= this.getRealValue(this.type, facetValue);
		},
		validateMinInclusive: function (facetValue) {
			return this.getRealValue(this.type) >= this.getRealValue(this.type, facetValue);
		},
		validateMaxExclusive: function (facetValue) {
			return this.getRealValue(this.type) < this.getRealValue(this.type, facetValue);
		},
		validateMinExclusive: function (facetValue) {
			return this.getRealValue(this.type) > this.getRealValue(this.type, facetValue);
		},
		validateEnumeration: function (values) {
			return values.indexOf(this.getValue()) !== -1;
		}
	});

	return function SimpleTypeNodeValidator () {
		var obj = objTools.construct(simpleTypeNodeValidator, SimpleTypeNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});
define('xsdval/nodeValidator/FloatNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	var floatNodeValidator = objTools.make(SimpleTypeNodeValidator, {
		type: 'float',
		getBaseFacets: function () {
			return {
				'pattern': /^(\+|-)?([0-9]+(\.[0-9]*)?|\.[0-9]+)([Ee](\+|-)?[0-9]+)?|(\+|-)?INF|NaN$/
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

	return function FloatNodeValidator () {
		var obj = objTools.construct(floatNodeValidator, FloatNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});
define('xsdval/nodeValidator/DecimalNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	var decimalNodeValidator = objTools.make(SimpleTypeNodeValidator, {
		type: 'decimal',
		getBaseFacets: function () {
			return {
				'pattern': /^(\+|-)?([0-9]+(\.[0-9]*)?|\.[0-9]+)$/
			};
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
				'assertions'
			];
		},
		validateTotalDigits: function (facetValue) {
			return this.getValue().replace(/\D/g, '').length <= facetValue;
		},
		validateFractionDigits: function (facetValue) {
			var v = this.getValue();
			var fracDigits = v.indexOf('.') === -1
				? 0
				: v.split('.')[1].length;
			return fracDigits <= facetValue;
		}
	});

	return function DecimalNodeValidator () {
		var obj = objTools.construct(decimalNodeValidator, DecimalNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});
define('xsdval/nodeValidator/BooleanNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	var booleanNodeValidator = objTools.make(SimpleTypeNodeValidator, {
		type: 'boolean',
		getBaseFacets: function () {
			return {
				'pattern': /^true|false|1|0$/
			};
		},
		getAllowedFacets: function () {
			return [
				'pattern', 
				'assertions'
			];
		}
	});

	return function BooleanNodeValidator () {
		var obj = objTools.construct(booleanNodeValidator, BooleanNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});
define('xsdval/nodeValidator/DateTimeNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
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
define('xsdval/nodeValidator/StringNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	 'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	var stringNodeValidator = objTools.make(SimpleTypeNodeValidator, {
		type: 'string',
		getAllowedFacets: function () {
			return [
				'length', 
				'minLength', 
				'maxLength', 
				'pattern', 
				'enumeration', 
				'assertions'
			];
		},
		validateMaxLength: function (facetValue) {
			return this.getValue().length <= facetValue;
		},
		validateMinLength: function (facetValue) {
			return this.getValue().length >= facetValue;
		},
		validateLength: function (facetValue) {
			return this.getValue().length == facetValue;
		}
	});

	return function StringNodeValidator () {
		var obj = objTools.construct(stringNodeValidator, StringNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});
define('xsdval/NodeValidatorFactory',['underscore', 'objTools', 'xsd', 
	'xsdval/nodeValidator/NodeValidator',
	'xsdval/nodeValidator/ComplexTypeNodeValidator', 
	'xsdval/nodeValidator/AnyTypeNodeValidator',
	'xsdval/nodeValidator/AnySimpleTypeNodeValidator',
	'xsdval/nodeValidator/FloatNodeValidator',
	'xsdval/nodeValidator/DecimalNodeValidator',
	'xsdval/nodeValidator/BooleanNodeValidator',
	'xsdval/nodeValidator/DateTimeNodeValidator', 
	'xsdval/nodeValidator/StringNodeValidator'],
function (_, objTools, xsd, NodeValidator, ComplexTypeNodeValidator, AnyTypeNodeValidator,
	AnySimpleTypeNodeValidator, FloatNodeValidator, DecimalNodeValidator, 
	BooleanNodeValidator, DateTimeNodeValidator, StringNodeValidator) {

	var nodeValidatorFactory = {
		init: function (xsdLibrary) {
			this.xsdLibrary = xsdLibrary;
			return this;
		},
		getValidator: function (xsdElement, node, type) {
			//looking up a typeDefinition (complexType, simpleType or null)
			type = type || xsd.getTypeFromNodeAttr(xsdElement, 'type');
			var xsdNode = type
				? this.xsdLibrary.findTypeDefinition(type.namespaceURI, type.name)
				: xsdElement.children[0];

			//if it is a base simple type, choose a pre-defined validator
			if (!xsdNode) {
				if (type && type.namespaceURI === xsd.xs && type.name in strMappings) {
					return new strMappings[type.name](node, xsdElement, this);
				}
			}
			//simple type
			else if (xsdNode.namespaceURI === xsd.xs && xsdNode.localName === 'simpleType') {
				var basetype = this.xsdLibrary.findBaseTypeFor(xsdNode);
				if (basetype in strMappings) {
					return new strMappings[basetype](node, xsdElement, this);
				}
			}
			//complex type
			else if (xsdNode.namespaceURI === xsd.xs && xsdNode.localName === 'complexType') {
				if (xsdNode.getAttribute('abstract') === true) {
					throw new TypeError('An abstract type should only be used for extension/restriction.');
				}
				return new ComplexTypeNodeValidator(node, xsdElement, this);
			}

			console.warn('No suitable validator found for "', xsdElement, '".');
			return new NodeValidator(node, xsdElement, this);
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
		'boolean': BooleanNodeValidator
	};

	return function NodeValidatorFactory () {
		var obj = objTools.construct(nodeValidatorFactory, NodeValidatorFactory);
		return obj.init.apply(obj, arguments);
	};

});
define('xsdval/XmlValidator',['objTools', 'xsdval/XsdLibrary', 'xsdval/NodeValidatorFactory'],
function (objTools, XsdLibrary, NodeValidatorFactory) {
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
			var definition = this.xsdLibrary.findElement(
				xmlNode.namespaceURI, 
				xmlNode.localName
			);
			var validator = this.nodeValidatorFactory.getValidator(definition, xmlNode);
			console.log('Validating document with', validator);
			return validator.validate();
		}
	};

	return function XmlValidator () {
		var obj = objTools.construct(xmlValidator, XmlValidator);
		return obj.init.apply(obj, arguments);
	};
});
define('xsdvalidator',['xsdval/XmlValidator'], 
function (XmlValidator) {
	return XmlValidator;
});