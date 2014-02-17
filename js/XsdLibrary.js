define(['underscore', 'objTools', 'Library', 'xsd', 'text!xsdval/basetypes.xsd'],
function (_, objTools, Library, xsd, basetypesXsd) {

	var xsdLibrary = objTools.make(Library, {
		init: function (defs) {
			defs = defs || [];
			var xsd = xsd.parseXml(basetypesXsd);
			(new Library).init.call(this, defs.concat([xsd]));
			return this;
		},
		addItem: function (def, name) {
			var ns = name || def.documentElement.getAttributeNS(null, 'targetNamespace');
			var xsdCollection = this.exists(ns) 
				? this.getItem(ns)
				: [];
			xsdCollection.push(def);
			this.items[ns] = xsdCollection;
		},
		findElement: function (namespace, name) {
			var xsds = this.getItem(namespace) || [];
			var element;
			for (var i = 0, l = xsds.length; i < l; i++) {
				element = _(xsds[i].documentElement.children).find(function (child) {
					return child.namespaceURI === xsd.xs
						&& child.localName === 'element'
						&& child.getAttribute('name') === name;
				});
				if (element) {
					return element;
				}
			}
			return null;
		},
		findTypeDefinition: function (namespace, name) {
			var xsds = this.getItem(namespace) || [];
			var selector = 'complexType[name="' + name + '"], simpleType[name="' + name + '"]';
			var xsdNodes;
			for (var i = 0, l = xsds.length; i < l; i++) {
				xsdNodes = xsds[i].querySelectorAll(selector);
				if (xsdNodes.length > 0) {
					return xsdNodes[0];
				}
			}
			return null;
		},
		getTypeFromNodeAttr: function (node, typeAttr, typeAttrNS) {
			var type = typeAttrNS 
				? node.getAttributeNS(typeAttrNS, typeAttr)
				: node.getAttribute(typeAttr);
			if (type) {
				var parts = type.split(':');
				return {
					namespaceURI: node.lookupNamespaceURI(parts[0]),
					name: parts[1]
				};
			}
			else return null;
		},
		findTypeDefinitionFromNodeAttr: function (node, typeAttr, typeAttrNS) {
			var type = this.getTypeFromNodeAttr(node, typeAttr, typeAttrNS);
			return this.findTypeDefinition(type.namespaceURI, type.name);
		},
		findBaseTypeFor: function (node) {
			var xsdNow = node;
			var basetype;
			do {
				basetype = this.getRestrictedType(xsdNow);
				xsdNow = this.findTypeDefinition(basetype.namespaceURI, basetype.name);
			} while (xsdNow !== null);
			return basetype.name;
		},
		getRestrictedType: function (node) {
			var	element = _(node.children).find(function (child) {
				return child.namespaceURI === xsd.xs
					&& child.localName === 'restriction';
			});
			return this.getTypeFromNodeAttr(element, 'base');
		},
		findRestrictingFacets: function (node) {
			var	element = _(node.children).find(function (child) {
				return child.namespaceURI === xsd.xs
					&& child.localName === 'restriction';
			});
			return element.children;
		}
	});

	return function XsdLibrary () {
		var obj = objTools.construct(xsdLibrary, XsdLibrary);
		return obj.init.apply(obj, arguments);
	};
});