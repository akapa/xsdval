define(['objTools', 'xml'], function (objTools, xml) {

	var xsd = objTools.make(xml, {
		xs: 'http://www.w3.org/2001/XMLSchema',
		xsi: 'http://www.w3.org/2001/XMLSchema-instance',
		findElement: function (doc, name) {
			return _(doc.documentElement.children).find(function (child) {
				return child.namespaceURI === xsd.xs
					&& child.localName === 'element'
					&& child.getAttribute('name') === name;
			});
		},
		findTypeDefinition: function (doc, type) {
			var selector = 
				 'complexType[name="' + type + '"],'
				+ 'simpleType[name="' + type + '"]';
			return doc.querySelectorAll(selector);
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

	return xsd;

});