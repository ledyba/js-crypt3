'use strict';

(function(){
	function decode(qs, sep, eq, options) {
		// Copyright Joyent, Inc. and other Node contributors.
		// https://github.com/Gozala/querystring/blob/master/decode.js
		sep = sep || '&';
		eq = eq || '=';
		var obj = {};

		if (typeof qs !== 'string' || qs.length === 0) {
			return obj;
		}

		var regexp = /\+/g;
		qs = qs.split(sep);

		var maxKeys = 1000;
		if (options && typeof options.maxKeys === 'number') {
			maxKeys = options.maxKeys;
		}

		var len = qs.length;
		// maxKeys <= 0 means that we should not limit keys count
		if (maxKeys > 0 && len > maxKeys) {
			len = maxKeys;
		}

		for (var i = 0; i < len; ++i) {
			var x = qs[i].replace(regexp, '%20'),
				idx = x.indexOf(eq),
				kstr, vstr, k, v;

			if (idx >= 0) {
			kstr = x.substr(0, idx);
			vstr = x.substr(idx + 1);
			} else {
			kstr = x;
			vstr = '';
			}

			k = decodeURIComponent(kstr);
			v = decodeURIComponent(vstr);

			if (!obj.hasOwnProperty(k)) {
			obj[k] = v;
			} else if (Array.isArray(obj[k])) {
			obj[k].push(v);
			} else {
			obj[k] = [obj[k], v];
			}
		}

		return obj;
	};
	function encode_utf8( s ) {
	  return unescape( encodeURIComponent( s ) );
	}
	function toArray(utf8) {
		var arr = [];
		for (var i = 0; i < utf8.length; i++) {
			arr.push(utf8.charCodeAt(i));
		}
		return arr;
	}
	function handle(pass, salt) {
		var r = $("#result");
		var p = $("<p/>");
		var b = $("<strong/>");
		var cr = (function(){
			try {
				return Crypt(toArray(pass.slice(0,8)), toArray(salt.slice(0,2)));
			} catch (ex) {
				return ex;
			}
		})();
		b.text(cr);
		p.text("Result: ");
		p.append(b);
		r.empty();
		r.append(p);
	}
	$(document).ready(function(){
		$("#form")[0].action=window.location.href;
		var qs = window.location.search;
		var vs=decode(qs.substr(1));
		if ( vs.hasOwnProperty("pass") && vs.pass != "" && vs.hasOwnProperty("salt") && vs.salt != "" ) {
			var pass = vs.pass;
			var salt = vs.salt;
			$("#pass").val(pass);
			$("#salt").val(salt);
			handle(encode_utf8(pass),encode_utf8(salt));
		}
	});
})();
