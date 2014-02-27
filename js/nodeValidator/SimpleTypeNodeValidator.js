define(['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
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
			var res = new XmlValidationResult();
			res.add([].concat(
				this.validateBaseType(), 
				this.validateBaseFacets(), 
				this.validateFacets()
			));
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
			while (current = this.validatorFactory.getXsdNode(this.definition, type)) {
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
			var valueAttr = facetName === 'assertion' ? 'test' : 'value';
			var facetValue = enumMode 
				? _(facetNode).map(function (elem) {
						return elem.getAttribute(valueAttr);
					})
				: facetNode.getAttribute(valueAttr);
			
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
			var r = _(facetValue).isRegExp() 
				? facetValue 
				: new RegExp(['^', facetValue, '$'].join(''));
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
			var res =  document.evaluate(xpath, this.node, null, XPathResult.BOOLEAN_TYPE);
			return res.booleanValue;
		}
	});

	return function SimpleTypeNodeValidator () {
		var obj = objTools.construct(simpleTypeNodeValidator, SimpleTypeNodeValidator);
		return obj.init.apply(obj, arguments);
	};

});