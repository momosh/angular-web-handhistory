webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _app = __webpack_require__(16);

	var _common = __webpack_require__(18);

	var _components = __webpack_require__(28);

	var _app2 = __webpack_require__(17);

	__webpack_require__(58);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _angular2.default.module('angular-web-handgroups', [_common.CommonModule, _components.ComponentsModule]).component('handGroups', _app.AppComponent).service('AppService', _app2.AppService).name;

	// styles

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(31);

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
/* 4 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(6)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(33), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(4)
	  , ctx       = __webpack_require__(38)
	  , hide      = __webpack_require__(42)
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(35)
	  , IE8_DOM_DEFINE = __webpack_require__(43)
	  , toPrimitive    = __webpack_require__(54)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 13 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(44)
	  , defined = __webpack_require__(10);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AppComponent = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _app = __webpack_require__(59);

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
	        key: 'gameTypeClickHandler',
	        value: function gameTypeClickHandler(_ref) {
	            var _this2 = this;

	            var type = _ref.type,
	                query = _ref.query;

	            this.gameListLoading = true; // start Spinner
	            this.nothingToLoad = false; // new cycle for data loading

	            // remove query param if not in $event
	            if (!query) {
	                delete this.queryParams['gametype'];
	            } else {
	                this.queryParams['gametype'] = type;
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
	        key: 'gameOutcomeClickHandler',
	        value: function gameOutcomeClickHandler(_ref2) {
	            var _this3 = this;

	            var outcome = _ref2.outcome,
	                query = _ref2.query;

	            this.gameListLoading = true;
	            this.nothingToLoad = false;

	            // remove query param if not in $event
	            if (!query) {
	                delete this.queryParams['outcome'];
	            } else {
	                this.queryParams['outcome'] = outcome;
	            }

	            delete this.queryParams['lastdate'];

	            // get Hand History data for defined query parameters
	            this.service.getHandHistory(this.queryParams, this.userId).then(function (res) {
	                _this3.handhistory = res.data;
	                if (res.lastdate) _this3.queryParams['lastdate'] = res.lastdate;
	                _this3.gameListLoading = false;
	            });
	        }
	    }, {
	        key: 'loadOnScroll',
	        value: function loadOnScroll() {
	            var _this4 = this;

	            if (this.nothingToLoad) {
	                return;
	            } // break infinite scroll if previous load was empty

	            this.gameListLoading = this.scrollLoading = true;

	            // Call HandHistory Service with query params
	            this.service.getHandHistory(this.queryParams, this.userId).then(function (res) {
	                // Push returned data to existing handhistory
	                if (res.data) _this4.handhistory = _this4.handhistory.concat(res.data);
	                if (res.lastdate) _this4.queryParams['lastdate'] = res.lastdate;
	                if (res.data.length == 0) _this4.nothingToLoad = true; // if no data is returned there is nothing to load
	                _this4.gameListLoading = _this4.scrollLoading = false;
	            });
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AppService = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AppService = exports.AppService = function () {
	    function AppService($http) {
	        'ngInject';

	        (0, _classCallCheck3.default)(this, AppService);
	        this.urlString = ("http://www.dev.jivaro.com:3031/handgroups/58469919b95ff5581ff414bc");
	        this.$http = $http;
	    }

	    (0, _createClass3.default)(AppService, [{
	        key: 'getHandHistory',
	        value: function getHandHistory(params, id) {
	            // set url target string based on ENV
	            if (false) {
	                this.urlString = this.urlString + id;
	            }
	            // if query parameters are defined, pass them to http.get call
	            if (params) {
	                var config = {
	                    params: params
	                };
	                return this.$http.get(this.urlString, config).then(function (res) {
	                    return res.data;
	                });
	            } else {
	                return this.$http.get(this.urlString).then(function (res) {
	                    return res.data;
	                });
	            }
	        }
	    }]);
	    return AppService;
	}();

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CommonModule = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _filter = __webpack_require__(20);

	var _gameList = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CommonModule = exports.CommonModule = _angular2.default.module('app.common', [_filter.FilterModule, _gameList.GameListModule]).value('EventEmmiter', function (payload) {
	    return { $event: payload };
	}).name;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FilterComponent = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _filter = __webpack_require__(60);

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
	            this.onGameTypeSelect(this.EventEmmiter({
	                type: 'tourney',
	                query: this.filterModel.tourney
	            }));
	        }
	    }, {
	        key: 'cashClick',
	        value: function cashClick() {
	            // check if Tournament Game Type button is active, switch off
	            if (this.filterModel.tourney) this.filterModel.tourney = false;

	            this.filterModel.cash = !this.filterModel.cash;
	            this.onGameTypeSelect(this.EventEmmiter({
	                type: 'cash',
	                query: this.filterModel.cash
	            }));
	        }
	    }, {
	        key: 'wonClick',
	        value: function wonClick() {
	            // check if Lost Game Outcome button is active, switch off
	            if (this.filterModel.lost) this.filterModel.lost = false;

	            this.filterModel.won = !this.filterModel.won;
	            this.onGameOutcomeSelect(this.EventEmmiter({
	                outcome: 'won',
	                query: this.filterModel.won
	            }));
	        }
	    }, {
	        key: 'lostClick',
	        value: function lostClick() {
	            // check if Lost Game Outcome button is active, switch off
	            if (this.filterModel.won) this.filterModel.won = false;

	            this.filterModel.lost = !this.filterModel.lost;
	            this.onGameOutcomeSelect(this.EventEmmiter({
	                outcome: 'lost',
	                query: this.filterModel.lost
	            }));
	        }
	    }, {
	        key: 'colapseAllClick',
	        value: function colapseAllClick() {
	            this.collapseButtonText = !this.collapseButtonText;
	            // Emit Event for Game List Component
	            this.$rootScope.$emit('COLLAPSE_ALL', this.collapseButtonText);
	        }
	    }]);
	    return FilterController;
	}();

	var FilterComponent = exports.FilterComponent = {
	    template: _filter2.default,
	    controller: FilterController,
	    bindings: {
	        onGameTypeSelect: '&',
	        onGameOutcomeSelect: '&'
	    }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FilterModule = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _filter = __webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FilterModule = exports.FilterModule = _angular2.default.module('filter', []).component('filterBar', _filter.FilterComponent).name;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var GameListScroll = exports.GameListScroll = function GameListScroll($window) {
	    'ngInject';

	    return {
	        restrict: 'A',
	        link: function link($scope, $element, $attrs) {
	            var element = $element[0];
	            var elementTopPosition = element.getBoundingClientRect().top;

	            angular.element($window).bind('scroll', function () {
	                if (this.innerHeight - elementTopPosition + this.pageYOffset == element.scrollHeight) {
	                    $scope.$apply($attrs.bottomScroll);
	                }
	            });
	        }
	    };
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameListComponent = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _gameList = __webpack_require__(61);

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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameListModule = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _games = __webpack_require__(27);

	var _gameList = __webpack_require__(22);

	var _gameListScroll = __webpack_require__(21);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GameListModule = exports.GameListModule = _angular2.default.module('gameList', [_games.GameModule]).component('gameList', _gameList.GameListComponent).directive('bottomScroll', _gameListScroll.GameListScroll).name;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameDetailsComponent = undefined;

	var _keys = __webpack_require__(9);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _gameDetails = __webpack_require__(62);

	var _gameDetails2 = _interopRequireDefault(_gameDetails);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GameDetailsController = function () {
	    function GameDetailsController() {
	        (0, _classCallCheck3.default)(this, GameDetailsController);
	    }

	    (0, _createClass3.default)(GameDetailsController, [{
	        key: 'numberOfCards',
	        value: function numberOfCards(cards) {
	            return (0, _keys2.default)(cards).length;
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameDetailsModule = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _gameDetails = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GameDetailsModule = exports.GameDetailsModule = _angular2.default.module('gameDetails', []).component('gameDetails', _gameDetails.GameDetailsComponent).name;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GamesComponent = undefined;

	var _keys = __webpack_require__(9);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _games = __webpack_require__(63);

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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameModule = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _games = __webpack_require__(26);

	var _gameDetails = __webpack_require__(25);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GameModule = exports.GameModule = _angular2.default.module('games', [_gameDetails.GameDetailsModule]).component('games', _games.GamesComponent).name;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ComponentsModule = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _spinner = __webpack_require__(30);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ComponentsModule = exports.ComponentsModule = _angular2.default.module('app.components', [_spinner.SpinnerModule]).name;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SpinnerComponent = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _spinner = __webpack_require__(64);

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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SpinnerModule = undefined;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _spinner = __webpack_require__(29);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SpinnerModule = exports.SpinnerModule = _angular2.default.module('spinnerIcon', []).component('spinner', _spinner.SpinnerComponent).name;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(32), __esModule: true };

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	var $Object = __webpack_require__(4).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57);
	module.exports = __webpack_require__(4).Object.keys;

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(8);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(14)
	  , toLength  = __webpack_require__(52)
	  , toIndex   = __webpack_require__(51);
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
/* 37 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(34);
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(8)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 41 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(12)
	  , createDesc = __webpack_require__(48);
	module.exports = __webpack_require__(5) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(5) && !__webpack_require__(6)(function(){
	  return Object.defineProperty(__webpack_require__(39)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(37);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(41)
	  , toIObject    = __webpack_require__(14)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(49)('IE_PROTO');

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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(45)
	  , enumBugKeys = __webpack_require__(40);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(11)
	  , core    = __webpack_require__(4)
	  , fails   = __webpack_require__(6);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 48 */
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(50)('keys')
	  , uid    = __webpack_require__(55);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(13)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(13)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(10);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(8);
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
/* 55 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(11);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(5), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(53)
	  , $keys    = __webpack_require__(46);

	__webpack_require__(47)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 58 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = "<filter-bar\n    on-game-type-select=\"$ctrl.gameTypeClickHandler($event)\"\n    on-game-outcome-select=\"$ctrl.gameOutcomeClickHandler($event)\">\n</filter-bar>\n\n<game-list\n    hide=\"$ctrl.gameListLoading && !$ctrl.scrollLoading\"\n    history=\"$ctrl.handhistory\"\n    on-bottom-scroll=\"$ctrl.loadOnScroll()\">\n</game-list>\n\n<spinner\n    visible=\"$ctrl.gameListLoading || $ctrl.scrollLoading\"\n    icon=\"circle-o-notch\"\n    size=\"4\"\n    text=\"Loading\">\n</spinner>"

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = "<section class=\"Panel\">\n    <div class=\"Panel-heading\">\n        <div class=\"Grid-row\">\n            <div class=\"Grid-col--10\">\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.tourneyClick()\"\n                        ng-class=\"$ctrl.filterModel.tourney ? 'is-active': ''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--info\"><i class=\"fa fa-trophy Button-icon\"></i></span></span>Tournaments\n                </button>\n\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.cashClick()\"\n                        ng-class=\"$ctrl.filterModel.cash ? 'is-active': ''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--primary\"><i class=\"fa fa-usd Button-icon\"></i></span></span>Cash Games\n                </button>\n\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.wonClick()\"\n                        ng-class=\"$ctrl.filterModel.won ? 'is-active':''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--success\"><i class=\"fa fa-thumbs-up Button-icon\"></i></span></span>Hands Won\n                </button>\n\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.lostClick()\"\n                        ng-class=\"$ctrl.filterModel.lost ? 'is-active':''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--danger\"><i class=\"fa fa-thumbs-down Button-icon\"></i></span></span>Hands Lost\n                </button>\n            </div>\n            <div class=\"Grid-col--2 Grid--alignRight\">\n                <button class=\"Button Button--filter Button--flex\" ng-click=\"$ctrl.colapseAllClick()\">\n                    <span ng-show=\"$ctrl.collapseButtonText\">Collapse all</span>\n                    <span ng-hide=\"$ctrl.collapseButtonText\">Close all</span>\n                </button>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = "<div bottom-scroll=\"$ctrl.onBottomScroll()\" ng-hide=\"$ctrl.hide\">\n\n    <section class=\"Panel\" ng-repeat=\"game in $ctrl.history track by $index\">\n        <div class=\"Panel-body\">\n            <div class=\"Grid-row\">\n                <div class=\"Grid-col--10\" ng-click=\"$ctrl.collapseOneClick($index)\">\n                    <div class=\"HandHistory-expand\"><i ng-class=\"$ctrl.collapse[$index] ? 'fa fa-caret-down':'fa fa-caret-right'\"></i></div>\n                    <h1 class=\"Heading--five HandHistoryDay-title\">{{ game.date | date: 'EEEE, MMMM d' }}</h1>\n                </div>\n                <div class=\"Grid-col--2 Grid--alignRight\">\n                    <div class=\"Media HandHistoryDay-info\">\n                        <div class=\"Media-object--right\" ng-hide=\"game.cashgame_count < 1\">\n                            <div class=\"Media\">\n                                <div class=\"Media-object--left\"><span class=\"Circle Circle--filled--success\"><i class=\"fa fa-usd Button-icon\"></i></span></div>\n                                <div class=\"Media-body\">{{ game.cashgame_count }}</div>\n                            </div>\n                        </div>\n                        <div class=\"Media-object--right\" ng-hide=\"game.tourney_count < 1\">\n                            <div class=\"Media\">\n                                <div class=\"Media-object--left\"><span class=\"Circle Circle--filled--info\"><i class=\"fa fa-trophy Button-icon\"></i></span></div>\n                                <div class=\"Media-body\">{{ game.tourney_count }}</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <games replays=\"game.replays\" visible=\"$ctrl.collapse[$index]\"></games>\n        </div>\n    </section>\n</div>"

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "<div ng-repeat=\"detail in $ctrl.details\" ng-show=\"$ctrl.visible\">\n    <hr class=\"HandHistory-divider--dotted\">\n\n    <div class=\"Grid-row\">\n        <!-- Dynamically change Grid class based on number of Hole cards -->\n        <div ng-class=\"$ctrl.numberOfCards(detail.hole_cards) > 2 ? 'Grid-col--3--tablet Grid-col--12' : 'Grid-col--2--tablet Grid-col--12'\">\n            <div class=\"HandHistory-gameItem-holeCards\">\n                <div ng-repeat=\"hole in detail.hole_cards\" class=\"DeckCard DeckCard--{{ hole }}\"></div>\n            </div>\n        </div>\n        <div class=\"Grid-col--4--tablet Grid-col--12\">\n            <div class=\"HandHistory-gameItem-communityCards\">\n                <div ng-repeat=\"community in detail.cards_on_board track by $index\"\n                     ng-class=\"$index == 3 ? 'HandHistory-gameItem-separateCards' : ''\"\n                     class=\"DeckCard DeckCard--{{ community }}\">\n                </div>\n            </div>\n        </div>\n        <div class=\"Grid-col--auto--tablet Grid-col--12\">\n            <div class=\"Media\">\n                <div class=\"Media-body\">\n                    <h1 class=\"HandHistory-gameItem-levelText\">Level</h1>\n                    <h2 class=\"HandHistory-gameItem-levelValue\">{{ detail.currency.symbol }}{{ detail.small_blind }}/{{ detail.big_blind }}</h2>\n                </div>\n            </div>\n        </div>\n        <div class=\"Grid-col--auto--tablet Grid-col--12\">\n            <div class=\"Media\">\n                <div class=\"Media-body\">\n                    <h1 class=\"HandHistory-gameItem-levelText\">Pot Size</h1>\n                    <h2 class=\"HandHistory-gameItem-levelValue\" ng-class=\"detail.pot < 0 ? 'u-textDanger' : ''\">{{ detail.currency.symbol }}{{ detail.pot }}</h2>\n                </div>\n            </div>\n        </div>\n        <div class=\"Grid-col--2--tablet Grid-col--12 Grid--alignRight\">\n            <div class=\"HandHistory-gameItem-actions\">\n                <button class=\"Button Button--icon fn-shareButton\" ng-click=\"$ctrl.click()\"><span class=\"Circle\"><i class=\"fa fa-share-alt Button-icon\"></i></span></button>\n                <button class=\"Button Button--icon fn-playButton\" ng-click=\"$ctrl.click()\"><span class=\"Circle\"><i class=\"fa fa-play Button-icon\"></i></span></button>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = "<div ng-show=\"$ctrl.visible\">\n    <hr class=\"HandHistory-divider\"/>\n\n    <section class=\"HandHistory-gameItem\" ng-repeat=\"replay in $ctrl.replays track by $index\">\n        <div class=\"Grid-row\" ng-click=\"$ctrl.gameCollapseClick($index)\">\n            <div class=\"Grid-col--auto\">\n                <div class=\"Media\">\n                    <div class=\"Media-object--left\">\n                        <span class=\"HandHistory-gameItem-circle\" ng-class=\"replay.game_type == 'tourney' ? 'Circle--filled--info':'Circle--filled--success'\">\n                            <i ng-class=\"replay.game_type == 'tourney' ? 'fa fa-trophy Button-icon' : 'fa fa-usd Button-icon'\"></i>\n                        </span>\n                    </div>\n                    <div class=\"Media-body\">\n                        <h1 class=\"HandHistory-gameItem-gameType\">{{ $ctrl.getGameStyle(replay.game_style) }}</h1>\n                        <h2 class=\"HandHistory-gameItem-title\">{{ replay.title }}</h2>\n                    </div>\n                </div>\n            </div>\n            <div class=\"Grid-col--auto Grid--alignRight\">\n                <div class=\"HandHistory-gameItem-kpi\">\n                    Prizepool:<strong class=\"HandHistory-gameItem-kpi-value\">{{ replay.prizepool }}</strong>|\n                    Entries:<strong class=\"HandHistory-gameItem-kpi-value\">{{ replay.entries }}</strong>|\n                    Finished in:<strong class=\"HandHistory-gameItem-kpi-value\">{{ replay.finished_in }}</strong>\n                </div>\n            </div>\n        </div>\n        <div class=\"HandHistory-gameItem-counter\" ng-click=\"$ctrl.click(replay.details)\">{{ replay.game_items }}</div>\n\n        <game-details details=\"replay.details\" visible=\"$ctrl.gameCollapse[$index]\"></game-details>\n\n    </section>\n</div>"

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-textCenter u-textPrimary m--4\" ng-show=\"$ctrl.visible\">\n    <i class=\"fa fa-{{ $ctrl.icon }} fa-spin fa-{{ $ctrl.size }}x fa-fw\"></i>\n    <p class=\"u-textCenter\" ng-bind=\"$ctrl.text\"></p>\n</div>\n"

/***/ }
]);