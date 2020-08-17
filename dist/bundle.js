/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./headerElement */ \"./src/js/headerElement.js\");\n__webpack_require__(/*! ./footerElement */ \"./src/js/footerElement.js\");\n__webpack_require__(/*! ./articleThumbLeftElement */ \"./src/js/articleThumbLeftElement.js\");\n__webpack_require__(/*! ./articleThumbRightElement */ \"./src/js/articleThumbRightElement.js\");\n__webpack_require__(/*! ./articleThumbUp */ \"./src/js/articleThumbUp.js\");\n__webpack_require__(/*! ./teamShort */ \"./src/js/teamShort.js\");\nsearchForm();\nfetchTeamMembers();\n\nfunction searchForm() {\n  document.querySelector(\".search-toggle\").addEventListener(\"click\", () => {\n    document\n      .querySelector(\"header .search-form\")\n      .classList.toggle(\"open-search\");\n  });\n}\n\nasync function fetchTeamMembers() {\n  if (document.querySelector(\".team-members\")) {\n    const url = `https://gdg-ms-team.herokuapp.com/api/members`;\n\n    let response = await fetch(url);\n    const reader = response.body.getReader();\n\n    let receivedLength = 0; // количество байт, полученных на данный момент\n    let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)\n    while (true) {\n      const { done, value } = await reader.read();\n\n      if (done) {\n        break;\n      }\n\n      chunks.push(value);\n      receivedLength += value.length;\n    }\n    let chunksAll = new Uint8Array(receivedLength); // (4.1)\n    let position = 0;\n    for (let chunk of chunks) {\n      chunksAll.set(chunk, position); // (4.2)\n      position += chunk.length;\n    }\n\n    let result = new TextDecoder(\"utf-8\").decode(chunksAll);\n\n    let members = JSON.parse(result);\n\n    let teamContainer = document.querySelector(\".team-members .container .row\");\n\n    for (let member of members) {\n      let memberElement = document.createElement(\"rd-team-short\");\n      memberElement.classList.add(\"col-md-4\");\n      memberElement.setAttribute(\"avatar\", member.photo[0]);\n      memberElement.setAttribute(\"giturl\", member.github);\n      memberElement.setAttribute(\"linkedinurl\", member.linkedin);\n      memberElement.setAttribute(\"email\", member.email);\n\n      let fullName = document.createElement(\"div\");\n      fullName.setAttribute(\"slot\", \"fullname\");\n      fullName.appendChild(\n        document.createTextNode(`${member.firstName} ${member.lastName}`)\n      );\n\n      let email = document.createElement(\"div\");\n      email.setAttribute(\"slot\", \"email\");\n      email.appendChild(document.createTextNode(`${member.email}`));\n\n      let position = document.createElement(\"div\");\n      position.setAttribute(\"slot\", \"position\");\n      position.appendChild(document.createTextNode(`${member.position}`));\n\n      memberElement.appendChild(fullName);\n      memberElement.appendChild(email);\n      memberElement.appendChild(position);\n      teamContainer.appendChild(memberElement);\n    }\n  } else {\n    console.log(\"non team\");\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/articleThumbLeftElement.js":
/*!*******************************************!*\
  !*** ./src/js/articleThumbLeftElement.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const articleLeftImgTemplate = document.createElement(\"template\");\n\narticleLeftImgTemplate.innerHTML = `\n  <div class=\"mb-3 d-flex row\">\n    <figure class=\"col-md-5\">\n      <a href=\"single.html\"\n        ><img\n          src=\"./img/thumb/thumb-512x512.jpg\"\n          alt=\"post-title\"\n      /></a>\n    </figure>\n    <div class=\"entry-content col-md-7 pl-md-0\">\n      <h5 class=\"entry-title mb-3\">\n        <a href=\"single.html\"\n          >I Learned How to Die Before I Knew How to Live</a\n        >\n      </h5>\n      <div class=\"entry-excerpt\">\n        <p>\n          Tech companies need more than advisory boards if\n          they want.\n        </p>\n      </div>\n      <div class=\"entry-meta align-items-center\">\n        <a href=\"author.html\">Anna Goldfarb</a> in\n        <a href=\"archive.html\">Fashion</a><br />\n        <span>March 12</span>\n        <span class=\"middotDivider\"></span>\n        <span class=\"readingTime\" title=\"3 min read\"\n          >4 min read</span\n        >\n        <span class=\"svgIcon svgIcon--star\">\n          <svg class=\"svgIcon-use\" width=\"15\" height=\"15\">\n            <path\n              d=\"M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z\"\n            ></path>\n          </svg>\n        </span>\n      </div>\n    </div>\n  </div>\n`;\n\nclass ArticleLeftImg extends HTMLElement {\n  constructor() {\n    super();\n    this.appendChild(articleLeftImgTemplate.content.cloneNode(true));\n  }\n}\n\nwindow.customElements.define(\"rb-article-left\", ArticleLeftImg);\n\n\n//# sourceURL=webpack:///./src/js/articleThumbLeftElement.js?");

/***/ }),

/***/ "./src/js/articleThumbRightElement.js":
/*!********************************************!*\
  !*** ./src/js/articleThumbRightElement.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const template = document.createElement(\"template\");\n\ntemplate.innerHTML = `\n<div class=\"col-md-9\">\n  <div class=\"align-self-center\">\n    <div class=\"capsSubtle mb-2\">Editors' Pick</div>\n    <h3 class=\"entry-title mb-3\">\n      <a href=\"single.html\"\n        >Home Internet Is Becoming a Luxury for the Wealthy</a\n      >\n    </h3>\n    <div class=\"entry-excerpt\">\n      <p>\n        And black on meretriciously regardless well fearless\n        irksomely as about hideous wistful bat less oh much\n        and occasional useful rat darn jeepers far.\n      </p>\n    </div>\n    <div class=\"entry-meta align-items-center\">\n      <a href=\"author.html\">Dave Gershgorn</a> in\n      <a href=\"archive.html\">OneZero</a><br />\n      <span>May 21</span>\n      <span class=\"middotDivider\"></span>\n      <span class=\"readingTime\" title=\"3 min read\"\n        >5 min read</span\n      >\n      <span class=\"svgIcon svgIcon--star\">\n        <svg class=\"svgIcon-use\" width=\"15\" height=\"15\">\n          <path\n            d=\"M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z\"\n          ></path>\n        </svg>\n      </span>\n    </div>\n  </div>\n  </div>\n<div\n  class=\"col-md-3 bgcover\"\n  style=\"\n    background-image: url(./img/thumb/thumb-800x495.jpg);\n  \"\n></div>\n`;\n\nclass ArticleImgRight extends HTMLElement {\n  constructor() {\n    super();\n\n    this.appendChild(template.content.cloneNode(true));\n  }\n}\n\nwindow.customElements.define(\"rd-article-right\", ArticleImgRight);\n\n\n//# sourceURL=webpack:///./src/js/articleThumbRightElement.js?");

/***/ }),

/***/ "./src/js/articleThumbUp.js":
/*!**********************************!*\
  !*** ./src/js/articleThumbUp.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const template = document.createElement(\"template\");\n\ntemplate.innerHTML = `\n  <a href=\"single.html\"><figure class=\"bgcover\" style=\"background-image:url(./img/thumb/thumb-512x512.jpg);height: 350px;\"></figure></a>\n  <h3 class=\"entry-title mb-3\"><a href=\"single.html\">Can Resolving Emotional Trauma Ease Chronic Pain?</a></h3>\n  <div class=\"entry-excerpt\">\n      <p>\n        A new therapy teaches people to process their trauma as a way to treat chronic pain. Does it work? \n      </p>\n  </div>\n  <div class=\"entry-meta align-items-center\">\n      <a href=\"author.html\">Oliver</a> in <a href=\"archive.html\">OneZero</a><br>                                  \n      <span>Jun 14</span>\n      <span class=\"middotDivider\"></span>\n      <span class=\"readingTime\" title=\"3 min read\">3 min read</span>\n      <span class=\"svgIcon svgIcon--star\">\n          <svg class=\"svgIcon-use\" width=\"15\" height=\"15\">\n              <path d=\"M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z\"></path>\n          </svg>\n      </span>\n  </div>\n`;\n\nclass ArticleThumbUp extends HTMLElement {\n  constructor() {\n    super();\n    this.appendChild(template.content.cloneNode(true));\n  }\n}\n\nwindow.customElements.define(\"rd-article-up\", ArticleThumbUp);\n\n\n//# sourceURL=webpack:///./src/js/articleThumbUp.js?");

/***/ }),

/***/ "./src/js/footerElement.js":
/*!*********************************!*\
  !*** ./src/js/footerElement.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const templateFooter = document.createElement(\"template\");\n\ntemplateFooter.innerHTML = `\n<footer class=\"mt-5\">\n<div class=\"container\">\n  <div class=\"divider\"></div>\n  <div class=\"row\">\n    <div class=\"col-md-6 copyright text-xs-center\">\n      <p>\n        Copyright ?? 2019 GBG Baku inc. Designed by\n        <a href=\"https://alithemes.com\">AliThemes.com</a>\n      </p>\n    </div>\n    <div class=\"col-md-6\">\n      <ul class=\"social-network inline text-md-right text-sm-center\">\n        <li class=\"list-inline-item\">\n          <a href=\"#\"><i class=\"icon-facebook\"></i></a>\n        </li>\n        <li class=\"list-inline-item\">\n          <a href=\"#\"><i class=\"icon-twitter\"></i></a>\n        </li>\n        <li class=\"list-inline-item\">\n          <a href=\"#\"><i class=\"icon-behance\"></i></a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n</footer>\n`;\n\nclass footerElement extends HTMLElement {\n  constructor() {\n    super();\n\n    this.appendChild(templateFooter.content.cloneNode(true));\n  }\n}\n\nwindow.customElements.define(\"rd-footer\", footerElement);\n\n\n//# sourceURL=webpack:///./src/js/footerElement.js?");

/***/ }),

/***/ "./src/js/headerElement.js":
/*!*********************************!*\
  !*** ./src/js/headerElement.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* CREATE TEMPLATE FOR HEADER WITH TEMPLATE ELEMENT*/\n\nconst templateHeader = document.createElement(\"template\");\n\ntemplateHeader.innerHTML = ` \n<header id=\"header\" class=\"d-lg-block d-none\">\n<div class=\"container\">\n  <div class=\"align-items-center w-100\">\n    <h1 class=\"logo float-left navbar-brand\">\n      <a href=\"index.html\" class=\"logo\">Rubber Duck</a>\n    </h1>\n    <div class=\"header-right float-right w-50\">\n      <div\n        class=\"d-inline-flex float-right text-right align-items-center\"\n      >\n        <ul\n          class=\"social-network heading navbar-nav d-lg-flex align-items-center\"\n        >\n          <li>\n            <a href=\"#\"><i class=\"icon-facebook\"></i></a>\n          </li>\n        </ul>\n        <ul\n          class=\"top-menu heading navbar-nav w-100 d-md-flex flex-row align-items-center\"\n        >\n          <li><a href=\"./signin.html\" class=\"btn\">Sign In</a></li>\n          <li><a href=\"./signup.html\" class=\"btn\">Sign Up</a></li>\n        </ul>\n        <a class=\"author-avatar\" href=\"#\"\n          ><img src=\"./img/thumb/author-avata-1.jpg\" alt=\"\"\n        /></a>\n      </div>\n      <form\n        action=\"#\"\n        method=\"get\"\n        class=\"search-form d-lg-flex float-right\"\n      >\n        <a href=\"javascript:void(0)\" class=\"search-toggle\">\n          <i class=\"icon-search\"></i>\n        </a>\n        <input\n          type=\"text\"\n          class=\"search_field\"\n          placeholder=\"Search...\"\n          value=\"\"\n          name=\"s\"\n        />\n      </form>\n    </div>\n  </div>\n  <div class=\"clearfix\"></div>\n</div>\n<nav id=\"main-menu\" class=\"stick d-lg-block d-none\">\n  <div class=\"container\">\n    <div class=\"menu-primary\">\n      <ul>\n        <li class=\"current-menu-item\"><a href=\"index.html\">Home</a></li>\n        <li class=\"menu-item-has-children\">\n          <a href=\"categories.html\">Categories</a>\n          <ul class=\"sub-menu\">\n            <li><a href=\"categories.html\">Politics</a></li>\n            <li><a href=\"categories.html\">Health</a></li>\n            <li><a href=\"categories.html\">Design</a></li>\n          </ul>\n        </li>\n        <li><a href=\"team.html\">Team</a></li>\n        <li><a href=\"categories.html\">Politics</a></li>\n        <li><a href=\"categories.html\">Health</a></li>\n        <li><a href=\"categories.html\">Design</a></li>\n        <li><a href=\"categories.html\">Startups</a></li>\n        <li><a href=\"categories.html\">Culture</a></li>\n        <li><a href=\"contact.html\">Contact</a></li>\n        <li class=\"menu-item-has-children\">\n          <a href=\"#\">More...</a>\n          <ul class=\"sub-menu\">\n            <li><a href=\"search.html\">Search</a></li>\n            <li><a href=\"author.html\">Author</a></li>\n            <li><a href=\"404.html\">404</a></li>\n          </ul>\n        </li>\n      </ul>\n      <span></span>\n    </div>\n  </div>\n</nav>\n</header>\n`;\n\n// DEFINE HEADER CLASS\n\nclass HeaderElement extends HTMLElement {\n  constructor() {\n    super();\n    this.appendChild(templateHeader.content.cloneNode(true));\n  }\n}\n\n// DEFINE A TAG NAME FOR THE CLASS\nwindow.customElements.define(\"rd-header\", HeaderElement);\n\n\n//# sourceURL=webpack:///./src/js/headerElement.js?");

/***/ }),

/***/ "./src/js/teamShort.js":
/*!*****************************!*\
  !*** ./src/js/teamShort.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const template = document.createElement(\"template\");\n\ntemplate.innerHTML = `\n  <style>\n\n    a {\n      text-decoration: none;\n    }\n\n    .team-short {\n      width: 100%;\n      margin: 1.5rem 0.5rem;\n      display: flex;\n      flex-direction: row;\n      justify-content: flex-start;\n      align-items: center;\n      color: rgba(0,0,0,.84)\n\n    }\n\n    .team-short-img {\n      margin: 1rem;\n      clip-path: circle(50%);\n      height: 100px;\n      width: 100px;\n    }\n\n    .team-short-top {\n      margin-bottom: 1.0rem;\n    }\n\n    .team-short-top a {\n      color: rgba(0,0,0,.84);\n      font-size: 1.2rem;\n    }\n\n    .team-short-top p {\n      margin: 0;\n      font-size: .9rem\n    }\n\n    .team-short-top h5 {\n      margin-bottom: 0.3rem;\n    }\n\n    .team-short-content {\n      color: #555;\n      font-size: 1rem;\n    }\n\n    .content-social-author {\n      display: flex;\n      justify-content: flex-start;\n      align-items: center;\n    }\n\n    .author-social {\n      color: rgba(0,0,0,.84);\n      margin-right: 1rem;\n      font-size: 1rem;\n      font-weight: 500;\n    }\n\n    .author-social:hover, .team-short-top a:hover {\n      color: #03a87c\n    } \n\n    .email {\n      display: block;\n      color: #555;\n      font-size: 0.9rem;\n      margin-bottom: 0.5rem;\n    }\n\n  </style>\n  \n    <div class=\"team-short\">\n        <div class=\"team-short-img\">\n            <img alt=\"author avatar\" src=\"./img/thumb/author-avata-1.jpg\" class=\"team-short-avatar\">\n        </div>\n        <div class=\"team-short-content\">\n          <div class=\"team-short-top\">\n            <h5>\n              <a href=\"author.html\" title=\"Ryan\" rel=\"author\">\n                <slot name=\"fullname\"></slot>\n               \n              </a>\n            </h5>\n            <p class=\"team-position\"><slot name=\"position\"></slot></p>\n          </div>\n            <a class=\"email\" href=\"mailto:niyatsu@gmail.com\"><slot name=\"email\"></slot></a>\n            <div class=\"content-social-author\">\n                <a target=\"_blank\" class=\"author-social\" href=\"#\">GitHub </a>\n                <a target=\"_blank\" class=\"author-social\" href=\"#\">LinkedIn </a>\n            </div>\n        </div>\n    </div> \n   \n`;\n\nclass TeamShort extends HTMLElement {\n  constructor() {\n    super();\n\n    this.attachShadow({ mode: \"open\" });\n    this.shadowRoot.appendChild(template.content.cloneNode(true));\n  }\n\n  connectedCallback() {\n    let avatarUrl = this.getAttribute(\"avatar\");\n    let gitUrl = this.getAttribute(\"giturl\");\n    let linkedinUrl = this.getAttribute(\"linkedinurl\");\n\n    let avatarImg = this.shadowRoot.querySelector(\".team-short-avatar\");\n    avatarImg.setAttribute(\"src\", avatarUrl);\n\n    let gitAnchor = this.shadowRoot.querySelector(\n      \".content-social-author a:first-child\"\n    );\n    gitAnchor.href = gitUrl;\n\n    let linkedinAnchor = this.shadowRoot.querySelector(\n      \".content-social-author a:last-child\"\n    );\n    linkedinAnchor.href = linkedinUrl;\n\n    let email = this.shadowRoot.querySelector(\".email\");\n    email.href = `mailto:${this.getAttribute(\"email\")}`;\n    console.log(avatarUrl);\n  }\n}\n\nwindow.customElements.define(\"rd-team-short\", TeamShort);\n\n\n//# sourceURL=webpack:///./src/js/teamShort.js?");

/***/ })

/******/ });