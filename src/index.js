setTimeout(() => {
    document.getElementById('app').innerHTML = 'hello ervery one, next contentxt is promise';
}, 5000);

function Promise(executor) {

    if( typeof(executor) !== 'function') throw new Error('executor must be a function!');
    let _this = this;
    this.state = 'pending';
    this.res = undefined;
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];

    function resolve(value) {
        if(_this.state === 'pending') {
            _this.state = 'resolve';
            _this.res = value;
            _this.resolveCallbacks.map(i => i && i());
        }
    }

    function reject(error) {
        if(_this.state === 'pending') {
            _this.state = 'reject';
            _this.res = error;
            _this.rejectCallbacks.map(i => i && i());
        }
    }

    executor(resolve, reject);
}

Promise.prototype.then = function(infulfilled, inrejected) {
    if(this.state === 'resolve') {
        infulfilled(this.res);
    }
    if(this.state === 'reject') {
        inrejected(this.res);
    }
    if(this.state === 'pending') {
        this.resolveCallbacks.push(() => infulfilled(this.res));
        this.rejectCallbacks.push(() => inrejected(this.res));
    }
}

/** test */
let p = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('test for promise');
    }, 1000)
});

p.then(function (data) {
    console.log(data);
    alert(`rosolve - ${data}`);
}, function (err) {
    console.log(err);
});
