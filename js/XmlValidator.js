define(['objTools', 'XsdLibrary', 'xsdval/NodeValidatorFactory', 'wgxpath'],
function (objTools, XsdLibrary, NodeValidatorFactory) {

	/**
	 * @lends XmlValidator.prototype
	 */
	var xmlValidator = {
		/**
		 * @constructor XmlValidator
		 * @classdesc Can be used to validate an XML document/element against a set of XSD documents.
		 */
		init: function () {
			/**
			 * The validation library that contains XSD documents.
			 * @member {XsdLibrary} XmlValidator#xsdLibrary
			 */
			this.xsdLibrary = new XsdLibrary();
			/**
			 * The factory used to get validator objects for certain types.
			 * @member {NodeValidatorFactory} XmlValidator#nodeValidatorFactory
			 */
			this.nodeValidatorFactory = new NodeValidatorFactory(this.xsdLibrary);
			return this;
		},
		/**
		 * Loads an XSD document into the validation library.
		 * @param {Document} xsdDocument - An XSD (XML) Document object.
		 */
		loadXsd: function (xsdDocument) {
			this.xsdLibrary.addItem(xsdDocument);
		},
		/**
		 * Validates an XML Document or Element against the validation library.
		 * @param {Element|Document} xmlNode - An XML Document or Element that is to be validated.
		 * @returns {XmlValidationResult}
		 */
		validate: function (xmlNode) {
			xmlNode = xmlNode instanceof Document ? xmlNode.documentElement : xmlNode;
			var definition = this.xsdLibrary.findElement(
				xmlNode.namespaceURI, 
				xmlNode.localName
			);
			var validator = this.nodeValidatorFactory.getValidator(definition, xmlNode);
			return validator.validate();
		}
	};

	return objTools.makeConstructor(function XmlValidator () {}, xmlValidator);
	
});