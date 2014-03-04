define(['underscore', 'objTools'], function (_, objTools) {

	/**
	 * @lends XmlValidationError.prototype
	 */
	var xmlValidationError = {
		/**
		 * @constructor XmlValidationError
		 * @classdesc Provides information on a validation error.
		 * @param {Element} failingNode - The XML node that failed validation.
		 * @param {Element} failedXsdNode - The XSD node containing the validation rule that was not passed.
		 * @param {string} type - A short non-standard hint on what type of validation rule was failed.
		 */
		init: function (failingNode, failedXsdNode, type) {
			/**
			 * The XML node that failed validation.
			 * @member {Element} failingNode
			 * @memberof XmlValidationError#
			 */
			this.failingNode = failingNode;
			/**
			 * The XSD node containing the validation rule that was not passed.
			 * @member {Element} failedXsdNode
			 * @memberof XmlValidationError#
			 */
			this.failedXsdNode = failedXsdNode;
			/**
			 * A short non-standard hint on what type of validation rule was failed.
			 * @member {string} type
			 * @memberof XmlValidationError#
			 */
			this.type = type;
			console.error('Validation error created:', this);
			return this;
		}
	};

	return objTools.makeConstructor(
		function XmlValidationError () {}, 
		xmlValidationError
	);

});