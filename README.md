Lame.js
-------

### MP3 encoding in JavaScript

Lame.js is an MP3 encoder that runs entirely in the web browser. It is built on an MP3 encoder written in C ([Lame](http://lame.sourceforge.net/)) converted into JavaScript using [Emscripten](https://github.com/kripken/emscripten).

A compiled version of `lame.js` is available in the `dist` folder.

# 1. Compilation of Lame.js

You will need:

* [emscripten](https://github.com/kripken/emscripten) (which implies also node.js and LLVM-fastcomp compiler, see emscripten docs for instructions on how to get it), 
* [CMake](http://www.cmake.org/).

The build is a classic CMake cross-compilation, using the toolchain provided by emscripten:

    $ cd .../lame.js # This folder
    $ mkdir build
    $ cd build
    $ cmake -DEMSCRIPTEN=1 -DCMAKE_TOOLCHAIN_FILE=path_to_emscripten/cmake/Modules/Platform/Emscripten.cmake ..
    $ make

This generates `lame.js`.

# 2. Usage of Lame.js

The API is rather simple:

* 3 objects must be created: an encoder, an input buffer, an output buffer.
* To start a new file, call `Start`.
* To process samples, use `Encode`, you provide input raw PCM samples, and receive encoded MP3 frames.
* To stop the file, call `Stop`, which will also give you the final remaining frames.
* To release the memory used by the structures, you must explicitely call `delete()` on them.
 
For instance:

```javascript
var encoder = new Module.Encoder();
encoder.Start();

var inBuffer = new Module.AudioBuffer();
var outBuffer = new Module.MP3Buffer();
var encodedData = [];
/* ... */
inBuffer.push_back(sample) // Must be 16kHz, 16 bits audio sample

/* Looping for every recorded samples, putting them in an array 
that will contain the MP3 file */
outBuffer.clear();
encoder.Encode(inBuffer, outBuffer);
for (var i = 0; i < outBuffer.size(); i++) {
    encodedData.push(outBuffer.get(i));
}
outBuffer.clear();
encoder.Stop(outBuffer);
for (var i = 0; i < outBuffer.size(); i++) {
    encodedData.push(outBuffer.get(i));
}
/* ... */
// We finally create a binary blob that contains the MP3 file
var audioBlob = new Blob([new Uint8Array(encodedData)], { type: 'audio/mp3' });
outBuffer.delete();
inBuffer.delete();
encoder.delete();
```

# 3. Test suite

There is a test suite in the `tests` folder. Since it used `lame.js` in the dist folder, you can start it from the root folder of this repository:

    $ cd .../lame.js
    $ python -m SimpleHTTPServer 8080

Then open http://localhost:8080/tests/index.html in your browser.

