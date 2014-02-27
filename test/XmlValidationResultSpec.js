define(['xsdval/XmlValidationResult'], 
function (XmlValidationResult) {

	describe("XmlValidationResult", function() {

		var a = [2, 3];

		it("add() accepts error array", function() {

			var res = new XmlValidationResult();
			res.add(a);
			expect(res.errors).toEqual(a);

		});

		it("a new set of errors is concatted to the existing ones", function() {

			var res = new XmlValidationResult();
			res.add(a);
			res.add(a);
			expect(res.errors).toEqual([2, 3, 2, 3]);

		});

		it("constructor can receive errors to be added, but they are copied", function() {

			var res = new XmlValidationResult(a);
			expect(res.errors).toEqual(a);
			expect(res.errors).not.toBe(a);

		});

		it("checkSuccess works", function() {

			var res = new XmlValidationResult();
			expect(res.success).toBe(true);
			res.add(a);
			expect(res.success).toBe(false);

			var res2 = new XmlValidationResult(a);
			expect(res2.success).toBe(false);

		});

	});

});