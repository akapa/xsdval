define(function () {
	var Xml = {
		xs: 'http://www.w3.org/2001/XMLSchema',
		xsi: 'http://www.w3.org/2001/XMLSchema-instance',
		makeAttribute: function (key, value) {
			return [' ', key, '="', value, '"'].join('');
		},
		makeOpenTag : function (name, att) {
			var att = att || {};
			var a = _.map(att, function (value, key) {
					return [' ', key, '="', value, '"'].join('');
				}).join('');
			return ['<', name, a, '>'].join('');
		},
		makeCloseTag : function (name) {
			return ['</', name, '>'].join('');
		},
		makeTag: function (name, val, att) {
			var value = val;
			if (!name) {
				return value;
			}
			return this.makeOpenTag(name, att)
				+ value
				+ this.makeCloseTag(name);
		},
		makeXmlHeader : function () {
			return '<?xml version="1.0" encoding="UTF-8"?>';
		},
		parseXml: function (s) {
			if (typeof window.DOMParser != "undefined") {
		        return ( new window.DOMParser() ).parseFromString(s, "text/xml");
			} else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
			    var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
			    xmlDoc.async = "false";
			    xmlDoc.loadXML(s);
			    return xmlDoc;
			} else {
			    throw new Error("No XML parser found");
			}
		},
		getNodeText: function (node) {
			return node.textContent;
		},
		setNodeText: function (node, value) {
			node.textContent = value;
		},
		domToXml: function (dom) {
			return new XMLSerializer().serializeToString(dom);
		},
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
		createDocument: function (name, namespaces) {
			var doc = document.implementation.createDocument(namespaces[0], name, null);
			_(namespaces).each(function (ns, nskey) {
				if (!nskey || nskey == '0') {
					nskey = 'my';
				}
				doc.documentElement.setAttributeNS(
					'http://www.w3.org/2000/xmlns/', 
					'xmlns:' + nskey, 
					ns
				);
			});
			return doc;
		},
		format: function (xml) {
		    var formatted = '';
		    var reg = /(>)(<)(\/*)/g;
		    xml = xml.replace(reg, '$1\r\n$2$3');
		    var pad = 0;

		    _.each(xml.split('\r\n'), function(node, index) {
		        var indent = 0;
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
		        var padding = '';
		        for (var i = 0; i < pad; i++) {
		            padding += '  ';
		        }
		        formatted += padding + node + '\r\n';
		        pad += indent;
		    });

		    return formatted;
		}
	};
	return Xml;
});