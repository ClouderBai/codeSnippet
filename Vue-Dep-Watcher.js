
// interface Watcher{}
class Watcher {
    constructor () {
        Dep.target = this;
    }

    update () {
        console.log("视图更新啦～");
    }
}

class Dep {
    subs:Array<Watcher> = []
    static target: any
    constructor () {
        this.subs = [];
    }

    addSub (sub: Watcher) {
        this.subs.push(sub);
    }

    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}



function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }
    
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}

function defineReactive (obj, key, val) {
    const dep = new Dep();
    
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            dep.addSub(Dep.target);
            return val;         
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            val = newVal;
            dep.notify();
        }
    });
}

class Vue1 {
    _data
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        new Watcher();
        console.log('render~', this._data.test);
    }
}

let o = new Vue1({
    data: {
        test: "I am test."
    }
});
o._data.test = "hello,test.";

Dep.target = null;

