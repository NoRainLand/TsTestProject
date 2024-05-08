let msg = "0";
class A {
    msg: string;
    constructor() {
        this.msg = "A";
    }
    test(num: number) {
        console.log(this.msg + num);
    }
}
class B extends A {
    constructor() {
        super();
        this.msg = "B";
    }
}
let a = new A();
let b = new B();
let call = a.test.bind(a);
call(11);
call.apply(a, [22]);
call.apply(b, [22]);
let call2 = a.test;
call2.apply(a, [33]);
call2.apply(b, [33]);