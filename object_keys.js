var a = {
    a: 'b',
    c: 'd'
};
Object.prototype.e = 'f';
for (var i in a) {
    console.log(i);
}
for (var j in a) {
    if (a.hasOwnProperty(j)) {
        console.log(j);
    }
}
console.log(Object.keys(a));
