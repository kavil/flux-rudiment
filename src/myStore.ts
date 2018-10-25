const Store = {
  _handlers: [],
  _flag: 1,
  subscribe: function(handler: Function) {
    this._handlers.push(handler);
  },
  set: function(value) {
    console.log(value);
    this._flag = value + 1;
    this._handlers.forEach(handler => handler(this._flag));
  },
  get: function() {
    return this._flag;
  }
};

export default Store;
