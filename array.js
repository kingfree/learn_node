var a = [1, 2, 3, 4];
console.log(Array.isArray(a));
console.log(a.forEach(function (v) {
    console.info(v);
}));
console.log(a.filter(function (v) {
    return v % 2 !== 0;
}));
console.log(a.map(function (v) {
    return v * 2;
}));
console.log([
    {a: 1, b: 2},
    {a: 3, b: 4},
    {a: 2, b: 3}
].map(function (v) {
    return v.b;
}));