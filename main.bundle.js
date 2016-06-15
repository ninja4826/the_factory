webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * Providers provided by Angular
	 */
	var platform_browser_dynamic_1 = __webpack_require__(291);
	/*
	* Platform and Environment
	* our providers/directives/pipes
	*/
	var browser_1 = __webpack_require__(461);
	var environment_1 = __webpack_require__(462);
	/*
	* App Component
	* our top level component that holds all of our components
	*/
	var app_1 = __webpack_require__(452);
	/*
	 * Bootstrap our Angular app with a top level component `App` and inject
	 * our Services and Providers into Angular's dependency injection
	 */
	function main(initialHmrState) {
	    return platform_browser_dynamic_1.bootstrap(app_1.App, browser_1.PLATFORM_PROVIDERS.concat(environment_1.ENV_PROVIDERS, app_1.APP_PROVIDERS))
	        .catch(function (err) { return console.error(err); });
	}
	exports.main = main;
	/*
	 * Vendors
	 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
	 * You can also import them in vendors to ensure that they are bundled in one file
	 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
	 */
	/*
	 * Hot Module Reload
	 * experimental version by @gdi2290
	 */
	if (false) {
	    // activate hot module reload
	    var ngHmr = require('angular2-hmr');
	    ngHmr.hotModuleReplacement(main, module);
	}
	else {
	    // bootstrap when document is ready
	    document.addEventListener('DOMContentLoaded', function () { return main(); });
	}
	

/***/ },

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(199);
	var Retail = (function () {
	    function Retail(ret) {
	        this.name = ret.name;
	        this.sellPrice = ret.sellPrice;
	        this.tier = ret.tier || 0;
	        // console.log(ret.requirements);
	        this.requirements = ret.requirements.map(function (req) { return new index_1.Requirement(req); });
	    }
	    return Retail;
	}());
	exports.Retail = Retail;
	// export function accum(prev: { [name: string]: Retail }, curr: Retail): { [name: string]: Retail } {
	//   prev[curr.name] = curr;
	//   return prev;
	// }
	function accum(rets, tier) {
	    var obj = {};
	    return rets.map(function (ret) {
	        ret.tier = tier;
	        return new Retail(ret);
	    }).reduce(function (prev, curr) {
	        prev[curr.name] = curr;
	        return prev;
	    }, obj);
	}
	exports.accum = accum;
	

/***/ },

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var angular2_hmr_1 = __webpack_require__(500);
	var AppState = (function () {
	    function AppState() {
	        // @HmrState() is used by HMR to track the state of any object during HMR (hot module replacement)
	        this._state = {};
	    }
	    Object.defineProperty(AppState.prototype, "state", {
	        // already return a clone of the current state
	        get: function () {
	            return this._state = this._clone(this._state);
	        },
	        // never allow mutation
	        set: function (value) {
	            throw new Error('do not mutate the `.state` directly');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AppState.prototype.get = function (prop) {
	        // use our state getter for the clone
	        var state = this.state;
	        return state.hasOwnProperty(prop) ? state[prop] : state;
	    };
	    AppState.prototype.set = function (prop, value) {
	        // internally mutate our state
	        return this._state[prop] = value;
	    };
	    AppState.prototype._clone = function (object) {
	        // simple object clone
	        return JSON.parse(JSON.stringify(object));
	    };
	    __decorate([
	        angular2_hmr_1.HmrState(), 
	        __metadata('design:type', Object)
	    ], AppState.prototype, "_state", void 0);
	    AppState = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], AppState);
	    return AppState;
	}());
	exports.AppState = AppState;
	var FormatterPipe = (function () {
	    function FormatterPipe() {
	    }
	    FormatterPipe.prototype.transform = function (val, args) {
	        return val.split('_')
	            .map(function (str) { return str.charAt(0).toUpperCase() + str.slice(1); })
	            .join(' ');
	    };
	    FormatterPipe = __decorate([
	        core_1.Pipe({
	            name: 'formatter'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FormatterPipe);
	    return FormatterPipe;
	}());
	exports.FormatterPipe = FormatterPipe;
	

/***/ },

/***/ 130:
/***/ function(module, exports) {

	"use strict";
	var OpaqueToken = (function () {
	    function OpaqueToken(_desc) {
	        this._desc = _desc;
	    }
	    OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
	    return OpaqueToken;
	}());
	exports.OpaqueToken = OpaqueToken;
	exports.HMR_STATE = new OpaqueToken('hmrState');
	var HmrStore = (function () {
	    function HmrStore() {
	    }
	    HmrStore.set = function (prop, value) {
	        HmrStore._state[prop] = value;
	        return HmrStore._state[prop];
	    };
	    HmrStore.get = function (prop) {
	        return HmrStore._state[prop];
	    };
	    HmrStore.select = function (name, getState) {
	        HmrStore._states.push({ name: name, getState: getState });
	        var defaultData = getState();
	        var currentData = HmrStore.get(name);
	        if (defaultData && !currentData) {
	            return HmrStore.set(name, defaultData);
	        }
	        else if (defaultData && currentData) {
	            return HmrStore.set(name, Object.assign({}, defaultData, currentData));
	        }
	        else {
	            return HmrStore.set(name, currentData || defaultData);
	        }
	    };
	    HmrStore.dispose = function () {
	        HmrStore._states = [];
	        HmrStore._state = {};
	        HmrStore._initialValues = {};
	    };
	    HmrStore.getState = function () {
	        var initialState = Object.assign({}, HmrStore._state);
	        return HmrStore._states
	            .reduce(function (memo, item) {
	            memo[item.name] = item.getState();
	            return memo;
	        }, initialState);
	    };
	    HmrStore.toJSON = function () {
	        return HmrStore.getState();
	    };
	    HmrStore.dev = false;
	    HmrStore._state = {};
	    HmrStore._initialValues = {};
	    HmrStore._states = [];
	    return HmrStore;
	}());
	exports.HmrStore = HmrStore;
	

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(450));
	__export(__webpack_require__(199));
	

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(318));
	var material_2 = __webpack_require__(318);
	var Requirement = (function () {
	    function Requirement(req) {
	        this.name = req.name;
	        this.count = req.count;
	        // this.isMaterial = req.isMaterial || false;
	        // let matIndex = MATERIALS.findIndex((mat) => mat.name === req.name);
	        this.isMaterial = req.name in material_2.MATERIALS;
	        // this.isMaterial = matIndex !== -1;
	    }
	    return Requirement;
	}());
	exports.Requirement = Requirement;
	__export(__webpack_require__(451));
	

/***/ },

/***/ 318:
/***/ function(module, exports) {

	"use strict";
	// export const MATERIALS: IMaterial[] = [
	var materials = [
	    { name: "cardboard", sellPrice: 0.18, buyPrice: 0.24 },
	    { name: "concrete", sellPrice: 3.14, buyPrice: 4.19 },
	    { name: "magnet", sellPrice: 4.26, buyPrice: 5.68 },
	    { name: "metal", sellPrice: 2.55, buyPrice: 3.40 },
	    { name: "paint", sellPrice: 1.70, buyPrice: 2.26 },
	    { name: "plastic", sellPrice: 0.45, buyPrice: 0.60 },
	    { name: "rare_metal", sellPrice: 5.86, buyPrice: 7.81 },
	    { name: "rubber", sellPrice: 0.83, buyPrice: 1.10 },
	    { name: "wire", sellPrice: 1.28, buyPrice: 1.71 }
	];
	var obj = {};
	exports.MATERIALS = materials.reduce(function (prev, curr) {
	    prev[curr.name] = curr;
	    return prev;
	}, obj);
	

/***/ },

/***/ 319:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var retail_1 = __webpack_require__(95);
	var tier_1 = [
	    {
	        name: "adv_concrete",
	        sellPrice: 14.47,
	        requirements: [
	            { name: "concrete", count: 2 },
	            { name: "metal", count: 2 }
	        ]
	    }, {
	        name: "belt",
	        sellPrice: 2.60,
	        requirements: [
	            { name: "rubber", count: 2 }
	        ]
	    }, {
	        name: "box",
	        sellPrice: 2.21,
	        tier: 1,
	        requirements: [
	            { name: "cardboard", count: 4 }
	        ]
	    }, {
	        name: "cable",
	        sellPrice: 3.28,
	        requirements: [
	            { name: "metal", count: 1 }
	        ]
	    }, {
	        name: "circuit",
	        sellPrice: 3.54,
	        requirements: [
	            { name: "plastic", count: 2 }
	        ]
	    }, {
	        name: "gear",
	        sellPrice: 6.56,
	        requirements: [
	            { name: "metal", count: 2 }
	        ]
	    }, {
	        name: "hose",
	        sellPrice: 2.60,
	        requirements: [
	            { name: "rubber", count: 2 }
	        ]
	    }, {
	        name: "metal_wheel",
	        sellPrice: 6.56,
	        requirements: [
	            { name: "metal", count: 2 }
	        ]
	    }, {
	        name: "motor",
	        sellPrice: 17.40,
	        requirements: [
	            { name: "magnet", count: 2 },
	            { name: "metal", count: 1 },
	            { name: "wire", count: 2 }
	        ]
	    }, {
	        name: "plastic_wheel",
	        sellPrice: 1.72,
	        requirements: [
	            { name: "plastic", count: 2 }
	        ]
	    }, {
	        name: "pump",
	        sellPrice: 8.72,
	        requirements: [
	            { name: "metal", count: 2 },
	            { name: "plastic", count: 1 },
	            { name: "rubber", count: 1 }
	        ]
	    }, {
	        name: "garden_gnome",
	        sellPrice: 15.9,
	        requirements: [
	            { name: "concrete", count: 1 },
	            { name: "paint", count: 1 },
	            { name: "box", count: 1 }
	        ]
	    }, {
	        name: "speakers",
	        sellPrice: 29.42,
	        requirements: [
	            { name: "magnet", count: 2 },
	            { name: "plastic", count: 2 },
	            { name: "wire", count: 1 },
	            { name: "box", count: 1 }
	        ]
	    }, {
	        name: "toaster",
	        sellPrice: 22.72,
	        requirements: [
	            { name: "metal", count: 2 },
	            { name: "wire", count: 2 },
	            { name: "box", count: 1 }
	        ]
	    }
	];
	// export const TIER_1: Retail[] = tier_1
	//   .map((ret) => {
	//     ret.tier = 1;
	//     return ret;
	//   }).map((ret) => new Retail(ret));
	// export const TIER_1: { [name: string]: Retail } = tier_1
	//   .map((ret) => {
	//     ret.tier = 1;
	//     return new Retail(ret);
	//   }).reduce((prev, curr) => {
	//     prev[curr.name] = curr;
	//     return prev;
	//   }, {});
	exports.TIER_1 = retail_1.accum(tier_1, 1);
	

/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var retail_1 = __webpack_require__(95);
	var tier_2 = [
	    {
	        name: "air_gun",
	        sellPrice: 19.78,
	        requirements: [
	            { name: "metal", count: 4 },
	            { name: "hose", count: 2 }
	        ]
	    }, {
	        name: "arm",
	        sellPrice: 51.68,
	        requirements: [
	            { name: "metal", count: 2 },
	            { name: "circuit", count: 1 },
	            { name: "motor", count: 2 }
	        ]
	    }, {
	        name: "conveyor",
	        sellPrice: 102.58,
	        requirements: [
	            { name: "belt", count: 1 },
	            { name: "gear", count: 2 },
	            { name: "metal_wheel", count: 8 },
	            { name: "motor", count: 1 }
	        ]
	    }, {
	        name: "lifter",
	        sellPrice: 55.46,
	        requirements: [
	            { name: "metal", count: 3 },
	            { name: "cable", count: 2 },
	            { name: "hose", count: 2 },
	            { name: "motor", count: 1 },
	            { name: "pump", count: 1 }
	        ]
	    }, {
	        name: "logic_unit",
	        sellPrice: 26.75,
	        requirements: [
	            { name: "wire", count: 5 },
	            { name: "circuit", count: 4 }
	        ]
	    }, {
	        name: "mover",
	        sellPrice: 113.65,
	        requirements: [
	            { name: "metal", count: 3 },
	            { name: "gear", count: 4 },
	            { name: "metal_wheel", count: 4 },
	            { name: "motor", count: 2 }
	        ]
	    }, {
	        name: "road",
	        sellPrice: 49.8,
	        requirements: [
	            { name: "concrete", count: 4 },
	            { name: "adv_concrete", count: 2 }
	        ]
	    }, {
	        name: "support",
	        sellPrice: 40.53,
	        requirements: [
	            { name: "metal", count: 2 },
	            { name: "adv_concrete", count: 2 }
	        ]
	    }, {
	        name: "thing-a-ma-jig",
	        sellPrice: 61.02,
	        requirements: [
	            { name: "circuit", count: 3 },
	            { name: "hose", count: 2 },
	            { name: "motor", count: 1 },
	            { name: "pump", count: 2 }
	        ]
	    }, {
	        name: "widget",
	        sellPrice: 14.78,
	        requirements: [
	            { name: "metal", count: 1 },
	            { name: "plastic", count: 4 },
	            { name: "wire", count: 2 },
	            { name: "circuit", count: 1 }
	        ]
	    }, {
	        name: "toy_car",
	        sellPrice: 35.38,
	        requirements: [
	            { name: "metal", count: 1 },
	            { name: "paint", count: 1 },
	            { name: "plastic", count: 3 },
	            { name: "plastic_wheel", count: 4 },
	            { name: "box", count: 1 }
	        ]
	    }, {
	        name: "water_gun",
	        sellPrice: 29.62,
	        requirements: [
	            { name: "paint", count: 1 },
	            { name: "plastic", count: 6 },
	            { name: "hose", count: 2 },
	            { name: "box", count: 1 }
	        ]
	    }
	];
	// export const TIER_2: Retail[] = tier_2
	//   .map((ret) => {
	//     ret.tier = 2;
	//     return ret;
	//   }).map((ret) => new Retail(ret));
	// export const TIER_2: { [name: string]: Retail } = tier_2
	//   .map((ret) => {
	//     ret.tier = 2;
	//     return new Retail(ret);
	//   }).reduce((prev, curr) => {
	//     prev[curr.name] = curr;
	//     return prev;
	//   })
	exports.TIER_2 = retail_1.accum(tier_2, 2);
	

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var retail_1 = __webpack_require__(95);
	var tier_3 = [
	    {
	        name: "adv_logic_unit",
	        sellPrice: 87.15,
	        requirements: [
	            { name: "wire", count: 4 },
	            { name: "circuit", count: 4 },
	            { name: "logic_unit", count: 2 }
	        ]
	    }, {
	        name: "assembly_line",
	        sellPrice: 715.84,
	        requirements: [
	            { name: "air_gun", count: 2 },
	            { name: "arm", count: 2 },
	            { name: "conveyor", count: 3 },
	            { name: "lifter", count: 1 },
	            { name: "mover", count: 1 }
	        ]
	    }, {
	        name: "jet_engine",
	        sellPrice: 180.04,
	        requirements: [
	            { name: "metal", count: 8 },
	            { name: "wire", count: 12 },
	            { name: "hose", count: 6 },
	            { name: "pump", count: 4 },
	            { name: "thing-a-ma-jig", count: 1 }
	        ]
	    }, {
	        name: "sensor",
	        sellPrice: 51.51,
	        requirements: [
	            { name: "rare_metal", count: 2 },
	            { name: "wire", count: 1 },
	            { name: "circuit", count: 1 },
	            { name: "logic_unit", count: 1 }
	        ]
	    }, {
	        name: "bridge",
	        sellPrice: 1091.16,
	        requirements: [
	            { name: "road", count: 6 },
	            { name: "support", count: 6 }
	        ]
	    }, {
	        name: "forklift",
	        sellPrice: 198.04,
	        requirements: [
	            { name: "metal", count: 6 },
	            { name: "rubber", count: 8 },
	            { name: "metal_wheel", count: 4 },
	            { name: "motor", count: 2 },
	            { name: "box", count: 4 }
	        ]
	    }, {
	        name: "radio_tower",
	        sellPrice: 414,
	        requirements: [
	            { name: "metal", count: 12 },
	            { name: "wire", count: 6 },
	            { name: "support", count: 4 }
	        ]
	    }, {
	        name: "tablet_computer",
	        sellPrice: 93.14,
	        requirements: [
	            { name: "plastic", count: 1 },
	            { name: "wire", count: 3 },
	            { name: "circuit", count: 3 },
	            { name: "logic_unit", count: 1 },
	            { name: "box", count: 1 }
	        ]
	    }
	];
	// export const TIER_3: Retail[] = tier_3
	//   .map((ret) => {
	//     ret.tier = 3;
	//     return ret;
	//   }).map((ret) => new Retail(ret));
	exports.TIER_3 = retail_1.accum(tier_3, 3);
	

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var retail_1 = __webpack_require__(95);
	var tier_4 = [
	    {
	        name: "drone",
	        sellPrice: 542.06,
	        requirements: [
	            { name: "plastic", count: 4 },
	            { name: "rare_metal", count: 1 },
	            { name: "motor", count: 4 },
	            { name: "adv_logic_unit", count: 1 },
	            { name: "sensor", count: 2 }
	        ]
	    }, {
	        name: "jet",
	        sellPrice: 3514.76,
	        requirements: [
	            { name: "metal", count: 24 },
	            { name: "wire", count: 18 },
	            { name: "adv_logic_unit", count: 6 },
	            { name: "jet_engine", count: 4 },
	            { name: "sensor", count: 8 }
	        ]
	    }, {
	        name: "oculus_rift",
	        sellPrice: 307.84,
	        requirements: [
	            { name: "plastic", count: 2 },
	            { name: "rare_metal", count: 2 },
	            { name: "wire", count: 4 },
	            { name: "widget", count: 2 },
	            { name: "sensor", count: 2 }
	        ]
	    }
	];
	// export const TIER_4: Retail[] = tier_4
	//   .map((ret) => {
	//     ret.tier = 4;
	//     return ret;
	//   }).map((ret) => new Retail(ret));
	exports.TIER_4 = retail_1.accum(tier_4, 4);
	

/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available directives in any template
	 */
	"use strict";
	var core_1 = __webpack_require__(1);
	// Angular 2 Router
	var router_deprecated_1 = __webpack_require__(94);
	// application_directives: directives that are global through out the application
	exports.APPLICATION_DIRECTIVES = router_deprecated_1.ROUTER_DIRECTIVES.slice();
	exports.DIRECTIVES = [
	    { provide: core_1.PLATFORM_DIRECTIVES, multi: true, useValue: exports.APPLICATION_DIRECTIVES }
	];
	

/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available pipes in any template
	 */
	"use strict";
	var core_1 = __webpack_require__(1);
	// application_pipes: pipes that are global through out the application
	exports.APPLICATION_PIPES = [];
	exports.PIPES = [
	    { provide: core_1.PLATFORM_PIPES, multi: true, useValue: exports.APPLICATION_PIPES }
	];
	

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available services in any component or any other service
	 */
	"use strict";
	// Angular 2
	var common_1 = __webpack_require__(54);
	// Angular 2 Http
	var http_1 = __webpack_require__(282);
	// Angular 2 Router
	var router_deprecated_1 = __webpack_require__(94);
	/*
	* Application Providers/Directives/Pipes
	* providers/directives/pipes that only live in our browser environment
	*/
	exports.APPLICATION_PROVIDERS = common_1.FORM_PROVIDERS.concat(http_1.HTTP_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS, [
	    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
	]);
	exports.PROVIDERS = exports.APPLICATION_PROVIDERS.slice();
	

/***/ },

/***/ 447:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * Angular 2 decorators and services
	 */
	var core_1 = __webpack_require__(1);
	var router_deprecated_1 = __webpack_require__(94);
	var app_service_1 = __webpack_require__(127);
	var router_active_1 = __webpack_require__(459);
	var game_1 = __webpack_require__(198);
	var automation_1 = __webpack_require__(449);
	var inventory_1 = __webpack_require__(453);
	var manufacturing_1 = __webpack_require__(455);
	var purchasing_1 = __webpack_require__(457);
	/*
	 * App Component
	 * Top Level Component
	 */
	var App = (function () {
	    function App(appState, gameService) {
	        this.angularclassLogo = 'assets/img/angularclass-avatar.png';
	        this.loading = false;
	        this.name = 'Angular 2 Webpack Starter';
	        this.url = 'https://twitter.com/AngularClass';
	        this.fluid = true;
	        this.money = 0;
	        this.appState = appState;
	        this.gameService = gameService;
	        // let comps = ['Automation', 'Inventory', 'Manufacturing', 'Purchasing'];
	        var comps = ['Purchasing', 'Manufacturing', 'Inventory', 'Automation'];
	        this.navLinks = comps.map(function (comp) {
	            return {
	                comp: comp,
	                text: comp
	            };
	        });
	    }
	    App.prototype.ngOnInit = function () {
	        var _this = this;
	        console.log('Initial App State', this.appState.state);
	        this.gameService.moneyEmitter.subscribe(function (money) {
	            _this.money = money;
	            console.log(_this.money);
	        });
	        this.money = this.gameService.money;
	    };
	    App = __decorate([
	        core_1.Component({
	            selector: 'app',
	            pipes: [],
	            providers: [],
	            directives: [router_active_1.RouterActive],
	            encapsulation: core_1.ViewEncapsulation.None,
	            styles: [
	                __webpack_require__(476)
	            ],
	            template: __webpack_require__(477)
	        }),
	        router_deprecated_1.RouteConfig([
	            { path: '/', name: 'Index', component: purchasing_1.PurchasingComponent, useAsDefault: true },
	            { path: '/automation', name: 'Automation', component: automation_1.AutomationComponent },
	            { path: '/inventory', name: 'Inventory', component: inventory_1.InventoryComponent },
	            { path: '/manufacturing', name: 'Manufacturing', component: manufacturing_1.ManufacturingComponent },
	            { path: '/purchasing', name: 'Purchasing', component: purchasing_1.PurchasingComponent },
	        ]), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _a) || Object, (typeof (_b = typeof game_1.GameService !== 'undefined' && game_1.GameService) === 'function' && _b) || Object])
	    ], App);
	    return App;
	    var _a, _b;
	}());
	exports.App = App;
	/*
	 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
	 * more angular app examples that you may copy/paste
	 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
	 * For help or questions please contact us at @AngularClass on twitter
	 * or our chat on Slack at https://AngularClass.com/slack-join
	 */
	

/***/ },

/***/ 448:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var AutomationComponent = (function () {
	    function AutomationComponent() {
	    }
	    AutomationComponent.prototype.ngOnInit = function () {
	    };
	    AutomationComponent = __decorate([
	        core_1.Component({
	            selector: 'automation',
	            template: __webpack_require__(478)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AutomationComponent);
	    return AutomationComponent;
	}());
	exports.AutomationComponent = AutomationComponent;
	

/***/ },

/***/ 449:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(448));
	

/***/ },

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	// import { material, retail } from './items';
	// import * as items from './items';
	var items_1 = __webpack_require__(199);
	var GameService = (function () {
	    function GameService() {
	        this.moneyEmitter = new core_1.EventEmitter();
	        this.inventoryEmitter = new core_1.EventEmitter();
	        this.salesEmitter = new core_1.EventEmitter();
	        this.money = 1000;
	        this.inventory = {};
	        // console.log('material:\n', material, '\n');
	        // console.log('retail:\n', retail);
	        // console.log('items: ', items);
	        for (var name in items_1.MATERIALS) {
	            this.inventory[name] = 0;
	        }
	        for (var name in items_1.ALL_TIERS) {
	            this.inventory[name] = 0;
	        }
	        this.moneyEmitter.emit(this.money);
	        this.inventoryEmitter.emit(this.inventory);
	    }
	    GameService.prototype.add = function (name, count, buy) {
	        if (buy === void 0) { buy = false; }
	        if (!(name in items_1.MATERIALS || name in items_1.ALL_TIERS)) {
	            return false;
	        }
	        // this.inventory[name] += count;
	        console.log(name, count, buy);
	        if (buy) {
	            var price = 0;
	            if (name in items_1.MATERIALS) {
	                if (count > 0) {
	                    price = items_1.MATERIALS[name].buyPrice;
	                }
	                else if (count < 0) {
	                    price = items_1.MATERIALS[name].sellPrice;
	                }
	                else {
	                    return false;
	                }
	            }
	            else if (name in items_1.ALL_TIERS) {
	                if (count >= 0) {
	                    return false;
	                }
	                this.salesEmitter.emit({
	                    name: name,
	                    count: count
	                });
	                return true;
	            }
	            if (count > 0 && this.money < price)
	                return false;
	            this.money -= (price * count);
	            this.moneyEmitter.emit(this.money);
	        }
	        this.inventory[name] += count;
	        this.inventoryEmitter.emit(this.inventory);
	        return true;
	    };
	    GameService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], GameService);
	    return GameService;
	}());
	exports.GameService = GameService;
	

/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(95));
	__export(__webpack_require__(319));
	__export(__webpack_require__(320));
	__export(__webpack_require__(321));
	__export(__webpack_require__(322));
	var tier_1_2 = __webpack_require__(319);
	var tier_2_2 = __webpack_require__(320);
	var tier_3_2 = __webpack_require__(321);
	var tier_4_2 = __webpack_require__(322);
	// export const ALL_TIERS = [
	//   ...TIER_1,
	//   ...TIER_2,
	//   ...TIER_3,
	//   ...TIER_4
	// ];
	var all_tiers = {};
	for (var name in tier_1_2.TIER_1) {
	    all_tiers[name] = tier_1_2.TIER_1[name];
	}
	for (var name in tier_2_2.TIER_2) {
	    all_tiers[name] = tier_2_2.TIER_2[name];
	}
	for (var name in tier_3_2.TIER_3) {
	    all_tiers[name] = tier_3_2.TIER_3[name];
	}
	for (var name in tier_4_2.TIER_4) {
	    all_tiers[name] = tier_4_2.TIER_4[name];
	}
	exports.ALL_TIERS = all_tiers;
	

/***/ },

/***/ 452:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	// App
	__export(__webpack_require__(447));
	__export(__webpack_require__(127));
	var app_service_2 = __webpack_require__(127);
	var game_1 = __webpack_require__(198);
	// Application wide providers
	exports.APP_PROVIDERS = [
	    app_service_2.AppState,
	    game_1.GameService
	];
	

/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(454));
	

/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var InventoryComponent = (function () {
	    function InventoryComponent() {
	    }
	    InventoryComponent.prototype.ngOnInit = function () {
	    };
	    InventoryComponent = __decorate([
	        core_1.Component({
	            selector: 'inventory',
	            template: __webpack_require__(479)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], InventoryComponent);
	    return InventoryComponent;
	}());
	exports.InventoryComponent = InventoryComponent;
	

/***/ },

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(456));
	

/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var ManufacturingComponent = (function () {
	    function ManufacturingComponent() {
	    }
	    ManufacturingComponent.prototype.ngOnInit = function () {
	    };
	    ManufacturingComponent = __decorate([
	        core_1.Component({
	            selector: 'manufacturing',
	            template: __webpack_require__(480)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ManufacturingComponent);
	    return ManufacturingComponent;
	}());
	exports.ManufacturingComponent = ManufacturingComponent;
	

/***/ },

/***/ 457:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(458));
	

/***/ },

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var game_1 = __webpack_require__(198);
	var app_service_1 = __webpack_require__(127);
	// import { items } from '../game';
	var PurchasingComponent = (function () {
	    function PurchasingComponent(gameService) {
	        this.cards = [];
	        this.order = {};
	        this.orderPrice = 0;
	        // constructor() {
	        this.gameService = gameService;
	        // this.cards = MATERIALS;
	        // for (let card of this.cards) {
	        //   this.order[card.name] = 0;
	        //   this.cardObj[card.name] = card;
	        // }
	        this.cardObj = game_1.MATERIALS;
	        for (var name in this.cardObj) {
	            this.cards.push(this.cardObj[name]);
	            this.order[name] = 0;
	        }
	        console.log(game_1.MATERIALS);
	    }
	    PurchasingComponent.prototype.changeQuantity = function (name, pos) {
	        if (pos === void 0) { pos = true; }
	        if (pos) {
	            if ((this.orderPrice + this.cardObj[name].buyPrice) > this.gameService.money) {
	                return;
	            }
	        }
	        else {
	            if (this.gameService.inventory[name] === 0) {
	                return;
	            }
	        }
	        var add = (pos ? 1 : -1);
	        this.order[name] += add;
	        this.orderPrice += (this.cardObj[name].buyPrice * add);
	    };
	    PurchasingComponent.prototype.isPos = function (val) {
	        return val > 0;
	    };
	    PurchasingComponent.prototype.completePurchase = function () {
	        var _this = this;
	        var inventory = this.gameService.inventory;
	        var keys = Object.keys(this.order).filter(function (k) { return _this.order[k] !== 0; });
	        console.log('order', this.order);
	        console.log('keys', keys);
	        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
	            var name = keys_1[_i];
	            var count = this.order[name];
	            if (this.gameService.add(name, count, true)) {
	                this.order[name] = 0;
	            }
	        }
	        // this.gameService.money -= this.orderPrice;
	    };
	    PurchasingComponent.prototype.ngOnInit = function () {
	    };
	    PurchasingComponent = __decorate([
	        core_1.Component({
	            selector: 'purchasing',
	            styles: [__webpack_require__(475)],
	            template: __webpack_require__(481),
	            pipes: [app_service_1.FormatterPipe]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof game_1.GameService !== 'undefined' && game_1.GameService) === 'function' && _a) || Object])
	    ], PurchasingComponent);
	    return PurchasingComponent;
	    var _a;
	}());
	exports.PurchasingComponent = PurchasingComponent;
	

/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	// Application level directive
	__export(__webpack_require__(460));
	

/***/ },

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var lang_1 = __webpack_require__(4);
	var router_deprecated_1 = __webpack_require__(94);
	/**
	 * RouterActive dynamically finds the first element with routerLink and toggles the active class
	 *
	 * ## Use
	 *
	 * ```
	 * <li router-active="active"><a [routerLink]=" ['/Home'] ">Home</a></li>
	 * <li [routerActive]=" activeStringValue "><a [routerLink]=" ['/Home'] ">Home</a></li>
	 * ```
	 */
	var RouterActive = (function () {
	    function RouterActive(router, element, renderer, routerLink, routerActiveAttr) {
	        this.router = router;
	        this.element = element;
	        this.renderer = renderer;
	        this.routerLink = routerLink;
	        this.routerActive = undefined;
	        this.routerActiveAttr = 'active';
	        this.routerActiveAttr = this._defaultAttrValue(routerActiveAttr);
	    }
	    RouterActive.prototype.ngOnInit = function () {
	        var _this = this;
	        this.routerLink.changes.subscribe(function () {
	            if (_this.routerLink.first) {
	                _this._updateClass();
	                _this._findRootRouter().subscribe(function () {
	                    _this._updateClass();
	                });
	            }
	        });
	    };
	    RouterActive.prototype._findRootRouter = function () {
	        var router = this.router;
	        while (lang_1.isPresent(router.parent)) {
	            router = router.parent;
	        }
	        return router;
	    };
	    RouterActive.prototype._updateClass = function () {
	        var active = this.routerLink.first.isRouteActive;
	        this.renderer.setElementClass(this.element.nativeElement, this._attrOrProp(), active);
	    };
	    RouterActive.prototype._defaultAttrValue = function (attr) {
	        return this.routerActiveAttr = attr || this.routerActiveAttr;
	    };
	    RouterActive.prototype._attrOrProp = function () {
	        return lang_1.isPresent(this.routerActive) ? this.routerActive : this.routerActiveAttr;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], RouterActive.prototype, "routerActive", void 0);
	    RouterActive = __decorate([
	        core_1.Directive({
	            selector: '[router-active]'
	        }),
	        __param(3, core_1.Query(router_deprecated_1.RouterLink)),
	        __param(4, core_1.Optional()),
	        __param(4, core_1.Attribute('router-active')), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object, (typeof (_d = typeof core_1.QueryList !== 'undefined' && core_1.QueryList) === 'function' && _d) || Object, String])
	    ], RouterActive);
	    return RouterActive;
	    var _a, _b, _c, _d;
	}());
	exports.RouterActive = RouterActive;
	

/***/ },

/***/ 461:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(323));
	__export(__webpack_require__(324));
	__export(__webpack_require__(325));
	var browser_directives_2 = __webpack_require__(323);
	var browser_pipes_2 = __webpack_require__(324);
	var browser_providers_2 = __webpack_require__(325);
	exports.PLATFORM_PROVIDERS = browser_providers_2.PROVIDERS.concat(browser_directives_2.DIRECTIVES, browser_pipes_2.PIPES);
	

/***/ },

/***/ 462:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Angular 2
	var core_1 = __webpack_require__(1);
	// Environment Providers
	var PROVIDERS = [];
	if (false) {
	    // Production
	    core_1.enableProdMode();
	    PROVIDERS = PROVIDERS.slice();
	}
	else {
	    // Development
	    PROVIDERS = PROVIDERS.slice();
	}
	exports.ENV_PROVIDERS = PROVIDERS.slice();
	

/***/ },

/***/ 475:
/***/ function(module, exports) {

	module.exports = ".card.center-block {\n  max-width: 318px; }\n  .card.center-block.card-inverse {\n    background-color: #595959;\n    border-color: #595959; }\n  .card.center-block .card-header {\n    padding: 0px; }\n    .card.center-block .card-header button.btn {\n      border-radius: 0; }\n      .card.center-block .card-header button.btn i.fa {\n        color: white; }\n\n.buy-price {\n  color: red; }\n\n.sell-price {\n  color: #00B300; }\n\n.btn.purchase-btn {\n  position: fixed;\n  top: 54px;\n  right: 0px;\n  width: 100%;\n  z-index: 1029;\n  border-radius: 0; }\n\n.row.root-row {\n  padding-top: 40px; }\n"

/***/ },

/***/ 476:
/***/ function(module, exports) {

	module.exports = "html, body{\n  height: 100%;\n  font-family: Arial, Helvetica, sans-serif\n}\n\nspan.active {\n  background-color: gray;\n}\n\n.container-fluid {\n  padding-top: 100px;\n}"

/***/ },

/***/ 477:
/***/ function(module, exports) {

	module.exports = "<nav class=\"navbar navbar-fixed-top navbar-dark bg-inverse\">\n  <a class=\"navbar-brand\" href=\"/\">{{ name }}</a>\n  <ul class=\"nav navbar-nav pull-md-right\">\n    <li class=\"nav-item\">{{ money | currency:'USD':true }}</li>\n    <li *ngFor=\"let navLink of navLinks\" router-active=\"active\" class=\"nav-item\">\n      <a class=\"nav-link\" [routerLink]=\"[navLink.comp]\">{{ navLink.text }}</a>\n    </li>\n  </ul>\n</nav>\n<div [class.container]=\"!fluid\" [class.container-fluid]=\"fluid\">\n  <div class=\"row\">\n    <div class=\"col-md-12 col-lg-8\">\n      <router-outlet></router-outlet>\n    </div>\n    <div class=\"col-md-12 col-lg-4\">\n      <div class=\"card center-block\">\n        <div class=\"card-header\">\n          <h4 class=\"card-title\">Sales</h4>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ },

/***/ 478:
/***/ function(module, exports) {

	module.exports = ""

/***/ },

/***/ 479:
/***/ function(module, exports) {

	module.exports = ""

/***/ },

/***/ 480:
/***/ function(module, exports) {

	module.exports = ""

/***/ },

/***/ 481:
/***/ function(module, exports) {

	module.exports = "<!--<div class=\"card\">-->\n<!--  <div class=\"card-block\">-->\n    <!-- Do +/- -->\n<!--    <h4 class=\"card-title\">Card Title</h4>-->\n<!--  </div>-->\n  <!-- img -->\n<!--  <img src=\"http://placehold.it/318x180\" alt=\"Placeholder\">-->\n<!--  <div class=\"card-block\">-->\n    <!-- other stuff -->\n<!--    <p class=\"card-text\">Card text</p>-->\n<!--  </div>-->\n<!--</div>-->\n<!--<div class=\"row\" *ngFor=\"let cardRow of cardRows\">-->\n<!--  <div class=\"col-sm-6\" *ngFor=\"let card of cardRow\">-->\n<!--    <div class=\"card center-block\" style=\"max-width: 318px;\">-->\n<!--      <div class=\"card-block\">-->\n<!--        <h4 class=\"card-title\">{{ card.name }}</h4>-->\n<!--      </div>-->\n<!--      <img src=\"http://placehold.it/318x180\" alt=\"Placeholder\">-->\n<!--      <div class=\"card-block\">-->\n<!--        <p class=\"card-text\">{{ card.sellPrice | currency:'USD':true }}</p>-->\n<!--      </div>-->\n<!--    </div>-->\n<!--  </div>-->\n<!--</div>-->\n<button type=\"button\" (click)=\"completePurchase()\" class=\"btn btn-primary purchase-btn\">BUY/SELL ITEMS</button>\n\n<div class=\"row\">\n  <div class=\"col-md-6 col-lg-4\" *ngFor=\"let card of cards\">\n    <div class=\"card card-inverse center-block\">\n      <!--<div class=\"card-block\">-->\n      <!--  <h4 class=\"card-title\">{{ card.name | formatter }}</h4>-->\n        <!--<button type=\"button\" class=\"btn btn-success\" style=\"border:0;\">-->\n        <!--  <i class=\"fa fa-plus\" aria-hidden=\"true\" style=\"color: white;\"></i>-->\n        <!--</button>-->\n      <!--</div>-->\n      <div class=\"card-header\">\n        <button type=\"button\" (click)=\"changeQuantity(card.name, false)\" class=\"btn btn-danger pull-left\">\n          <i class=\"fa fa-minus\" aria-hidden=\"true\"></i>\n        </button>\n        <!--<div class=\"center-block\">{{ order[card.name] }}</div>-->\n        <button type=\"button\" (click)=\"changeQuantity(card.name)\" class=\"btn btn-success pull-right\">\n          <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\n        </button>\n      </div>\n      <img src=\"http://placehold.it/318x180\" alt=\"Placeholder\">\n      <ul class=\"list-group list-group-flush\">\n        <li class=\"list-group-item text-xs-center\">{{ card.name | formatter }}</li>\n        <li class=\"list-group-item text-xs-center\">\n          <span *ngIf=\"isPos(order[card.name])\">+</span>{{ order[card.name] }}\n          &bull;\n          <span [class.buy-price]=\"isPos(order[card.name])\"\n            [class.sell-price]=\"!isPos(order[card.name])\">{{ order[card.name] * card.buyPrice | currency:'USD':true }}</span>\n          <!--<span [class.buy-price]=\"isPos(order[card.name])\"-->\n          <!--  [class.sell-price]=\"!isPos(order[card.name])\">{{ order[card.name] * card.buyPrice }}</span>-->\n        </li>\n        <li class=\"list-group-item text-xs-center\">\n          <span class=\"buy-price\">{{ card.buyPrice | currency:'USD':true }}</span>\n          &bull;\n          <span class=\"sell-price\">{{ card.sellPrice | currency:'USD':true }}</span>\n        </li>\n      </ul>\n      <!--<div class=\"card-block\">-->\n      <!--  <p class=\"card-text text-xs-right\">{{ card.name | formatter }}</p>-->\n      <!--  <p class=\"card-text text-xs-right\">-->\n      <!--    <span class=\"buy-price\">{{ card.buyPrice | currency:'USD':true }}</span>-->\n      <!--    &bull;-->\n      <!--    <span class=\"sell-price\">{{ card.sellPrice | currency:'USD':true }}</span>-->\n      <!--  </p>-->\n      <!--</div>-->\n    </div>\n  </div>\n</div>"

/***/ },

/***/ 499:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	var hmr_store_1 = __webpack_require__(130);
	// noop in parentNode
	// TODO: find a better way to noop
	var _env = typeof process !== 'undefined' &&
	    process &&
	    ({"ENV":"development","NODE_ENV":"development","HMR":false}) &&
	    (("development") ||
	        ("development"));
	var _dev = ((_env &&
	    typeof _env === 'string' &&
	    (_env.indexOf('dev') > -1)) ||
	    _env === undefined);
	function setDev(newDev) {
	    if (typeof newDev === 'string') {
	        return _dev = (newDev.indexOf('dev') > -1);
	    }
	    else if (typeof newDev === 'boolean') {
	        return _dev = newDev;
	    }
	    throw new Error('Please provide a string or boolean');
	}
	exports.setDev = setDev;
	function HmrState(namespaceOrConfig, config) {
	    function decoratorFactory(target, decoratedPropertyName, descriptor) {
	        if (!_dev) {
	            return descriptor;
	        }
	        var key = namespaceOrConfig || target.constructor.name + '#' + decoratedPropertyName;
	        hmr_store_1.HmrStore.select(key, function () { return hmr_store_1.HmrStore.get(key); });
	        Object.defineProperty(target, decoratedPropertyName, {
	            get: function () { return hmr_store_1.HmrStore.get(key); },
	            set: function (newValue) {
	                var currentValue = hmr_store_1.HmrStore.get(key);
	                if (!currentValue) {
	                    hmr_store_1.HmrStore._initialValues[key] = newValue;
	                }
	                else {
	                    newValue = Object.assign(newValue, currentValue);
	                }
	                return hmr_store_1.HmrStore.set(key, newValue);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        return descriptor;
	    }
	    return decoratorFactory;
	}
	exports.HmrState = HmrState;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(361)))

/***/ },

/***/ 500:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var hmr_store_1 = __webpack_require__(130);
	__export(__webpack_require__(501));
	__export(__webpack_require__(499));
	__export(__webpack_require__(130));
	function provideHmrState(initialState) {
	    if (initialState === void 0) { initialState = {}; }
	    return [
	        { provide: hmr_store_1.HMR_STATE, useValue: initialState },
	        { provide: hmr_store_1.HmrStore, useValue: hmr_store_1.HmrStore }
	    ];
	}
	exports.provideHmrState = provideHmrState;
	

/***/ },

/***/ 501:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hmr_store_1 = __webpack_require__(130);
	function hotModuleReplacement(bootloader, module, options) {
	    if (options === void 0) { options = {}; }
	    if (!module.hot) {
	        console.warn('Warning: please use webpack hot flag');
	        return document.addEventListener('DOMContentLoaded', function () { return bootloader(); });
	    }
	    hmr_store_1.HmrStore.dev = true;
	    var LOCALSTORAGE_KEY = options.LOCALSTORAGE_KEY || '@@WEBPACK_INITIAL_DATA';
	    var LOCAL = options.localStorage || false;
	    var TOKEN = options.storeToken || hmr_store_1.HmrStore;
	    var DISPOSE = options.globalDispose || 'WEBPACK_HMR_beforeunload';
	    var GET_STATE = options.getState || getState;
	    var DATA = options.data || module.hot.data && module.hot.data.state;
	    var COMPONENT_REF = null;
	    var disposed = false;
	    function getState(appState) {
	        var json = appState.toJSON();
	        if (LOCAL) {
	            console.time('localStorage');
	            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(appState));
	            console.timeEnd('localStorage');
	        }
	        return json;
	    }
	    console.log('DATA', DATA);
	    if (!DATA && LOCAL) {
	        try {
	            console.time('start localStorage');
	            DATA = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || DATA;
	            console.timeEnd('start localStorage');
	        }
	        catch (e) {
	            console.log('JSON.parse Error', e);
	        }
	    }
	    console.time('bootstrap');
	    if (document.readyState === 'complete') {
	        bootloader(DATA)
	            .then(function (cmpRef) { return COMPONENT_REF = cmpRef; })
	            .then((function (cmpRef) { return (console.timeEnd('bootstrap'), cmpRef); }));
	    }
	    else {
	        document.addEventListener('DOMContentLoaded', function () {
	            bootloader(DATA)
	                .then(function (cmpRef) { return COMPONENT_REF = cmpRef; })
	                .then((function (cmpRef) { return (console.timeEnd('bootstrap'), cmpRef); }));
	        });
	    }
	    function beforeunload(event) {
	        var injector = COMPONENT_REF.injector;
	        var appState;
	        if ('getOptional' in injector) {
	            appState = COMPONENT_REF.injector.getOptional(TOKEN) || TOKEN;
	        }
	        else {
	            appState = COMPONENT_REF.injector.get(TOKEN, TOKEN);
	        }
	        return GET_STATE(appState);
	    }
	    window[DISPOSE] = function () {
	        disposed = true;
	        window.removeEventListener('beforeunload', beforeunload);
	        if (LOCAL) {
	            localStorage.removeItem(LOCALSTORAGE_KEY);
	        }
	    };
	    module.hot.accept();
	    window.addEventListener('beforeunload', beforeunload);
	    module.hot.dispose(function (data) {
	        console.time('dispose');
	        var componentNode = COMPONENT_REF.location.nativeElement;
	        var newNode = document.createElement(componentNode.tagName);
	        // display none
	        var currentDisplay = newNode.style.display;
	        newNode.style.display = 'none';
	        var parentNode = componentNode.parentNode;
	        parentNode.insertBefore(newNode, componentNode);
	        var injector = COMPONENT_REF.injector;
	        var appState;
	        if ('getOptional' in injector) {
	            appState = COMPONENT_REF.injector.getOptional(TOKEN) || TOKEN;
	        }
	        else {
	            appState = COMPONENT_REF.injector.get(TOKEN, TOKEN);
	        }
	        var json = GET_STATE(appState, COMPONENT_REF);
	        data.state = json;
	        if ('destroy' in COMPONENT_REF) {
	            COMPONENT_REF.destroy();
	        }
	        else if ('dispose' in COMPONENT_REF) {
	            COMPONENT_REF.dispose();
	        }
	        newNode.style.display = currentDisplay;
	        if (!disposed) {
	            window.removeEventListener('beforeunload', beforeunload);
	        }
	        disposed = true;
	        console.timeEnd('dispose');
	    });
	}
	exports.hotModuleReplacement = hotModuleReplacement;
	

/***/ }

});
//# sourceMappingURL=main.map