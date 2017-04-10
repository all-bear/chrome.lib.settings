let defaults = {};
let _cache = null;

export class Settings {
  static set defaults(newDefaults) {
    defaults = newDefaults;
  }

  static load(cb) {
    if (_cache) {
      return cb(_cache);
    }

    chrome.storage.sync.get(defaults, data => {
      _cache = data;

      cb(_cache);
    });
  }

  static save(data, cb) {
    chrome.storage.sync.set(data, cb);
  }

  static get data() {
    return _cache;
  }
}