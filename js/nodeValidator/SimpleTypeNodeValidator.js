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
			var type = this.xsdLibrary.getTypeFromNodeAttr(this.definition, 'type');
			var current, findings, facets, enums;
			var validatedFacets = [];
			while (current = type 
				? this.xsdLibrary.findTypeDefinition(type.namespaceURI, type.name)
				: this.definition[0]) {
					facets = this.xsdLibrary.findRestrictingFacets(current);
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
					type = this.xsdLibrary.getRestrictedType(current);
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