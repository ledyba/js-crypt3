JavaScript crypt(3) Implementation
===================================

JavaScript port of [crypt(3)](http://linux.die.net/man/3/crypt) function.

~~~c
char *crypt(const char *key, const char *salt);
~~~

A original C version is written by Michael Dipperstein.

How to use
===========

Include crypt.js:
```html
<script type="text/javascript" src="crypt.js"></script>
```

Then, call a "Crypt" function
```js
// Helper function that convert string to utf8 byte array.
function toUTF8Array(str) {
	var utf8 = unescape( encodeURIComponent(utf8) );
	var arr = [];
	for (var i = 0; i < utf8.length; i++) {
		arr.push(utf8.charCodeAt(i));
	}
	return arr;
}
// Crypt accepts only Array object.
// Crypt(password, salt)
var hash = Crypt(toUTF8Array("password"), toUTF8Array("sa"));
```
