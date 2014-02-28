define(['underscore', 'objTools'], function (_, objTools) {

	/**
	 * @lends XmlValidationResult.prototype
	 */
	var xmlValidationResult = {
		/**
		 * @constructor XmlValidationResult
		 * @classdesc Stores validation errors and reports on success.
		 * @param {XmlValidationError[]} errors - Errors added initially, success is validated based on this.
		 */
		init: function (errors) {
			/**
			 * The errors returned by the validation.
			 * @member {XmlValidationError[]} errors
			 * @memberof XmlValidationResult#
			 */
			this.errors = errors ? [].concat(errors) : [];
			this.checkSuccess();
			return this;
		},
		/**
		 * Adds errors to the collection, success is revalidated.
		 * @param {XmlValidationError[]} errors - Errors added.
		 */
		add: function (errors) {
			if (errors) {
				this.errors = this.errors.concat(errors);
				this.checkSuccess();
			}
		},
		/**
		 * Checks the count of errors and sets success to true if it is zero. No need to call it when methods are used to manipulate the error collection.
		 * @protected
		 */
		checkSuccess: function () {
			/**
			 * Can be read to check whether validation was a success (no errors) or not.
			 * @member {boolean} success
			 * @memberof XmlValidationResult#
			 */
			this.success = this.errors.length === 0;
		}
	};

	return function XmlValidationResult () {
		var obj = objTools.construct(xmlValidationResult, XmlValidationResult);
		return obj.init.apply(obj, arguments);
	};

});