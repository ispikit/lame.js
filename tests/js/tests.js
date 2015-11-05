module("Data structures");

test( "ReturnType type", function() {
    var x = Module.ReturnType.SUCCESS;
    ok (x != undefined, "valid ReturnType should not be undefined" );
    equal(x, Module.ReturnType.SUCCESS, "valid ReturnType should be equal to itself");
    x = Module.ReturnType.BAD_STATE;
    ok (x != undefined, "valid ReturnType should not be undefined" );
    equal(x, Module.ReturnType.BAD_STATE, "valid ReturnType should be equal to itself");
    x = Module.ReturnType.BAD_ARGUMENT;
    ok (x != undefined, "valid ReturnType should not be undefined" );
    equal(x, Module.ReturnType.BAD_ARGUMENT, "valid ReturnType should be equal to itself");
    x = Module.ReturnType.RUNTIME_ERROR;
    ok (x != undefined, "valid ReturnType should not be undefined" );
    equal(x, Module.ReturnType.RUNTIME_ERROR, "valid ReturnType should be equal to itself");
    ok (x != Module.ReturnType.BAD_ARGUMENT, "Inequality between different returntype values");
    ok ( Module.ReturnType.BAD_ARGUMENT != Module.ReturnType.BAD_STATE, "Inequality between different returntype values");
    ok ( Module.ReturnType.BAD_ARGUMENT != Module.ReturnType.SUCCESS, "Inequality between different returntype values");
    ok ( Module.ReturnType.RUNTIME_ERROR != Module.ReturnType.SUCCESS, "Inequality between different returntype values");
    ok ( Module.ReturnType.RUNTIME_ERRO == undefined, "Invalid ReturnType should be undefined");
    ok ( Module.ReturnType.RUNTIME == undefined, "Invalid ReturnType should be undefined");
    ok ( Module.ReturnType.HELLO == undefined, "Invalid ReturnType should be undefined");
});

test( "AudioBuffer type", function() {
    var x = new Module.AudioBuffer();
    ok (x != undefined, "audio buffer should not be undefined");
    equal(x.size(), 0, "audio buffer should be initialized empty");
    var error = undefined;
    try {x.push_back({});}
    catch (e) {error = e;}
    ok(error != undefined, "Adding an invalid value to vector should raise an exception");
    equal(error.name, "TypeError", "Should be a TypeError exception");

    var error = undefined;
    try {x.push_back(-33000);}
    catch (e) {error = e;}
    ok(error != undefined, "Adding an invalid value to vector should raise an exception");
    equal(error.name, "TypeError", "Should be a TypeError exception");

    error = undefined;
    try {x.push_back(33000);}
    catch (e) {error = e;}
    ok(error != undefined, "Adding an invalid value to vector should raise an exception");
    equal(error.name, "TypeError", "Should be a TypeError exception");

    error = undefined;
    try {x.push_back([0]);}
    catch (e) {error = e;}
    ok(error != undefined, "Adding an invalid value to vector should raise an exception");
    equal(error.name, "TypeError", "Should be a TypeError exception");

    error = undefined;
    try {x.push_back("0");}
    catch (e) {error = e;}
    ok(error != undefined, "Adding an invalid value to vector should raise an exception");
    equal(error.name, "TypeError", "Should be a TypeError exception");

    for (var i=0;i<300;i++) {
	x.push_back(i*100);
	x.push_back(-i*100);
    }
    equal(x.size(), 600, "config size should grow");

    x.push_back(12345);
    equal(x.size(), 601, "size of vector should grow accordingly");
    equal(x.get(600), 12345, "stored values should have the correct value");
    equal(x.get(601), undefined, "non-existent values should be undefined");
    
    x.delete();
    var error = undefined;
    try {x.get(0);}
    catch (e) {error = e;}
    ok(error != undefined, "Using a deleted vector should raise an exception");
    equal(error.name, "BindingError", "Should be a BindError exception");
});

test( "MP3Buffer type", function() {
    var x = new Module.MP3Buffer();
    ok (x != undefined, "MP3 buffer should not be undefined");
    equal(x.size(), 0, "MP3 buffer should be initialized empty");
    var error = undefined;
    try {x.push_back({});}
    catch (e) {error = e;}
    ok(error != undefined, "Adding an invalid value to vector should raise an exception");
    equal(error.name, "TypeError", "Should be a TypeError exception");

    var error = undefined;
    try {x.push_back(-1);}
    catch (e) {error = e;}
    ok(error != undefined, "Adding an invalid value to vector should raise an exception");
    equal(error.name, "TypeError", "Should be a TypeError exception");

    error = undefined;
    try {x.push_back(256);}
    catch (e) {error = e;}
    ok(error != undefined, "Adding an invalid value to vector should raise an exception");
    equal(error.name, "TypeError", "Should be a TypeError exception");

    error = undefined;
    try {x.push_back([0]);}
    catch (e) {error = e;}
    ok(error != undefined, "Adding an invalid value to vector should raise an exception");
    equal(error.name, "TypeError", "Should be a TypeError exception");

    error = undefined;
    try {x.push_back("0");}
    catch (e) {error = e;}
    ok(error != undefined, "Adding an invalid value to vector should raise an exception");
    equal(error.name, "TypeError", "Should be a TypeError exception");

    for (var i=0;i<255;i++) {
	x.push_back(i);
    }
    equal(x.size(), 255, "buffer size should grow");

    x.push_back(31);
    equal(x.size(), 256, "size of vector should grow accordingly");
    equal(x.get(255), 31, "stored values should have the correct value");
    equal(x.get(256), undefined, "non-existent values should be undefined");
    
    x.delete();
    var error = undefined;
    try {x.get(0);}
    catch (e) {error = e;}
    ok(error != undefined, "Using a deleted vector should raise an exception");
    equal(error.name, "BindingError", "Should be a BindError exception");
});


module("Encoder type");
test( "Encoder instantiation", function() {
    var x = new Module.Encoder();
    ok (x != undefined, "New encoder should not be undefined");
    x.delete();
});

test( "Instantiation of several encoders", function() {
    var x = new Module.Encoder();
    var y = new Module.Encoder();
    var z = new Module.Encoder();
    ok (x != undefined, "New encoder should not be undefined");
    ok (y != undefined, "New encoder should not be undefined");
    ok (z != undefined, "New rencoder should not be undefined");
    x.delete();
    y.delete();
    z.delete();
});

test( "Encoding before starting", function() {
    var e = new Module.Encoder();
    var a = new Module.AudioBuffer();
    var m = new Module.MP3Buffer();
    ok (e != undefined, "New recognizer should not be undefined");
    equal(e.Encode(a, m), Module.ReturnType.BAD_STATE, "Encoding should be started first");
    equal(a.size(), 0, "Input should remain empty");
    equal(m.size(), 0, "Output should remain empty");
    e.delete();
    var error = undefined;
    try {e.Encode(a,m);}
    catch (err) {error = err;}
    ok(error != undefined, "Using a deleted encoder should raise an exception");
    equal(error.name, "BindingError", "Should be a BindError exception");
});

test( "Encoding empty buffers", function() {
    var e = new Module.Encoder();
    var a = new Module.AudioBuffer();
    var m = new Module.MP3Buffer();
    ok (e != undefined, "New recognizer should not be undefined");
    equal(e.Start(), Module.ReturnType.SUCCESS, "Encoding should start successfully");
    equal(e.Encode(a, m), Module.ReturnType.SUCCESS, "Encoding empty buffer should be successful");
    equal(a.size(), 0, "Input should remain empty");
    equal(m.size(), 0, "Output should remain empty");
    equal(e.Stop(m), Module.ReturnType.SUCCESS, "Encoding should start successfully");
    equal(m.size(), 72, "Output should not remain empty");
    e.delete();
    var error = undefined;
    try {e.Encode(a,m);}
    catch (err) {error = err;}
    ok(error != undefined, "Using a deleted encoder should raise an exception");
    equal(error.name, "BindingError", "Should be a BindError exception");
    a.delete();
    m.delete();
});

test( "Encoding audio buffers", function() {
    var e = new Module.Encoder();
    var a = new Module.AudioBuffer();
    var m = new Module.MP3Buffer();
    equal(e.Start(), Module.ReturnType.SUCCESS, "Encoding should start successfully");
    
    for (var i = 0 ; i < audio.length ; i++) a.push_back(audio[i]);
    equal(e.Encode(a, m), Module.ReturnType.SUCCESS, "Encoding empty buffer should be successful");
    equal(a.size(), audio.length, "Input should remain unchanged");
    equal(m.size(), 20310, "Output should have processed samples");
    equal(e.Stop(m), Module.ReturnType.SUCCESS, "Encoding should start successfully");
    equal(m.size(), 894, "Output should have remaining samples");
    e.delete();
    a.delete();
    m.delete();
});
