console.log(1);
process.nextTick(function () {
    console.log(3);
});
console.log(2);
setTimeout(function () {
    console.log(5);
}, 0); // 不管超时设成多少都是最后执行的
process.nextTick(function () {
    console.log(4);
});

var start = Date.now();
setTimeout(function () {
    console.log(Date.now() - start);
    var a = [];
    for (var i = 0; i < 0x7fffffff; i++) {
        if (i % 100000000 == 0) {
            a.push(i);
        }
    }
    console.log(a);
    console.log(Date.now() - start);
}, 1000);
setTimeout(function () {
    console.log(Date.now() - start);
}, 2000);
