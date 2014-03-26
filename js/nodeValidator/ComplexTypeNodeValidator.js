define(['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
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
                var typeDef = this.definition.getAttribute('type') ?
                    this.xsdLibrary.findTypeDefinitionFromNodeAttr(this.definition, 'type') :
                    this.definition.children[0];
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