define(['xsdval/XsdLibrary', 'xsd'], function (XsdLibrary, xsd) {

	describe("XsdLibrary", function() {

		var xsdlib;
		var xsdns = 'http://www.w3.org/2001/XMLSchema';
		var testns = 'http://test';
		var schema = xsd.createDocument('schema', { 'xs': xsdns }, 'xs');
		schema.documentElement.setAttribute('targetNamespace', testns);

		beforeEach(function () {
			xsdlib = new XsdLibrary();	
		});

		it("has the base XSD by default", function() {

			var item = xsdlib.getItem(xsdns);
			expect(item.length).toBe(1);
			expect(item[0]).toEqual(jasmine.any(Document));

			var intTD = xsdlib.findTypeDefinition(xsdns, 'integer');
			expect(intTD).toEqual(jasmine.any(Element));
			expect(intTD.getAttribute('id')).toBe('integer');
		
		});

		describe("adding new XSD", function() {

			it("works", function() {

				xsdlib.addItem(schema, testns);
				expect(xsdlib.getItem(testns).length).toBe(1);
		
			});

			it("works without the name specified", function() {

				xsdlib.addItem(schema);
				expect(xsdlib.getItem(testns).length).toBe(1);
		
			});

			it("groups correctly by namespace", function() {

				xsdlib.addItem(schema, testns);
				xsdlib.addItem(schema, testns);
				expect(xsdlib.getItem(testns).length).toBe(2);
		
			});
		
		});

		describe("findElement", function() {

			//setting up a scheme with an element in it
			var schema2 = xsd.createDocument('schema', { 'xs': xsdns }, 'xs');
			schema2.documentElement.setAttribute('targetNamespace', testns);
			var elem = schema2.createElementNS(xsdns, 'element');
			var name = 'test';
			elem.setAttribute('name', name);
			schema2.documentElement.appendChild(elem);

			it("returns null when no element found", function() {

				xsdlib.addItem(schema, testns);
				expect(xsdlib.findElement(testns, name)).toBeNull();

			});

			it("iterates correctly and calls xsd.findElement", function() {

				xsdlib.addItem(schema, testns);
				xsdlib.addItem(schema2, testns);

				spyOn(xsd, 'findElement').and.callThrough();

				var res = xsdlib.findElement(testns, name);
				expect(res).toEqual(jasmine.any(Element));
				expect(xsd.findElement.calls.count()).toEqual(2);
				expect(xsd.findElement.calls.allArgs()).toEqual([[schema, name], [schema2, name]]);

			});

		});

		describe("findTypeDefinition", function() {

			//setting up a scheme with an element in it
			var schema2 = xsd.createDocument('schema', { 'xs': xsdns }, 'xs');
			schema2.documentElement.setAttribute('targetNamespace', testns);
			var elem = schema2.createElementNS(xsdns, 'complexType');
			var name = 'test';
			elem.setAttribute('name', name);
			schema2.documentElement.appendChild(elem);

			it("returns null when no element found", function() {

				xsdlib.addItem(schema, testns);
				expect(xsdlib.findTypeDefinition(testns, name)).toBeNull();

			});

			it("iterates correctly and calls xsd.findTypeDefinition", function() {

				xsdlib.addItem(schema, testns);
				xsdlib.addItem(schema2, testns);

				spyOn(xsd, 'findTypeDefinition').and.callThrough();

				var res = xsdlib.findTypeDefinition(testns, name);
				expect(res).toEqual(jasmine.any(Element));
				expect(xsd.findTypeDefinition.calls.count()).toEqual(2);
				expect(xsd.findTypeDefinition.calls.allArgs()).toEqual([[schema, name], [schema2, name]]);

			});

		});

		describe("findTypeDefinitionFromNodeAttr", function() {

			/*it("calls xsd.getTypeFromNodeAttr with the right params", function() {

				var elem = schema.createElementNS(xsdns, 'element');
				elem.setAttributeNS(testns, 'type', 'xs:integer');

				spyOn(xsd, 'getTypeFromNodeAttr');
				xsdlib.findTypeDefinitionFromNodeAttr(elem, 'type', testns);
				expect(xsd.getTypeFromNodeAttr).toHaveBeenCalledWith(elem, 'type', testns);

			});*/

		});

	});

});