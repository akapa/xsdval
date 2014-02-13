define(['objTools', 'xsdval/XsdLibrary', 'xsdval/NodeValidatorFactory'],
function (objTools, XsdLibrary, NodeValidatorFactory) {
	var xmlValidator = {
		init: function () {
			this.xsdLibrary = new XsdLibrary();
			this.nodeValidatorFactory = new NodeValidatorFactory(this.xsdLibrary);
			return this;
		},
		loadXsd: function (xsdDocument) {
			this.xsdLibrary.addItem(xsdDocument);
		},
		validate: function (xmlNode) {
			xmlNode = xmlNode instanceof Document ? xmlNode.documentElement : xmlNode;
			var definition = this.xsdLibrary.findElement(
				xmlNode.namespaceURI, 
				xmlNode.localName
			);
			var validator = this.nodeValidatorFactory.getValidator(definition, xmlNode);
			console.log('Validating document with', validator);
			return validator.validate();
		}
	};

	return function XmlValidator () {
		var obj = objTools.construct(xmlValidator, XmlValidator);
		return obj.init.apply(obj, arguments);
	};
});