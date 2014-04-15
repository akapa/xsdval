define(function () {

	return {
		'boolean': function (s) {
			return ['true', '1'].indexOf(s) !== -1;
		},
		'float': function (s) {
			if (s === 'INF') {
				return Number.POSITIVE_INFINITY;
			}
			if (s === '-INF') {
				return Number.NEGATIVE_INFINITY;
			}
			return parseFloat(s);
		},
		'decimal': function (s) {
			return parseFloat(s);
		},
		'int': function (s) {
			return parseInt(s, 10);
		},
		'integer': function (s) {
			return this.int(s);
		},
		'dateTime': function (s) {
			return new Date(s);
		},
		'date': function (s) {
			return new Date(s);
		},
		'time': function (s) {
			var time = s.match(/(\d{2}):(\d{2}):(\d{2}).(\d{3})/);
			var d = new Date();
			d.setUTCHours(time[1]);
			d.setUTCMinutes(time[2]);
			d.setUTCSeconds(time[3]);
			d.setUTCMilliseconds(time[4]);
			return d;
		},
		'gYearMonth': function (s) {
			return new Date(s);
		},
		'gMonthDay': function (s) {
			return new Date('2004-' + s);
		},
		'gYear': function (s) {
			return this.int(s);
		},
		'gDay': function (s) {
			return this.int(s);
		},
		'gMonth': function (s) {
			return this.int(s);
		}
	};

});