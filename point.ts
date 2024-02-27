let obj: any;
console.log(!obj?.a);

let obj2: any = { a: true };
console.log(!obj2?.a);

let obj3: any = { a: false };
console.log(!obj3?.a);

let obj4: any = 123;
if (obj4 != null) {
    console.log(obj4);
}
if (obj4! = null) {
    console.log(obj4 + "1");
} else {
    console.log(obj4 + "2");
}