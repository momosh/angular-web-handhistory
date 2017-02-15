/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AppModule = undefined;

	var _app = __webpack_require__(70);

	var _common = __webpack_require__(92);

	var _components = __webpack_require__(127);

	var _app2 = __webpack_require__(136);

	__webpack_require__(137);

	var AppModule = exports.AppModule = angular.module('angular-web-handgroups', [_common.CommonModule, _components.ComponentsModule, 'ngAnimate', 'jivaro.replayer']).component('handGroups', _app.AppComponent).service('AppService', _app2.AppService).name;
	// styles

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AppComponent = undefined;

	var _classCallCheck2 = __webpack_require__(71);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(72);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _app = __webpack_require__(91);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AppController = function () {
	    function AppController(AppService) {
	        'ngInject';

	        (0, _classCallCheck3.default)(this, AppController);
	        this.service = AppService;
	    }

	    (0, _createClass3.default)(AppController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            var _this = this;

	            this.gameListLoading = true; // set gameListLoading flag

	            this.queryParams = {
	                pagesize: 10 };

	            this.service.getHandHistory(this.queryParams, this.userId).then(function (res) {
	                _this.handhistory = res.data;
	                if (res.lastdate) _this.queryParams['lastdate'] = res.lastdate;
	                _this.gameListLoading = false; // after data is loaded stop the spinner
	            });
	        }
	    }, {
	        key: 'filterClickHandler',
	        value: function filterClickHandler(event) {
	            var _this2 = this;

	            this.gameListLoading = true; // start Spinner
	            this.nothingToLoad = false; // new cycle for data loading

	            // handles Game Type clicks (Tourney or Cash)
	            if (event.type) {
	                // remove query param for game type if not in $event
	                if (!event.query) {
	                    delete this.queryParams['gametype'];
	                } else {
	                    this.queryParams['gametype'] = event.type;
	                }
	            }
	            // handles Game Outcome clicks (Won or Lost)
	            if (event.outcome) {
	                // remove query param if not in $event
	                if (!event.query) {
	                    delete this.queryParams['outcome'];
	                } else {
	                    this.queryParams['outcome'] = event.outcome;
	                }
	            }

	            delete this.queryParams['lastdate'];

	            // get Hand History data for defined parameters
	            this.service.getHandHistory(this.queryParams, this.userId).then(function (res) {
	                _this2.handhistory = res.data;
	                if (res.lastdate) _this2.queryParams['lastdate'] = res.lastdate;
	                _this2.gameListLoading = false;
	            });
	        }
	    }, {
	        key: 'loadOnScroll',
	        value: function loadOnScroll() {
	            var _this3 = this;

	            // break infinite scroll if previous load was empty, previous load on scroll
	            // event hasn't finished yet or onInit load is active
	            if (this.nothingToLoad || this.scrollStillLoading || this.gameListLoading) {
	                return;
	            }

	            this.gameListLoading = this.scrollLoading = true; //  set flags for loading spinner

	            // Call HandHistory Service with query params
	            this.service.getHandHistory(this.queryParams, this.userId).then(function (res) {
	                // Push returned data to existing handhistory
	                if (res.data) _this3.handhistory = _this3.handhistory.concat(res.data);
	                if (res.lastdate) _this3.queryParams['lastdate'] = res.lastdate;
	                if (res.data.length == 0) _this3.nothingToLoad = true; // if no data is returned there is nothing to load
	                _this3.gameListLoading = _this3.scrollLoading = false;
	                _this3.scrollStillLoading = false; // after everything is done, alow next load on scroll event
	            });

	            this.scrollStillLoading = true; // flag that prevents overloading on scroll event
	        }
	    }]);
	    return AppController;
	}();

	var AppComponent = exports.AppComponent = {
	    template: _app2.default,
	    controller: AppController,
	    bindings: {
	        userId: '<'
	    }
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(73);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	var $Object = __webpack_require__(78).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(76);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(86), 'Object', {defineProperty: __webpack_require__(82).f});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(77)
	  , core      = __webpack_require__(78)
	  , ctx       = __webpack_require__(79)
	  , hide      = __webpack_require__(81)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 77 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 78 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(80);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(82)
	  , createDesc = __webpack_require__(90);
	module.exports = __webpack_require__(86) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(83)
	  , IE8_DOM_DEFINE = __webpack_require__(85)
	  , toPrimitive    = __webpack_require__(89)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(86) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(84);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(86) && !__webpack_require__(87)(function(){
	  return Object.defineProperty(__webpack_require__(88)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(87)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(84)
	  , document = __webpack_require__(77).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(84);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = "<filter-bar\n    on-filter-click=\"$ctrl.filterClickHandler($event)\">\n</filter-bar>\n\n<game-list\n    hide=\"$ctrl.gameListLoading && !$ctrl.scrollLoading\"\n    history=\"$ctrl.handhistory\"\n    on-bottom-scroll=\"$ctrl.loadOnScroll()\">\n</game-list>\n\n<spinner\n    visible=\"$ctrl.gameListLoading || $ctrl.scrollLoading\"\n    icon=\"circle-o-notch\"\n    size=\"4\"\n    text=\"Loading\">\n</spinner>\n\n<!--Nothing to load notification-->\n<div class=\"HandHistory-noLoad\" ng-show=\"$ctrl.nothingToLoad\">\n    <p class=\"u-textCenter\">\n        <i class=\"fa fa-fw fa-eject\"></i>\n        Nothing left to Load\n    </p>\n</div>"

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CommonModule = undefined;

	var _filter = __webpack_require__(93);

	var _gameList = __webpack_require__(96);

	var CommonModule = exports.CommonModule = angular.module('app.common', [_filter.FilterModule, _gameList.GameListModule]).value('EventEmmiter', function (payload) {
	    return { $event: payload };
	}).name;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FilterModule = undefined;

	var _filter = __webpack_require__(94);

	var FilterModule = exports.FilterModule = angular.module('filter', []).component('filterBar', _filter.FilterComponent).name;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FilterComponent = undefined;

	var _classCallCheck2 = __webpack_require__(71);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(72);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _filter = __webpack_require__(95);

	var _filter2 = _interopRequireDefault(_filter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FilterController = function () {
	    function FilterController(EventEmmiter, $rootScope) {
	        'ngInject';

	        (0, _classCallCheck3.default)(this, FilterController);
	        this.EventEmmiter = EventEmmiter;
	        this.$rootScope = $rootScope;
	    }

	    (0, _createClass3.default)(FilterController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            this.collapseButtonText = true;
	            this.filterModel = {
	                tourney: false,
	                cash: false,
	                won: false,
	                lost: false
	            };
	        }
	    }, {
	        key: 'tourneyClick',
	        value: function tourneyClick() {
	            // check if Cash Game Type button is active, switch off
	            if (this.filterModel.cash) this.filterModel.cash = false;

	            this.filterModel.tourney = !this.filterModel.tourney;
	            this.onFilterClick(this.EventEmmiter({
	                type: 'tourney',
	                query: this.filterModel.tourney
	            }));
	            this.sendScrollPosiotionResetEvent();
	        }
	    }, {
	        key: 'cashClick',
	        value: function cashClick() {
	            // check if Tournament Game Type button is active, switch off
	            if (this.filterModel.tourney) this.filterModel.tourney = false;

	            this.filterModel.cash = !this.filterModel.cash;
	            this.onFilterClick(this.EventEmmiter({
	                type: 'cash',
	                query: this.filterModel.cash
	            }));
	            this.sendScrollPosiotionResetEvent();
	        }
	    }, {
	        key: 'wonClick',
	        value: function wonClick() {
	            // check if Lost Game Outcome button is active, switch off
	            if (this.filterModel.lost) this.filterModel.lost = false;

	            this.filterModel.won = !this.filterModel.won;
	            this.onFilterClick(this.EventEmmiter({
	                outcome: 'won',
	                query: this.filterModel.won
	            }));
	            this.sendScrollPosiotionResetEvent();
	        }
	    }, {
	        key: 'lostClick',
	        value: function lostClick() {
	            // check if Lost Game Outcome button is active, switch off
	            if (this.filterModel.won) this.filterModel.won = false;

	            this.filterModel.lost = !this.filterModel.lost;
	            this.onFilterClick(this.EventEmmiter({
	                outcome: 'lost',
	                query: this.filterModel.lost
	            }));
	            this.sendScrollPosiotionResetEvent();
	        }
	    }, {
	        key: 'colapseAllClick',
	        value: function colapseAllClick() {
	            this.collapseButtonText = !this.collapseButtonText;
	            // Emit Event for Game List Component
	            this.$rootScope.$emit('COLLAPSE_ALL', this.collapseButtonText);
	        }
	    }, {
	        key: 'sendScrollPosiotionResetEvent',
	        value: function sendScrollPosiotionResetEvent() {
	            this.$rootScope.$emit('SCROLL_RST', true);
	        }
	    }]);
	    return FilterController;
	}();

	var FilterComponent = exports.FilterComponent = {
	    template: _filter2.default,
	    controller: FilterController,
	    bindings: {
	        onFilterClick: '&'
	    }
	};

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = "<section class=\"Panel\">\n    <div class=\"Panel-heading\">\n        <div class=\"Grid-row\">\n            <div class=\"Grid-col--10\">\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.tourneyClick()\"\n                        ng-class=\"$ctrl.filterModel.tourney ? 'is-active': ''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--info\"><i class=\"fa fa-trophy Button-icon\"></i></span></span>Tournaments\n                </button>\n\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.cashClick()\"\n                        ng-class=\"$ctrl.filterModel.cash ? 'is-active': ''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--primary\"><i class=\"fa fa-usd Button-icon\"></i></span></span>Cash Games\n                </button>\n\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.wonClick()\"\n                        ng-class=\"$ctrl.filterModel.won ? 'is-active':''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--success\"><i class=\"fa fa-thumbs-up Button-icon\"></i></span></span>Hands Won\n                </button>\n\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.lostClick()\"\n                        ng-class=\"$ctrl.filterModel.lost ? 'is-active':''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--danger\"><i class=\"fa fa-thumbs-down Button-icon\"></i></span></span>Hands Lost\n                </button>\n            </div>\n            <div class=\"Grid-col--2 Grid--alignRight\">\n                <button class=\"Button Button--filter Button--flex\" ng-click=\"$ctrl.colapseAllClick()\">\n                    <span ng-show=\"$ctrl.collapseButtonText\">Extend all</span>\n                    <span ng-hide=\"$ctrl.collapseButtonText\">Colapse all</span>\n                </button>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameListModule = undefined;

	var _games = __webpack_require__(97);

	var _gameList = __webpack_require__(124);

	var _gameListScroll = __webpack_require__(126);

	var GameListModule = exports.GameListModule = angular.module('gameList', [_games.GameModule]).component('gameList', _gameList.GameListComponent).directive('bottomScroll', _gameListScroll.GameListScroll).name;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameModule = undefined;

	var _games = __webpack_require__(98);

	var _gameDetails = __webpack_require__(120);

	var GameModule = exports.GameModule = angular.module('games', [_gameDetails.GameDetailsModule]).component('games', _games.GamesComponent).name;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GamesComponent = undefined;

	var _keys = __webpack_require__(99);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(71);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(72);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _games = __webpack_require__(119);

	var _games2 = _interopRequireDefault(_games);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GamesController = function () {
	    function GamesController($rootScope) {
	        'ngInject';

	        (0, _classCallCheck3.default)(this, GamesController);
	        this.$rootScope = $rootScope;
	    }

	    (0, _createClass3.default)(GamesController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            this.gameCollapse = [];
	            this.collapseAllEventHandler(); // Register handle Event from Filter Component: Collapse All
	            this.gameCollapse[0] = true; // set the first Game Item to be 'opened'
	        }
	    }, {
	        key: 'gameCollapseClick',
	        value: function gameCollapseClick(id) {
	            this.gameCollapse[id] = !this.gameCollapse[id];
	        }
	    }, {
	        key: 'getGameStyle',
	        value: function getGameStyle(cards) {
	            if (this.countCards(cards) > 2) {
	                return 'NL Omaha Hold\'em';
	            } else {
	                return 'NL Texas Hold\'em';
	            }
	        }
	    }, {
	        key: 'countCards',
	        value: function countCards(cards) {
	            return (0, _keys2.default)(cards).length;
	        }
	    }, {
	        key: 'collapseAllEventHandler',
	        value: function collapseAllEventHandler() {
	            var _this = this;

	            this.$rootScope.$on('COLLAPSE_ALL', function (event, flag) {
	                if (flag) {
	                    // if true all Games are collapsed, close all (set to false)
	                    _this.gameCollapse.fill(false);
	                }
	            });
	        }
	    }]);
	    return GamesController;
	}();

	var GamesComponent = exports.GamesComponent = {
	    template: _games2.default,
	    controller: GamesController,
	    bindings: {
	        replays: '<',
	        visible: '<'
	    }
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(101);
	module.exports = __webpack_require__(78).Object.keys;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(102)
	  , $keys    = __webpack_require__(104);

	__webpack_require__(118)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(103);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(105)
	  , enumBugKeys = __webpack_require__(117);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(106)
	  , toIObject    = __webpack_require__(107)
	  , arrayIndexOf = __webpack_require__(110)(false)
	  , IE_PROTO     = __webpack_require__(114)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 106 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(108)
	  , defined = __webpack_require__(103);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(109);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 109 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(107)
	  , toLength  = __webpack_require__(111)
	  , toIndex   = __webpack_require__(113);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(112)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 112 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(112)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(115)('keys')
	  , uid    = __webpack_require__(116);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(77)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 116 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 117 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(76)
	  , core    = __webpack_require__(78)
	  , fails   = __webpack_require__(87);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 119 */
/***/ function(module, exports) {

	module.exports = "<div ng-show=\"$ctrl.visible\">\n    <hr class=\"HandHistory-divider\"/>\n\n    <section class=\"HandHistory-gameItem\" ng-repeat=\"replay in $ctrl.replays track by $index\">\n        <div class=\"Grid-row\" ng-click=\"$ctrl.gameCollapseClick($index)\">\n            <div class=\"Grid-col--auto\">\n                <div class=\"Media\">\n                    <div class=\"Media-object--left\">\n                        <span class=\"HandHistory-gameItem-circle\" ng-class=\"replay.game_type == 'tourney' ? 'Circle--filled--info':'Circle--filled--success'\">\n                            <i ng-class=\"replay.game_type == 'tourney' ? 'fa fa-trophy Button-icon' : 'fa fa-usd Button-icon'\"></i>\n                        </span>\n                    </div>\n                    <div class=\"Media-body\">\n                        <h1 class=\"HandHistory-gameItem-gameType\">{{ $ctrl.getGameStyle(replay.game_style) }}</h1>\n                        <h2 class=\"HandHistory-gameItem-title\">{{ replay.title }}</h2>\n                    </div>\n                </div>\n            </div>\n            <div class=\"Grid-col--auto Grid--alignRight\">\n                <div class=\"HandHistory-gameItem-kpi\">\n                    Prizepool:<strong class=\"HandHistory-gameItem-kpi-value\">{{ replay.prizepool }}</strong>|\n                    Entries:<strong class=\"HandHistory-gameItem-kpi-value\">{{ replay.entries }}</strong>|\n                    Finished in:<strong class=\"HandHistory-gameItem-kpi-value\">{{ replay.finished_in }}</strong>\n                </div>\n            </div>\n        </div>\n        <div class=\"HandHistory-gameItem-counter\" ng-click=\"$ctrl.click(replay.details)\">{{ replay.game_items }}</div>\n\n        <game-details details=\"replay.details\" visible=\"$ctrl.gameCollapse[$index]\"></game-details>\n\n    </section>\n</div>"

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameDetailsModule = undefined;

	var _gameDetails = __webpack_require__(121);

	var _replay = __webpack_require__(123);

	var GameDetailsModule = exports.GameDetailsModule = angular.module('gameDetails', []).component('gameDetails', _gameDetails.GameDetailsComponent).service('ReplayService', _replay.ReplayService).name;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameDetailsComponent = undefined;

	var _keys = __webpack_require__(99);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(71);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(72);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _gameDetails = __webpack_require__(122);

	var _gameDetails2 = _interopRequireDefault(_gameDetails);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GameDetailsController = function () {
	    function GameDetailsController(ReplayService) {
	        'ngInject';

	        (0, _classCallCheck3.default)(this, GameDetailsController);
	        this.replayService = ReplayService;
	    }

	    (0, _createClass3.default)(GameDetailsController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            this.showModal = false;
	            this.replayData = {};
	        }
	    }, {
	        key: 'numberOfCards',
	        value: function numberOfCards(cards) {
	            return (0, _keys2.default)(cards).length;
	        }
	    }, {
	        key: 'shareClick',
	        value: function shareClick(id) {
	            this.replayService.shareReplay(id);
	        }
	    }, {
	        key: 'replayClick',
	        value: function replayClick(id) {
	            var _this = this;

	            this.replayService.getReplay(id).then(function (res) {
	                console.log(res);
	                return _this.replayData = res;
	            }).then(function (res) {
	                _this.showModal = !_this.showModal;
	            });
	            console.warn('Modal Show: ', this.showModal);
	        }
	    }]);
	    return GameDetailsController;
	}();

	var GameDetailsComponent = exports.GameDetailsComponent = {
	    template: _gameDetails2.default,
	    controller: GameDetailsController,
	    bindings: {
	        details: '<',
	        visible: '<'
	    }
	};

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = "<div ng-repeat=\"detail in $ctrl.details\" ng-show=\"$ctrl.visible\">\n    <hr class=\"HandHistory-divider--dotted\">\n\n    <div class=\"Grid-row\">\n        <!-- Dynamically change Grid class based on number of Hole cards -->\n        <div ng-class=\"$ctrl.numberOfCards(detail.data.hole_cards) > 2 ? 'Grid-col--3--tablet Grid-col--12' : 'Grid-col--2--tablet Grid-col--12'\">\n            <div class=\"HandHistory-gameItem-holeCards\">\n                <div ng-repeat=\"hole in detail.data.hole_cards\" class=\"DeckCard DeckCard--{{ hole }}\"></div>\n            </div>\n        </div>\n        <div class=\"Grid-col--4--tablet Grid-col--12\">\n            <div class=\"HandHistory-gameItem-communityCards\">\n                <div ng-repeat=\"community in detail.data.cards_on_board track by $index\"\n                     ng-class=\"$index == 3 ? 'HandHistory-gameItem-separateCards' : ''\"\n                     class=\"DeckCard DeckCard--{{ community }}\">\n                </div>\n            </div>\n        </div>\n        <div class=\"Grid-col--auto--tablet Grid-col--12\">\n            <div class=\"Media\">\n                <div class=\"Media-body\">\n                    <h1 class=\"HandHistory-gameItem-levelText\">Level</h1>\n                    <h2 class=\"HandHistory-gameItem-levelValue\">{{ detail.data.currency.symbol }}{{ detail.data.small_blind }}/{{ detail.data.big_blind }}</h2>\n                </div>\n            </div>\n        </div>\n        <div class=\"Grid-col--auto--tablet Grid-col--12\">\n            <div class=\"Media\">\n                <div class=\"Media-body\">\n                    <h1 class=\"HandHistory-gameItem-levelText\">Pot Size</h1>\n                    <h2 class=\"HandHistory-gameItem-levelValue\" ng-class=\"detail.data.pot < 0 ? 'u-textDanger' : ''\">{{ detail.data.currency.symbol }}{{ detail.data.pot }}</h2>\n                </div>\n            </div>\n        </div>\n        <div class=\"Grid-col--2--tablet Grid-col--12 Grid--alignRight\">\n            <div class=\"HandHistory-gameItem-actions\">\n                <button class=\"Button Button--icon fn-shareButton\" ng-click=\"$ctrl.shareClick(detail.replay_id)\"><span class=\"Circle\"><i class=\"fa fa-share-alt Button-icon\"></i></span></button>\n                <button class=\"Button Button--icon fn-playButton\" ng-click=\"$ctrl.replayClick(detail.replay_id)\"><span class=\"Circle\"><i class=\"fa fa-play Button-icon\"></i></span></button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<ui-modal modal-id=\"'replayModal'\" visible=\"$ctrl.showModal\" max-width=\"'200px'\">\n    <modal-body>\n        <div class=\"TableContainer\"\n             id=\"table-container-{{$ctrl.replayData._id}}\"\n             screenfull=\"\"\n             ng-class=\"{'is-fullScreen' : $ctrl.replayData.isFullScreen, 'is-paused': $ctrl.replayData.playStatus=='paused', 'is-playing': $ctrl.replayData.playStatus=='playing', 'is-finished': $ctrl.replayData.playStatus=='finished'}\">\n            <replayer ng-if=\"$ctrl.replayData\" data=\"$ctrl.replayData\"></replayer>\n        </div>\n    </modal-body>\n</ui-modal>\n"

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ReplayService = undefined;

	var _classCallCheck2 = __webpack_require__(71);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(72);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ReplayService = exports.ReplayService = function () {
	    function ReplayService($http) {
	        'ngInject';

	        (0, _classCallCheck3.default)(this, ReplayService);
	        this.$http = $http;
	    }

	    (0, _createClass3.default)(ReplayService, [{
	        key: 'shareReplay',
	        value: function shareReplay(id) {
	            return this.$http.post('/replay/' + id, {}).then(function (res) {
	                return res.data;
	            });
	        }
	    }, {
	        key: 'getReplay',
	        value: function getReplay(id) {
	            return this.$http.get('/replay/' + id).then(function (res) {
	                return res.data;
	            });
	        }
	    }]);
	    return ReplayService;
	}();

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameListComponent = undefined;

	var _classCallCheck2 = __webpack_require__(71);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(72);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _gameList = __webpack_require__(125);

	var _gameList2 = _interopRequireDefault(_gameList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GameListController = function () {
	    function GameListController($rootScope) {
	        'ngInject';

	        (0, _classCallCheck3.default)(this, GameListController);
	        this.$rootScope = $rootScope;
	    }

	    (0, _createClass3.default)(GameListController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            this.collapse = [];
	            this.collapseAllEventHandler(); // Register handle Event from Filter Component: Collapse All
	            this.collapse[0] = true; // set the first Handhistory Item to be 'opened'
	        }
	    }, {
	        key: 'collapseOneClick',
	        value: function collapseOneClick(id) {
	            this.collapse[id] = !this.collapse[id];
	        }
	    }, {
	        key: 'collapseAllEventHandler',
	        value: function collapseAllEventHandler() {
	            var _this = this;

	            this.$rootScope.$on('COLLAPSE_ALL', function (event, flag) {
	                if (flag) {
	                    // if true all Games are collapsed, close all (set to false)
	                    _this.collapse.fill(false);
	                } else {
	                    for (var i = 0; i < _this.history.length; i++) {
	                        _this.collapse[i] = true;
	                    }
	                }
	            });
	        }
	    }]);
	    return GameListController;
	}();

	var GameListComponent = exports.GameListComponent = {
	    template: _gameList2.default,
	    controller: GameListController,
	    bindings: {
	        hide: '<',
	        history: '<',
	        onBottomScroll: '&'
	    }
	};

/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = "<div bottom-scroll=\"$ctrl.onBottomScroll()\" ng-hide=\"$ctrl.hide\">\n\n    <section class=\"Panel\" ng-repeat=\"game in $ctrl.history track by $index\">\n        <div class=\"Panel-body\">\n            <div class=\"Grid-row\" ng-click=\"$ctrl.collapseOneClick($index)\">\n                <div class=\"Grid-col--10\">\n                    <div class=\"HandHistory-expand\"><i ng-class=\"$ctrl.collapse[$index] ? 'fa fa-caret-down':'fa fa-caret-right'\"></i></div>\n                    <h1 class=\"Heading--five HandHistoryDay-title\">{{ game.date | date: 'EEEE, MMMM d' }}</h1>\n                </div>\n                <div class=\"Grid-col--2 Grid--alignRight\">\n                    <div class=\"Media HandHistoryDay-info\">\n                        <div class=\"Media-object--right\" ng-hide=\"game.cashgame_count < 1\">\n                            <div class=\"Media\">\n                                <div class=\"Media-object--left\"><span class=\"Circle Circle--filled--success\"><i class=\"fa fa-usd Button-icon\"></i></span></div>\n                                <div class=\"Media-body\">{{ game.cashgame_count }}</div>\n                            </div>\n                        </div>\n                        <div class=\"Media-object--right\" ng-hide=\"game.tourney_count < 1\">\n                            <div class=\"Media\">\n                                <div class=\"Media-object--left\"><span class=\"Circle Circle--filled--info\"><i class=\"fa fa-trophy Button-icon\"></i></span></div>\n                                <div class=\"Media-body\">{{ game.tourney_count }}</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <games replays=\"game.replays\" visible=\"$ctrl.collapse[$index]\"></games>\n        </div>\n    </section>\n</div>"

/***/ },
/* 126 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var GameListScroll = exports.GameListScroll = function GameListScroll($window, $rootScope) {
	    'ngInject';

	    return {
	        restrict: 'A',
	        link: function link($scope, $elements, $attrs) {
	            // this flags that this is the first time scroll
	            var isFirstScroll = true;
	            // Y position of last on scroll event, also used to
	            // determine if down scroll happend
	            var lastScrollY = 0;

	            // listen for Scroll Position Reset event
	            var scrollResetListener = $rootScope.$on('SCROLL_RST', function (flag) {
	                if (flag) lastScrollY = 0;
	            });

	            // get element that directive is bound to
	            var element = $elements[0];
	            // get element's top position relative to the viewport
	            var elementTopPosition = element.getBoundingClientRect().top;

	            var determineLoad = function determineLoad() {
	                // signals that scroll passed bottom of bound element
	                var scrollCondition = $window.innerHeight - elementTopPosition + $window.pageYOffset >= element.scrollHeight;
	                // check if bottom and if down scroll
	                if (scrollCondition && $window.pageYOffset > lastScrollY) {
	                    $scope.$apply($attrs.bottomScroll);
	                    // remember this posiotion for next event
	                    lastScrollY = $window.pageYOffset;
	                }
	                // if user scrolled to page bottom on page load
	                if (scrollCondition && isFirstScroll) {
	                    $scope.$apply($attrs.bottomScroll);
	                    isFirstScroll = false; // prevent further behaviour
	                }
	            };

	            angular.element($window).on('scroll', determineLoad);

	            // remove event handlers when directive is destroyed
	            $scope.$on('$destroy', function () {
	                angular.element($window).off('scroll', determineLoad);
	                scrollResetListener();
	            });
	        }
	    };
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ComponentsModule = undefined;

	var _spinner = __webpack_require__(128);

	var _modal = __webpack_require__(131);

	var ComponentsModule = exports.ComponentsModule = angular.module('app.components', [_spinner.SpinnerModule, _modal.ModalModule]).name;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SpinnerModule = undefined;

	var _spinner = __webpack_require__(129);

	var SpinnerModule = exports.SpinnerModule = angular.module('spinnerIcon', []).component('spinner', _spinner.SpinnerComponent).name;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SpinnerComponent = undefined;

	var _classCallCheck2 = __webpack_require__(71);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _spinner = __webpack_require__(130);

	var _spinner2 = _interopRequireDefault(_spinner);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SpinnerController = function SpinnerController() {
	    (0, _classCallCheck3.default)(this, SpinnerController);
	};

	var SpinnerComponent = exports.SpinnerComponent = {
	    template: _spinner2.default,
	    controller: SpinnerController,
	    bindings: {
	        icon: '@',
	        size: '@',
	        text: '@',
	        visible: '<'
	    }
	};

/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-textCenter u-textPrimary m--4\" ng-show=\"$ctrl.visible\">\n    <i class=\"fa fa-{{ $ctrl.icon }} fa-spin fa-{{ $ctrl.size }}x fa-fw\"></i>\n    <p class=\"u-textCenter\" ng-bind=\"$ctrl.text\"></p>\n</div>\n"

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ModalModule = undefined;

	var _modal = __webpack_require__(132);

	var _modalEscAction = __webpack_require__(134);

	var _modalClickOutside = __webpack_require__(135);

	var ModalModule = exports.ModalModule = angular.module('uiModal', []).component('uiModal', _modal.ModalComponent).directive('escAction', _modalEscAction.ModalEscAction).directive('clickOutside', _modalClickOutside.ModalClickOutside).name;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ModalComponent = undefined;

	var _classCallCheck2 = __webpack_require__(71);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(72);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _modal = __webpack_require__(133);

	var _modal2 = _interopRequireDefault(_modal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ModalController = function () {
	    function ModalController() {
	        (0, _classCallCheck3.default)(this, ModalController);
	    }

	    (0, _createClass3.default)(ModalController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            this.styles = {};
	            if (!this.modalId) {
	                this.modalId = 'modal-body';
	            }

	            this.setModalStyles();
	        }
	    }, {
	        key: 'setModalStyles',
	        value: function setModalStyles() {
	            if (this.modalMaxHeight) {
	                this.styles.maxHeight = this.maxHeight;
	            }

	            if (this.modalMaxWidth) {
	                this.styles.maxWidth = this.maxWidth;
	            }

	            if (this.modalMinHeight) {
	                this.styles.minHeight = this.minHeight;
	            }

	            if (this.modalMinWidth) {
	                this.styles.minWidth = this.minWidth;
	            }

	            if (this.modalWidth) {
	                this.styles.width = this.width;
	            }
	        }

	        // Public viewModel methods
	        // --------------------------------------------------

	    }, {
	        key: 'close',
	        value: function close() {
	            this.visible = false;
	        }
	    }]);
	    return ModalController;
	}();

	var ModalComponent = exports.ModalComponent = {
	    template: _modal2.default,
	    controller: ModalController,
	    bindings: {
	        visible: '=',
	        maxWidth: '<',
	        minWidth: '<',
	        maxHeight: '<',
	        minHeight: '<',
	        width: '<',
	        modalId: '<'
	    },
	    transclude: {
	        body: 'modalBody'
	    }
	};

/***/ },
/* 133 */
/***/ function(module, exports) {

	module.exports = "<div class=\"Modal-container animate-if\"\n    ng-if=\"$ctrl.visible\"\n    esc-action=\"$ctrl.close()\"\n    tabindex=\"0\">\n\n    <div class=\"Modal\" ng-transclude=\"body\"\n        ng-style=\"$ctrl.styles\"\n        click-outside=\"$ctrl.close()\">\n    </div>\n</div>\n"

/***/ },
/* 134 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ModalEscAction = exports.ModalEscAction = function ModalEscAction() {
	    'ngInject';

	    return {
	        restrict: 'A',
	        link: function link($scope, $elements, $attrs) {
	            var escKeyHandler = function escKeyHandler(event) {
	                if (event.which === 27) {
	                    // 27 = esc key
	                    $scope.$apply($attrs.escAction);
	                }
	            };

	            $elements.on('keydown keypress', escKeyHandler);

	            // remove event handlers when directive is destroyed
	            $scope.$on('$destroy', function () {
	                $elements.off('keydown keypress', escKeyHandler);
	            });
	        }
	    };
	};

/***/ },
/* 135 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ModalClickOutside = exports.ModalClickOutside = function ModalClickOutside($document) {
	    'ngInject';

	    return {
	        restrict: 'A',
	        link: function link($scope, $elements, $attrs) {
	            var isFirstClick = true;
	            var outClickHandler = function outClickHandler(event) {
	                if (!$elements[0].contains(event.target)) {
	                    if (!isFirstClick) {
	                        $scope.$apply($attrs.clickOutside);
	                    } else {
	                        isFirstClick = false;
	                    }
	                }
	            };
	            $document.on('click', outClickHandler);

	            // remove event handlers when directive is destroyed
	            $scope.$on('$destroy', function () {
	                $document.off('click', outClickHandler);
	            });
	        }
	    };
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AppService = undefined;

	var _classCallCheck2 = __webpack_require__(71);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(72);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AppService = exports.AppService = function () {
	    function AppService($http) {
	        'ngInject';

	        (0, _classCallCheck3.default)(this, AppService);
	        this.$http = $http;
	    }

	    (0, _createClass3.default)(AppService, [{
	        key: 'getHandHistory',
	        value: function getHandHistory(params, id) {
	            // Set url target string based on ENV
	            var url = '';
	            if (true) {
	                url = ("/api/handgroups/") + id;
	            } else {
	                url = process.env.API_URL + process.env.USER_ID;
	            }

	            if (params) {
	                // if query parameters are defined, pass them to http.get call
	                var config = {
	                    params: params
	                };
	                return this.$http.get(url, config).then(function (res) {
	                    return res.data;
	                });
	            } else {
	                return this.$http.get(url).then(function (res) {
	                    return res.data;
	                });
	            }
	        }
	    }]);
	    return AppService;
	}();

/***/ },
/* 137 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);