"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.SettingsUI=void 0;var _createClass=(()=>{function a(b,c){for(var i=0,d;i<c.length;i++){d=c[i];d.enumerable=d.enumerable||!1;d.configurable=!0;if("value"in d)d.writable=!0;Object.defineProperty(b,d.key,d)}}return(b,c,d)=>{if(c)a(b.prototype,c);if(d)a(b,d);return b}})(),_settings=require("./settings");function _classCallCheck(a,b){if(!(a instanceof b)){throw new TypeError("Cannot call a class as a function")}}var DEFAULTS_PARAMS={formSelector:"form",formMessageSelector:"form #messages",optionSavedI18nMessage:"options_saved",hideMessageAfter:1500},SettingsUI=exports.SettingsUI=function(){function a(){_classCallCheck(this,a)}_createClass(a,null,[{key:"init",value:b=>{var c=Object.assign({},DEFAULTS_PARAMS,b);a.loadOptions(()=>{var d=document.querySelector(c.formSelector);d.addEventListener("submit",e=>{e.preventDefault();var f={},g=[].slice.call(d.querySelectorAll("input,select,textarea"));g.forEach(h=>{var j=h.value,k=parseInt(j);f[h.name]=""+k===j?k:h.value});a.saveOptions(f,c)},!1)},c)}},{key:"loadOptions",value:(b,c)=>{_settings.Settings.load(d=>{var f=document.querySelector(c.formSelector),g=[].slice.call(f.querySelectorAll("input,select,textarea"));g.forEach(h=>{h.value=d[h.name]});b()})}},{key:"saveOptions",value:(b,c)=>{_settings.Settings.save(b,()=>{var d=document.querySelector(c.formMessageSelector);d.innerHTML=chrome.i18n.getMessage(c.optionSavedI18nMessage)||"Saved";setTimeout(()=>{d.innerHTML=""},c.hideMessageAfter)})}}]);return a}();