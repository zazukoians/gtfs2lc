var MemStore = function (name) {
  this.name = name;
  this._store = {};
};

MemStore.prototype.get = function (key, cb) {
  if (this._store[key]) {
    cb(null, this._store[key]);
  } else {
    cb(key + ' not found in store');
  }
};

MemStore.prototype.put = function (key, value, cb) {
  if (this._store[key]) {
    //don't add it again, but give a warning
    console.error('WARNING: ' + key + ' already exists. Throwing away this value: ' + value);
    cb();
  } else {
    this._store[key] = value;
    cb();
  }
};

module.exports = MemStore;
