Javascript BitArray
===================

Just a little fun i am having, building a bitarray for javascript

Description
-----------
Basically this is a bitarray, which stores as 32bit integers internally.

It should be easy to serialize, deserialize, and also easy to store in any json object, since, it would be nothing more than a bunch of numbers :D.

Usage
-----

```js
var arr = [1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0];
var bitArr1 = new BitArray(arr);
// or you can create it with a string of 1s and 0s
var bitArr2 = new BitArray(arr.join(''));
```

Testing
-------

###CLI

```
make test
```

###Browser

This makes use of mocha and http-server to server the page


```
make test-browser
```

and access localhost:8080/test/test.htm to access the test cases
*to update the files, please run make again, no need to restart http-server*

#### Gotchas *and this is important*
I have modified requirejs to make it work with any module id that ends with .js, and so... you might need to use this version too. I really hope somebody will give me a better solution, or, require.js can fix this too.

```js
//somewhere along the lines of

               if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
// modify into
               if (!(moduleName in config.paths) && req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
```


###Using Sublime

Just to share how to use sublime along with browser testing, I make use of BuildOnSave and attach a make job to it to build, however, still cant quite beat the flush problem of mocha...