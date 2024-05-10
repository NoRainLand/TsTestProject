class Singleton {
    private static instance: any;
    static getInstance<T extends typeof Singleton>(this: T): InstanceType<T> {
        return this.instance ||= new this()
    }
}

class Singleton1 extends Singleton {

    sss: number = 1;
}

class Singleton2 extends Singleton {

    ss23s: number = 1;
}

Singleton2.getInstance().ss23s = 2;