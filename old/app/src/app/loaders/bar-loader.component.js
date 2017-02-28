"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BarLoaderComponent = (function () {
    function BarLoaderComponent() {
    }
    return BarLoaderComponent;
}());
BarLoaderComponent = __decorate([
    core_1.Component({
        selector: 'bar-loader',
        template: "\n<div class=\"load\">\n    <div  class=\"bar\"></div>\n    <div  class=\"bar\"></div>\n    <div  class=\"bar\"></div>\n</div>\n    ",
        styles: ["\n.load{\n    display: inline-block;\n    margin: 0;\n    width: 20px; \n    height: 20px\n}\n.bar{\n    background: #99aaca;\n    border: 1px solid #96a6c9;\n    float: left;\n    margin-right: 3px;\n    margin-top: 0px;\n    width: 3px;\n    height: 20px;\n  \n    -webkit-animation: loading 1s steps(3, end) infinite;\n    -moz-animation: loading 1s steps(3, end) infinite;\n    -ms-animation: loading 1s steps(3, end) infinite;\n}\n.load .bar:nth-child(2){-webkit-animation-delay: 0.1s;\n-moz-animation-delay: 0.1s;\n-ms-animation-delay: 0.1s;\n-o-animation-delay: 0.1s;\nanimation-delay: 0.1s;}\n.load .bar:nth-child(3){-webkit-animation-delay: 0.2s;\n-moz-animation-delay: 0.2s;\n-ms-animation-delay: 0.2s;\n-o-animation-delay: 0.2s;\nanimation-delay: 0.2s;}\n@-webkit-keyframes loading{\n  0%{}\n  10%{margin-top: 6px; height: 15px; border-color:#d1d8e6;background-color:#bac5db; }\n  20%{  margin-top: -10px; height: 20px; border-color:#d1d7e2; background-color:#c6ccda; }\n  30%{ margin-top:6px; height:15px; border-color:#d1d8e6; background-color:#bac5db;}\n  40%{margin-top:8px; height:10px;}\n \n}\n@-moz-keyframes loading{\n  0%{}\n  10%{margin-top: 6px; height: 15px; border-color:#d1d8e6;background-color:#bac5db; }\n  20%{  margin-top: -10px; height: 20px; border-color:#d1d7e2; background-color:#c6ccda; }\n  30%{ margin-top:6px; height:15px; border-color:#d1d8e6; background-color:#bac5db;}\n  40%{margin-top:8px; height:10px;}\n \n}\n@-ms-keyframes loading{\n  0%{}\n  10%{margin-top: 6px; height: 15px; border-color:#d1d8e6;background-color:#bac5db; }\n  20%{  margin-top: -10px; height: 20px; border-color:#d1d7e2; background-color:#c6ccda; }\n  30%{ margin-top:6px; height:15px; border-color:#d1d8e6; background-color:#bac5db;}\n  40%{margin-top:8px; height:10px;}\n \n}\n@keyframes loading{\n  0%{}\n  10%{margin-top: 6px; height: 15px; border-color:#d1d8e6;background-color:#bac5db; }\n  20%{  margin-top: -10px; height: 20px; border-color:#d1d7e2; background-color:#c6ccda; }\n  30%{ margin-top:6px; height:15px; border-color:#d1d8e6; background-color:#bac5db;}\n  40%{margin-top:8px; height:10px;}\n \n}\n    "]
    })
], BarLoaderComponent);
exports.BarLoaderComponent = BarLoaderComponent;
//# sourceMappingURL=bar-loader.component.js.map