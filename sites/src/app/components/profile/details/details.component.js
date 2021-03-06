"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DetailsComponent = (function () {
    function DetailsComponent() {
    }
    DetailsComponent.prototype.ngOnInit = function () {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        console.log(this.profile.email);
    };
    DetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            template: "\n        <div class=\"page-header\">\n            <h1>{{profile.email}}</h1>\n        </div>\n        <div class=\"row well\" style=\"text-align: left;\">\n            <div class=\"col-xs-2\">\n                <span>Email :</span><br/><br/>\n                <span>Public key : </span><br/><br/>\n                <span>Private key :</span><br/>\n            </div>\n            <div class=\"col-xs-10\">\n                <span>{{profile.email}}</span><br/><br/>\n                <span>{{profile.apikey}}</span><br/><br/>\n                <span>{{profile.privatekey}}</span><br/>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], DetailsComponent);
    return DetailsComponent;
}());
exports.DetailsComponent = DetailsComponent;
//# sourceMappingURL=details.component.js.map