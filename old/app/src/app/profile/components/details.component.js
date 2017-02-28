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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DetailsComponent = (function () {
    function DetailsComponent() {
    }
    DetailsComponent.prototype.ngOnInit = function () {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        console.log(this.profile.email);
    };
    return DetailsComponent;
}());
DetailsComponent = __decorate([
    core_1.Component({
        selector: '',
        template: "\n        <div class=\"page-header\">\n            <h1>{{profile.email}} <small>details</small></h1>\n        </div>\n        <div class=\"row well\">\n            <ol>\n                <li>Email : {{profile.email}}</li>\n                <li>Public key : {{profile.apikey}}</li>\n                <li>Private key : {{profile.privatekey}}</li>\n            </ol>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [])
], DetailsComponent);
exports.DetailsComponent = DetailsComponent;
//# sourceMappingURL=details.component.js.map