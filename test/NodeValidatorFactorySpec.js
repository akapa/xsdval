define(['xsdval/NodeValidatorFactory', 'xsdval/nodeValidator/ComplexTypeNodeValidator', 
	'xsdval/nodeValidator/DecimalNodeValidator', 'xsdval/XsdLibrary', 'xsd'], 
function (NodeValidatorFactory, ComplexTypeNodeValidator, DecimalNodeValidator, 
	XsdLibrary, xsd) {

	describe("NodeValidatorFactory", function() {

		var nvf;
		var xsdns = 'http://www.w3.org/2001/XMLSchema';
		var testns = 'http://test';
		var schema = xsd.createDocument('schema', { 'xs': xsdns }, 'xs');
		schema.documentElement.setAttribute('targetNamespace', testns);

		var elem = schema.createElementNS(xsdns, 'xs:element');
		schema.documentElement.appendChild(elem);

		beforeEach(function () {
			nvf = new NodeValidatorFactory(new XsdLibrary([schema]));
		});

		describe("getXsdNode", function () {

			it("calls xsdLibrary.findTypeDefinition() when type is given and returns node or null", function() {

				var type = {
					namespaceURI: xsdns,
					name: 'integer'
				};

				spyOn(nvf.xsdLibrary, 'findTypeDefinition').and.callThrough();
				
				var res = nvf.getXsdNode(elem, type);
				
				expect(nvf.xsdLibrary.findTypeDefinition)
					.toHaveBeenCalledWith(type.namespaceURI, type.name);
				expect(res.getAttribute('name')).toBe('integer');

				type.name = 'notexistingtype';
				var res2 = nvf.getXsdNode(elem, type);
				expect(res2).toBe(null);

			});

			it("looks for an embedded definition when type is not given, null if not found", function() {

				var st = schema.createElementNS(xsdns, 'xs:simpleType');
				elem.appendChild(st);
				var res = nvf.getXsdNode(elem);
				expect(res).toBe(st);

				elem.removeChild(st);
				var res = nvf.getXsdNode(elem);
				expect(res).toBe(null);

			});

		});

		describe("getValidator", function () {

			it("returns ComplexTypeNodeValidator for complexTypes, except when abstract", function() {

				var st = schema.createElementNS(xsdns, 'xs:complexType');
				elem.appendChild(st);

				expect(nvf.getValidator(elem, null))
					.toEqual(jasmine.any(ComplexTypeNodeValidator));

				st.setAttribute('abstract', 'true');
				expect(function () { nvf.getValidator(elem, null); }).toThrow();

				elem.removeChild(st);

			});

			it("returns a kind of SimpleTypeNodeValidator for restricting simpleTypes", function() {

				var st = schema.createElementNS(xsdns, 'xs:simpleType');
				elem.appendChild(st);
				var rest = schema.createElementNS(xsdns, 'xs:restriction');
				rest.setAttribute('base', 'xs:integer');
				st.appendChild(rest);

				expect(nvf.getValidator(elem, null))
					.toEqual(jasmine.any(DecimalNodeValidator));

				elem.removeChild(st);

			});

			it("returns a kind of SimpleTypeNodeValidator for base types", function() {

				var type = {
					namespaceURI: xsdns,
					name: 'decimal'
				};

				expect(nvf.getValidator(elem, null, type))
					.toEqual(jasmine.any(DecimalNodeValidator));

			});

		});

	});

});