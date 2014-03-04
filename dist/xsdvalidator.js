
define('text!xsdval/basetypes.xsd',[],function () { return '<?xml version=\'1.0\'?>\n<!DOCTYPE xs:schema SYSTEM "../namespace/XMLSchema.dtd" [\n\n<!--\n     keep this schema XML1.0 DTD valid\n  -->\n        <!ENTITY % schemaAttrs \'xmlns:hfp CDATA #IMPLIED\'>\n\n        <!ELEMENT hfp:hasFacet EMPTY>\n        <!ATTLIST hfp:hasFacet\n                name NMTOKEN #REQUIRED>\n\n        <!ELEMENT hfp:hasProperty EMPTY>\n        <!ATTLIST hfp:hasProperty\n                name NMTOKEN #REQUIRED\n                value CDATA #REQUIRED>\n\n]>\n<xs:schema\n  xmlns:hfp="http://www.w3.org/2001/XMLSchema-hasFacetAndProperty"\n  xmlns:xs="http://www.w3.org/2001/XMLSchema"\n  elementFormDefault="qualified" \n  xml:lang="en" \n  targetNamespace="http://www.w3.org/2001/XMLSchema">\n <xs:annotation>\n    <xs:documentation>\n      This document contains XML representations for the \n     ordinary non-primitive built-in datatypes\n    </xs:documentation>\n  </xs:annotation>\n  <xs:simpleType name="normalizedString" id="normalizedString">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#normalizedString"/>\n    </xs:annotation>\n    <xs:restriction base="xs:string">\n      <xs:whiteSpace value="replace" id="normalizedString.whiteSpace"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="token" id="token">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#token"/>\n    </xs:annotation>\n    <xs:restriction base="xs:normalizedString">\n      <xs:whiteSpace value="collapse" id="token.whiteSpace"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="language" id="language">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#language"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*" id="language.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.ietf.org/rfc/bcp/bcp47.txt">\n            pattern specifies the content of section 2.12 of XML 1.0e2\n            and RFC 3066 (Revised version of RFC 1766).  N.B. RFC 3066 is now\n            obsolete; the grammar of RFC4646 is more restrictive.  So strict\n            conformance to the rules for language codes requires extra checking\n            beyond validation against this type.\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="IDREFS" id="IDREFS">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#IDREFS"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:IDREF"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="IDREFS.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="ENTITIES" id="ENTITIES">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ENTITIES"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:ENTITY"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="ENTITIES.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NMTOKEN" id="NMTOKEN">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NMTOKEN"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="\\c+" id="NMTOKEN.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml#NT-Nmtoken">\n            pattern matches production 7 from the XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NMTOKENS" id="NMTOKENS">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NMTOKENS"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:NMTOKEN"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="NMTOKENS.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="Name" id="Name">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#Name"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="\\i\\c*" id="Name.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml#NT-Name">\n            pattern matches production 5 from the XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NCName" id="NCName">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NCName"/>\n    </xs:annotation>\n    <xs:restriction base="xs:Name">\n      <xs:pattern value="[\\i-[:]][\\c-[:]]*" id="NCName.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml-names/#NT-NCName">\n            pattern matches production 4 from the Namespaces in XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="ID" id="ID">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ID"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="IDREF" id="IDREF">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#IDREF"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="ENTITY" id="ENTITY">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ENTITY"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="integer" id="integer">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#integer"/>\n    </xs:annotation>\n    <xs:restriction base="xs:decimal">\n      <xs:fractionDigits fixed="true" value="0" id="integer.fractionDigits"/>\n      <xs:pattern value="[\\-+]?[0-9]+" id="integer.pattern"/>\n      \n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="nonPositiveInteger" id="nonPositiveInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#nonPositiveInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:maxInclusive value="0" id="nonPositiveInteger.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="negativeInteger" id="negativeInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#negativeInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonPositiveInteger">\n      <xs:maxInclusive value="-1" id="negativeInteger.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="long" id="long">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasProperty name="bounded" value="true"/>\n        <hfp:hasProperty name="cardinality" value="finite"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#long"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:minInclusive value="-9223372036854775808" id="long.minInclusive"/>\n      <xs:maxInclusive value="9223372036854775807" id="long.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="int" id="int">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#int"/>\n    </xs:annotation>\n    <xs:restriction base="xs:long">\n      <xs:minInclusive value="-2147483648" id="int.minInclusive"/>\n      <xs:maxInclusive value="2147483647" id="int.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="short" id="short">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#short"/>\n    </xs:annotation>\n    <xs:restriction base="xs:int">\n      <xs:minInclusive value="-32768" id="short.minInclusive"/>\n      <xs:maxInclusive value="32767" id="short.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="byte" id="byte">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#byte"/>\n    </xs:annotation>\n    <xs:restriction base="xs:short">\n      <xs:minInclusive value="-128" id="byte.minInclusive"/>\n      <xs:maxInclusive value="127" id="byte.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="nonNegativeInteger" id="nonNegativeInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#nonNegativeInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:minInclusive value="0" id="nonNegativeInteger.minInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedLong" id="unsignedLong">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasProperty name="bounded" value="true"/>\n        <hfp:hasProperty name="cardinality" value="finite"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedLong"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonNegativeInteger">\n      <xs:maxInclusive value="18446744073709551615" id="unsignedLong.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedInt" id="unsignedInt">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedInt"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedLong">\n      <xs:maxInclusive value="4294967295" id="unsignedInt.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedShort" id="unsignedShort">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedShort"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedInt">\n      <xs:maxInclusive value="65535" id="unsignedShort.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedByte" id="unsignedByte">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedByte"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedShort">\n      <xs:maxInclusive value="255" id="unsignedByte.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="positiveInteger" id="positiveInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#positiveInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonNegativeInteger">\n      <xs:minInclusive value="1" id="positiveInteger.minInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n\n  <xs:simpleType name="yearMonthDuration">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#yearMonthDuration">\n        This type includes just those durations expressed in years and months.\n        Since the pattern given excludes days, hours, minutes, and seconds,\n        the values of this type have a seconds property of zero.  They are\n        totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:duration">\n      <xs:pattern id="yearMonthDuration.pattern" value="[^DT]*"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="dayTimeDuration">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#dayTimeDuration">\n        This type includes just those durations expressed in days, hours, minutes, and seconds.\n        The pattern given excludes years and months, so the values of this type \n        have a months property of zero.  They are totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:duration">\n      <xs:pattern id="dayTimeDuration.pattern" value="[^YM]*(T.*)?"/>\n     </xs:restriction>\n  </xs:simpleType>\n    <xs:simpleType name="dateTimeStamp" id="dateTimeStamp">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#dateTimeStamp">\n        This datatype includes just those dateTime values Whose explicitTimezone\n        is present.  They are totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:dateTime">\n      <xs:explicitTimezone fixed="true"\n        id="dateTimeStamp.explicitTimezone" value="required"/>\n     </xs:restriction>\n  </xs:simpleType>\n\n</xs:schema>';});

define('xsdval/XsdLibrary',['underscore', 'objTools', 'Library', 'xsd', 'text!xsdval/basetypes.xsd'],
function (_, objTools, Library, xsd, basetypesXsd) {

	/**
	 * A basic library/collection used to store and retrieve items.
	 * @external Library
	 */
	var xsdLibrary = objTools.make(Library, 
	/**
	 * @lends XsdLibrary.prototype
	 */
	{
		/**
		 * @constructor XsdLibrary
		 * @classdesc Stores XSD Documents and can do lookups in them.
		 * @param {Document[]} defs - An array of XSD (XML) Document objects to store initially.
		 * @extends external:Library
		 */
		init: function (defs) {
			defs = defs || [];
			var initDefs = [xsd.parseToDom(basetypesXsd)].concat(defs);
			return new Library().init.call(this, initDefs);
		},
		/**
		 * Adds an XSD Document to the library.
		 * @param {Document} def - An XSD (XML) Document object.
		 * @param {string} [name] - The namespace the XSD should be used to validate - read from the XSD's targetnamespace if not given.
		 */	
		addItem: function (def, name) {
			var ns = name || def.documentElement.getAttributeNS(null, 'targetNamespace');
			var xsdCollection = this.exists(ns)	? this.getItem(ns) : [];
			xsdCollection.push(def);
			this.items[ns] = xsdCollection;
		},
		/**
		 * Finds an XSD root &lt;element&gt; in the library.
		 * @param {string} namespace - The target namespace of the element (an XSD document will be chosen based on this).
		 * @param {string} name - The node name of the element to be found.
		 * @returns {Element|null}
		 */	
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
		/**
		 * Finds an XSD type definition (complexType or simpleType) in the library.
		 * @param {string} namespace - The namespace of the type definition (an XSD document will be chosen based on this).
		 * @param {string} name - The name of the type to be found.
		 * @returns {Element|null}
		 */
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
		/**
		 * Finds the type definition based on the type read from specified attribute of the given element.
		 * @param {Element} node - The element to read the attribute from.
		 * @param {string} typeAttr - The name of the attribute that holds the type.
		 * @param {string} [typeAttrNS] - The namespace of the attribute (if any) that holds the type.
		 * @returns {Element|null}
		 */
		findTypeDefinitionFromNodeAttr: function (node, typeAttr, typeAttrNS) {
			var type = xsd.getTypeFromNodeAttr(node, typeAttr, typeAttrNS);
			return type ? this.findTypeDefinition(type.namespaceURI, type.name) : null;
		},
		/**
		 * Finds the base type for a simpleType definition. Follows inheritance until it reaches a base XSD type.
		 * @param {Element} node - The type definition node to start from.
		 * @returns {string} The name of the base type (like: string, decimal, dateTime, etc.).
		 */
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

	return objTools.makeConstructor(function XsdLibrary () {}, xsdLibrary);
});
define('xsdval/XmlValidationResult',['underscore', 'objTools'], function (_, objTools) {

	/**
	 * @lends XmlValidationResult.prototype
	 */
	var xmlValidationResult = {
		/**
		 * @constructor XmlValidationResult
		 * @classdesc Stores validation errors and reports on success.
		 * @param {XmlValidationError[]} errors - Errors added initially, success is validated based on this.
		 */
		init: function (errors) {
			/**
			 * The errors returned by the validation.
			 * @member {XmlValidationError[]} errors
			 * @memberof XmlValidationResult#
			 */
			this.errors = errors ? [].concat(errors) : [];
			this.checkSuccess();
			return this;
		},
		/**
		 * Adds errors to the collection, success is revalidated.
		 * @param {XmlValidationError[]} errors - Errors added.
		 */
		add: function (errors) {
			if (errors) {
				this.errors = this.errors.concat(errors);
				this.checkSuccess();
			}
		},
		/**
		 * Checks the count of errors and sets success to true if it is zero. No need to call it when methods are used to manipulate the error collection.
		 * @protected
		 */
		checkSuccess: function () {
			/**
			 * Can be read to check whether validation was a success (no errors) or not.
			 * @member {boolean} success
			 * @memberof XmlValidationResult#
			 */
			this.success = this.errors.length === 0;
		}
	};

	return objTools.makeConstructor(
		function XmlValidationResult () {}, 
		xmlValidationResult
	);

});
define('xsdval/nodeValidator/NodeValidator',['underscore', 'objTools', 'xsdval/XmlValidationResult'],
function (_, objTools, XmlValidationResult) {

	/**
	 * @lends NodeValidator.prototype
	 */
	var nodeValidator = {
		/**
		 * @constructor NodeValidator
		 * @classdesc A dummy NodeValidator, always validates. Serves as a base for all other node validators.
		 * @param {Element} node - The XML node validated by this validator.
		 * @param {Element} definition - The XSD node to be used for validation by this validator.
		 * @param {NodeValidatorFactory} [validatorFactory] - The validator factory that can be used to spawn further validators if needed.
		 */
		init: function (node, definition, validatorFactory) {
			this.node = node;
			this.definition = definition;
			this.validatorFactory = validatorFactory;
			this.xsdLibrary = validatorFactory ? validatorFactory.xsdLibrary : null;
			return this;
		},
		/**
		 * Validates the XML node against the XSD node.
		 * @returns {XmlValidationResult}
		 */
		validate: function () {
			return new XmlValidationResult();
		}
	};

	return objTools.makeConstructor(function NodeValidator () {}, nodeValidator);

});
define('xsdval/XmlValidationError',['underscore', 'objTools'], function (_, objTools) {

	/**
	 * @lends XmlValidationError.prototype
	 */
	var xmlValidationError = {
		/**
		 * @constructor XmlValidationError
		 * @classdesc Provides information on a validation error.
		 * @param {Element} failingNode - The XML node that failed validation.
		 * @param {Element} failedXsdNode - The XSD node containing the validation rule that was not passed.
		 * @param {string} type - A short non-standard hint on what type of validation rule was failed.
		 */
		init: function (failingNode, failedXsdNode, type) {
			/**
			 * The XML node that failed validation.
			 * @member {Element} failingNode
			 * @memberof XmlValidationError#
			 */
			this.failingNode = failingNode;
			/**
			 * The XSD node containing the validation rule that was not passed.
			 * @member {Element} failedXsdNode
			 * @memberof XmlValidationError#
			 */
			this.failedXsdNode = failedXsdNode;
			/**
			 * A short non-standard hint on what type of validation rule was failed.
			 * @member {string} type
			 * @memberof XmlValidationError#
			 */
			this.type = type;
			console.error('Validation error created:', this);
			return this;
		}
	};

	return objTools.makeConstructor(
		function XmlValidationError () {}, 
		xmlValidationError
	);

});
define('xsdval/nodeValidator/ComplexTypeNodeValidator',['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {

	/**
	 * @constructor ComplexTypeNodeValidator
	 * @classdesc A validator for complex types. Will spawn further validators for all the child elements.
	 * @extends NodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var complexTypeNodeValidator = objTools.make(NodeValidator, 
	/**
	 * @lends ComplexTypeNodeValidator.prototype
	 */
	{
		/**
		 * Validates the XML node against the XSD node.
		 * Handles xsi:nil (and nillable), calls [validateChild()]{@link ComplexTypeNodeValidator#validateChild} for every child and handles assertions.
		 * @returns {XmlValidationResult}
		 */
		validate: function () {
			var res = new XmlValidationResult();

			//check if the whole node is nil
			if (this.node.getAttributeNS(xsd.xs, 'nil') === 'true') {
				if (this.definition.getAttribute('nillable') !== 'true') {
					res.add(new XmlValidationError(elem, this.definition, 'nillable'));
				}
			}
			else {
				var typeDef = this.xsdLibrary.findTypeDefinitionFromNodeAttr(this.definition, 'type');
				var xsdNow = this.getFirstElement(typeDef);
				do {
					res.add(this.validateChild(xsdNow));
					xsdNow = this.getNextElement(xsdNow);
				} while (xsdNow);

				//check assertions
				var assert = typeDef.getElementsByTagNameNS(xsd.xs, 'assert');
				if (assert.length) {
					res.add(this.validateAssert(assert));
				}
			}
			return res;
		},
		/**
		 * Used to validate a child node of the complex type element.
		 * Validates minOccurs/maxOccurs and calls child validators.
		 * @param {Element} xsdNow - The XSD node for the child element. Will look for the element(s) in the XML based on the XSD element name.
		 * @returns {Array.<XmlValidationError>}
		 * @protected
		 */
		validateChild: function (xsdNow) {
			var errors = [];

			//collecting XML nodes that are to be validated by the current XSD node
			var xmlNow = _(this.node.children).filter(function (elem) {
				return elem.tagName === xsdNow.getAttribute('name');
			});

			//minOccurs, maxOccurs check
			var occurLimit = xsd.parseMinMaxOccurs(xsdNow);
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
		/**
		 * Used to validate the given node(s) based on the passed XSD node.
		 * Uses the validator factory to spawn a fitting validator, calls it on all nodes and returns the results.
		 * @param {Array.<Element>} xmlNodes - XML nodes of the same type that are to be validated based on the same XSD node.
		 * @param {Element} xsdNode - The XSD node that contains validation information for the XML nodes.
		 * @returns {Array.<XmlValidationError>}
		 * @protected
		 */
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
		/**
		 * Used for iteration on the XSD child elements. Will return the first element to be evaluated.
		 * @returns {Element|null}
		 * @protected
		 */
		getFirstElement: function (xsdNode) {
			var elems = xsdNode.getElementsByTagNameNS(xsdNode.namespaceURI, 'element');
			return elems.length ? elems[0] : null;
		},
		/**
		 * Used for iteration on the XSD child elements. Will return the next element to be evaluated after the given element.
		 * Handles "extension" based inheritance. Advances to the next level of inheritance when there are no elements left on the current level.
		 * @returns {Element|null}
		 * @protected
		 */
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
		/**
		 * Used to run XPath-based assertions on the complex type element.
		 * @param {Array.<Element>} assertNodes - &lt;assert&gt; nodes to use for validation.
		 * @returns {Array.<XmlValidationError>}
		 * @protected
		 */
		validateAssert: function (assertNodes) {
			var errors = [];
			var el, xpath, res;
			for (var i = 0, l = assertNodes.length; i < l; i++) {
				el = assertNodes[i];
				xpath = el.getAttribute('test');
				res =  document.evaluate(xpath, this.node, null, XPathResult.BOOLEAN_TYPE);
				if (res.booleanValue === false) {
					errors.push(new XmlValidationError(this.node, el, 'assert'));
				}
			}
			return errors;
		}
	});

	return objTools.makeConstructor(
		function ComplexTypeNodeValidator () {}, 
		complexTypeNodeValidator
	);
	
});
define('xsdval/nodeValidator/AnyTypeNodeValidator',['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor AnyTypeNodeValidator
	 * @classdesc A validator for an element marked `anyType`.
	 * @extends NodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */	
	var anyTypeNodeValidator = objTools.make(NodeValidator, 
	/**
	 * @lends AnyTypeNodeValidator.prototype
	 */	
	{
		type: 'anyType',
		/**
		 * Checks the `type` attribute for the real type of the element, spawns and runs the fitting validator.
		 * @returns {XmlValidationResult}
		 */
		validate: function () {
			var type = xsd.getTypeFromNodeAttr(this.node, 'type', xsd.xsi);
			var validator = this.validatorFactory.getValidator(typeDef, this.node, type);
			return validator.validate();
		}
	});

	return objTools.makeConstructor(
		function AnyTypeNodeValidator () {}, 
		anyTypeNodeValidator
	);

});
define('xsdval/nodeValidator/AnySimpleTypeNodeValidator',['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor AnySimpleTypeNodeValidator
	 * @classdesc A validator for an element marked `anySimpleType`.
	 * @extends NodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */	
	var anySimpleTypeNodeValidator = objTools.make(NodeValidator, 
	/**
	 * @lends AnySimpleTypeNodeValidator.prototype
	 */
		{
		type: 'anySimpleType',
		/**
		 * Checks the `type` attribute for the real type of the element, spawns and runs the fitting validator.
		 * Fails validation if a complex type is given in the `type` attribute.
		 * @returns {XmlValidationResult}
		 */
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

	return objTools.makeConstructor(
		function anySimpleTypeNodeValidator () {}, 
		anySimpleTypeNodeValidator
	);

});
define('xsdval/primitiveUnserializers',['underscore'], function (_) {

	return {
		'boolean': function (s) {
			return ['true', '1'].indexOf(s) !== -1;
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

});
define('xsdval/nodeValidator/SimpleTypeNodeValidator',['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/primitiveUnserializers', 'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, primitiveUnserializers,
	XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor SimpleTypeNodeValidator
	 * @classdesc Serves as a base for node validators that validate simple types.
	 * @extends NodeValidator
	 * @abstract
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var simpleTypeNodeValidator = objTools.make(NodeValidator, 
	/**
	 * @lends SimpleTypeNodeValidator.prototype
	 */
	{
		/**
		 * Must be overridden to specify the type this validator can be used to validate.
		 * For example 'string', 'anyType', 'dateTime', etc.
		 * @member {string} type
		 * @memberof SimpleTypeNodeValidator#
		 * @protected
		 */		
		type: '',
		/**
		 * Get the base facets used by this validator. Derived node validators should override this method and add their own base facets.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {};
		},
		/**
		 * Get the facets that are allowed to be used by this validator. Derived node validators should override this method and add their own allowed facets.
		 * @returns {string[]}
		 * @protected
		 */
		getAllowedFacets: function () {
			return [];
		},
		/**
		 * Receives a map of facets and returns only those that are allowed to be used by this validator.
		 * @param {Object.<string, *>} extensions - The facets you want to filter.
		 * @returns {Object.<string, *>} The filtered facets that are allowed to be used.
		 * @protected
		 */
		getFacets: function (extensions) {
			return _(extensions).pick(this.getAllowedFacets());
		},
		/**
		 * Validates the XML node against the XSD node. Validates by base type, base facets and facets given in the XSD node.
		 * @returns {XmlValidationResult}
		 */
		validate: function () {
			var res = new XmlValidationResult();
			res.add([].concat(
				this.validateBaseType(), 
				this.validateBaseFacets(), 
				this.validateFacets()
			));
			return res;
		},
		/**
		 * Gets the plain XML string value of the node.
		 * Used for validations where the XML string representation needs to be checked.
		 * @returns {string}
		 * @protected
		 */
		getNodeValue: function () {
			return xsd.getNodeText(this.node);
		},
		/**
		 * Gets the value of the node in a way that can be used correctly by XPath. 
		 * Used for XPath based facet validation.
		 * Can be safely overridden in case XPath will have problems with the plain XML representation of certain datatypes.
		 * @returns {string}
		 * @protected
		 */
		getXpathValue: function () {
			return this.getNodeValue();
		},
		/**
		 * Computes the real typed value of the XML string representation. 
		 * Used to validate facets that are based on the real value, not the string representation.
		 * @param {string} type - The XSD base type to be used.
		 * @param {string} [value] - If given, this will be used instead of the value read from the XML node.
		 * @returns {*}
		 * @protected
		 */
		getTypedNodeValue: function (type, value) {
			var v = value || this.getNodeValue();
			return (type in primitiveUnserializers)	?
				primitiveUnserializers[type](v) : 
				v;
		},
		/**
		 * Can be ovverridden to run special validations for a certain data type.
		 * @returns {Array.<XmlValidationError>}
		 * @protected
		 */
		validateBaseType: function () {
			return [];
		},
		/**
		 * Runs the validation for the base facets defined in the node validator.
		 * Override [getBaseFacets()]{@link SimpleTypeNodeValidator#getBaseFacets} to provide base facets.
		 * @returns {Array.<XmlValidationError>}
		 * @protected
		 */
		validateBaseFacets: function () {
			var findings = _(this.getBaseFacets())
				.map(_(function (value, name) { 
					this.invokeFacetValidation(name, value);
				}).bind(this));
			return _(findings).compact();
		},
		/**
		 * Runs the validation for facets defined in the XSD definition.
		 * Takes inherited facets into account, travelling up the tree.
		 * @returns {Array.<XmlValidationError>}
		 * @protected
		 */
		validateFacets: function () {
			var errors = [];	
			var type = xsd.getTypeFromNodeAttr(this.definition, 'type');
			var current = this.validatorFactory.getXsdDefinition(this.definition, type);
			var findings, facets, enums;
			var validatedFacets = [];
			var facetMapper = _(function (elem) {
				if (elem.localName === 'enumeration') {
					enums.push(elem);
				}
				else return this.validateFacet(elem, validatedFacets);
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
		/**
		 * Used to run validation defined by a certain facet node.
		 * @param {Element|Array.<Element>} facetNode - The facet node to base validation on. In the case of an enumeration,  all the enumeration facet nodes should be passed as an array.
		 * @param {string[]} validatedFacets - Facet types not to be validated. There are two exceptions: assertion facets and facet nodes having a "fixed" attribute, these will be processed anyways. This parameter is used to prevent processing facets that were overridden by a derived type definition.
		 * @returns {XmlValidationError|undefined}
		 * @protected
		 */
		validateFacet: function (facetNode, validatedFacets) {
			var enumMode = _(facetNode).isArray();
			var facetName = enumMode ? facetNode[0].localName : facetNode.localName;
			var valueAttr = facetName === 'assertion' ? 'test' : 'value';
			var facetValue = enumMode ? 
				_(facetNode).map(function (elem) {
					return elem.getAttribute(valueAttr);
				}) :
				facetNode.getAttribute(valueAttr);
			
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
		/**
		 * Invokes the right facet validation method for the given facet type.
		 * @param {string} facetName - The name of the facet.
		 * @param {string|string[]} facetValue - The value of the facet (array is used for enumeration).
		 * @param {Element} [facetNode] - The facet node (used for error reporting purposes only).
		 * @returns {XmlValidationError|undefined}
		 * @protected
		 */
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
		/**
		 * Used to validate by pattern (regex). Override if needed.
		 * @param {string|RegExp} facetValue - The pattern.
		 * @returns {boolean}
		 * @protected
		 */
		validatePattern: function (facetValue) {
			var r = _(facetValue).isRegExp() ? 
				facetValue :
				new RegExp(['^', facetValue, '$'].join(''));
			return r.test(this.getNodeValue());
		},
		/**
		 * Used to validate maxInclusive. Override if needed.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMaxInclusive: function (facetValue) {
			return this.getTypedNodeValue(this.type) <= this.getTypedNodeValue(this.type, facetValue);
		},
		/**
		 * Used to validate minInclusive. Override if needed.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMinInclusive: function (facetValue) {
			return this.getTypedNodeValue(this.type) >= this.getTypedNodeValue(this.type, facetValue);
		},
		/**
		 * Used to validate maxExclusive. Override if needed.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMaxExclusive: function (facetValue) {
			return this.getTypedNodeValue(this.type) < this.getTypedNodeValue(this.type, facetValue);
		},
		/**
		 * Used to validate minExclusive. Override if needed.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMinExclusive: function (facetValue) {
			return this.getTypedNodeValue(this.type) > this.getTypedNodeValue(this.type, facetValue);
		},
		/**
		 * Used to validate enumeration. Override if needed.
		 * @param {string[]} values
		 * @returns {boolean}
		 * @protected
		 */
		validateEnumeration: function (values) {
			return values.indexOf(this.getNodeValue()) !== -1;
		},
		/**
		 * Used to validate assertion. Override if needed.
		 * @param {string} xpath - An XPath expression. $value will be substituted with the result of [getXpathValue()]{@link SimpleTypeNodeValidator#getXpathValue}.
		 * @returns {boolean}
		 * @protected
		 */
		validateAssertion: function (xpath) {
			xpath = xpath.replace(/\$value/, this.getXpathValue());
			var res =  document.evaluate(xpath, this.node, null, XPathResult.BOOLEAN_TYPE);
			return res.booleanValue;
		}
	});

	return objTools.makeConstructor(
		function SimpleTypeNodeValidator () {}, 
		simpleTypeNodeValidator
	);


});
define('xsdval/nodeValidator/FloatNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor FloatNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `float`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var floatNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends FloatNodeValidator.prototype
	 */
	{
		type: 'float',
		/**
		 * Get the base facets used by this validator.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {
				'pattern': /^(\+|-)?([0-9]+(\.[0-9]*)?|\.[0-9]+)([Ee](\+|-)?[0-9]+)?|(\+|-)?INF|NaN$/
			};
		},
		/**
		 * Get the facets that are allowed to be used by this validator.
		 * @returns {string[]}
		 * @protected
		 */
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

	return objTools.makeConstructor(
		function FloatNodeValidator () {}, 
		floatNodeValidator
	);

});
define('xsdval/nodeValidator/DecimalNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor DecimalNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `decimal`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var decimalNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends DecimalNodeValidator.prototype
	 */
	{
		type: 'decimal',
		/**
		 * Get the base facets used by this validator.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {
				'pattern': /^(\+|-)?([0-9]+(\.[0-9]*)?|\.[0-9]+)$/
			};
		},
		/**
		 * Get the facets that are allowed to be used by this validator.
		 * @returns {string[]}
		 * @protected
		 */
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
		/**
		 * Validates the `totalDigits` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateTotalDigits: function (facetValue) {
			return this.getNodeValue().replace(/\D/g, '').length <= facetValue;
		},
		/**
		 * Validates the `fractionDigits` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateFractionDigits: function (facetValue) {
			var v = this.getNodeValue();
			var fracDigits = (v.indexOf('.') === -1) ? 0 : v.split('.')[1].length;
			return fracDigits <= facetValue;
		}
	});

	return objTools.makeConstructor(
		function DecimalNodeValidator () {}, 
		decimalNodeValidator
	);

});
define('xsdval/nodeValidator/BooleanNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor BooleanNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `boolean`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var booleanNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends BooleanNodeValidator.prototype
	 */
	{
		type: 'boolean',
		/**
		 * Get the base facets used by this validator.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {
				'pattern': /^true|false|1|0$/
			};
		},
		/**
		 * Get the facets that are allowed to be used by this validator.
		 * @returns {string[]}
		 * @protected
		 */
		getAllowedFacets: function () {
			return [
				'pattern', 
				'assertion'
			];
		}
	});

	return objTools.makeConstructor(
		function BooleanNodeValidator () {}, 
		booleanNodeValidator
	);

});
define('xsdval/nodeValidator/DateTimeNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor DateTimeNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `dateTime`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var dateTimeNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends DateTimeNodeValidator.prototype
	 */
	{
		type: 'dateTime',
		/**
		 * Get the base facets used by this validator.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {
				'pattern': /^-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?|(24:00:00(\.0+)?))(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/
			};
		},
		/**
		 * Get the facets that are allowed to be used by this validator.
		 * @returns {string[]}
		 * @protected
		 */
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

	return objTools.makeConstructor(
		function DateTimeNodeValidator () {}, 
		dateTimeNodeValidator
	);

});
define('xsdval/nodeValidator/TimeNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor TimeNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `time`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var timeNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends TimeNodeValidator.prototype
	 */
	{
		type: 'time',
		/**
		 * Get the base facets used by this validator.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {
				'pattern': /^(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?|(24:00:00(\.0+)?))(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/
			};
		},
		/**
		 * Get the facets that are allowed to be used by this validator.
		 * @returns {string[]}
		 * @protected
		 */
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

	return objTools.makeConstructor(
		function TimeNodeValidator () {}, 
		timeNodeValidator
	);

});
define('xsdval/nodeValidator/DateNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor DateNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `date`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var dateNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends DateNodeValidator.prototype
	 */
	{
		type: 'date',
		/**
		 * Get the base facets used by this validator.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {
				'pattern': /^-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/
			};
		},
		/**
		 * Get the facets that are allowed to be used by this validator.
		 * @returns {string[]}
		 * @protected
		 */
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

	return objTools.makeConstructor(
		function DateNodeValidator () {}, 
		dateNodeValidator
	);

});
define('xsdval/nodeValidator/HexBinaryNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor HexBinaryNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `hexBinary`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var hexBinaryNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends HexBinaryNodeValidator.prototype
	 */
	{
		type: 'hexBinary',
		/**
		 * Get the base facets used by this validator.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {
				'pattern': /^([0-9a-fA-F]{2})*$/
			};
		},
		/**
		 * Get the facets that are allowed to be used by this validator.
		 * @returns {string[]}
		 * @protected
		 */
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
		/**
		 * Validates the `totalDigits` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateTotalDigits: function (facetValue) {
			return this.getNodeValue().replace(/\D/g, '').length <= facetValue;
		},
		/**
		 * Validates the `fractionDigits` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateFractionDigits: function (facetValue) {
			var v = this.getNodeValue();
			var fracDigits = (v.indexOf('.') === -1) ? 0 : v.split('.')[1].length;
			return fracDigits <= facetValue;
		},
		/**
		 * Returns the length of the value of the XML node.
		 * @returns {number}
		 * @protected
		 */
		getNodeValueLength: function () {
			return this.getNodeValue().length / 2;
		},
		/**
		 * Validates the `maxLength` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMaxLength: function (facetValue) {
			return this.getNodeValueLength() <= facetValue;
		},
		/**
		 * Validates the `minLength` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMinLength: function (facetValue) {
			return this.getNodeValueLength() >= facetValue;
		},
		/**
		 * Validates the `length` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateLength: function (facetValue) {
			return this.getNodeValueLength() == facetValue;
		}
	});

	return objTools.makeConstructor(
		function HexBinaryNodeValidator () {}, 
		hexBinaryNodeValidator
	);

});
define('xsdval/nodeValidator/StringNodeValidator',['underscore', 'objTools', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor StringNodeValidator
	 * @classdesc Validates simple type nodes whose base type is `string`.
	 * @extends SimpleTypeNodeValidator
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var stringNodeValidator = objTools.make(SimpleTypeNodeValidator, 
	/**
	 * @lends StringNodeValidator.prototype
	 */
	{
		type: 'string',
		/**
		 * Get the facets that are allowed to be used by this validator.
		 * @returns {string[]}
		 * @protected
		 */
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
		/**
		 * Validates the `maxLength` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMaxLength: function (facetValue) {
			return this.getNodeValue().length <= facetValue;
		},
		/**
		 * Validates the `minLength` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMinLength: function (facetValue) {
			return this.getNodeValue().length >= facetValue;
		},
		/**
		 * Validates the `length` facet.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateLength: function (facetValue) {
			return this.getNodeValue().length == facetValue;
		}
	});

	return objTools.makeConstructor(
		function StringNodeValidator () {}, 
		stringNodeValidator
	);

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
	'xsdval/nodeValidator/TimeNodeValidator',
	'xsdval/nodeValidator/DateNodeValidator',
	'xsdval/nodeValidator/HexBinaryNodeValidator',
	'xsdval/nodeValidator/StringNodeValidator'],
function (_, objTools, xsd, NodeValidator, ComplexTypeNodeValidator, AnyTypeNodeValidator,
	AnySimpleTypeNodeValidator, FloatNodeValidator, DecimalNodeValidator, 
	BooleanNodeValidator, DateTimeNodeValidator, TimeNodeValidator, 
	DateNodeValidator, HexBinaryNodeValidator, StringNodeValidator) {

	/**
	 * @lends NodeValidatorFactory.prototype
	 */
	var nodeValidatorFactory = {
		/**
		 * @constructor NodeValidatorFactory
		 * @classdesc Can choose a NodeValidator qualified to validate a certain node.
		 * @param {XsdLibrary} xsdLibrary - The XSD library used to resolve type definitions, inheritance, etc..
		 */
		init: function (xsdLibrary) {
			/**
			 * The validation library that contains XSD documents.
			 * @member {XsdLibrary} NodeValidatorFactory#xsdLibrary
			 */
			this.xsdLibrary = xsdLibrary;
			return this;
		},
		/**
		 * Finds an appropriate NodeValidator object.
		 * @param {Element} xsdElement - The XSD Element that should be used to validate the XML node.
		 * @param {Element} node - The XML node that want to validate with the resulting validator.
		 * @param {string} [type] - The type of the node can be overridden, by default an attempt will be made to resolve it based on the XSD node.
		 * @returns {NodeValidator} A NodeValidator that is capable of validating the given node.
		 */
		getValidator: function (xsdElement, node, type) {
			//looking up a typeDefinition (complexType, simpleType or null)
			type = type || xsd.getTypeFromNodeAttr(xsdElement, 'type');
			var xsdNode = this.getXsdDefinition(xsdElement, type);

			//if it is a base simple type, choose a pre-defined validator
			if (xsdNode === null) {
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
				if (xsdNode.getAttribute('abstract') === 'true') {
					throw new TypeError('An abstract type should only be used for extension/restriction.');
				}
				return new ComplexTypeNodeValidator(node, xsdElement, this);
			}

			console.warn('No suitable validator found for "', xsdElement, '".');
			return new NodeValidator(node, xsdElement, this);
		},
		/**
		 * Attempts to find an XSD type definition either by the given type object, or embedded in the given XSD Element.
		 * @param {Element} xsdElement - An XSD &lt;element&gt; node.
		 * @param {{ namespaceURI: string, name: string }} type - A type object (namespaceURI and name).
		 * @returns {Element|null}
		 */
		getXsdDefinition: function (xsdElement, type) {
			var node = type ?
				this.xsdLibrary.findTypeDefinition(type.namespaceURI, type.name) :
				xsdElement.children[0];
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

	return objTools.makeConstructor(
		function NodeValidatorFactory () {}, 
		nodeValidatorFactory
	);

});
define('xsdval/XmlValidator',['objTools', 'xsdval/XsdLibrary', 'xsdval/NodeValidatorFactory'],
function (objTools, XsdLibrary, NodeValidatorFactory) {

	/**
	 * @lends XmlValidator.prototype
	 */
	var xmlValidator = {
		/**
		 * @constructor XmlValidator
		 * @classdesc Can be used to validate an XML document/element against a set of XSD documents.
		 */
		init: function () {
			/**
			 * The validation library that contains XSD documents.
			 * @member {XsdLibrary} XmlValidator#xsdLibrary
			 */
			this.xsdLibrary = new XsdLibrary();
			/**
			 * The factory used to get validator objects for certain types.
			 * @member {NodeValidatorFactory} XmlValidator#nodeValidatorFactory
			 */
			this.nodeValidatorFactory = new NodeValidatorFactory(this.xsdLibrary);
			return this;
		},
		/**
		 * Loads an XSD document into the validation library.
		 * @param {Document} xsdDocument - An XSD (XML) Document object.
		 */
		loadXsd: function (xsdDocument) {
			this.xsdLibrary.addItem(xsdDocument);
		},
		/**
		 * Validates an XML Document or Element against the validation library.
		 * @param {Element|Document} xmlNode - An XML Document or Element that is to be validated.
		 * @returns {XmlValidationResult}
		 */
		validate: function (xmlNode) {
			xmlNode = xmlNode instanceof Document ? xmlNode.documentElement : xmlNode;
			var definition = this.xsdLibrary.findElement(
				xmlNode.namespaceURI, 
				xmlNode.localName
			);
			var validator = this.nodeValidatorFactory.getValidator(definition, xmlNode);
			return validator.validate();
		}
	};

	return objTools.makeConstructor(function XmlValidator () {}, xmlValidator);
	
});
define('xsdvalidator',['xsdval/XmlValidator', 'wgxpath'], 
function (XmlValidator) {
	return XmlValidator;
});
