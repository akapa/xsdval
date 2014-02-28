define(['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, XmlValidationResult, XmlValidationError) {

	var complexTypeNodeValidator = objTools.make(NodeValidator, {
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

	return function ComplexTypeNodeValidator () {
		var obj = objTools.construct(complexTypeNodeValidator, ComplexTypeNodeValidator);
		return obj.init.apply(obj, arguments);
	};
	
});