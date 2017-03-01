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
var common_1 = require('@angular/common');
var profile_routing_module_1 = require('./profile-routing.module');
var profile_component_1 = require('./components/profile.component');
var details_component_1 = require('./components/details.component');
var ProfileModule = (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, profile_routing_module_1.ProfileRoutingModule],
            declarations: [profile_component_1.ProfileComponent, details_component_1.DetailsComponent],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], ProfileModule);
    return ProfileModule;
}());
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map