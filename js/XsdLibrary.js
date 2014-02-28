define(['underscore', 'objTools', 'Library', 'xsd', 'text!xsdval/basetypes.xsd'],
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

	return function XsdLibrary () {
		var obj = objTools.construct(xsdLibrary, XsdLibrary);
		return obj.init.apply(obj, arguments);
	};
});