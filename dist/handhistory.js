webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _angular = __webpack_require__(66);

	var _angular2 = _interopRequireDefault(_angular);

	var _app = __webpack_require__(68);

	var _common = __webpack_require__(70);

	var _components = __webpack_require__(84);

	var _app2 = __webpack_require__(88);

	__webpack_require__(89);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = AppModule = _angular2.default.module('angular-web-handgroups', [_common.CommonModule, _components.ComponentsModule]).component('handGroups', _app.AppComponent).service('AppService', _app2.AppService);

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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AppComponent = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _app = __webpack_require__(69);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AppController = function () {
	    AppController.$inject = ["AppService"];
	    function AppController(AppService) {
	        'ngInject';

	        _classCallCheck(this, AppController);

	        this.service = AppService;
	    }

	    _createClass(AppController, [{
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
/* 69 */
/***/ function(module, exports) {

	module.exports = "<filter-bar\n    on-game-type-select=\"$ctrl.gameTypeClickHandler($event)\"\n    on-game-outcome-select=\"$ctrl.gameOutcomeClickHandler($event)\">\n</filter-bar>\n\n<game-list\n    hide=\"$ctrl.gameListLoading && !$ctrl.scrollLoading\"\n    history=\"$ctrl.handhistory\"\n    on-bottom-scroll=\"$ctrl.loadOnScroll()\">\n</game-list>\n\n<spinner\n    visible=\"$ctrl.gameListLoading || $ctrl.scrollLoading\"\n    icon=\"circle-o-notch\"\n    size=\"4\"\n    text=\"Loading\">\n</spinner>"

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CommonModule = undefined;

	var _angular = __webpack_require__(66);

	var _angular2 = _interopRequireDefault(_angular);

	var _filter = __webpack_require__(71);

	var _gameList = __webpack_require__(74);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CommonModule = exports.CommonModule = _angular2.default.module('app.common', [_filter.FilterModule, _gameList.GameListModule]).value('EventEmmiter', function (payload) {
	    return { $event: payload };
	}).name;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FilterModule = undefined;

	var _angular = __webpack_require__(66);

	var _angular2 = _interopRequireDefault(_angular);

	var _filter = __webpack_require__(72);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FilterModule = exports.FilterModule = _angular2.default.module('filter', []).component('filterBar', _filter.FilterComponent).name;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FilterComponent = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _filter = __webpack_require__(73);

	var _filter2 = _interopRequireDefault(_filter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FilterController = function () {
	    FilterController.$inject = ["EventEmmiter", "$rootScope"];
	    function FilterController(EventEmmiter, $rootScope) {
	        'ngInject';

	        _classCallCheck(this, FilterController);

	        this.EventEmmiter = EventEmmiter;
	        this.$rootScope = $rootScope;
	    }

	    _createClass(FilterController, [{
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
/* 73 */
/***/ function(module, exports) {

	module.exports = "<section class=\"Panel\">\n    <div class=\"Panel-heading\">\n        <div class=\"Grid-row\">\n            <div class=\"Grid-col--10\">\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.tourneyClick()\"\n                        ng-class=\"$ctrl.filterModel.tourney ? 'is-active': ''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--info\"><i class=\"fa fa-trophy Button-icon\"></i></span></span>Tournaments\n                </button>\n\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.cashClick()\"\n                        ng-class=\"$ctrl.filterModel.cash ? 'is-active': ''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--primary\"><i class=\"fa fa-usd Button-icon\"></i></span></span>Cash Games\n                </button>\n\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.wonClick()\"\n                        ng-class=\"$ctrl.filterModel.won ? 'is-active':''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--success\"><i class=\"fa fa-thumbs-up Button-icon\"></i></span></span>Hands Won\n                </button>\n\n                <button class=\"Button Button--filter Button--flex\"\n                        ng-click=\"$ctrl.lostClick()\"\n                        ng-class=\"$ctrl.filterModel.lost ? 'is-active':''\">\n                    <span class=\"Button-media\"><span class=\"Circle Circle--filled--danger\"><i class=\"fa fa-thumbs-down Button-icon\"></i></span></span>Hands Lost\n                </button>\n            </div>\n            <div class=\"Grid-col--2 Grid--alignRight\">\n                <button class=\"Button Button--filter Button--flex\" ng-click=\"$ctrl.colapseAllClick()\">\n                    <span ng-show=\"$ctrl.collapseButtonText\">Collapse all</span>\n                    <span ng-hide=\"$ctrl.collapseButtonText\">Close all</span>\n                </button>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameListModule = undefined;

	var _angular = __webpack_require__(66);

	var _angular2 = _interopRequireDefault(_angular);

	var _games = __webpack_require__(75);

	var _gameList = __webpack_require__(81);

	var _gameListScroll = __webpack_require__(83);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GameListModule = exports.GameListModule = _angular2.default.module('gameList', [_games.GameModule]).component('gameList', _gameList.GameListComponent).directive('bottomScroll', _gameListScroll.GameListScroll).name;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameModule = undefined;

	var _angular = __webpack_require__(66);

	var _angular2 = _interopRequireDefault(_angular);

	var _games = __webpack_require__(76);

	var _gameDetails = __webpack_require__(78);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GameModule = exports.GameModule = _angular2.default.module('games', [_gameDetails.GameDetailsModule]).component('games', _games.GamesComponent).name;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GamesComponent = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _games = __webpack_require__(77);

	var _games2 = _interopRequireDefault(_games);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GamesController = function () {
	    GamesController.$inject = ["$rootScope"];
	    function GamesController($rootScope) {
	        'ngInject';

	        _classCallCheck(this, GamesController);

	        this.$rootScope = $rootScope;
	    }

	    _createClass(GamesController, [{
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
	            return Object.keys(cards).length;
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
/* 77 */
/***/ function(module, exports) {

	module.exports = "<div ng-show=\"$ctrl.visible\">\n    <hr class=\"HandHistory-divider\"/>\n\n    <section class=\"HandHistory-gameItem\" ng-repeat=\"replay in $ctrl.replays track by $index\">\n        <div class=\"Grid-row\" ng-click=\"$ctrl.gameCollapseClick($index)\">\n            <div class=\"Grid-col--auto\">\n                <div class=\"Media\">\n                    <div class=\"Media-object--left\">\n                        <span class=\"HandHistory-gameItem-circle\" ng-class=\"replay.game_type == 'tourney' ? 'Circle--filled--info':'Circle--filled--success'\">\n                            <i ng-class=\"replay.game_type == 'tourney' ? 'fa fa-trophy Button-icon' : 'fa fa-usd Button-icon'\"></i>\n                        </span>\n                    </div>\n                    <div class=\"Media-body\">\n                        <h1 class=\"HandHistory-gameItem-gameType\">{{ $ctrl.getGameStyle(replay.game_style) }}</h1>\n                        <h2 class=\"HandHistory-gameItem-title\">{{ replay.title }}</h2>\n                    </div>\n                </div>\n            </div>\n            <div class=\"Grid-col--auto Grid--alignRight\">\n                <div class=\"HandHistory-gameItem-kpi\">\n                    Prizepool:<strong class=\"HandHistory-gameItem-kpi-value\">{{ replay.prizepool }}</strong>|\n                    Entries:<strong class=\"HandHistory-gameItem-kpi-value\">{{ replay.entries }}</strong>|\n                    Finished in:<strong class=\"HandHistory-gameItem-kpi-value\">{{ replay.finished_in }}</strong>\n                </div>\n            </div>\n        </div>\n        <div class=\"HandHistory-gameItem-counter\" ng-click=\"$ctrl.click(replay.details)\">{{ replay.game_items }}</div>\n\n        <game-details details=\"replay.details\" visible=\"$ctrl.gameCollapse[$index]\"></game-details>\n\n    </section>\n</div>"

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameDetailsModule = undefined;

	var _angular = __webpack_require__(66);

	var _angular2 = _interopRequireDefault(_angular);

	var _gameDetails = __webpack_require__(79);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GameDetailsModule = exports.GameDetailsModule = _angular2.default.module('gameDetails', []).component('gameDetails', _gameDetails.GameDetailsComponent).name;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameDetailsComponent = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _gameDetails = __webpack_require__(80);

	var _gameDetails2 = _interopRequireDefault(_gameDetails);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameDetailsController = function () {
	    function GameDetailsController() {
	        _classCallCheck(this, GameDetailsController);
	    }

	    _createClass(GameDetailsController, [{
	        key: 'numberOfCards',
	        value: function numberOfCards(cards) {
	            return Object.keys(cards).length;
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
/* 80 */
/***/ function(module, exports) {

	module.exports = "<div ng-repeat=\"detail in $ctrl.details\" ng-show=\"$ctrl.visible\">\n    <hr class=\"HandHistory-divider--dotted\">\n\n    <div class=\"Grid-row\">\n        <!-- Dynamically change Grid class based on number of Hole cards -->\n        <div ng-class=\"$ctrl.numberOfCards(detail.hole_cards) > 2 ? 'Grid-col--3--tablet Grid-col--12' : 'Grid-col--2--tablet Grid-col--12'\">\n            <div class=\"HandHistory-gameItem-holeCards\">\n                <div ng-repeat=\"hole in detail.hole_cards\" class=\"DeckCard DeckCard--{{ hole }}\"></div>\n            </div>\n        </div>\n        <div class=\"Grid-col--4--tablet Grid-col--12\">\n            <div class=\"HandHistory-gameItem-communityCards\">\n                <div ng-repeat=\"community in detail.cards_on_board track by $index\"\n                     ng-class=\"$index == 3 ? 'HandHistory-gameItem-separateCards' : ''\"\n                     class=\"DeckCard DeckCard--{{ community }}\">\n                </div>\n            </div>\n        </div>\n        <div class=\"Grid-col--auto--tablet Grid-col--12\">\n            <div class=\"Media\">\n                <div class=\"Media-body\">\n                    <h1 class=\"HandHistory-gameItem-levelText\">Level</h1>\n                    <h2 class=\"HandHistory-gameItem-levelValue\">{{ detail.currency.symbol }}{{ detail.small_blind }}/{{ detail.big_blind }}</h2>\n                </div>\n            </div>\n        </div>\n        <div class=\"Grid-col--auto--tablet Grid-col--12\">\n            <div class=\"Media\">\n                <div class=\"Media-body\">\n                    <h1 class=\"HandHistory-gameItem-levelText\">Pot Size</h1>\n                    <h2 class=\"HandHistory-gameItem-levelValue\" ng-class=\"detail.pot < 0 ? 'u-textDanger' : ''\">{{ detail.currency.symbol }}{{ detail.pot }}</h2>\n                </div>\n            </div>\n        </div>\n        <div class=\"Grid-col--2--tablet Grid-col--12 Grid--alignRight\">\n            <div class=\"HandHistory-gameItem-actions\">\n                <button class=\"Button Button--icon fn-shareButton\" ng-click=\"$ctrl.click()\"><span class=\"Circle\"><i class=\"fa fa-share-alt Button-icon\"></i></span></button>\n                <button class=\"Button Button--icon fn-playButton\" ng-click=\"$ctrl.click()\"><span class=\"Circle\"><i class=\"fa fa-play Button-icon\"></i></span></button>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameListComponent = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _gameList = __webpack_require__(82);

	var _gameList2 = _interopRequireDefault(_gameList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameListController = function () {
	    GameListController.$inject = ["$rootScope"];
	    function GameListController($rootScope) {
	        'ngInject';

	        _classCallCheck(this, GameListController);

	        this.$rootScope = $rootScope;
	    }

	    _createClass(GameListController, [{
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
/* 82 */
/***/ function(module, exports) {

	module.exports = "<div bottom-scroll=\"$ctrl.onBottomScroll()\" ng-hide=\"$ctrl.hide\">\n\n    <section class=\"Panel\" ng-repeat=\"game in $ctrl.history track by $index\">\n        <div class=\"Panel-body\">\n            <div class=\"Grid-row\">\n                <div class=\"Grid-col--10\" ng-click=\"$ctrl.collapseOneClick($index)\">\n                    <div class=\"HandHistory-expand\"><i ng-class=\"$ctrl.collapse[$index] ? 'fa fa-caret-down':'fa fa-caret-right'\"></i></div>\n                    <h1 class=\"Heading--five HandHistoryDay-title\">{{ game.date | date: 'EEEE, MMMM d' }}</h1>\n                </div>\n                <div class=\"Grid-col--2 Grid--alignRight\">\n                    <div class=\"Media HandHistoryDay-info\">\n                        <div class=\"Media-object--right\" ng-hide=\"game.cashgame_count < 1\">\n                            <div class=\"Media\">\n                                <div class=\"Media-object--left\"><span class=\"Circle Circle--filled--success\"><i class=\"fa fa-usd Button-icon\"></i></span></div>\n                                <div class=\"Media-body\">{{ game.cashgame_count }}</div>\n                            </div>\n                        </div>\n                        <div class=\"Media-object--right\" ng-hide=\"game.tourney_count < 1\">\n                            <div class=\"Media\">\n                                <div class=\"Media-object--left\"><span class=\"Circle Circle--filled--info\"><i class=\"fa fa-trophy Button-icon\"></i></span></div>\n                                <div class=\"Media-body\">{{ game.tourney_count }}</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <games replays=\"game.replays\" visible=\"$ctrl.collapse[$index]\"></games>\n        </div>\n    </section>\n</div>"

/***/ },
/* 83 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var GameListScroll = exports.GameListScroll = ["$window", function GameListScroll($window) {
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
	}];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ComponentsModule = undefined;

	var _angular = __webpack_require__(66);

	var _angular2 = _interopRequireDefault(_angular);

	var _spinner = __webpack_require__(85);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ComponentsModule = exports.ComponentsModule = _angular2.default.module('app.components', [_spinner.SpinnerModule]).name;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SpinnerModule = undefined;

	var _angular = __webpack_require__(66);

	var _angular2 = _interopRequireDefault(_angular);

	var _spinner = __webpack_require__(86);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SpinnerModule = exports.SpinnerModule = _angular2.default.module('spinnerIcon', []).component('spinner', _spinner.SpinnerComponent).name;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SpinnerComponent = undefined;

	var _spinner = __webpack_require__(87);

	var _spinner2 = _interopRequireDefault(_spinner);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpinnerController = function SpinnerController() {
	    _classCallCheck(this, SpinnerController);
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
/* 87 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-textCenter u-textPrimary m--4\" ng-show=\"$ctrl.visible\">\n    <i class=\"fa fa-{{ $ctrl.icon }} fa-spin fa-{{ $ctrl.size }}x fa-fw\"></i>\n    <p class=\"u-textCenter\" ng-bind=\"$ctrl.text\"></p>\n</div>\n"

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AppService = exports.AppService = function () {
	    AppService.$inject = ["$http"];
	    function AppService($http) {
	        'ngInject';

	        _classCallCheck(this, AppService);

	        this.urlString = ("/api/handgroup/");
	        this.$http = $http;
	    }

	    _createClass(AppService, [{
	        key: 'getHandHistory',
	        value: function getHandHistory(params, id) {
	            // set url target string based on ENV
	            if (true) {
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
/* 89 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);