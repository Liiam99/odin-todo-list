/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 354:
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 365:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* 1. Use a more-intuitive box-sizing model */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
* {
  margin: 0;
}

/* 3. Enable keyword animations */
@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}

body {
  /* 4. Add accessible line-height */
  line-height: 1.5;
  /* 5. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 6. Improve media defaults */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/* 7. Inherit fonts for form controls */
input, button, textarea, select {
  font: inherit;
}

/* 8. Avoid text overflows */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* 9. Improve line wrapping */
p {
  text-wrap: pretty;
}
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

/*
  10. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

@keyframes hover {
  from {transform: scale(1);}
  to {transform: scale(1.03);}
}

:root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --primary: rgb(61, 177, 255);
}

body {
  height: 100vh;
}

ul {
  padding: 0;
  list-style: none;
}

button {
  padding: 10px;
  background-color: var(--primary);
  border: none;
  color: white;
  font-weight: bold;
  box-shadow: 3px 3px rgb(155, 155, 155);
  border-radius: 5px;
}

button:hover {
  cursor: pointer;
  animation: hover 0.1s forwards;
  filter: brightness(95%);
}

input {
  border-radius: 5px;
  box-shadow: 1px 1px rgba(155, 155, 155, 0.37);
  border: 1px solid black;
  padding: 5px 0px;
  vertical-align: middle;
}

.input-wrapper label {
  margin-right: 8px;
}

nav {
  background-image: linear-gradient(90deg,var(--primary), rgb(110, 190, 255));
  padding-left: 20px;
  min-height: 7vh;
}

nav a {
  text-decoration: none;
  color: white;
  font-size: 2.5rem;
  font-style: italic;
  font-weight: 600;
  text-shadow: 5px 5px rgb(74, 137, 255);
}

#content {
  height: 93vh;
  padding: 20px 0px 20px;
}

#home,
#project,
#todo {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.project-list,
.todo-list,
.todo-form {
  width: max(350px, 70vw);
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 10px 30px 10px;
}

.project-list li,
.todo-list li {
  display: flex;
  height: 6rem;
  margin-bottom: 30px;
}

.project-list-item,
.todo-list-item {
  flex: auto;
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  padding: 20px;
  border: 2px solid var(--primary);
  box-shadow: 4px 4px rgba(143, 143, 143, 0.589);
  font-weight: 500;
  background-color: transparent;
  color: black;
}

.project-list-item:hover,
.todo-list-item:hover {
  animation-name: hover;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  cursor: pointer;
}

.project-list-item-name,
.todo-list-item-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: max(200px, 40vw);
}

.delete {
  background-color: transparent;
  margin-left: 30px;
  flex-shrink: 0;
}

.delete svg {
  height: 3rem;
  fill: red;
}

.project-list-todo-count {
  font-style: italic;
  color: var(--primary);
}

dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid var(--primary);
}

.project-form,
.todo-form {
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    font-weight: 500;
  }

  *:nth-child(odd){
    margin-bottom: 20px;
  }
}

#todo .todo-form {
  *:nth-child(odd){
    margin-bottom: 0px;
  }

  *:nth-child(even){
    margin-bottom: 20px;
  }
}

.close-dialog {
  align-self: end;
  padding: 5px 13px;
  margin-bottom: 30px;
}

#project-name,
#todo-title {
  text-align: center;
}

.save-todo {
  background-color: rgb(0, 255, 0);
}

#todo-title,
#todo-desc {
  width: 75%;
  max-width: 75%;
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA,6CAA6C;AAC7C;EACE,sBAAsB;AACxB;;AAEA,6BAA6B;AAC7B;EACE,SAAS;AACX;;AAEA,iCAAiC;AACjC;EACE;IACE,gCAAgC;EAClC;AACF;;AAEA;EACE,kCAAkC;EAClC,gBAAgB;EAChB,8BAA8B;EAC9B,mCAAmC;AACrC;;AAEA,8BAA8B;AAC9B;EACE,cAAc;EACd,eAAe;AACjB;;AAEA,uCAAuC;AACvC;EACE,aAAa;AACf;;AAEA,4BAA4B;AAC5B;EACE,yBAAyB;AAC3B;;AAEA,6BAA6B;AAC7B;EACE,iBAAiB;AACnB;AACA;EACE,kBAAkB;AACpB;;AAEA;;CAEC;AACD;EACE,kBAAkB;AACpB;;AAEA;EACE,MAAM,mBAAmB,CAAC;EAC1B,IAAI,sBAAsB,CAAC;AAC7B;;AAEA;EACE,mJAAmJ;EACnJ,4BAA4B;AAC9B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,UAAU;EACV,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,gCAAgC;EAChC,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,sCAAsC;EACtC,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,8BAA8B;EAC9B,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,6CAA6C;EAC7C,uBAAuB;EACvB,gBAAgB;EAChB,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,2EAA2E;EAC3E,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,qBAAqB;EACrB,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,gBAAgB;EAChB,sCAAsC;AACxC;;AAEA;EACE,YAAY;EACZ,sBAAsB;AACxB;;AAEA;;;EAGE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;;;EAGE,uBAAuB;EACvB,kBAAkB;EAClB,kBAAkB;EAClB,uBAAuB;AACzB;;AAEA;;EAEE,aAAa;EACb,YAAY;EACZ,mBAAmB;AACrB;;AAEA;;EAEE,UAAU;EACV,aAAa;EACb,8BAA8B;EAC9B,eAAe;EACf,aAAa;EACb,gCAAgC;EAChC,8CAA8C;EAC9C,gBAAgB;EAChB,6BAA6B;EAC7B,YAAY;AACd;;AAEA;;EAEE,qBAAqB;EACrB,wBAAwB;EACxB,6BAA6B;EAC7B,eAAe;AACjB;;AAEA;;EAEE,uBAAuB;EACvB,mBAAmB;EACnB,gBAAgB;EAChB,2BAA2B;AAC7B;;AAEA;EACE,6BAA6B;EAC7B,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,SAAS;AACX;;AAEA;EACE,kBAAkB;EAClB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,gCAAgC;AAClC;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;;EAEnB;IACE,gBAAgB;EAClB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE;IACE,kBAAkB;EACpB;;EAEA;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;;EAEE,kBAAkB;AACpB;;AAEA;EACE,gCAAgC;AAClC;;AAEA;;EAEE,UAAU;EACV,cAAc;AAChB","sourcesContent":["/* 1. Use a more-intuitive box-sizing model */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* 2. Remove default margin */\n* {\n  margin: 0;\n}\n\n/* 3. Enable keyword animations */\n@media (prefers-reduced-motion: no-preference) {\n  html {\n    interpolate-size: allow-keywords;\n  }\n}\n\nbody {\n  /* 4. Add accessible line-height */\n  line-height: 1.5;\n  /* 5. Improve text rendering */\n  -webkit-font-smoothing: antialiased;\n}\n\n/* 6. Improve media defaults */\nimg, picture, video, canvas, svg {\n  display: block;\n  max-width: 100%;\n}\n\n/* 7. Inherit fonts for form controls */\ninput, button, textarea, select {\n  font: inherit;\n}\n\n/* 8. Avoid text overflows */\np, h1, h2, h3, h4, h5, h6 {\n  overflow-wrap: break-word;\n}\n\n/* 9. Improve line wrapping */\np {\n  text-wrap: pretty;\n}\nh1, h2, h3, h4, h5, h6 {\n  text-wrap: balance;\n}\n\n/*\n  10. Create a root stacking context\n*/\n#root, #__next {\n  isolation: isolate;\n}\n\n@keyframes hover {\n  from {transform: scale(1);}\n  to {transform: scale(1.03);}\n}\n\n:root {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  --primary: rgb(61, 177, 255);\n}\n\nbody {\n  height: 100vh;\n}\n\nul {\n  padding: 0;\n  list-style: none;\n}\n\nbutton {\n  padding: 10px;\n  background-color: var(--primary);\n  border: none;\n  color: white;\n  font-weight: bold;\n  box-shadow: 3px 3px rgb(155, 155, 155);\n  border-radius: 5px;\n}\n\nbutton:hover {\n  cursor: pointer;\n  animation: hover 0.1s forwards;\n  filter: brightness(95%);\n}\n\ninput {\n  border-radius: 5px;\n  box-shadow: 1px 1px rgba(155, 155, 155, 0.37);\n  border: 1px solid black;\n  padding: 5px 0px;\n  vertical-align: middle;\n}\n\n.input-wrapper label {\n  margin-right: 8px;\n}\n\nnav {\n  background-image: linear-gradient(90deg,var(--primary), rgb(110, 190, 255));\n  padding-left: 20px;\n  min-height: 7vh;\n}\n\nnav a {\n  text-decoration: none;\n  color: white;\n  font-size: 2.5rem;\n  font-style: italic;\n  font-weight: 600;\n  text-shadow: 5px 5px rgb(74, 137, 255);\n}\n\n#content {\n  height: 93vh;\n  padding: 20px 0px 20px;\n}\n\n#home,\n#project,\n#todo {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n}\n\n.project-list,\n.todo-list,\n.todo-form {\n  width: max(350px, 70vw);\n  overflow-x: hidden;\n  overflow-y: scroll;\n  padding: 10px 30px 10px;\n}\n\n.project-list li,\n.todo-list li {\n  display: flex;\n  height: 6rem;\n  margin-bottom: 30px;\n}\n\n.project-list-item,\n.todo-list-item {\n  flex: auto;\n  display: flex;\n  justify-content: space-between;\n  font-size: 2rem;\n  padding: 20px;\n  border: 2px solid var(--primary);\n  box-shadow: 4px 4px rgba(143, 143, 143, 0.589);\n  font-weight: 500;\n  background-color: transparent;\n  color: black;\n}\n\n.project-list-item:hover,\n.todo-list-item:hover {\n  animation-name: hover;\n  animation-duration: 0.2s;\n  animation-fill-mode: forwards;\n  cursor: pointer;\n}\n\n.project-list-item-name,\n.todo-list-item-title {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  max-width: max(200px, 40vw);\n}\n\n.delete {\n  background-color: transparent;\n  margin-left: 30px;\n  flex-shrink: 0;\n}\n\n.delete svg {\n  height: 3rem;\n  fill: red;\n}\n\n.project-list-todo-count {\n  font-style: italic;\n  color: var(--primary);\n}\n\ndialog {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  border: 3px solid var(--primary);\n}\n\n.project-form,\n.todo-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  label {\n    font-weight: 500;\n  }\n\n  *:nth-child(odd){\n    margin-bottom: 20px;\n  }\n}\n\n#todo .todo-form {\n  *:nth-child(odd){\n    margin-bottom: 0px;\n  }\n\n  *:nth-child(even){\n    margin-bottom: 20px;\n  }\n}\n\n.close-dialog {\n  align-self: end;\n  padding: 5px 13px;\n  margin-bottom: 30px;\n}\n\n#project-name,\n#todo-title {\n  text-align: center;\n}\n\n.save-todo {\n  background-color: rgb(0, 255, 0);\n}\n\n#todo-title,\n#todo-desc {\n  width: 75%;\n  max-width: 75%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/styles.css
var styles = __webpack_require__(365);
;// ./src/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.A, options);




       /* harmony default export */ const src_styles = (styles/* default */.A && styles/* default */.A.locals ? styles/* default */.A.locals : undefined);

;// ./src/project.js
function createProject(name, id=crypto.randomUUID(), todos={}) {
    if (name.length > 30) {
        throw new Error('Project name must not be longer than 30 characters.')
    }

    function addToDo(todo) {
        todos[todo.getFields().id] = todo;
    }

    function getId() {
        return id;
    }

    function getTodoCount() {
        return Object.keys(todos).length;
    }

    function getTodos() {
        return { ...todos };
    }

    function removeToDo(todoId) {
        delete todos[todoId];
    }


    return { name, addToDo, getId, getTodoCount, getTodos, removeToDo };
}

;// ./src/todo.js
function createTodo(title, description, dueDate, priority, id=crypto.randomUUID(), isComplete=false) {
    function setTitle(newTitle) {
        title = newTitle;
    }

    function setDescription(newDescription) {
        description = newDescription;
    }

    function setDueDate(newDueDate) {
        dueDate = newDueDate;
    }

    function setPriority(newPriority) {
        priority = newPriority;
    }

    function setCompletion(completion) {
        isComplete = completion;
    }

    function getFields() {
        return {
            id,
            title,
            description,
            dueDate,
            priority,
            isComplete,
        };
    }

    return { setTitle, setDescription, setDueDate, setPriority,
        setCompletion, getFields };
}

;// ./src/storage.js




function loadProjects() {
    if (!storageAvailable('localStorage') || !localStorage.getItem('projects')) {
        return null;
    }

    const savedProjects = JSON.parse(localStorage.getItem('projects'));
    const projects = {};

    for (const projectId in savedProjects) {
        const savedProject = savedProjects[projectId];
        const todos = {};

        for (const todoId in savedProject.todos) {
            const savedTodo = JSON.parse(savedProject.todos[todoId]);
            const todo = createTodo(savedTodo.title, savedTodo.description,
                                    savedTodo.dueDate, savedTodo.priority,
                                    savedTodo.id, savedTodo.isComplete);

            todos[todo.getFields().id] = todo;
        }

        const project = createProject(savedProject.name, savedProject.id, todos);
        projects[project.getId()] = project;
    }

    return projects;
}


function saveNewProject(project) {
    if (!storageAvailable('localStorage')) {
        return false;
    }

    if (!localStorage.getItem('projects')) {
        localStorage.setItem('projects', JSON.stringify({}));
    }

    const projects = JSON.parse(localStorage.getItem('projects'));
    project['todos'] = project.getTodos();
    project['id'] = project.getId();
    projects[project.getId()] = project;
    localStorage.setItem('projects', JSON.stringify(projects));

    return true;
}


function saveTodo(projectId, todo) {
    if (!storageAvailable('localStorage')) {
        return false;
    }

    const todoData = todo.getFields();
    const projects = JSON.parse(localStorage.getItem('projects'));
    projects[projectId]['todos'][todoData.id] = JSON.stringify(todoData);
    localStorage.setItem('projects', JSON.stringify(projects));

    return true;
}


function deleteTodo(projectId, todoId) {
    if (!storageAvailable('localStorage')) {
        return false;
    }

    const projects = JSON.parse(localStorage.getItem('projects'));
    delete projects[projectId]['todos'][todoId];
    localStorage.setItem('projects', JSON.stringify(projects));

    return true;
}


function deleteProject(projectId) {
    if (!storageAvailable('localStorage')) {
        return false;
    }

    const projects = JSON.parse(localStorage.getItem('projects'));
    delete projects[projectId];
    localStorage.setItem('projects', JSON.stringify(projects));

    return true;
}


function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage &&
      storage.length !== 0
    );
  }
}

;// ./src/homeView.js




function loadHomeView(projects) {
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const projectList = document.createElement('ul');
    projectList.className = 'project-list';
    fillProjectList(projectList, projects);

    const newProjectButton = document.createElement('button');
    newProjectButton.type = 'button';
    newProjectButton.className = 'new-project';
    newProjectButton.textContent = 'New project';

    const dialog = createProjectDialog(projects, projectList);
    newProjectButton.addEventListener('click', () => {
        dialog.showModal();
    });

    homeContainer.append(projectList, newProjectButton, dialog);

    return homeContainer;
}


function fillProjectList(projectList, projects) {
    for (const projectId in projects) {
        const project = projects[projectId];
        const listItem = document.createElement('li');

        const listButton = document.createElement('button');
        listButton.type = 'button';
        listButton.className = 'project-list-item';
        listButton.dataset.projectId = projectId;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.type = 'button';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        const svgTitle = document.createElement('title');
        svgTitle.textContent = 'delete';
        svg.append(svgTitle);
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('d', 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z');
        svg.append(svgPath);
        deleteButton.append(svg);

        deleteButton.addEventListener('click', () => {
            listItem.remove();
            deleteProject(projectId);
        })

        const projectName = document.createElement('span');
        projectName.textContent = project.name;
        projectName.className = 'project-list-item-name';
        listButton.appendChild(projectName);

        const listCount = document.createElement('span');
        listCount.className = 'project-list-todo-count';
        listCount.textContent = project.getTodoCount();
        listButton.appendChild(listCount);

        listItem.append(listButton, deleteButton);
        projectList.appendChild(listItem);
    }
}


function createProjectDialog(projects, projectList) {
    const dialog = document.createElement('dialog');

    const form = document.createElement('form');
    form.method = 'dialog';
    form.className = 'project-form';
    dialog.appendChild(form);

    const closeDialogButton = document.createElement('button');
    closeDialogButton.type = 'button';
    closeDialogButton.className = 'close-dialog';
    closeDialogButton.innerHTML = 'X';
    closeDialogButton.addEventListener('click', () => dialog.close());

    const label = document.createElement('label');
    label.setAttribute('for', 'project-name');
    label.textContent = 'Project name';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'project-name';
    input.name = 'project-name';
    input.maxLength = 30;
    input.required = true;
    input.autofocus = true;

    const submitButton = document.createElement('button');
    submitButton.className = 'submit-project';
    submitButton.type = 'submit';
    submitButton.textContent = 'Create';

    form.addEventListener('submit', () => {
        const projectName = input.value;
        const project = createProject(projectName);
        const projectId = project.getId();
        projects[projectId] = project;
        fillProjectList(projectList, { [projectId]: project });

        saveNewProject(project);

        input.value = null;
    });

    form.append(closeDialogButton, label, input, submitButton);

    return dialog;
}

;// ./src/projectView.js




function loadProjectView(project) {
    const projectContainer = document.createElement('div');
    projectContainer.id = 'project';

    const todoList = document.createElement('ul');
    todoList.className = 'todo-list';
    const todos = project.getTodos();
    fillTodoList(todoList, todos, project.getId());

    const newTodoButton = document.createElement('button');
    newTodoButton.type = 'button';
    newTodoButton.className = 'new-todo';
    newTodoButton.textContent = 'New todo';

    const dialog = createTodoDialog(project, todoList);
    newTodoButton.addEventListener('click', () => {
        dialog.showModal();
    });
    projectContainer.append(todoList, newTodoButton, dialog);

    return projectContainer;
}


function fillTodoList(todoList, todos, projectId) {
    for (const todoId in todos) {
        const todo = todos[todoId];
        const todoFields = todo.getFields();
        const listItem = document.createElement('li');

        const listButton = document.createElement('button');
        listButton.type = 'button';
        listButton.className = 'todo-list-item';
        listButton.dataset.todoId = todoFields.id;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.type = 'button';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        const svgTitle = document.createElement('title');
        svgTitle.textContent = 'delete';
        svg.append(svgTitle);
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('d', 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z');
        svg.append(svgPath);
        deleteButton.append(svg);

        deleteButton.addEventListener('click', () => {
            delete todos[todoId];
            listItem.remove();
            deleteTodo(projectId, todoFields.id);
        })

        const todoTitle = document.createElement('span');
        todoTitle.textContent = todoFields.title;
        todoTitle.className = 'todo-list-item-title';
        listButton.appendChild(todoTitle);

        const todoDueDate = document.createElement('span');
        todoDueDate.textContent = todoFields.dueDate;
        todoDueDate.className = 'todo-list-due-date';
        listButton.appendChild(todoDueDate);

        listItem.append(listButton, deleteButton);
        todoList.appendChild(listItem);
    };
}


function createTodoDialog(project, todoList) {
    const dialog = document.createElement('dialog');

    const form = document.createElement('form');
    form.method = 'dialog';
    form.className = 'todo-form';
    dialog.appendChild(form);

    const closeDialogButton = document.createElement('button');
    closeDialogButton.type = 'button';
    closeDialogButton.className = 'close-dialog';
    closeDialogButton.innerHTML = 'X';
    closeDialogButton.addEventListener('click', () => dialog.close());

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'todo-title');
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'todo-title';
    titleInput.name = 'todo-title';
    titleInput.maxLength = 30;
    titleInput.required = true;
    titleInput.autofocus = true;

    const descLabel = document.createElement('label');
    descLabel.setAttribute('for', 'todo-desc');
    descLabel.textContent = 'Description';
    const descTextArea = document.createElement('textarea');
    descTextArea.id = 'todo-desc';
    descTextArea.name = 'todo-desc';
    descTextArea.maxLength = 500;

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'todo-due-date');
    dueDateLabel.textContent = 'Date due';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'todo-due-date';
    dueDateInput.name = 'todo-due-date';
    dueDateInput.min = new Date().toISOString().split('T')[0];
    dueDateInput.value = dueDateInput.min;

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'todo-priority');
    priorityLabel.textContent = 'Priority';
    const priorityInput = document.createElement('input');
    priorityInput.type = 'number';
    priorityInput.id = 'todo-priority';
    priorityInput.name = 'todo-priority';
    priorityInput.min = 1;
    priorityInput.value = priorityInput.min;
    priorityInput.max = 3;
    priorityInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.className = 'submit-todo';
    submitButton.type = 'submit';
    submitButton.textContent = 'Create';

    form.addEventListener('submit', () => {
        const title = titleInput.value;
        const desc = descTextArea.value;
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

        const todo = createTodo(title, desc, dueDate, priority);
        const todoId = todo.getFields().id;
        project.addToDo(todo);
        fillTodoList(todoList, { [todoId]: todo });

        saveTodo(project.getId(), todo);

        titleInput.value = null;
        descTextArea.value = null;
        dueDateInput.value = dueDateInput.min;
        priorityInput.value = priorityInput.min;
    });

    form.append(
        closeDialogButton,
        titleLabel, titleInput,
        descLabel, descTextArea,
        dueDateLabel, dueDateInput,
        priorityLabel, priorityInput,
        submitButton
    );

    return dialog;
}

;// ./src/todoView.js



function loadTodoView(todo, projectId) {
    const todoContainer = document.createElement('div');
    todoContainer.id = 'todo';

    const todoForm = createTodoForm(todo, projectId);
    todoContainer.append(todoForm);

    return todoContainer;
}


function createTodoForm(todo, projectId) {
    const todoFields = todo.getFields();

    const form = document.createElement('form');
    form.className = 'todo-form';

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'todo-title');
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.value = todoFields.title;
    titleInput.type = 'text';
    titleInput.id = 'todo-title';
    titleInput.name = 'todo-title';
    titleInput.maxLength = 30;
    titleInput.required = true;
    titleInput.autofocus = true;

    const descLabel = document.createElement('label');
    descLabel.setAttribute('for', 'todo-desc');
    descLabel.textContent = 'Description';
    const descTextArea = document.createElement('textarea');
    descTextArea.value = todoFields.description;
    descTextArea.id = 'todo-desc';
    descTextArea.name = 'todo-desc';
    descTextArea.maxLength = 500;

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'todo-due-date');
    dueDateLabel.textContent = 'Date due';
    const dueDateInput = document.createElement('input');
    dueDateInput.value = todoFields.dueDate;
    dueDateInput.type = 'date';
    dueDateInput.id = 'todo-due-date';
    dueDateInput.name = 'todo-due-date';
    dueDateInput.min = new Date().toISOString().split('T')[0];

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'todo-priority');
    priorityLabel.textContent = 'Priority';
    const priorityInput = document.createElement('input');
    priorityInput.value = todoFields.priority;
    priorityInput.type = 'number';
    priorityInput.id = 'todo-priority';
    priorityInput.name = 'todo-priority';
    priorityInput.min = 1;
    priorityInput.max = 3;
    priorityInput.required = true;

    const completionLabel = document.createElement('label');
    completionLabel.setAttribute('for', 'todo-completion');
    completionLabel.textContent = 'Completed?';
    const completionInput = document.createElement('input');
    completionInput.checked = todoFields.isComplete;
    completionInput.type = 'checkbox';
    completionInput.name = 'todo-completion';
    completionInput.id = 'todo-completion';

    const saveButton = document.createElement('button');
    saveButton.className = 'save-todo';
    saveButton.type = 'submit';
    saveButton.textContent = 'Save';

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        todo.setTitle(titleInput.value);
        todo.setDescription(descTextArea.value);
        todo.setDueDate(dueDateInput.value);
        todo.setPriority(priorityInput.value);
        todo.setCompletion(completionInput.checked);

        saveTodo(projectId, todo);
    });

    form.append(
        titleLabel, titleInput,
        descLabel, descTextArea,
        dueDateLabel, dueDateInput,
        priorityLabel, priorityInput,
        completionLabel, completionInput,
        saveButton,
    );

    return form;
}

;// ./src/index.js








(() => {
    let projects = loadProjects();

    if (!projects) {
        projects = {};
        const defaultProject = createProject('(untitled project)');
        projects[defaultProject.getId()] = defaultProject;
        saveNewProject(defaultProject);
    }

    switchView(loadHomeView(projects));

    const projectList = document.querySelector('.project-list');
    projectList.addEventListener('click', (e) => {
        if (e.target.className === 'project-list-item') {
            const projectId = e.target.dataset.projectId;
            const project = projects[projectId];
            switchView(loadProjectView(project));

            const todoList = document.querySelector('.todo-list');
            todoList.addEventListener('click', (e) => {
                if (e.target.className === 'todo-list-item') {
                    const todoId = e.target.dataset.todoId;
                    const todos = project.getTodos();
                    const todo = todos[todoId];

                    switchView(loadTodoView(todo, projectId));
                }
            })
        }
    });
})();


function switchView(view) {
    const contentContainer = document.querySelector('#content');
    contentContainer.innerHTML = '';
    contentContainer.appendChild(view);
}

/******/ })()
;
//# sourceMappingURL=main.js.map