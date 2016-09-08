function a() {
    console.log(this.name == 'kingfree');
}
var b = a.bind({
    name: 'kingfree'
});
a();
b();
console.log(a.name);
console.log(b.name);
