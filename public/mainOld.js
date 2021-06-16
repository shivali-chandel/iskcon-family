(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "eco-fab-speed-dial {\n  position: fixed;\n  z-index: 100;\n  padding-left: 950px;\n  padding-top: 450px;\n}\n@media (max-width: 767px) {\n  eco-fab-speed-dial {\n    padding-left: 225px;\n    padding-top: 300px;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLG9CQUFvQjtFQUNwQixtQkFBbUI7Q0FDcEI7QUFDRDtFQUNFO0lBQ0Usb0JBQW9CO0lBQ3BCLG1CQUFtQjtHQUNwQjtDQUNGIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJlY28tZmFiLXNwZWVkLWRpYWwge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHotaW5kZXg6IDEwMDtcbiAgcGFkZGluZy1sZWZ0OiA5NTBweDtcbiAgcGFkZGluZy10b3A6IDQ1MHB4O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIGVjby1mYWItc3BlZWQtZGlhbCB7XG4gICAgcGFkZGluZy1sZWZ0OiAyMjVweDtcbiAgICBwYWRkaW5nLXRvcDogMzAwcHg7XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\">\n<div class=\"\" [ngClass]=\"{'hero' : addClass}\">\n  <header id=\"masthead\" role=\"banner\">\n    <div class=\"container\">\n      <div class=\"logo-block\">\n        <a routerLink=\"/\"><img src=\"./assets/images/iskcon_logo.png\" alt=\"\"/></a>\n      </div>\n\n      <button class=\"hamburger hamburger--boring\" type=\"button\">\n          <span class=\"hamburger-box\">\n            <span class=\"hamburger-inner\"></span>\n          </span>\n        <!-- <span class=\"hamburger-label\">Menu</span> -->\n      </button>\n\n      <nav id=\"site-nav\" role=\"navigation\">\n\t  \n        <ul>\n          <li class=\"col-anim home\"><a routerLink=\"/\">Home</a></li>\n          <li class=\"col-anim gl\"><a routerLink=\"/group-locator-builder\">Group Locator Builder</a></li>\n          <li class=\"col-anim tnc\"><a routerLink=\"/terms-and-condition\">Terms & Privacy Policy</a></li>\n\t\t  <li class=\"col-anim login\"><a href=\"/login\">Login</a></li>\n\t\t  \n        </ul>\n      </nav>\n    </div>\n  </header>\n\n  <router-outlet></router-outlet>\n</div>\n<footer>\n  <div class=\"footer\">\n    <p> By using this site, you agree with our updated <a routerLink=\"/terms-and-condition\">Terms & Privacy Policy</a>.\n    </p>\n  </div>\n</footer>\n</div>\n<button onclick=\"topFunction()\" id=\"myBtn\" title=\"Go to top\" style=\"display: none;\">Top</button>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(router, titleService) {
        this.router = router;
        this.titleService = titleService;
        this.loading = 0;
    }
    AppComponent_1 = AppComponent;
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var rout;
        rout = this.router;
        this.PerformTask(rout.location.path());
        this.subs = this.router.events.subscribe(function (event) {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                $('.is-active').click();
                _this.PerformTask(event.url);
            }
        });
        if (!AppComponent_1.IsLoaded) {
            AppComponent_1.IsLoaded = true;
            this.loadJS('./assets/js/index.js', 'id');
        }
    };
    AppComponent.prototype.PerformTask = function (url) {
        if (url === '/' || url === '') {
            this.titleService.setTitle('ISKCON | Home');
            this.addClass = true;
            $('.col-anim').removeClass('active');
            $('.home').addClass('active');
        }
        else if (url === '/group-locator-builder') {
            this.titleService.setTitle('ISKCON | Group Locator Builder');
            this.addClass = false;
            $('.col-anim').removeClass('active');
            $('.gl').addClass('active');
        }
        else if (url === '/terms-and-condition') {
            this.titleService.setTitle('ISKCON | Terms & Privacy Policy');
            this.addClass = false;
            $('.col-anim').removeClass('active');
            $('.tnc').addClass('active');
        }
    };
    AppComponent.prototype.loadJS = function (file, id) {
        var jsElm;
        jsElm = document.createElement('script');
        jsElm.type = 'application/javascript';
        jsElm.id = id;
        jsElm.src = file;
        document.body.appendChild(jsElm);
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    var AppComponent_1;
    AppComponent.IsLoaded = false;
    AppComponent = AppComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root-component',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.service */ "./src/app/app.service.ts");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _dialoge_modal_dialoge_modal_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dialoge.modal/dialoge.modal.component */ "./src/app/dialoge.modal/dialoge.modal.component.ts");
/* harmony import */ var _group_map_group_map_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./group-map/group-map.component */ "./src/app/group-map/group-map.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _terms_and_condition_terms_and_condition_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./terms-and-condition/terms-and-condition.component */ "./src/app/terms-and-condition/terms-and-condition.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./app.routing.module */ "./src/app/app.routing.module.ts");
/* harmony import */ var _my_app_my_app_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./my.app/my.app.component */ "./src/app/my.app/my.app.component.ts");
/* harmony import */ var _group_map_iskcon_group_map_iskcon_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./group-map-iskcon/group-map-iskcon.component */ "./src/app/group-map-iskcon/group-map-iskcon.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _my_app_my_app_component__WEBPACK_IMPORTED_MODULE_15__["MyAppComponent"],
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _group_map_group_map_component__WEBPACK_IMPORTED_MODULE_11__["GroupMapComponent"],
                _group_map_iskcon_group_map_iskcon_component__WEBPACK_IMPORTED_MODULE_16__["GroupMapIskconComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_12__["HomeComponent"],
                _terms_and_condition_terms_and_condition_component__WEBPACK_IMPORTED_MODULE_13__["TermsAndConditionComponent"],
                _dialoge_modal_dialoge_modal_component__WEBPACK_IMPORTED_MODULE_10__["DialogeModalComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_14__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatExpansionModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatCheckboxModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"]
            ],
            providers: [_app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"]],
            entryComponents: [_dialoge_modal_dialoge_modal_component__WEBPACK_IMPORTED_MODULE_10__["DialogeModalComponent"]],
            bootstrap: [_my_app_my_app_component__WEBPACK_IMPORTED_MODULE_15__["MyAppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app.routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _group_map_group_map_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./group-map/group-map.component */ "./src/app/group-map/group-map.component.ts");
/* harmony import */ var _terms_and_condition_terms_and_condition_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./terms-and-condition/terms-and-condition.component */ "./src/app/terms-and-condition/terms-and-condition.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var appRoutes = [
    {
        path: '', component: _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], children: [
            { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] },
            { path: 'group-locator-builder', component: _group_map_group_map_component__WEBPACK_IMPORTED_MODULE_4__["GroupMapComponent"] },
            { path: 'terms-and-condition', component: _terms_and_condition_terms_and_condition_component__WEBPACK_IMPORTED_MODULE_5__["TermsAndConditionComponent"] }
        ]
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(appRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.service.ts":
/*!********************************!*\
  !*** ./src/app/app.service.ts ***!
  \********************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppService = /** @class */ (function () {
    function AppService(http) {
        this.http = http;
    }
    AppService.prototype.fetchAllGroup = function (data) {
        return this.http.post('./api/', data);
    };
    AppService.prototype.SaveFetchGeoCode = function (data) {
        return this.http.post('./api/geocode', data);
    };
    AppService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AppService);
    return AppService;
}());



/***/ }),

/***/ "./src/app/dialoge.modal/dialoge.modal.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/dialoge.modal/dialoge.modal.component.ts ***!
  \**********************************************************/
/*! exports provided: DialogeModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogeModalComponent", function() { return DialogeModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var DialogeModalComponent = /** @class */ (function () {
    function DialogeModalComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.javascriptContent = '<script type="text/javascript"> var url="' + this.data + '",d=document,w=window,b="body",i="iframe",a=d.createElement(i);a.src=url,a.width="100%",a.height="100%",w.setTimeout(function(){d.getElementsByTagName(b)[0].appendChild(a)}, 1000);</script>';
        this.iframeContent = '<iframe src="' + this.data + '" width="100%" height="100%"></iframe>';
    }
    DialogeModalComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogeModalComponent.prototype.copyToClipBoard = function () {
        var copyText;
        copyText = document.getElementsByTagName('textarea')[0];
        copyText.select();
        document.execCommand('copy');
        alert('Code has been copied to your clipboard.');
        this.dialogRef.close(true);
    };
    DialogeModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog',
            template: __webpack_require__(/*! ./dialoge.modal.html */ "./src/app/dialoge.modal/dialoge.modal.html"),
            styles: [__webpack_require__(/*! ./dialoge.modal.css */ "./src/app/dialoge.modal/dialoge.modal.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], DialogeModalComponent);
    return DialogeModalComponent;
}());



/***/ }),

/***/ "./src/app/dialoge.modal/dialoge.modal.css":
/*!*************************************************!*\
  !*** ./src/app/dialoge.modal/dialoge.modal.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RpYWxvZ2UubW9kYWwvZGlhbG9nZS5tb2RhbC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/dialoge.modal/dialoge.modal.html":
/*!**************************************************!*\
  !*** ./src/app/dialoge.modal/dialoge.modal.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Export</h1>\n<div mat-dialog-content>\n  <mat-tab-group>\n    <mat-tab label=\"JavaScript\">\n      <mat-form-field class=\"example-full-width\" appearance=\"fill\">\n        <textarea matInput>{{javascriptContent}}</textarea>\n      </mat-form-field>\n    </mat-tab>\n    <mat-tab label=\"iFrame\">\n      <mat-form-field class=\"example-full-width\" appearance=\"fill\">\n        <textarea matInput>{{iframeContent}}</textarea>\n      </mat-form-field>\n\n    </mat-tab>\n  </mat-tab-group>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">No Thanks</button>\n  <button mat-button (click)=\"copyToClipBoard()\" cdkFocusInitial>Copy</button>\n</div>\n"

/***/ }),

/***/ "./src/app/group-map-iskcon/group-map-iskcon.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/group-map-iskcon/group-map-iskcon.component.ts ***!
  \****************************************************************/
/*! exports provided: GroupMapIskconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupMapIskconComponent", function() { return GroupMapIskconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _dialoge_modal_dialoge_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dialoge.modal/dialoge.modal.component */ "./src/app/dialoge.modal/dialoge.modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GroupMapIskconComponent = /** @class */ (function () {
    function GroupMapIskconComponent(appService, dialog, activatedRoutes) {
        this.appService = appService;
        this.dialog = dialog;
        this.activatedRoutes = activatedRoutes;
        this.title = 'app';
        this.markers = [];
        this.categories = [];
        this.class1 = 'col-md-6';
        this.body = {
            'page': 1,
            'page_size': 1000,
            'fields': ['categories']
        };
        this.selectedCategories = [];
        this.isLoading = false;
        this.previousValue = [];
        this.publicURLPath = '/group-locator';
        this.publicURL = window.location.origin + this.publicURLPath + '?searchby=iframe';
        this.originalJSON = [];
        this.addresses = [];
        this.names = [];
        this.pictures = [];
        this.descriptions = [];
        this.isiFrame = false;
        this.categoryIds = [];
        this.groupIds = [];
        this.loaded = 3;
        this.isLogRequired = false;
    }
    GroupMapIskconComponent.prototype.Logging = function (val) {
        if (this.isLogRequired) {
            console.log(val);
        }
    };
    GroupMapIskconComponent.prototype.ChangeValue = function (event) {
        var selectedCategories = [];
        for (var i = 0; i < event.length; i++) {
            if (event[i]) {
                selectedCategories.push(event[i]);
            }
            else {
                $('.mydonebtn').click();
            }
        }
        this.selectedCategories = selectedCategories;
    };
    GroupMapIskconComponent.prototype.OpenChangeEvent = function ($event) {
        var _this = this;
        debugger;
        if ($event) {
            $('#cdk-overlay-0').append('<span class="mat-option-text spn"><button mat-raised-button="" onclick="localStorage.setItem(\'clicked\', \'true\')" class="button-style mat-raised-button"><span class="mat-button-wrapper"><mat-icon _ngcontent-c1="" class="mat-icon material-icons" role="img" aria-hidden="true">done</mat-icon><span _ngcontent-c1="">Done</span></span><div class="mat-button-ripple mat-ripple" matripple="" ng-reflect-centered="false" ng-reflect-disabled="false" ng-reflect-trigger="[object HTMLButtonElement]"></div><div class="mat-button-focus-overlay"></div></button></span>');
            this.anotherSubscriber = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (x) {
                return localStorage.getItem('clicked');
            })).subscribe(function (observer) {
                if (localStorage.getItem('clicked') === 'true') {
                    $('.mydonebtn').click();
                    _this.DoneClicked();
                    localStorage.removeItem('clicked');
                    $('.spn').remove();
                    _this.anotherSubscriber.unsubscribe();
                }
            });
        }
        else {
            $('.spn').remove();
            this.anotherSubscriber.unsubscribe();
        }
    };
    GroupMapIskconComponent.prototype.DoneClicked = function () {
        $('.mydonebtn').click();
        this.select.close();
    };
    GroupMapIskconComponent.prototype.ChangeText = function (event) {
        this.searchWords = event.target.value;
        if (event.relatedTarget && event.relatedTarget.type === 'submit') {
            this.OnOpenClose(false);
        }
    };
    GroupMapIskconComponent.prototype.OnOpenClose = function (flag, flag2) {
        var _this = this;
        if (!flag) {
            var doAllow = false;
            if (this.selectedCategories.length === this.previousValue.length && this.selectedCategories.length > 0) {
                for (var i = 0; i < this.selectedCategories.length; i++) {
                    if (this.selectedCategories[i] !== this.previousValue[i]) {
                        doAllow = true;
                        break;
                    }
                }
            }
            if (!doAllow && this.loaded <= 1) {
                this.SetMarkers();
            }
            if (((doAllow || (this.searchWords !== this.previousWord)) || (this.selectedCategories.length !== this.previousValue.length)) || flag2) {
                if (this.selectedCategories.length > 0) {
                    this.body['category_id'] = this.selectedCategories;
                }
                else {
                    if (this.isiFrame) {
                        var category_id = this.categoryIds;
                        this.body['category_id'] = category_id;
                    }
                    else {
                        this.body['category_id'] = null;
                    }
                }
                if (this.searchWords) {
                    this.previousWord = this.searchWords;
                    this.body['search'] = this.searchWords;
                }
                this.ClearMarkers();
                this.FetchAllGroup(this.body);
                this.previousValue = this.selectedCategories;
            }
            else if (this.searchWords !== this.previousWord) {
                this.previousWord = this.searchWords;
                this.ClearMarkers();
                var backUpValus_1 = {
                    addresses: [],
                    names: [],
                    groupIds: [],
                    descriptions: [],
                    picture: []
                };
                for (var i = 0; i < this.addresses.length; i++) {
                    backUpValus_1.addresses.push(this.addresses[i]);
                    backUpValus_1.names.push(this.names[i]);
                    backUpValus_1.groupIds.push(this.groupIds[i]);
                    backUpValus_1.descriptions.push(this.descriptions[i]);
                    backUpValus_1.picture.push(this.pictures[i]);
                }
                this.SearchWord();
                this.customCall(this.names, this.pictures, this.descriptions, this.addresses, this.groupIds, this.map, this.markers);
                var ssub_1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (x) {
                    return localStorage.getItem('isAllCompleted');
                })).subscribe(function (observer) {
                    if (localStorage.getItem('isAllCompleted')) {
                        setTimeout(function () {
                            _this.SetInfoWindows(_this.markers);
                            localStorage.setItem('isAllCompleted', 'false');
                        }, 2000);
                        setTimeout(function () {
                            _this.addresses = backUpValus_1.addresses;
                            _this.names = backUpValus_1.names;
                            _this.descriptions = backUpValus_1.descriptions;
                            _this.pictures = backUpValus_1.picture;
                        }, 4000);
                        localStorage.setItem('isAllCompleted', 'false');
                        ssub_1.unsubscribe();
                    }
                });
                if (this.selectedCategories || this.searchWords) {
                    var vall = '&category_id=';
                    if (this.selectedCategories) {
                        for (var xx = 0; xx < this.selectedCategories.length; xx++) {
                            if (xx === 0) {
                                vall += this.selectedCategories[xx];
                            }
                            else {
                                vall += ',' + (this.selectedCategories[xx]);
                            }
                        }
                    }
                    var vv = '';
                    if (this.searchWords) {
                        vv = '&search=' + this.searchWords;
                    }
                    this.publicURL = window.location.origin + this.publicURLPath + '?searchby=iframe' + vall + vv;
                }
                else {
                    this.publicURL = window.location.origin + this.publicURLPath + '?searchby=iframe';
                }
            }
        }
    };
    GroupMapIskconComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (window.innerWidth > 768) {
                _this.doAddClass = true;
            }
            localStorage.removeItem('called');
            localStorage.removeItem('groups');
            localStorage.removeItem('addresses');
            localStorage.removeItem('wholeJSON');
            _this.map = _this.MapInitialize(_this.map);
            if (_this.activatedRoutes.snapshot.queryParams.category_id || _this.activatedRoutes.snapshot.queryParams.search || _this.activatedRoutes.snapshot.queryParams.searchby) {
                _this.isiFrame = true;
                if (_this.activatedRoutes.snapshot.queryParams.category_id) {
                    _this.selectedCategories = _this.activatedRoutes.snapshot.queryParams.category_id.split(',');
                    _this.categoryIds = _this.activatedRoutes.snapshot.queryParams.category_id.split(',');
                }
                if (_this.activatedRoutes.snapshot.queryParams.search) {
                    _this.searchWords = _this.activatedRoutes.snapshot.queryParams.search;
                    var element = void 0;
                    element = document.getElementById('search');
                    element.value = _this.searchWords;
                }
                _this.class1 = 'col-md-12';
                _this.OnOpenClose(false, true);
            }
            else {
                _this.FetchAllGroup({
                    'page': 1,
                    'page_size': 1000,
                    'fields': ['categories']
                });
            }
        }, 1000);
    };
    GroupMapIskconComponent.prototype.ClearMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].marker.setMap(null);
        }
        this.markers = [];
    };
    GroupMapIskconComponent.prototype.FetchAllGroup = function (data) {
        var _this = this;
        this.loaded = this.loaded + 1;
        this.isLoading = true;
        this.apiSubscription = this.appService.fetchAllGroup(data).subscribe(function (response) {
            _this.originalJSON = response.groups.group;
            localStorage.setItem('originalJSON', JSON.stringify(_this.originalJSON));
            var addresses = [];
            var names = [];
            var pictures = [];
            var groupIds = [];
            var descriptions = [];
            for (var i = 0; i < response.groups.group.length; i++) {
                var address = response.groups.group[i];
                if (address.categories.category) {
                    for (var j = 0; j < address.categories.category.length; j++) {
                        var contains = false;
                        for (var ii = 0; ii < _this.categories.length; ii++) {
                            if (_this.categories[ii].id === address.categories.category[j].id) {
                                contains = true;
                                break;
                            }
                        }
                        if (!contains) {
                            if (address.categories.category[j].name.toLowerCase().search('(private)') < 0) {
                                _this.categories.push(address.categories.category[j]);
                            }
                        }
                    }
                }
                names.push(response.groups.group[i].name);
                pictures.push(response.groups.group[i].picture);
                descriptions.push(response.groups.group[i].description);
                groupIds.push(response.groups.group[i].id);
                var pushaddress = '';
                if (address.meeting_address) {
                    pushaddress = pushaddress + address.meeting_address + ', ';
                }
                if (address.meeting_city) {
                    pushaddress = pushaddress + address.meeting_city + ', ';
                }
                if (address.meeting_country) {
                    pushaddress = pushaddress + address.meeting_country + ', ';
                }
                if (address.meeting_postcode) {
                    pushaddress = pushaddress + address.meeting_postcode;
                }
                addresses.push(pushaddress);
            }
            if (_this.activatedRoutes.snapshot.queryParams.category_id) {
                var ct = [];
                var listings = _this.activatedRoutes.snapshot.queryParams.category_id.split(',');
                for (var k = 0; k < _this.categories.length; k++) {
                    for (var j = 0; j < listings.length; j++) {
                        if (_this.categories[k].id === listings[j]) {
                            ct.push(_this.categories[k]);
                            break;
                        }
                    }
                }
                _this.categories = ct;
            }
            if (Number(response.groups.page) === 1) {
                _this.names = names;
                _this.pictures = pictures;
                _this.descriptions = descriptions;
                _this.addresses = addresses;
                _this.groupIds = groupIds;
            }
            else {
                for (var j = 0; j < names.length; j++) {
                    _this.names.push(names[j]);
                    _this.pictures.push(pictures[j]);
                    _this.descriptions.push(descriptions[j]);
                    _this.addresses.push(addresses[j]);
                    _this.groupIds.push(groupIds[j]);
                }
            }
            if (response.groups.on_this_page < (Number(response.groups.per_page))) {
                if (_this.searchWords) {
                    _this.SearchWord();
                }
                _this.body['page'] = 1;
                var theBody = [];
                for (var j = 0; j < _this.addresses.length; j++) {
                    var bdy = {
                        name: _this.names[j],
                        address: _this.addresses[j],
                        description: _this.descriptions[j],
                        groupIds: _this.groupIds[j],
                        picture: _this.pictures[j]
                    };
                    theBody.push(bdy);
                }
                if (_this.loaded > 1) {
                    _this.customCall(_this.names, _this.pictures, _this.descriptions, _this.addresses, _this.groupIds, _this.map, _this.markers);
                    var ssub_2 = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (x) {
                        return localStorage.getItem('isAllCompleted');
                    })).subscribe(function (observer) {
                        if (localStorage.getItem('isAllCompleted')) {
                            /*setTimeout(() => {*/
                            _this.SetInfoWindows(_this.markers);
                            localStorage.setItem('isAllCompleted', 'false');
                            /*}, 2000);*/
                            ssub_2.unsubscribe();
                        }
                    });
                }
                else {
                    _this.isLoading = false;
                }
            }
            else {
                _this.body['page'] = _this.body['page'] + 1;
                _this.FetchAllGroup(_this.body);
            }
            if (data.category_id || data.search) {
                var vall = '&category_id=';
                if (data.category_id) {
                    for (var xx = 0; xx < data.category_id.length; xx++) {
                        if (xx === 0) {
                            vall += data.category_id[xx];
                        }
                        else {
                            vall += ',' + (data.category_id[xx]);
                        }
                    }
                }
                var vv = '';
                if (data && data.search) {
                    vv = '&search=' + data.search;
                }
                _this.publicURL = window.location.origin + _this.publicURLPath + '?searchby=iframe' + vall + vv;
            }
        });
    };
    GroupMapIskconComponent.prototype.SetMarkers = function () {
        var _this = this;
        this.isLoading = true;
        this.loaded = this.loaded + 1;
        this.customCall(this.names, this.pictures, this.descriptions, this.addresses, this.groupIds, this.map, this.markers);
        var ssub = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (x) {
            return localStorage.getItem('isAllCompleted');
        })).subscribe(function (observer) {
            if (localStorage.getItem('isAllCompleted')) {
                _this.SetInfoWindows(_this.markers);
                localStorage.setItem('isAllCompleted', 'false');
                ssub.unsubscribe();
            }
        });
    };
    GroupMapIskconComponent.prototype.SearchWord = function () {
        if (this.addresses.length === this.names.length && this.addresses.length === this.pictures.length && this.addresses.length === this.descriptions.length) {
            var spliceIndexes = [];
            for (var i = 0; i < this.names.length; i++) {
                if (this.addresses[i].toUpperCase().search(this.searchWords.toUpperCase()) >= 0 || this.names[i].toUpperCase().search(this.searchWords.toUpperCase()) >= 0 || this.descriptions[i].toUpperCase().search(this.searchWords.toUpperCase()) >= 0) {
                }
                else {
                    spliceIndexes.push(i);
                }
            }
            for (var i = spliceIndexes.length - 1; i >= 0; i--) {
                this.addresses.splice(spliceIndexes[i], 1);
                this.names.splice(spliceIndexes[i], 1);
                this.descriptions.splice(spliceIndexes[i], 1);
                this.pictures.splice(spliceIndexes[i], 1);
            }
        }
    };
    GroupMapIskconComponent.prototype.openDialog = function () {
        var data = '<script type="text/javascript"> var url=' + this.publicURL + ',d=document,w=window,b="body",i="iframe",a=d.createElement(i);a.src=url,w.setTimeout(function(){d.getElementsByTagName(b)[0].appendChild(a)},1000);</script>';
        var dialogRef = this.dialog.open(_dialoge_modal_dialoge_modal_component__WEBPACK_IMPORTED_MODULE_6__["DialogeModalComponent"], {
            width: '500px',
            data: this.publicURL
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    GroupMapIskconComponent.prototype.SetInfoWindows = function (markers) {
        var _loop_1 = function (i) {
            var json = markers[i];
            var contentString = '<div class="content">' +
                '<div class="content">' +
                '<div class="" style="text-align:center;">' +
                '<div class="col-md-3">' +
                '<img src="' + json.picture + '" width="60px"/>' +
                '</div>' +
                '<div class="col-md-9" style="text-align: left;">' +
                '<h1 style="font-weight: bold; margin-left: 0px; font-size: 15px; margin-top: 10px; " id="firstHeading" class="firstHeading">' + json.name + '</h1>' +
                '<p>' + json.address + '</p>' +
                '<p> <b>Category: </b>' + json.category_id + '</p>';
            if (json.description) {
                var desc = $('<p>' + json.description + '</p>').text();
                if (json.description.length > 200) {
                    contentString += '<p>' + json.description.substr(0, json.description.lastIndexOf(' ', 200)) + '...' + '</p>';
                }
                else {
                    contentString += '<p>' + json.description + '</p>';
                }
            }
            contentString += '</div>' +
                '</div>' +
                '</div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            var marker = json.marker;
            marker.addListener('click', function () {
                if (this.previous) {
                    this.previous.close();
                }
                var test = document.getElementsByClassName('gm-ui-hover-effect');
                for (var ii = 0; ii < test.length; ii++) {
                    var elem = void 0;
                    elem = test[ii];
                    elem.click();
                }
                infowindow.open(this.map, marker);
                this.previous = infowindow;
            });
        };
        for (var i = 0; i < markers.length; i++) {
            _loop_1(i);
        }
        this.isLoading = false;
    };
    GroupMapIskconComponent.prototype.onResize = function (event) {
        if (window.innerWidth > 768) {
            this.doAddClass = true;
        }
        else {
            this.doAddClass = false;
        }
        if (event.currentTarget.outerWidth < 450) {
            this.map.setZoom(0);
        }
        else {
            this.map.setZoom(2);
        }
    };
    GroupMapIskconComponent.prototype.MapInitialize = function (maps) {
        return initMap(maps);
        function initMap(mapa) {
            var mapOptions = {
                center: new google.maps.LatLng(39.567224, -101.657485),
                zoom: 4,
                minZoom: 0
            };
            mapa = new google.maps.Map(document.getElementById('map'), mapOptions);
            window.setTimeout(function () {
                var size = 2;
                if (window.outerWidth < 450) {
                    size = 0;
                }
                mapa.setZoom(size);
                mapa.setCenter(new google.maps.LatLng(0, 0));
            }, 3000);
            return mapa;
        }
    };
    GroupMapIskconComponent.prototype.GetLatLongFromDescription = function (description, address) {
        var latLngArray = [];
        try {
            var strings = description.split('<p>GOOGLE_MAP_LATITUDE=');
            if (strings.length > 1) {
                strings = strings[1].split(';GOOGLE_MAP_LONGITUDE=');
                if (strings.length > 1) {
                    latLngArray.push(Number(strings[0]));
                    strings = strings[1].split('</p>');
                    if (strings.length > 1) {
                        latLngArray.push(Number(strings[0]));
                    }
                }
            }
        }
        catch (e) {
            var desc = [];
            if (localStorage.getItem('not-alloweds')) {
                desc = JSON.parse(localStorage.getItem('not-alloweds'));
                desc.push(description);
                localStorage.setItem('not-alloweds', JSON.stringify(desc));
            }
            else {
                desc.push(description);
                localStorage.setItem('not-alloweds', JSON.stringify(desc));
            }
            console.log(e);
        }
        if (latLngArray.length === 0) {
            try {
                var val = $(description).text();
                return this.GetLatLongFromDescription(val, address);
            }
            catch (e) {
                console.log(e);
            }
        }
        return latLngArray;
    };
    GroupMapIskconComponent.prototype.FetchOriginalAPIJSON = function (groupId) {
        if (this.originalJSON) {
            for (var i = 0; i < this.originalJSON.length; i++) {
                if (this.originalJSON[i].id === groupId) {
                    return this.originalJSON[i];
                }
            }
        }
    };
    GroupMapIskconComponent.prototype.customCall = function (name, picture, descriptions, addresses, groupIds, map, markers) {
        var _this = this;
        var bounds = new google.maps.LatLngBounds();
        var geocoder = new google.maps.Geocoder();
        localStorage.setItem('isAllCompleted', 'false');
        var _loop_2 = function (i) {
            var latLngArray = this_1.GetLatLongFromDescription(descriptions[i], this_1.addresses[i]);
            this_1.fetchLatLong(addresses[i], geocoder, map, groupIds[i], latLngArray).subscribe(function (resp) {
                var originalCatJSON = _this.FetchOriginalAPIJSON(groupIds[i]);
                if (!_this.ContainsWordInCategory(originalCatJSON.categories.category, '(private)')) {
                    var marker = new google.maps.Marker({
                        position: resp,
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    bounds.extend(marker.getPosition());
                    var respo = {
                        marker: marker,
                        picture: picture[i],
                        description: descriptions[i],
                        address: addresses[i],
                        category_id: _this.ArrayToString(originalCatJSON.categories.category),
                        name: name[i]
                    };
                    markers.push(respo);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < addresses.length; i++) {
            _loop_2(i);
        }
        localStorage.setItem('isAllCompleted', 'true');
    };
    GroupMapIskconComponent.prototype.ContainsWordInCategory = function (array, word) {
        if (array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].name.toLowerCase().search(word.toLowerCase()) > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    GroupMapIskconComponent.prototype.ArrayToString = function (array) {
        if (array) {
            var returnValue = '';
            for (var i = 0; i < array.length; i++) {
                if (i !== array.length - 1) {
                    returnValue = returnValue + array[i].name + ', ';
                }
                else {
                    returnValue = returnValue + array[i].name;
                }
            }
            return returnValue;
        }
        else {
            return '';
        }
    };
    GroupMapIskconComponent.prototype.customCall2 = function (json, mapa, markers) {
        var bounds = new google.maps.LatLngBounds();
        var geocoder = new google.maps.Geocoder();
        localStorage.setItem('isAllCompleted', 'false');
        var _loop_3 = function (i) {
            this_2.fetchLatLong(json[i].address, geocoder, mapa, this_2.groupIds).subscribe(function (resp) {
                var marker = new google.maps.Marker({
                    position: resp,
                    animation: google.maps.Animation.DROP,
                    map: mapa
                });
                bounds.extend(marker.getPosition());
                var respo = {
                    marker: marker,
                    picture: json[i].picture,
                    description: json[i].description,
                    address: json[i].address,
                    name: json[i].name
                };
                markers.push(respo);
            });
        };
        var this_2 = this;
        for (var i = 0; i < json.length; i++) {
            _loop_3(i);
        }
        localStorage.setItem('isAllCompleted', 'true');
    };
    GroupMapIskconComponent.prototype.fetchLatLong = function (address, geocoder, mapa, groupIds, latlng) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_4__["Observable"](function (observer) {
            var isError = true;
            if (isError) {
                if (latlng && latlng.length > 1) {
                    observer.next({ lat: latlng[0], lng: latlng[1] });
                }
                else if (localStorage.getItem(address)) {
                    observer.next(JSON.parse(localStorage.getItem(address)));
                }
                else {
                    if (isError) {
                        var latLngStorage = JSON.parse(localStorage.getItem('latLngStorage'));
                        if (latLngStorage && latLngStorage[address] && latLngStorage[address].length > 1) {
                        }
                        else {
                            if (address) {
                                geocoder.geocode({ 'address': address }, function (results, status) {
                                    var ad;
                                    if (localStorage.getItem('addresses')) {
                                        ad = JSON.parse(localStorage.getItem('addresses'));
                                    }
                                    else {
                                        ad = [];
                                    }
                                    ad.push(address);
                                    localStorage.setItem('addresses', JSON.stringify(ad));
                                    if (localStorage.getItem('groups')) {
                                        ad = JSON.parse(localStorage.getItem('groups'));
                                    }
                                    else {
                                        ad = [];
                                    }
                                    ad.push(groupIds);
                                    localStorage.setItem('groups', JSON.stringify(ad));
                                    var json = JSON.parse(localStorage.getItem('originalJSON'));
                                    for (var sd = 0; sd < json.length; sd++) {
                                        if (json[sd].id === groupIds) {
                                            if (localStorage.getItem('wholeJSON')) {
                                                ad = JSON.parse(localStorage.getItem('wholeJSON'));
                                            }
                                            else {
                                                ad = [];
                                            }
                                            ad.push(json[sd]);
                                            localStorage.setItem('wholeJSON', JSON.stringify(ad));
                                        }
                                    }
                                    if (localStorage.getItem('called')) {
                                        var total = Number(localStorage.getItem('called'));
                                        localStorage.setItem('called', (total + 1) + '');
                                    }
                                    else {
                                        localStorage.setItem('called', '1');
                                    }
                                    if (status === 'OK') {
                                        localStorage.setItem(address, JSON.stringify(results[0].geometry.location));
                                        observer.next(results[0].geometry.location);
                                    }
                                    else {
                                        console.log('Geocode was not successful for the following reason: ' + status);
                                    }
                                });
                            }
                        }
                    }
                }
            }
        });
    };
    GroupMapIskconComponent.prototype.ngOnDestroy = function () {
        if (this.apiSubscription) {
            this.apiSubscription.unsubscribe();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('select'),
        __metadata("design:type", Object)
    ], GroupMapIskconComponent.prototype, "select", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], GroupMapIskconComponent.prototype, "onResize", null);
    GroupMapIskconComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-group-map-iskcon',
            template: __webpack_require__(/*! ./group-map-iskcon.html */ "./src/app/group-map-iskcon/group-map-iskcon.html"),
            styles: [__webpack_require__(/*! ./group-map-iskcon.css */ "./src/app/group-map-iskcon/group-map-iskcon.css")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], GroupMapIskconComponent);
    return GroupMapIskconComponent;
}());



/***/ }),

/***/ "./src/app/group-map-iskcon/group-map-iskcon.css":
/*!*******************************************************!*\
  !*** ./src/app/group-map-iskcon/group-map-iskcon.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "eco-fab-speed-dial {\n  position: fixed;\n  z-index: 100;\n  padding-left: 950px;\n  padding-top: 450px;\n}\n@media (max-width: 767px) {\n  eco-fab-speed-dial {\n    padding-left: 225px;\n    padding-top: 300px;\n  }\n}\n.extrapadd {\n   padding-top: 0px;\n}\n.loader {\n  border: 16px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 16px solid blue;\n  border-right: 16px solid green;\n  border-bottom: 16px solid red;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite;\n  animation: spin 2s linear infinite;\n  position: absolute;\n  z-index: 100;\n  top: 50%;\n  left: 48%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ3JvdXAtbWFwLWlza2Nvbi9ncm91cC1tYXAtaXNrY29uLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isb0JBQW9CO0VBQ3BCLG1CQUFtQjtDQUNwQjtBQUNEO0VBQ0U7SUFDRSxvQkFBb0I7SUFDcEIsbUJBQW1CO0dBQ3BCO0NBQ0Y7QUFDRDtHQUNHLGlCQUFpQjtDQUNuQjtBQUNEO0VBQ0UsMkJBQTJCO0VBQzNCLG1CQUFtQjtFQUNuQiw0QkFBNEI7RUFDNUIsK0JBQStCO0VBQy9CLDhCQUE4QjtFQUM5QixhQUFhO0VBQ2IsY0FBYztFQUNkLDJDQUEyQztFQUMzQyxtQ0FBbUM7RUFDbkMsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixTQUFTO0VBQ1QsVUFBVTtDQUNYIiwiZmlsZSI6InNyYy9hcHAvZ3JvdXAtbWFwLWlza2Nvbi9ncm91cC1tYXAtaXNrY29uLmNzcyIsInNvdXJjZXNDb250ZW50IjpbImVjby1mYWItc3BlZWQtZGlhbCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogMTAwO1xuICBwYWRkaW5nLWxlZnQ6IDk1MHB4O1xuICBwYWRkaW5nLXRvcDogNDUwcHg7XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgZWNvLWZhYi1zcGVlZC1kaWFsIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDIyNXB4O1xuICAgIHBhZGRpbmctdG9wOiAzMDBweDtcbiAgfVxufVxuLmV4dHJhcGFkZCB7XG4gICBwYWRkaW5nLXRvcDogMHB4O1xufVxuLmxvYWRlciB7XG4gIGJvcmRlcjogMTZweCBzb2xpZCAjZjNmM2YzO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJvcmRlci10b3A6IDE2cHggc29saWQgYmx1ZTtcbiAgYm9yZGVyLXJpZ2h0OiAxNnB4IHNvbGlkIGdyZWVuO1xuICBib3JkZXItYm90dG9tOiAxNnB4IHNvbGlkIHJlZDtcbiAgd2lkdGg6IDEyMHB4O1xuICBoZWlnaHQ6IDEyMHB4O1xuICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAycyBsaW5lYXIgaW5maW5pdGU7XG4gIGFuaW1hdGlvbjogc3BpbiAycyBsaW5lYXIgaW5maW5pdGU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTAwO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNDglO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/group-map-iskcon/group-map-iskcon.html":
/*!********************************************************!*\
  !*** ./src/app/group-map-iskcon/group-map-iskcon.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content text-center extrapadd\" [ngStyle]=\"{'pointer-events': isLoading ? 'none' : 'auto'}\">\n  <div class=\"\" [ngClass]=\"{'container': doAddClass}\">\n    <div class=\"loader\" *ngIf=\"isLoading\"></div>\n    <div class=\"\">\n      <!--<div class=\"loader_ajax_small\" *ngIf=\"isLoading\"></div>-->\n      <div class=\"w100\" [ngClass]=\"{'reduceop' : isLoading}\">\n        <nav class=\"navbar navbar-default\">\n          <div class=\"\">\n            <div class=\"container-fluid page\">\n              <div class=\"row\">\n                <div class=\"col-md-5\">\n                  <!--<input class=\"form-control\"/>-->\n                  <mat-form-field class=\"example-full-width\" appearance=\"outline\">\n                    <input matInput placeholder=\"Search\" id=\"search\" (blur)=\"ChangeText($event)\">\n                    <mat-icon color=\"black\" matSuffix>search</mat-icon>\n                  </mat-form-field>\n                </div>\n                <div class=\"col-md-5\">\n                  <mat-form-field appearance=\"outline\">\n                    <mat-select #select placeholder=\"Categories\" multiple (valueChange)=\"ChangeValue($event)\" (openedChange)=\"OpenChangeEvent($event);\">\n                      <mat-option class=\"button-class mydonebtn\">\n                        <button style=\"display: none\" (click)=\"DoneClicked()\" mat-raised-button value=\"\">\n                          <mat-icon>done</mat-icon>\n                          <span>Done</span></button>\n                      </mat-option>\n                      <mat-option *ngFor=\"let topping of categories\" [value]=\"topping.id\">{{topping.name}}</mat-option>\n                    </mat-select>\n                  </mat-form-field>\n                </div>\n                <div class=\"col-md-2\" style=\"text-align:center;\">\n                  <div class=\"col-md-12 mobile-visibility\">\n                    <button mat-fab color=\"primary\" (click)=\"OnOpenClose(false)\">\n                      <mat-icon aria-label=\"Example icon-button with a heart icon\">search</mat-icon>\n                    </button>\n                    <button mat-fab color=\"primary\" (click)=\"openDialog()\" *ngIf=\"class1 === 'col-md-6'\">\n                      <mat-icon aria-label=\"Example icon-button with a heart icon\">file_copy</mat-icon>\n                    </button>\n                  </div>\n                  <div class=\"{{class1}} desktop-visibility\">\n                    <button mat-fab color=\"primary\" (click)=\"OnOpenClose(false)\">\n                      <mat-icon aria-label=\"Example icon-button with a heart icon\">search</mat-icon>\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </nav>\n        <div class=\"map-container\">\n          <div id=\"map\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/group-map/group-map.component.ts":
/*!**************************************************!*\
  !*** ./src/app/group-map/group-map.component.ts ***!
  \**************************************************/
/*! exports provided: GroupMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupMapComponent", function() { return GroupMapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _dialoge_modal_dialoge_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dialoge.modal/dialoge.modal.component */ "./src/app/dialoge.modal/dialoge.modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GroupMapComponent = /** @class */ (function () {
    function GroupMapComponent(appService, dialog, activatedRoutes) {
        this.appService = appService;
        this.dialog = dialog;
        this.activatedRoutes = activatedRoutes;
        this.title = 'app';
        this.markers = [];
        this.categories = [];
        this.class1 = 'col-md-6';
        this.body = {
            'page': 1,
            'page_size': 1000,
            'fields': ['categories']
        };
        this.selectedCategories = [];
        this.isLoading = false;
        this.previousValue = [];
        this.publicURLPath = '/group-locator';
        this.publicURL = window.location.origin + this.publicURLPath + '?searchby=iframe';
        this.originalJSON = [];
        this.addresses = [];
        this.names = [];
        this.pictures = [];
        this.descriptions = [];
        this.isiFrame = false;
        this.categoryIds = [];
        this.groupIds = [];
        this.loaded = 3;
        this.isLogRequired = false;
    }
    GroupMapComponent.prototype.Logging = function (val) {
        if (this.isLogRequired) {
            console.log(val);
        }
    };
    GroupMapComponent.prototype.ChangeValue = function (event) {
        var selectedCategories = [];
        for (var i = 0; i < event.length; i++) {
            if (event[i]) {
                selectedCategories.push(event[i]);
            }
            else {
                $('.mydonebtn').click();
            }
        }
        this.selectedCategories = selectedCategories;
    };
    GroupMapComponent.prototype.OpenChangeEvent = function ($event) {
        var _this = this;
        if ($event) {
            $('#cdk-overlay-0').append('<span class="mat-option-text span-style"><button mat-raised-button="" onclick="localStorage.setItem(\'clicked\', \'true\')" class="button-style mat-raised-button"><span class="mat-button-wrapper"><mat-icon _ngcontent-c1="" class="mat-icon material-icons" role="img" aria-hidden="true">done</mat-icon><span _ngcontent-c1="">Done</span></span><div class="mat-button-ripple mat-ripple" matripple="" ng-reflect-centered="false" ng-reflect-disabled="false" ng-reflect-trigger="[object HTMLButtonElement]"></div><div class="mat-button-focus-overlay"></div></button></span>');
            this.anotherSubscriber = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (x) {
                return localStorage.getItem('clicked');
            })).subscribe(function (observer) {
                if (localStorage.getItem('clicked') === 'true') {
                    $('.mydonebtn').click();
                    _this.DoneClicked();
                    localStorage.removeItem('clicked');
                    $('.span-style').remove();
                    _this.anotherSubscriber.unsubscribe();
                }
            });
        }
        else {
            $('.span-style').remove();
            this.anotherSubscriber.unsubscribe();
        }
    };
    GroupMapComponent.prototype.DoneClicked = function () {
        $('.mydonebtn').click();
        this.select.close();
    };
    GroupMapComponent.prototype.ChangeText = function (event) {
        this.searchWords = event.target.value;
        if (event.relatedTarget && event.relatedTarget.type === 'submit') {
            this.OnOpenClose(false);
        }
    };
    GroupMapComponent.prototype.OnOpenClose = function (flag, flag2) {
        var _this = this;
        if (!flag) {
            var doAllow = false;
            if (this.selectedCategories.length === this.previousValue.length && this.selectedCategories.length > 0) {
                for (var i = 0; i < this.selectedCategories.length; i++) {
                    if (this.selectedCategories[i] !== this.previousValue[i]) {
                        doAllow = true;
                        break;
                    }
                }
            }
            if (!doAllow && this.loaded <= 1) {
                this.SetMarkers();
            }
            if (((doAllow || (this.searchWords !== this.previousWord)) || (this.selectedCategories.length !== this.previousValue.length)) || flag2) {
                if (this.selectedCategories.length > 0) {
                    this.body['category_id'] = this.selectedCategories;
                }
                else {
                    if (this.isiFrame) {
                        var category_id = this.categoryIds;
                        this.body['category_id'] = category_id;
                    }
                    else {
                        this.body['category_id'] = null;
                    }
                }
                if (this.searchWords) {
                    this.previousWord = this.searchWords;
                    this.body['search'] = this.searchWords;
                }
                this.ClearMarkers();
                this.FetchAllGroup(this.body);
                this.previousValue = this.selectedCategories;
            }
            else if (this.searchWords !== this.previousWord) {
                this.previousWord = this.searchWords;
                this.ClearMarkers();
                var backUpValus_1 = {
                    addresses: [],
                    names: [],
                    groupIds: [],
                    descriptions: [],
                    picture: []
                };
                for (var i = 0; i < this.addresses.length; i++) {
                    backUpValus_1.addresses.push(this.addresses[i]);
                    backUpValus_1.names.push(this.names[i]);
                    backUpValus_1.groupIds.push(this.groupIds[i]);
                    backUpValus_1.descriptions.push(this.descriptions[i]);
                    backUpValus_1.picture.push(this.pictures[i]);
                }
                this.SearchWord();
                this.customCall(this.names, this.pictures, this.descriptions, this.addresses, this.groupIds, this.map, this.markers);
                var ssub_1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (x) {
                    return localStorage.getItem('isAllCompleted');
                })).subscribe(function (observer) {
                    if (localStorage.getItem('isAllCompleted')) {
                        setTimeout(function () {
                            _this.SetInfoWindows(_this.markers);
                            localStorage.setItem('isAllCompleted', 'false');
                        }, 2000);
                        setTimeout(function () {
                            _this.addresses = backUpValus_1.addresses;
                            _this.names = backUpValus_1.names;
                            _this.descriptions = backUpValus_1.descriptions;
                            _this.pictures = backUpValus_1.picture;
                        }, 4000);
                        localStorage.setItem('isAllCompleted', 'false');
                        ssub_1.unsubscribe();
                    }
                });
                if (this.selectedCategories || this.searchWords) {
                    var vall = '&category_id=';
                    if (this.selectedCategories) {
                        for (var xx = 0; xx < this.selectedCategories.length; xx++) {
                            if (xx === 0) {
                                vall += this.selectedCategories[xx];
                            }
                            else {
                                vall += ',' + (this.selectedCategories[xx]);
                            }
                        }
                    }
                    var vv = '';
                    if (this.searchWords) {
                        vv = '&search=' + this.searchWords;
                    }
                    this.publicURL = window.location.origin + this.publicURLPath + '?searchby=iframe' + vall + vv;
                }
                else {
                    this.publicURL = window.location.origin + this.publicURLPath + '?searchby=iframe';
                }
            }
        }
    };
    GroupMapComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (window.innerWidth > 768) {
                _this.doAddClass = true;
            }
        }, 100);
        setTimeout(function () {
            localStorage.removeItem('called');
            localStorage.removeItem('groups');
            localStorage.removeItem('addresses');
            localStorage.removeItem('wholeJSON');
            _this.map = _this.MapInitialize(_this.map);
            if (_this.activatedRoutes.snapshot.queryParams.category_id || _this.activatedRoutes.snapshot.queryParams.search || _this.activatedRoutes.snapshot.queryParams.searchby) {
                _this.isiFrame = true;
                if (_this.activatedRoutes.snapshot.queryParams.category_id) {
                    _this.selectedCategories = _this.activatedRoutes.snapshot.queryParams.category_id.split(',');
                    _this.categoryIds = _this.activatedRoutes.snapshot.queryParams.category_id.split(',');
                }
                if (_this.activatedRoutes.snapshot.queryParams.search) {
                    _this.searchWords = _this.activatedRoutes.snapshot.queryParams.search;
                    var element = void 0;
                    element = document.getElementById('search');
                    element.value = _this.searchWords;
                }
                _this.class1 = 'col-md-12';
                _this.OnOpenClose(false, true);
            }
            else {
                _this.FetchAllGroup({
                    'page': 1,
                    'page_size': 1000,
                    'fields': ['categories']
                });
            }
        }, 1000);
    };
    GroupMapComponent.prototype.ClearMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].marker.setMap(null);
        }
        this.markers = [];
    };
    GroupMapComponent.prototype.FetchAllGroup = function (data) {
        var _this = this;
        this.loaded = this.loaded + 1;
        this.isLoading = true;
        this.apiSubscription = this.appService.fetchAllGroup(data).subscribe(function (response) {
            _this.originalJSON = response.groups.group;
            localStorage.setItem('originalJSON', JSON.stringify(_this.originalJSON));
            var addresses = [];
            var names = [];
            var pictures = [];
            var groupIds = [];
            var descriptions = [];
            for (var i = 0; i < response.groups.group.length; i++) {
                var address = response.groups.group[i];
                if (address.categories.category) {
                    for (var j = 0; j < address.categories.category.length; j++) {
                        var contains = false;
                        for (var ii = 0; ii < _this.categories.length; ii++) {
                            if (_this.categories[ii].id === address.categories.category[j].id) {
                                contains = true;
                                break;
                            }
                        }
                        if (!contains) {
                            if (address.categories.category[j].name.toLowerCase().search('(private)') < 0) {
                                _this.categories.push(address.categories.category[j]);
                            }
                        }
                    }
                }
                names.push(response.groups.group[i].name);
                pictures.push(response.groups.group[i].picture);
                descriptions.push(response.groups.group[i].description);
                groupIds.push(response.groups.group[i].id);
                var pushaddress = '';
                if (address.meeting_address) {
                    pushaddress = pushaddress + address.meeting_address + ', ';
                }
                if (address.meeting_city) {
                    pushaddress = pushaddress + address.meeting_city + ', ';
                }
                if (address.meeting_country) {
                    pushaddress = pushaddress + address.meeting_country + ', ';
                }
                if (address.meeting_postcode) {
                    pushaddress = pushaddress + address.meeting_postcode;
                }
                addresses.push(pushaddress);
            }
            if (_this.activatedRoutes.snapshot.queryParams.category_id) {
                var ct = [];
                var listings = _this.activatedRoutes.snapshot.queryParams.category_id.split(',');
                for (var k = 0; k < _this.categories.length; k++) {
                    for (var j = 0; j < listings.length; j++) {
                        if (_this.categories[k].id === listings[j]) {
                            ct.push(_this.categories[k]);
                            break;
                        }
                    }
                }
                _this.categories = ct;
            }
            if (Number(response.groups.page) === 1) {
                _this.names = names;
                _this.pictures = pictures;
                _this.descriptions = descriptions;
                _this.addresses = addresses;
                _this.groupIds = groupIds;
            }
            else {
                for (var j = 0; j < names.length; j++) {
                    _this.names.push(names[j]);
                    _this.pictures.push(pictures[j]);
                    _this.descriptions.push(descriptions[j]);
                    _this.addresses.push(addresses[j]);
                    _this.groupIds.push(groupIds[j]);
                }
            }
            if (response.groups.on_this_page < (Number(response.groups.per_page))) {
                if (_this.searchWords) {
                    _this.SearchWord();
                }
                _this.body['page'] = 1;
                var theBody = [];
                for (var j = 0; j < _this.addresses.length; j++) {
                    var bdy = {
                        name: _this.names[j],
                        address: _this.addresses[j],
                        description: _this.descriptions[j],
                        groupIds: _this.groupIds[j],
                        picture: _this.pictures[j]
                    };
                    theBody.push(bdy);
                }
                if (_this.loaded > 1) {
                    _this.customCall(_this.names, _this.pictures, _this.descriptions, _this.addresses, _this.groupIds, _this.map, _this.markers);
                    var ssub_2 = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (x) {
                        return localStorage.getItem('isAllCompleted');
                    })).subscribe(function (observer) {
                        if (localStorage.getItem('isAllCompleted')) {
                            _this.SetInfoWindows(_this.markers);
                            localStorage.setItem('isAllCompleted', 'false');
                            ssub_2.unsubscribe();
                        }
                    });
                }
                else {
                    _this.isLoading = false;
                }
            }
            else {
                _this.body['page'] = _this.body['page'] + 1;
                _this.FetchAllGroup(_this.body);
            }
            if (data.category_id || data.search) {
                var vall = '&category_id=';
                if (data.category_id) {
                    for (var xx = 0; xx < data.category_id.length; xx++) {
                        if (xx === 0) {
                            vall += data.category_id[xx];
                        }
                        else {
                            vall += ',' + (data.category_id[xx]);
                        }
                    }
                }
                var vv = '';
                if (data && data.search) {
                    vv = '&search=' + data.search;
                }
                _this.publicURL = window.location.origin + _this.publicURLPath + '?searchby=iframe' + vall + vv;
            }
        });
    };
    GroupMapComponent.prototype.SetMarkers = function () {
        var _this = this;
        this.isLoading = true;
        this.loaded = this.loaded + 1;
        this.customCall(this.names, this.pictures, this.descriptions, this.addresses, this.groupIds, this.map, this.markers);
        var ssub = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (x) {
            return localStorage.getItem('isAllCompleted');
        })).subscribe(function (observer) {
            if (localStorage.getItem('isAllCompleted')) {
                _this.SetInfoWindows(_this.markers);
                localStorage.setItem('isAllCompleted', 'false');
                ssub.unsubscribe();
            }
        });
    };
    GroupMapComponent.prototype.SearchWord = function () {
        if (this.addresses.length === this.names.length && this.addresses.length === this.pictures.length && this.addresses.length === this.descriptions.length) {
            var spliceIndexes = [];
            for (var i = 0; i < this.names.length; i++) {
                if (this.addresses[i].toUpperCase().search(this.searchWords.toUpperCase()) >= 0 || this.names[i].toUpperCase().search(this.searchWords.toUpperCase()) >= 0 || this.descriptions[i].toUpperCase().search(this.searchWords.toUpperCase()) >= 0) {
                }
                else {
                    spliceIndexes.push(i);
                }
            }
            for (var i = spliceIndexes.length - 1; i >= 0; i--) {
                this.addresses.splice(spliceIndexes[i], 1);
                this.names.splice(spliceIndexes[i], 1);
                this.descriptions.splice(spliceIndexes[i], 1);
                this.pictures.splice(spliceIndexes[i], 1);
            }
        }
    };
    GroupMapComponent.prototype.openDialog = function () {
        var data = '<script type="text/javascript"> var url=' + this.publicURL + ',d=document,w=window,b="body",i="iframe",a=d.createElement(i);a.src=url,w.setTimeout(function(){d.getElementsByTagName(b)[0].appendChild(a)},1000);</script>';
        var dialogRef = this.dialog.open(_dialoge_modal_dialoge_modal_component__WEBPACK_IMPORTED_MODULE_6__["DialogeModalComponent"], {
            width: '500px',
            data: this.publicURL
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    GroupMapComponent.prototype.SetInfoWindows = function (markers) {
        var _loop_1 = function (i) {
            var json = markers[i];
            var contentString = '<div class="content">' +
                '<div class="content">' +
                '<div class="" style="text-align:center;">' +
                '<div class="col-md-3">' +
                '<img src="' + json.picture + '" width="60px"/>' +
                '</div>' +
                '<div class="col-md-9" style="text-align: left;">' +
                '<h1 style="font-weight: bold; margin-left: 0px; font-size: 15px; margin-top: 10px; " id="firstHeading" class="firstHeading">' + json.name + '</h1>' +
                '<p>' + json.address + '</p>' +
                '<p> <b>Category: </b>' + json.category_id + '</p>';
            if (json.description) {
                var desc = $('<p>' + json.description + '</p>').text();
                if (json.description.length > 200) {
                    contentString += '<p>' + json.description.substr(0, json.description.lastIndexOf(' ', 200)) + '...' + '</p>';
                }
                else {
                    contentString += '<p>' + json.description + '</p>';
                }
            }
            contentString += '</div>' +
                '</div>' +
                '</div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            var marker = json.marker;
            marker.addListener('click', function () {
                if (this.previous) {
                    this.previous.close();
                }
                var test = document.getElementsByClassName('gm-ui-hover-effect');
                for (var ii = 0; ii < test.length; ii++) {
                    var elem = void 0;
                    elem = test[ii];
                    elem.click();
                }
                infowindow.open(this.map, marker);
                this.previous = infowindow;
            });
        };
        for (var i = 0; i < markers.length; i++) {
            _loop_1(i);
        }
        this.isLoading = false;
    };
    GroupMapComponent.prototype.onResize = function (event) {
        if (window.innerWidth > 768) {
            this.doAddClass = true;
        }
        else {
            this.doAddClass = false;
        }
        if (event.currentTarget.outerWidth < 450) {
            this.map.setZoom(0);
        }
        else {
            this.map.setZoom(2);
        }
    };
    GroupMapComponent.prototype.MapInitialize = function (maps) {
        return initMap(maps);
        function initMap(mapa) {
            var mapOptions = {
                center: new google.maps.LatLng(39.567224, -101.657485),
                zoom: 4,
                minZoom: 0
            };
            mapa = new google.maps.Map(document.getElementById('map'), mapOptions);
            window.setTimeout(function () {
                var size = 2;
                if (window.outerWidth < 450) {
                    size = 0;
                }
                mapa.setZoom(size);
                mapa.setCenter(new google.maps.LatLng(0, 0));
            }, 3000);
            return mapa;
        }
    };
    GroupMapComponent.prototype.GetLatLongFromDescription = function (description, address) {
        var latLngArray = [];
        try {
            var strings = description.split('<p>GOOGLE_MAP_LATITUDE=');
            if (strings.length > 1) {
                strings = strings[1].split(';GOOGLE_MAP_LONGITUDE=');
                if (strings.length > 1) {
                    latLngArray.push(Number(strings[0]));
                    strings = strings[1].split('</p>');
                    if (strings.length > 1) {
                        latLngArray.push(Number(strings[0]));
                    }
                }
            }
        }
        catch (e) {
            var desc = [];
            if (localStorage.getItem('not-alloweds')) {
                desc = JSON.parse(localStorage.getItem('not-alloweds'));
                desc.push(description);
                localStorage.setItem('not-alloweds', JSON.stringify(desc));
            }
            else {
                desc.push(description);
                localStorage.setItem('not-alloweds', JSON.stringify(desc));
            }
            console.log(e);
        }
        if (latLngArray.length === 0) {
            try {
                var val = $(description).text();
                return this.GetLatLongFromDescription(val, address);
            }
            catch (e) {
                console.log(e);
            }
        }
        return latLngArray;
    };
    GroupMapComponent.prototype.FetchOriginalAPIJSON = function (groupId) {
        if (this.originalJSON) {
            for (var i = 0; i < this.originalJSON.length; i++) {
                if (this.originalJSON[i].id === groupId) {
                    return this.originalJSON[i];
                }
            }
        }
    };
    GroupMapComponent.prototype.customCall = function (name, picture, descriptions, addresses, groupIds, map, markers) {
        var _this = this;
        var bounds = new google.maps.LatLngBounds();
        var geocoder = new google.maps.Geocoder();
        localStorage.setItem('isAllCompleted', 'false');
        var _loop_2 = function (i) {
            var latLngArray = this_1.GetLatLongFromDescription(descriptions[i], this_1.addresses[i]);
            this_1.fetchLatLong(addresses[i], geocoder, map, groupIds[i], latLngArray).subscribe(function (resp) {
                var originalCatJSON = _this.FetchOriginalAPIJSON(groupIds[i]);
                if (!_this.ContainsWordInCategory(originalCatJSON.categories.category, '(private)')) {
                    var marker = new google.maps.Marker({
                        position: resp,
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    bounds.extend(marker.getPosition());
                    var respo = {
                        marker: marker,
                        picture: picture[i],
                        description: descriptions[i],
                        address: addresses[i],
                        category_id: _this.ArrayToString(originalCatJSON.categories.category),
                        name: name[i]
                    };
                    markers.push(respo);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < addresses.length; i++) {
            _loop_2(i);
        }
        localStorage.setItem('isAllCompleted', 'true');
        /*map.fitBounds(bounds);*/
    };
    GroupMapComponent.prototype.ContainsWordInCategory = function (array, word) {
        if (array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].name.toLowerCase().search(word.toLowerCase()) > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    GroupMapComponent.prototype.ArrayToString = function (array) {
        if (array) {
            var returnValue = '';
            for (var i = 0; i < array.length; i++) {
                if (i !== array.length - 1) {
                    returnValue = returnValue + array[i].name + ', ';
                }
                else {
                    returnValue = returnValue + array[i].name;
                }
            }
            return returnValue;
        }
        else {
            return '';
        }
    };
    GroupMapComponent.prototype.customCall2 = function (json, mapa, markers) {
        var bounds = new google.maps.LatLngBounds();
        var geocoder = new google.maps.Geocoder();
        localStorage.setItem('isAllCompleted', 'false');
        var _loop_3 = function (i) {
            this_2.fetchLatLong(json[i].address, geocoder, mapa, this_2.groupIds).subscribe(function (resp) {
                var marker = new google.maps.Marker({
                    position: resp,
                    animation: google.maps.Animation.DROP,
                    map: mapa
                });
                bounds.extend(marker.getPosition());
                var respo = {
                    marker: marker,
                    picture: json[i].picture,
                    description: json[i].description,
                    address: json[i].address,
                    name: json[i].name
                };
                markers.push(respo);
            });
        };
        var this_2 = this;
        for (var i = 0; i < json.length; i++) {
            _loop_3(i);
        }
        localStorage.setItem('isAllCompleted', 'true');
    };
    GroupMapComponent.prototype.fetchLatLong = function (address, geocoder, mapa, groupIds, latlng) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_4__["Observable"](function (observer) {
            var isError = true;
            if (isError) {
                if (latlng && latlng.length > 1) {
                    observer.next({ lat: latlng[0], lng: latlng[1] });
                }
                else if (localStorage.getItem(address)) {
                    observer.next(JSON.parse(localStorage.getItem(address)));
                }
                else {
                    if (isError) {
                        var latLngStorage = JSON.parse(localStorage.getItem('latLngStorage'));
                        if (latLngStorage && latLngStorage[address] && latLngStorage[address].length > 1) {
                        }
                        else {
                            if (address) {
                                geocoder.geocode({ 'address': address }, function (results, status) {
                                    var ad;
                                    if (localStorage.getItem('addresses')) {
                                        ad = JSON.parse(localStorage.getItem('addresses'));
                                    }
                                    else {
                                        ad = [];
                                    }
                                    ad.push(address);
                                    localStorage.setItem('addresses', JSON.stringify(ad));
                                    if (localStorage.getItem('groups')) {
                                        ad = JSON.parse(localStorage.getItem('groups'));
                                    }
                                    else {
                                        ad = [];
                                    }
                                    ad.push(groupIds);
                                    localStorage.setItem('groups', JSON.stringify(ad));
                                    var json = JSON.parse(localStorage.getItem('originalJSON'));
                                    for (var sd = 0; sd < json.length; sd++) {
                                        if (json[sd].id === groupIds) {
                                            if (localStorage.getItem('wholeJSON')) {
                                                ad = JSON.parse(localStorage.getItem('wholeJSON'));
                                            }
                                            else {
                                                ad = [];
                                            }
                                            ad.push(json[sd]);
                                            localStorage.setItem('wholeJSON', JSON.stringify(ad));
                                        }
                                    }
                                    if (localStorage.getItem('called')) {
                                        var total = Number(localStorage.getItem('called'));
                                        localStorage.setItem('called', (total + 1) + '');
                                    }
                                    else {
                                        localStorage.setItem('called', '1');
                                    }
                                    if (status === 'OK') {
                                        localStorage.setItem(address, JSON.stringify(results[0].geometry.location));
                                        observer.next(results[0].geometry.location);
                                    }
                                    else {
                                        console.log('Geocode was not successful for the following reason: ' + status);
                                    }
                                });
                            }
                        }
                    }
                }
            }
        });
    };
    GroupMapComponent.prototype.ngOnDestroy = function () {
        if (this.apiSubscription) {
            this.apiSubscription.unsubscribe();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('select'),
        __metadata("design:type", Object)
    ], GroupMapComponent.prototype, "select", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], GroupMapComponent.prototype, "onResize", null);
    GroupMapComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-group-map',
            template: __webpack_require__(/*! ./group-map.html */ "./src/app/group-map/group-map.html"),
            styles: [__webpack_require__(/*! ./group-map.css */ "./src/app/group-map/group-map.css")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], GroupMapComponent);
    return GroupMapComponent;
}());



/***/ }),

/***/ "./src/app/group-map/group-map.css":
/*!*****************************************!*\
  !*** ./src/app/group-map/group-map.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "eco-fab-speed-dial {\n  position: fixed;\n  z-index: 100;\n  padding-left: 950px;\n  padding-top: 450px;\n}\n@media (max-width: 767px) {\n  eco-fab-speed-dial {\n    padding-left: 225px;\n    padding-top: 300px;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ3JvdXAtbWFwL2dyb3VwLW1hcC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLG9CQUFvQjtFQUNwQixtQkFBbUI7Q0FDcEI7QUFDRDtFQUNFO0lBQ0Usb0JBQW9CO0lBQ3BCLG1CQUFtQjtHQUNwQjtDQUNGIiwiZmlsZSI6InNyYy9hcHAvZ3JvdXAtbWFwL2dyb3VwLW1hcC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJlY28tZmFiLXNwZWVkLWRpYWwge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHotaW5kZXg6IDEwMDtcbiAgcGFkZGluZy1sZWZ0OiA5NTBweDtcbiAgcGFkZGluZy10b3A6IDQ1MHB4O1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIGVjby1mYWItc3BlZWQtZGlhbCB7XG4gICAgcGFkZGluZy1sZWZ0OiAyMjVweDtcbiAgICBwYWRkaW5nLXRvcDogMzAwcHg7XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/group-map/group-map.html":
/*!******************************************!*\
  !*** ./src/app/group-map/group-map.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content text-center extrapadd\" [ngStyle]=\"{'pointer-events': isLoading ? 'none' : 'auto'}\">\n  <!--<div class=\"container\">-->\n  <div class=\"container\">\n    <div class=\"text-container\">\n      <h2>ISKCON Group Locator Builder</h2>\n      <p>ISKCON Group Locator Builder can be used to generate a map of ISKCON location such as temples, restaurant or\n        bhakti-vriksha groups. </p>\n      <p>The builder can generate either Javascript or iFrame code that can be embedded in the website to display the\n        map. The builder also allows to filter the groups for select categories. </p>\n    </div>\n  </div>\n  <div class=\"\">\n    <div class=\"iframe-block\">\n      <!--<div class=\"container \">-->\n      <div class=\"\" [ngClass]=\"{'container': doAddClass}\">\n        <!--<div class=\"loader\"></div>-->\n        <div class=\"\" [ngClass]=\"{'loader': doAddClass}\">\n          <div class=\"loader_ajax_small\" *ngIf=\"isLoading\"></div>\n          <div class=\"w100\" [ngClass]=\"{'reduceop' : isLoading}\">\n            <nav class=\"navbar navbar-default\">\n              <div class=\"\">\n                <div class=\"container-fluid page\">\n                  <div class=\"row\">\n                    <div class=\"col-md-5\">\n                      <!--<input class=\"form-control\"/>-->\n                      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\n                        <input matInput placeholder=\"Search\" id=\"search\" (blur)=\"ChangeText($event)\">\n                        <mat-icon color=\"black\" matSuffix>search</mat-icon>\n                      </mat-form-field>\n                    </div>\n                    <div class=\"col-md-5\">\n                      <mat-form-field appearance=\"outline\">\n                        <mat-select #select placeholder=\"Categories\" multiple (valueChange)=\"ChangeValue($event)\"\n                                    (openedChange)=\"OpenChangeEvent($event);\">\n                          <mat-option class=\"button-class mydonebtn\">\n                            <button style=\"display: none\" (click)=\"DoneClicked()\" mat-raised-button value=\"\">\n                              <mat-icon>done</mat-icon>\n                              <span>Done</span></button>\n                          </mat-option>\n                          <mat-option *ngFor=\"let topping of categories\" [value]=\"topping.id\">{{topping.name}}\n                          </mat-option>\n                          <!--<mat-option class=\"button-class mydonebtn\">\n                            <button (click)=\"DoneClicked()\" mat-raised-button value=\"\">\n                              <mat-icon>done</mat-icon>\n                              <span>Done</span></button>\n                          </mat-option>-->\n                        </mat-select>\n                      </mat-form-field>\n                    </div>\n                    <div class=\"col-md-2\" style=\"text-align:center;\">\n                      <div class=\"col-md-12 mobile-visibility\">\n                        <button mat-fab color=\"primary\" (click)=\"OnOpenClose(false)\">\n                          <mat-icon aria-label=\"Example icon-button with a heart icon\">search</mat-icon>\n                        </button>\n                        <button mat-fab color=\"primary\" (click)=\"openDialog()\" *ngIf=\"class1 === 'col-md-6'\">\n                          <mat-icon aria-label=\"Example icon-button with a heart icon\">file_copy</mat-icon>\n                        </button>\n                      </div>\n                      <div class=\"{{class1}} desktop-visibility\">\n                        <button mat-fab color=\"primary\" (click)=\"OnOpenClose(false)\">\n                          <mat-icon aria-label=\"Example icon-button with a heart icon\">search</mat-icon>\n                        </button>\n                      </div>\n                      <div class=\"col-md-6 desktop-visibility\" *ngIf=\"class1 === 'col-md-6'\">\n                        <button mat-fab color=\"primary\" (click)=\"openDialog()\">\n                          <mat-icon aria-label=\"Example icon-button with a heart icon\">file_copy</mat-icon>\n                        </button>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </nav>\n            <div class=\"map-container\">\n              <div id=\"map\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.html */ "./src/app/home/home.html")
        })
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/home/home.html":
/*!********************************!*\
  !*** ./src/app/home/home.html ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"text-block\">\n  <div class=\"text-container\">\n    <h3>Welcome to ISKCON Family website that provides community management platform & ISKCON Group Locator\n      Builder.</h3>\n    <h3>Please email admin(at)iskcon(dot)family for more details. </h3>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/my.app/my.app.component.ts":
/*!********************************************!*\
  !*** ./src/app/my.app/my.app.component.ts ***!
  \********************************************/
/*! exports provided: MyAppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAppComponent", function() { return MyAppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MyAppComponent = /** @class */ (function () {
    function MyAppComponent() {
    }
    MyAppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./my.app.html */ "./src/app/my.app/my.app.html")
        })
    ], MyAppComponent);
    return MyAppComponent;
}());



/***/ }),

/***/ "./src/app/my.app/my.app.html":
/*!************************************!*\
  !*** ./src/app/my.app/my.app.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/terms-and-condition/terms-and-condition.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/terms-and-condition/terms-and-condition.component.ts ***!
  \**********************************************************************/
/*! exports provided: TermsAndConditionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsAndConditionComponent", function() { return TermsAndConditionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TermsAndConditionComponent = /** @class */ (function () {
    function TermsAndConditionComponent() {
    }
    TermsAndConditionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-terms-and-condition',
            template: __webpack_require__(/*! ./terms-and-condition.html */ "./src/app/terms-and-condition/terms-and-condition.html"),
            styles: [__webpack_require__(/*! ./terms-and-condition.css */ "./src/app/terms-and-condition/terms-and-condition.css")]
        })
    ], TermsAndConditionComponent);
    return TermsAndConditionComponent;
}());



/***/ }),

/***/ "./src/app/terms-and-condition/terms-and-condition.css":
/*!*************************************************************!*\
  !*** ./src/app/terms-and-condition/terms-and-condition.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-content {\n  margin-bottom: 20px;\n  min-height: calc(100vh - 84px);\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVybXMtYW5kLWNvbmRpdGlvbi90ZXJtcy1hbmQtY29uZGl0aW9uLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFvQjtFQUNwQiwrQkFBK0I7Q0FDaEMiLCJmaWxlIjoic3JjL2FwcC90ZXJtcy1hbmQtY29uZGl0aW9uL3Rlcm1zLWFuZC1jb25kaXRpb24uY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4tY29udGVudCB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIG1pbi1oZWlnaHQ6IGNhbGMoMTAwdmggLSA4NHB4KTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/terms-and-condition/terms-and-condition.html":
/*!**************************************************************!*\
  !*** ./src/app/terms-and-condition/terms-and-condition.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content tandp\">\n  <div class=\"container extrapadd\">\n    <div class=\"text-container text-center\">\n      <h2>Terms & Privacy Policy</h2>\n    </div>\n    <mat-accordion [multi]=\"'true'\">\n      <mat-expansion-panel [expanded]=\"'true'\">\n        <mat-expansion-panel-header>\n          <mat-panel-title>\n            Terms of Use\n          </mat-panel-title>\n          <mat-panel-description>\n          </mat-panel-description>\n        </mat-expansion-panel-header>\n        <div class=\"\">\n        <div class=\"panel-content\">\n          <p>This Terms of Use was last modified on January 1, 2019 and enters into effect immediately.</p>\n          <p> Please read these Terms of Use (“Terms”, “Terms of Use”) carefully before using this\n            website (the “Website”) operated by ISKCON Family (“us”, “we”, or “our”).</p>\n\n          <p>Your access to and use of the Website is contingent upon your knowledge of and\n            compliance with these Terms. These Terms apply to all visitors, users and others who wish\n            to access or use the Website.</p>\n          <p>By accessing or using the Website you agree to observe the Terms explained below. If you\n            disagree with any part of the Terms, then you do not have permission to access the\n            Website.</p>\n\n          <h3>Financial transactions</h3>\n\n          <p>If you wish to make any financial transaction through the Website (“Transaction”), you may\n            be asked to supply certain information relevant to your Transaction including, without\n            limitation, your credit card number, the expiration date of your credit card, your billing\n            address, and your shipping information.</p>\n          <p>You represent and warrant that: (i) you have the legal right to use any credit card(s) or other\n            payment method(s) in connection with any Transaction; and that (ii) the information you\n            supply to us is true, correct and complete.</p>\n          <p>The service may employ the use of third party services for the purpose of facilitating\n            payment and the completion of Transactions. By submitting your information, you grant us\n            the right to provide the information to these third parties subject to our Privacy Policy.</p>\n\n          <h3>Contests, Sweepstakes and Promotions</h3>\n\n          <p>Any contests, sweepstakes or other promotions (collectively, “Promotions”) made available\n            through the Website may be governed by rules that are separate from these Terms\n            Conditions. If you participate in any Promotions, please review the applicable rules as well as our Privacy\n            Policy. If the rules for a Promotion conflict with these Terms of Use, the\n            Promotion rules will apply.</p>\n\n          <h3>Accounts</h3>\n          <p>When you create an account with us, you guarantee that you are above the age of 18, and that the information\n            you provide us is accurate, complete, and current at all times.\n            Inaccurate, incomplete, or obsolete information may result in the immediate termination of\n            your account on the Website.</p>\n\n\n          <p>You are responsible for maintaining the confidentiality of your account and password,\n            including but not limited to the restriction of access to your computer and/or account. You\n            agree to accept responsibility for any and all activities or actions that occur under your\n            account and/or password, whether your password is with our Website or a third-party\n            service. You must notify us immediately upon becoming aware of any breach of security or\n            unauthorized use of your account.</p>\n          <p>You may not use as a username the name of another person or entity or that is not lawfully\n            available for use, a name or trademark that is subject to any rights of another person or\n            entity other than you, without appropriate authorization. You may not use as a username\n            any name that is offensive, vulgar or obscene.</p>\n\n          <h3>Intellectual Property</h3>\n          <p>The Website and its original content, features and functionality are and will remain the\n            exclusive property of ISKCON Family. The Website is protected by laws pertaining to intellectual property\n            both within the United States and in foreign countries. Our intellectual\n            property may not be used any commercial purpose without the prior written consent of\n            ISKCON Family.</p>\n\n          <h3>External Websites</h3>\n          <p>Our Website may contain links to third party websites or services that are not owned or\n            controlled by ISKCON Family.</p>\n\n\n          <p>ISKCON Family has no control over, and assumes no responsibility for the content, privacy policies, or\n            practices of any third party websites or services. We do not endorse the\n            offerings of any of these entities/individuals or their websites.</p>\n\n\n          <p>You acknowledge and agree that ISKCON Family shall not be responsible or liable, directly\n            or indirectly, for any damage or loss caused or alleged to be caused by or in connection\n            with use of or reliance on any such content, goods or services available on or through any\n            third party websites or services.</p>\n\n\n          <p>We strongly advise you to read the terms and conditions and privacy policies of any third\n            party websites that you visit.</p>\n\n          <h3>Termination</h3>\n          <p>We may terminate or suspend your account and bar access to the Website immediately,\n            without prior notice or liability, under our sole discretion, for any reason whatsoever and\n            without limitation, including but not limited to a breach of the Terms.</p>\n\n          <p>If you wish to terminate your account, you may simply discontinue using the Website. In the\n            event of an account Termination, the Terms of Use explained herein and their various legal\n            and practical implications remain active.</p>\n\n          <h3>Indemnification</h3>\n          <p>You agree to defend, indemnify and hold harmless ISKCON Family and all related parties, including employees,\n            contractors, volunteers, affiliates, and Website operators from and against any and all claims, damages,\n            obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney’s fees),\n            resulting from or arising out of a) your use and access of the Website, by you or any person using your\n            account and password, or b) a breach of these Terms.</p>\n\n          <h3>Limitation Of Liability</h3>\n          <p>In no event shall ISKCON Family, nor its employees, contractors, volunteers, affiliates, or Website\n            operators be liable for any indirect, incidental, special, consequential or punitive\n            damages, including without limitation, loss of profits, data, use, goodwill, or other intangible\n            losses, resulting from (i) your access to or use of or inability to access or use the Website;\n            (ii) any conduct or content of any third party on the Website; (iii) any content obtained from\n            the Website; and (iv) unauthorized access, use or alteration of your transmissions or\n            content, whether based on warranty, contract, tort (including negligence) or any other legal\n            theory, whether or not we have been informed of the possibility of such damage, and even if\n            a remedy set forth herein is found to have failed of its essential purpose.</p>\n\n          <h3>Disclaimer</h3>\n          <p>The Website is provided without warranties of any kind, whether express or implied.\n            ISKCON Family, its employees, contractors, volunteers, affiliates, and Website operators do\n            not warrant that a) the Website will function uninterrupted, secure or available at any\n            particular time or location; b) any errors or defects will be corrected; c) the Website is free of viruses or\n            other harmful components; or d) the results of using the Website will meet your\n            requirements.</p>\n\n          <h3>Exclusions</h3>\n          <p>Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or\n            limitation of liability for consequential or incidental damages, so the limitations above may not apply to\n            you.</p>\n\n          <h3>Governing Law</h3>\n          <p>These Terms shall be governed and construed in accordance with the laws of San Francisco, California,\n            without regard to its conflict of law provisions.</p>\n\n          <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver\n            of those rights. If any provision of these Terms is held to be invalid or unenforceable by a\n            court, the remaining provisions of these Terms will remain in effect. These Terms constitute\n            the entire agreement between us regarding our Website, and supersede and replace any\n            prior agreements we might have had between us regarding the Website.</p>\n\n          <h3>Changes</h3>\n          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.\n            By continuing to access or use our Website, you agree to be bound by the most up-to-date\n            version of these Terms.</p>\n\n          <h3>Contact Us</h3>\n          <p>If you have any questions about these Terms, please contact us.</p>\n        </div>\n        </div>\n      </mat-expansion-panel>\n      <mat-expansion-panel [expanded]=\"'true'\">\n        <mat-expansion-panel-header>\n          <mat-panel-title>\n            Privacy\n          </mat-panel-title>\n          <mat-panel-description>\n          </mat-panel-description>\n        </mat-expansion-panel-header>\n        <div class=\"\">\n          <div class=\"panel-content\">\n          <p>This Privacy Policy was last modified on January 1, 2019 and enters into effect immediately.</p>\n\n          <p>ISKCON Family’s Privacy Policy covers the collection, use, and disclosure of personal\n            information that may be collected by us anytime you interact with ISKCON Family, such as when you visit one\n            of our websites, when you make a financial transaction or contribution, or when you interact with our team\n            members. Please take a moment to read the following to learn more about our information practices, including\n            what type of information is gathered, how the information is used and for what purposes, to whom we disclose\n            the information, and how we safeguard your personal information. Your privacy is a priority at ISKCON Family\n            and we go to great lengths to protect it.</p>\n\n          <p>By providing personal information to us or through our websites, you understand and\n            consent to the collection, maintenance, processing and transfer of such information in and to all countries\n            and territories. Please read the following privacy policy before using this\n            website or providing any personally identifiable information through this website. It will be\n            assumed that if you provide us with any personally identifiable information that you have read and understand\n            this policy.\n            Some portions of this privacy policy may not apply to information that you provide voluntarily, or that we\n            may obtain, through means other than our websites, such as, but not limited to, telephone, postal mail, other\n            live and print media, and other available public\n            information sources. Our websites are intended for users who are located internationally.</p>\n\n          <p>This privacy policy is part of the ISKCON Family website terms and conditions which\n            governs your use of this website in general.</p>\n\n\n          <h3>Why We Collect Personal Information</h3>\n\n\n          <p>We collect your personal information because it helps us deliver a superior level of user service. It\n            enables us to give you convenient access to our content and focus on categories\n            of greatest interest to you. In addition, your personal information helps us keep you posted\n            on the latest updates, announcements, and events that you might like to hear about.</p>\n\n          <h3>What Information We Collect and How We May Use It</h3>\n\n          <p>There are a number of situations in which your personal information may help us give you\n            better products. For example, when you interact with ISKCON Family by phone, we may\n            collect personal information relevant to the situation, such as your name, mailing address,\n            phone number, email address, etc. We may also collect information for market research\n            purposes – such as your occupation and where you use your computer – to gain a better understanding of our\n            users and thus provide more valuable service. We may collect\n            information regarding user activities on our websites. This helps determine how to best\n            provide useful information to users and to understand which parts of our websites, content, and Internet\n            services are of most interest to them. We may use personal information to provide content that you have\n            requested as well as for auditing, research, and analysis to improve ISKCON Family’s content. We may collect\n            personal information about users of our websites through activities such as financial transactions and\n            completion of forms on our websites. Such information is available to us when users register or subscribe to\n            accounts or features on our websites, make online transactions, complete surveys, comment on our blogs,\n            opt-in to our email marketing list, submit a comment or question to us using a “contact us” form or similar\n            feature, send us an e-mail, or in any other way submit personal information voluntarily to us through our\n            websites.</p>\n\n          <p>If you post blog comments, use a bulletin board, chat room or other similar features on our website you\n            should be aware that any information you share is visible to other users.\n            Personally identifiable information you submit to one of these forums can be read, collected,\n            or used by other individuals to send you unsolicited messages. ISKCON Family is not\n            responsible for the personally identifiable information you choose to submit in these forums.</p>\n\n          <p>If you choose to make information, which was previously non-public, available by enabling\n            certain user features, ISKCON Family may collect that information from your interaction and the information\n            could then become publicly available.\n          </p>\n          <h3>When We Disclose Your Information</h3>\n\n          <p>ISKCON Family takes your privacy very seriously. ISKCON Family does not sell or rent your contact\n            information to other marketers. Except as otherwise disclosed to you, we will not sell, rent or disclose your\n            personal information to third parties without notifying you of our intent to share the personal information\n            in advance and giving you an opportunity to prevent your personal information from being shared.</p>\n\n          <p>Within ISKCON Family, to help us provide superior service, your personal information may be shared with\n            legal entities to safeguard it in accordance with ISKCON Family’s privacy\n            policy. ISKCON Family will use your personal information to respond to your requests and to\n            provide you with our content. We may also use your personal information to maintain our\n            internal record keeping. We may match information collected from you through different means or at different\n            times, including both personal information and website usage\n            information, and use such information along with information obtained from other sources,\n            including third parties. In addition, we may send you notices (for example, in the form of e-mails, mailings,\n            and the like, such as our e-newsletters), and otherwise correspond with you about events, important updates,\n            etc. that we think might interest you. You may opt out of\n            receiving such notices from us by following the instructions in the right to opt in and opt-out\n            section below. We may analyze user behavior as a measure of interest in, and use of, our\n            websites and e-mails, both on an individual basis and in the aggregate.</p>\n\n          <h3>How We Protect Your Personal Information</h3>\n          <p>ISKCON Family takes various precautions to safeguard your personal information against\n            loss, theft, and misuse, as well as unauthorized access, disclosure, alteration, and destruction. The ISKCON\n            Family websites use secure encryption, provided by a third party, on some web pages where credit card\n            information is required.</p>\n\n\n          <h3>Integrity of Your Personal Information</h3>\n\n          <p>ISKCON Family has safeguards in place to keep your personal information accurate, complete, and up to date\n            for the purposes for which it is used. Naturally, you always have\n            the right to access and correct the personal information you have provided. And you can\n            request a copy of your personal information, your product registration history, and your\n            interactions with our sales and support agents by contacting us.</p>\n\n\n          <p>While ISKCON Family strives to protect the security and integrity of sensitive personal\n            information provided through this website, due to the inherent nature of the internet as an\n            open global communications vehicle, we cannot guarantee 100% that information during\n            transmission through the internet or while stored in our system or otherwise in our care, will be absolutely\n            safe from intrusion by others.\n            If you contact us by e-mail or a “contact us” form or similar feature on our website, you\n            should be aware that your transmission might not be secure. A third party could view\n            information you send by these methods in transit. Do not send sensitive information (such\n            as payment card information, social security numbers, employer identification numbers,\n            passwords, or pin numbers) to us via e-mail or via a “contact us” form or similar feature on\n            our website. We will have no liability for disclosure of your information due to errors or\n            unauthorized acts of third parties during or after transmission. In the unlikely event that we\n            believe that the security of your personal information in our possession or control may have been\n            compromised, we may seek to notify you of that development. If a notification is appropriate, we would\n            endeavor to do so as promptly as possible under the circumstances,\n            and, to the extent we have your e-mail address, we may notify you by e-mail. You consent to our use of e-mail\n            as a means of such notification.\n          </p>\n\n          <h3>Cookies and Other Technologies</h3>\n\n          <p>As is standard practice on many websites, the ISKCON Family websites use cookies, third\n            party software, and other technologies to track anonymous user data to help us understand\n            which parts of our websites are the most popular, where our visitors are going, and how much time they spend\n            there. We may also use cookies and other technologies to reinforce\n            online promotions. We may use cookies and other technologies to study traffic patterns on\n            our websites. Additionally we may use cookies to customize your experience and provide\n            greater convenience each time you interact with us.</p>\n\n\n          <p>Information such as your country and language helps us provide a more useful online shopping experience.\n            Your contact information, product serial numbers, and information\n            about your computer helps us personalize your service and provide a better experience.\n            If, however, you prefer not to enable cookies you can disable cookies in your browser.</p>\n\n\n          <p>Please note that certain features of the ISKCON Family websites will not be available once cookies are\n            disabled.</p>\n\n\n          <p>As is true of most websites, we reserve the right to gather certain information automatically\n            and store it in log files. This information includes Internet Protocol (IP) addresses, browser type, Internet\n            Service Provider (ISP), referring/exit pages, operating system, date/time stamp, and click-stream data. This\n            information (which does not identify individual users) may be used to analyze trends, to administer the site,\n            to track users’ movements around the site and to gather demographic information about our user base as a\n            whole. </p>\n\n          <p>ISKCON Family will not use the information collected to market directly to a specific person. </p>\n\n          <p>Please see privacy policies of all the third party sites that are being used by this website.</p>\n\n          <h3>More about payment processing</h3>\n          <p>Summary: No credit card information is ever stored on our servers.</p>\n\n          <p>We use Stripe.com, one of the most reputable, secure payment processors available. For more information, you\n            can visit Stripe's security policy right here!</p>\n\n          <h3>Right to Opt-In and Opt-Out</h3>\n          <p>You may have the right to “opt in” and “opt out” of certain uses of your personal information.\n            For example, at the time you are requested to provide personal information on any of our\n            websites, you may have the opportunity to elect to, or not to receive correspondence from\n            us. You may opt out of any email marketing communications with ISKCON Family by\n            clicking the opt-out link in our messages, or by sending an email to us stating that you\n            would like to be removed from a specific marketing list, or all communications entirely.\n            Please note that you cannot unsubscribe or opt-out from certain correspondence from us, including messages\n            relating to your account transactions. You may be contacted by ISKCON Family in connection with your\n            relationship to us as a subscriber to our content and\n            Services.</p>\n          <h3>Third-party privacy policies</h3>\n          <p>The following privacy policies may be of interest to you:</p>\n          <ul>\n            <li><a href=\"https://mailchimp.com/legal/privacy/\" target=\"_blank\">Mailchimp Privacy Policy</a></li>\n            <li><a href=\"https://www.elvanto.com/privacy/privacy-policy/\" target=\"_blank\">Elvanto Privacy Policy</a></li>\n            <li><a href=\"https://twitter.com/en/privacy\" target=\"_blank\">Twitter Privacy Policy</a></li>\n            <li><a href=\"https://www.facebook.com/policy.php\" target=\"_blank\">Facebook Data Policy</a></li>\n            <li><a href=\"https://support.google.com/youtube/answer/7671399?p=privacy_guidelines&hl=en&visit_id=1-636627750051356853-3978278983&rd=1\" target=\"_blank\">Youtube\n              Privacy Policy</a></li>\n            <li><a href=\"https://www.linkedin.com/legal/privacy-policy\" target=\"_blank\">LinkedIn Privacy Policy</a></li>\n            <li><a href=\"https://help.instagram.com/402411646841720\" target=\"_blank\">Instagram Privacy Policy</a></li>\n            <li><a href=\"https://soundcloud.com/pages/privacy\" target=\"_blank\">SoundCloud Privacy Policy</a></li>\n            <li><a href=\"https://policies.google.com/privacy\" target=\"_blank\">Google Privacy Policy</a></li>\n            <li><a href=\"https://stripe.com/us/privacy\" target=\"_blank\">Stripe Privacy Policy</a></li>\n          </ul>\n        </div>\n        </div>\n      </mat-expansion-panel>\n    </mat-accordion>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\ProjectWorks\node\iskcon\LatestVersion_22_03_2020\group-locator-angular-web\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map