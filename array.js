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
