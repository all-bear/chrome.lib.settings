# Chrome settings

Settings wrapper for chrome extension. This package contains few wrappers for simplify some tasks related with settings;

## Settings Wrapper
This is wrapper to works with settings this example will show how it works:
```javascript
var Settings = require('../bower_components/chrome-lib-settings/dist/js/settings.js').Settings;
var DEFAULTS {
  some_your_of_settings: true
}

Settings.defaults = DEFAULTS;
...
Settings.load(function (options) {
  // use your options here
});
Settings.save({some_your_of_settings: false}, function () {
  // callback when settings are saved
});
```

## Settings UI Wrapper
This is wrapper for your options.html template, this example will show how it works:
```html
<!-- options.html -->
<html>
<head>
  <link href="../bower_components/chrome-lib-settings/dist/css/settings-ui.css" rel="stylesheet">
</head>
<body>
<form>
  <section>
    <div id="messages"></div>
  </section>
  <section>
    <div class="field">
      <span class="label"></span>
      <input type="text" name="some_your_of_settings" class="control">
    </div>
  </section>
  <section>
    <div>
      <button id="save" class="control">Save</button>
    </div>
  </section>
</form>
<script src="../bower_components/chrome-lib-settings/dist/js/settings-ui.js"></script>
<script>
SettingsUI.init(); // it will handle load and fill form with saved before/default settings, also it will handle form submit and save this settings to storage, and show message "Saved" in messages element

/*
Or you can pass options into init, here is default options:
SettingsUI.init({
  formSelector: 'form', // selector for form element
  formMessageSelector: 'form #messages', // selector for messages holder element
  optionSavedI18nMessage: 'options_saved', // saved message i18n key
  hideMessageAfter: 1500 // hide message after this time
})
*/
</script>
</body>
</html>
```
