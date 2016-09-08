var EventEmitter = require('events').EventEmitter;
var emt = new EventEmitter();
emt.on('event', function (ent) {
    console.log(ent)
});
emt.emit('event', 'test');

var MyClass = function () {

};
MyClass.prototype.__proto__ = EventEmitter.prototype;
var a = new MyClass();
a.on('event', function (evt) {
    console.log(evt);
});
a.emit('event', 'my class');
