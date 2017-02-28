"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CircleLoaderComponent = (function () {
    function CircleLoaderComponent() {
    }
    return CircleLoaderComponent;
}());
CircleLoaderComponent = __decorate([
    core_1.Component({
        selector: 'circle-loader',
        template: "\n<div class=\"wrap clearfix\">\n  <section class=\"clearfix\">\n    <ul class=\"rotate_wrapper\">\n      <li class=\"rotate_item\"><span></span></li>\n      <li class=\"rotate_item delay1\"><span></span></li>\n      <li class=\"rotate_item delay2\"><span></span></li>\n      <li class=\"rotate_item delay3\"><span></span></li>\n      <li class=\"rotate_item delay4\"><span></span></li>\n    </ul>\n  </section>\n</div>\n    ",
        styles: [
            "\ndiv.wrap {\n    display: inline-block;\n}\n\nsection {\n    display: inline-block;\n    height: 50px;\n    width: 50px;\n    margin: 0;\n    position: relative;\n}\n\nul.rotate_wrapper {\n    position: relative;\n    width: 50px;\n    height: 50px;\n    list-style: none;\n}\n\nul.rotate_wrapper li.rotate_item {\n    width: 100%;\n    height: 100%;\n    border-radius: 52px;\n    -webkit-border-radius: 52px;\n    -moz-border-radius: 52px;\n    -o-border-radius: 52px;\n    top: 0;\n    left: 0;\n    z-index: 99;\n    text-indent: -9999px;\n    display: block;\n    position: absolute;\n    border: none;\n}\nul.rotate_wrapper li.rotate_item span {\n    background: #000000;\n    bottom: 0px;\n    left: 50%;\n    margin-left: -2px;\n    display: block;\n    position: absolute;\n    width: 4px;\n    height: 4px;\n    border-radius: 2px;\n    -webkit-border-radius: 2px;\n    -moz-border-radius: 2px;\n    -o-border-radius: 2px;\n}\n\n/* CSS3 Animations */\nul.rotate_wrapper li.rotate_item {\n    animation-iteration-count:infinite;\n    animation-timing-function:linear;\n    animation-name:orbit;\n\n    -webkit-animation-iteration-count:infinite;\n    -webkit-animation-timing-function:linear;\n    -webkit-animation-name:orbit;\n    \n    -moz-animation-iteration-count:infinite;\n    -moz-animation-timing-function:linear;\n    -moz-animation-name:orbit;\n\n    -o-animation-iteration-count:infinite;\n    -o-animation-timing-function:linear;\n    -o-animation-name:orbit;\n}\n\nul.rotate_wrapper li.rotate_item {\n    animation-duration:4s;\n    -webkit-animation-duration:4s;\n    -moz-animation-duration:4s;\n    -o-animation-duration:4s;\n}\n\n.delay1 {\n    animation-delay:0.2s;\n    -moz-animation-delay:0.2s; /* Firefox */\n    -webkit-animation-delay:0.2s; /* Safari and Chrome */\n    -o-animation-delay:0.2s; /* Opera */\n}\n\n.delay2 {\n    animation-delay:0.4s;\n    -moz-animation-delay:0.4s; /* Firefox */\n    -webkit-animation-delay:0.4s; /* Safari and Chrome */\n    -o-animation-delay:0.4s; /* Opera */\n}\n\n.delay3 {\n    animation-delay:0.6s;\n    -moz-animation-delay:0.6s; /* Firefox */\n    -webkit-animation-delay:0.6s; /* Safari and Chrome */\n    -o-animation-delay:0.6s; /* Opera */\n}\n\n.delay4 {\n    animation-delay:0.8s;\n    -moz-animation-delay:0.8s; /* Firefox */\n    -webkit-animation-delay:0.8s; /* Safari and Chrome */\n    -o-animation-delay:0.8s; /* Opera */\n}\n\n@keyframes orbit {\n    0% {\n        transform:rotate(0deg);\n        opacity: 1;\n    }\n    5% {\n        transform:rotate(90deg);\n        opacity: 1;\n    }\n    45% {\n        transform:rotate(270deg);\n        opacity: 1;\n    }\n    55% {\n        transform:rotate(540deg);\n        opacity: 1;\n    }\n    75% {\n        transform:rotate(630deg);\n        opacity: 1;\n    }\n    80% {\n        transform:rotate(720deg);\n        opacity: 0;\n    }\n    100% {\n        transform:rotate(720deg);\n        opacity: 0;\n    }\n}\n\n@-webkit-keyframes orbit {\n    0% {\n        -webkit-transform:rotate(0deg);\n        opacity: 1;\n    }\n    5% {\n        -webkit-transform:rotate(90deg);\n        opacity: 1;\n    }\n    45% {\n        -webkit-transform:rotate(270deg);\n        opacity: 1;\n    }\n    55% {\n        -webkit-transform:rotate(540deg);\n        opacity: 1;\n    }\n    75% {\n        -webkit-transform:rotate(630deg);\n        opacity: 1;\n    }\n    80% {\n        -webkit-transform:rotate(720deg);\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform:rotate(720deg);\n        opacity: 0;\n    }\n}\n\n@-moz-keyframes orbit {\n    0% {\n      -moz-transform:rotate(0deg);\n        opacity: 1;\n    }\n    5% {\n      -moz-transform:rotate(90deg);\n        opacity: 1;\n    }\n    45% {\n     -moz-transform:rotate(270deg);\n        opacity: 1;\n    }\n    55% {\n     -moz-transform:rotate(540deg);\n        opacity: 1;\n    }\n    75% {\n     -moz-transform:rotate(630deg);\n        opacity: 1;\n    }\n    80% {\n     -moz-transform:rotate(720deg);\n        opacity: 0;\n    }\n    100% {\n        -moz-transform:rotate(720deg);\n        opacity: 0;\n    }\n}\n\n@-o-keyframes orbit {\n    0% {\n        -o-transform:rotate(0deg);\n        opacity: 1;\n    }\n    5% {\n        -o-transform:rotate(90deg);\n        opacity: 1;\n    }\n    45% {\n        -o-transform:rotate(270deg);\n        opacity: 1;\n    }\n    55% {\n        -o-transform:rotate(540deg);\n        opacity: 1;\n    }\n    75% {\n        -o-transform:rotate(630deg);\n        opacity: 1;\n    }\n    80% {\n        -o-transform:rotate(720deg);\n        opacity: 0;\n    }\n    100% {\n        -o-transform:rotate(720deg);\n        opacity: 0;\n    }\n}\n        "
        ]
    })
], CircleLoaderComponent);
exports.CircleLoaderComponent = CircleLoaderComponent;
//# sourceMappingURL=circle-loader.component.js.map