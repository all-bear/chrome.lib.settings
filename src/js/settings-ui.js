import {Settings} from './settings';

const DEFAULTS_PARAMS = {
  formSelector: 'form',
  formMessageSelector: 'form #messages',
  optionSavedI18nMessage: 'options_saved',
  hideMessageAfter: 1500
};

export class SettingsUI {
  static init(params) {
    const options = Object.assign({}, DEFAULTS_PARAMS, params);

    SettingsUI.loadOptions(() => {
      const form = document.querySelector(options.formSelector);

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = {};
        const inputs = [].slice.call(form.querySelectorAll('input,select,textarea'));

        inputs.forEach(input => {
          let value = input.value;
          let intValue = parseInt(value);

          data[input.name] = ('' + intValue) === value ? intValue : input.value;
        });

        SettingsUI.saveOptions(data, options);
      }, false);
    }, options);
  }

  static loadOptions(cb, options) {
    Settings.load((settings) => {
      const form = document.querySelector(options.formSelector);
      const inputs = [].slice.call(form.querySelectorAll('input,select,textarea'));

      inputs.forEach(input => {
        input.value = settings[input.name];
      });

      cb();
    });
  }

  static saveOptions(data, options) {
    Settings.save(data, () => {
      const messageHolder = document.querySelector(options.formMessageSelector);

      messageHolder.innerHTML = chrome.i18n.getMessage(options.optionSavedI18nMessage) || 'Saved';

      setTimeout(() => {
        messageHolder.innerHTML = '';
      }, options.hideMessageAfter);
    });
  }
}