define(['xsdval/XsdLibrary', 'xsd'], function (XsdLibrary, xsd) {

	describe("XsdLibrary", function() {

		var xsdlib;
		var xsdns = 'http://www.w3.org/2001/XMLSchema';
		var testns = 'http://test';

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

			var schema = xsd.createDocument('schema', { 'xs': xsdns }, 'xs');
			schema.documentElement.setAttribute('targetNamespace', testns);

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

	});

});