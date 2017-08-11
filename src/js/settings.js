let defaults = {};

export class Settings {
  static set defaults(newDefaults) {
    defaults = newDefaults;
  }

  static load(cb) {
    if (Object.keys(defaults).length) {
      chrome.storage.sync.get(defaults, cb)
    } else {
      chrome.storage.sync.get(cb)
    }
  }

  static save(data, cb) {
    chrome.storage.sync.set(data, cb);
  }
}