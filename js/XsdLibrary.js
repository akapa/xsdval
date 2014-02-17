define(['underscore', 'objTools', 'Library', 'xsd', 'text!xsdval/basetypes.xsd'],
function (_, objTools, Library, xsd, basetypesXsd) {

	var xsdLibrary = objTools.make(Library, {
		init: function (defs) {
			defs = defs || [];
			(new Library).init.call(this, defs.concat([xsd.parseXml(basetypesXsd)]));
			return this;
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