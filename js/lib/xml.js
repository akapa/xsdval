define(function () {

	/**
	 * @namespace xml
	 * @desc A set of useful methods for XML DOM manipulation/traversal. Can be used as a compatibility layer.
	 */
	var xml = 
	/**
	 * @lends xml
	 */
	{
		/**
		 * Create a new XML DOM document.
		 * @param {string} name - The element name for the main element in the document (for example `schema`).
		 * @param {Object.<string, string>} namespaces - The namespaces to define on the main element. They key is short notation (like `xs`), the value is the namespace URI.
		 * @param {string} [prefix] - The prefix to be used before the main element's name (for example `xs` to get `xs:schema`).
		 * @returns {Document}
		 */
		createDocument: function (name, namespaces, prefix) {
			var qname = prefix ? [prefix, name].join(':') : name;
			var doc = document.implementation.createDocument(namespaces[0], qname, null);
			_(namespaces).each(function (ns, nskey) {
				doc.documentElement.setAttributeNS(
					'http://www.w3.org/2000/xmlns/', 
					['xmlns', nskey].join(':'), 
					ns
				);
			});
			return doc;
		},
		/**
		 * Parse an XML string to a DOM document.
		 * @param {string} s - A string containing valid XML.
		 * @returns {Document}
		 */
		parseToDom: function (s) {
			if (typeof window.DOMParser != "undefined") {
		        return (new window.DOMParser()).parseFromString(s, "text/xml");
			} else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
			    var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
			    xmlDoc.async = "false";
			    xmlDoc.loadXML(s);
			    return xmlDoc;
			} else {
			    throw new Error("No XML parser found.");
			}
		},
		/**
		 * Serialize a DOM into an XML string.
		 * @param {Element} dom - A DOM element/document.
		 * @returns {string} The XML representation of the given DOM.
		 */
		serializeToString: function (dom) {
			return new XMLSerializer().serializeToString(dom);
		},
		/**
		 * Returns the `textContent` of the given node.
		 * @param {Element} node - A DOM element.
		 * @returns {string}
		 */
		getNodeText: function (node) {
			return node.textContent;
		},
		/**
		 * Sets the `textContent` of the given node.
		 * @param {Element} node - A DOM element.
		 * @param {string} value - The new text content.
		 */
		setNodeText: function (node, value) {
			node.textContent = value;
		},
		/**
		 * Returns the closest ancestor of the given node with the given namespace and name.
		 * @param {Element} node - A DOM element.
		 * @param {string} namespace - The namespace URI to look for.
		 * @param {string} tagname - The tag name to look for.
		 * @returns {Element|null}
		 */
		getClosestAncestor: function (node, namespace, tagname) {
			var node = node.parentElement;
			while (!(node.namespaceURI === namespace && node.localName === tagname)) {
				node = node.parentElement;
				if (!node) {
					return null;
				}
			}
			return node;
		},
		/**
		 * Formats an XML string to be readable by humans, adding identation.
		 * @param {string} xml - A valid XML string.
		 * @param {number} [spaces=4] - The number of spaces to use for one level of indentation.
		 * @returns {string}
		 */
		formatString: function (xml, spaces) {
		    xml = xml.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3');
		    spaces = spaces || 4;
		    var formatted = '';
		    var pad = 0;

		    _.each(xml.split('\r\n'), function(node, index) {
		        var indent = 0;
		        var padding = '';
		        if (node.match( /.+<\/\w[^>]*>$/ )) {
		            indent = 0;
		        }
		        else if (node.match( /^<\/\w/ )) {
		            if (pad != 0) {
		                pad -= 1;
		            }
		        }
		        else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
		            indent = 1;
		        }
		        else {
		            indent = 0;
		        }
		        for (var i = 0; i < pad; i++) {
		            padding += new Array(spaces).join(' ');
		        }
		        formatted += padding + node + '\r\n';
		        pad += indent;
		    });

		    return formatted;
		}
	};

	return xml;

});