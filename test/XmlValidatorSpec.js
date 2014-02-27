define(['xsdval/XmlValidator', 'xsdval/XsdLibrary', 'xsdval/NodeValidatorFactory',
	'xsdval/XmlValidationResult', 'xsd'], 
function (XmlValidator, XsdLibrary, NodeValidatorFactory, XmlValidationResult, xsd) {

	describe("XmlValidator", function() {

		var validator;
		var xsdns = 'http://www.w3.org/2001/XMLSchema';
		var testns = 'http://test';
		var schema = xsd.createDocument('schema', { 'xs': xsdns }, 'xs');
		schema.documentElement.setAttribute('targetNamespace', testns);

		beforeEach(function () {
			validator = new XmlValidator();	
		});

		it("has an XsdLibrary and a NodeValidatorFactory", function() {

			expect(validator.xsdLibrary).toEqual(jasmine.any(XsdLibrary));
			expect(validator.nodeValidatorFactory).toEqual(jasmine.any(NodeValidatorFactory));

		});

		it("loadXsd passes param to XsdLibrary", function() {

			spyOn(validator.xsdLibrary, 'addItem');
			validator.loadXsd(schema);
			expect(validator.xsdLibrary.addItem).toHaveBeenCalledWith(schema);

		});

		describe("validate", function() {

			var elem = schema.createElementNS(xsdns, 'xs:element');
			var name = 'test';
			elem.setAttribute('name', name);
			elem.setAttribute('type', 'xs:string');
			schema.documentElement.appendChild(elem);

			var xmlDoc = xsd.createDocument(name, { 'test': testns }, 'test');
			var xmlElem = xmlDoc.createElementNS(testns, 'test:' + name);
			xmlDoc.documentElement.appendChild(xmlElem);

			it('calls xsdLibrary.findElement', function () {

				validator.loadXsd(schema);
				spyOn(validator.xsdLibrary, 'findElement').and.callThrough();
				validator.validate(xmlElem);
				expect(validator.xsdLibrary.findElement).toHaveBeenCalledWith(testns, name);

			});

			it('calls nodeValidatorFactory correctly and returns XmlValidationResult', function () {

				validator.loadXsd(schema);
				spyOn(validator.nodeValidatorFactory, 'getValidator').and.callThrough();
				var res = validator.validate(xmlElem);
				expect(validator.nodeValidatorFactory.getValidator)
					.toHaveBeenCalledWith(elem, xmlElem);
				expect(res).toEqual(jasmine.any(XmlValidationResult));

			});

		});

	});

});