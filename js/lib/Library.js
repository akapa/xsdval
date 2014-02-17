define(['underscore'], function (_) {
	var library = {
		init: function (defs) {
			this.items = {};
			this.type = null;
			this.nameProperty = 'name';
			this.addItems(defs);
			return this;
		},
		addItem: function (def, name) {
			name = name || def[this.nameProperty];
			this.items[name] = def;
		},
		addItems: function (defs) {
			_(defs).each(function (val) {
				this.addItem(val);
			}, this);
		},
		getItem: function (name) {
			return this.items[name];
		},
		exists: function (name) {
			return name in this.items;
		}
	};

	return function Library () {
		var obj = Object.create(library, {
			constructor: { value: Library }
		});
		return obj.init.apply(obj, arguments);
	};
});