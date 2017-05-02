var chrome;
var Settings;

describe('settings core pack tests', function () {
    beforeEach(function () {
        chrome = {
            storage: {
                sync: {
                    get: undefined,
                    set: undefined
                }
            }
        };

        delete require.cache[require.resolve('../dist/js/settings.js')];
        Settings = require('../dist/js/settings.js').Settings;

        spyOn(chrome.storage.sync, 'get').and.callFake(function (defaults, cb) {
            setTimeout(function () {
                cb(defaults);
            }, 100)
        });

        spyOn(chrome.storage.sync, 'set').and.callFake(function (data, cb) {
            setTimeout(function () {
                cb(data);
            }, 100)
        });

        global.chrome = chrome;
    });

    it('should create object Settings', function () {
        expect(Settings).not.toBe(undefined);
    });

    it('should load settings with defaults', function (done) {
        Settings.load(function (data) {
            expect(chrome.storage.sync.get.calls.count()).toEqual(1);
            expect(chrome.storage.sync.get.calls.mostRecent().args[0]).toEqual({});
            expect(data).toEqual({});
            done();
        });
    });

    it('should load settings with custom defaults', function (done) {
        var customDefaults = {
            someValue: 1
        };

        Settings.defaults = customDefaults;

        Settings.load(function (data) {
            expect(chrome.storage.sync.get.calls.count()).toEqual(1);
            expect(chrome.storage.sync.get.calls.mostRecent().args[0]).toEqual(customDefaults);
            expect(data).toEqual(customDefaults);
            done();
        });
    });

    it('should load settings from cache', function (done) {
        Settings.load(function (data) {
            Settings.load(function (data) {
                expect(chrome.storage.sync.get.calls.count()).toEqual(1);
                done();
            });
        });
    });

    it('should save settings', function (done) {
        var newData = {
            someAnotherValue: 1
        };

        Settings.save(newData, function (data) {
            expect(chrome.storage.sync.set.calls.count()).toEqual(1);
            expect(chrome.storage.sync.set.calls.mostRecent().args[0]).toEqual(newData);
            expect(data).toEqual(newData);
            done();
        });
    });
});