import { Component } from '@angular/core';

@Component({
    selector: 'my-loader',
    template: `
        <div class="wrapper flex-center">
            <div class="container">
                <div class="container-dot dot-a">
                    <div class="dot"></div>
                </div>

                <div class="container-dot dot-b">
                    <div class="dot"></div>
                </div>
                <div class="container-dot dot-c">
                    <div class="dot"></div>
                </div>

                <div class="container-dot dot-d">
                    <div class="dot"></div>
                </div>

                <div class="container-dot dot-e">
                    <div class="dot"></div>
                </div>

                <div class="container-dot dot-f">
                    <div class="dot"></div>
                </div>
                <div class="container-dot dot-g">
                    <div class="dot"></div>
                </div>

                <div class="container-dot dot-h">
                    <div class="dot"></div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .wrapper {
                
            }

            .flex-center {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
            }

            .container {
                width: 10em;
                height: 10em;
                position: relative;
                background: white;
                border-radius: 50%;
            }
            .container .dot {
                background: blue;
                content: "";
                border-radius: 0.5em;
                margin-top: -0.5em;
                margin-left: auto;
                margin-right: auto;
                width: 1em;
                height: 1em;
                -webkit-animation-name: bounce;
                animation-name: bounce;
                -webkit-animation-duration: 3000ms;
                animation-duration: 3000ms;
                -webkit-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
                -webkit-transition-timing-function: cubic-bezier(0, 0.99, 0, 0.1);
                transition-timing-function: cubic-bezier(0, 0.99, 0, 0.1);
            }

            .container-dot {
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
            }

            .dot-a {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            .dot-a .dot {
                -webkit-animation-delay: 0ms;
                animation-delay: 0ms;
            }

            .dot-b {
                -webkit-transform: rotate(-22.5deg);
                transform: rotate(-22.5deg);
            }
            .dot-b .dot {
                -webkit-animation-delay: -187.5ms;
                animation-delay: -187.5ms;
            }

            .dot-c {
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
            }
            .dot-c .dot {
                -webkit-animation-delay: -375ms;
                animation-delay: -375ms;
            }

            .dot-d {
                -webkit-transform: rotate(-67.5deg);
                transform: rotate(-67.5deg);
            }
            .dot-d .dot {
                -webkit-animation-delay: -562.5ms;
                animation-delay: -562.5ms;
            }

            .dot-e {
                -webkit-transform: rotate(-90deg);
                transform: rotate(-90deg);
            }
            .dot-e .dot {
                -webkit-animation-delay: -750ms;
                animation-delay: -750ms;
            }

            .dot-f {
                -webkit-transform: rotate(-112.5deg);
                transform: rotate(-112.5deg);
            }
            .dot-f .dot {
                -webkit-animation-delay: -937.5ms;
                animation-delay: -937.5ms;
            }

            .dot-g {
                -webkit-transform: rotate(-135deg);
                transform: rotate(-135deg);
            }
            .dot-g .dot {
                -webkit-animation-delay: -1125ms;
                animation-delay: -1125ms;
            }

            .dot-h {
                -webkit-transform: rotate(-157.5deg);
                transform: rotate(-157.5deg);
            }
            .dot-h .dot {
                -webkit-animation-delay: -1312.5ms;
                animation-delay: -1312.5ms;
            }

            @-webkit-keyframes bounce {
                0%, 100% {
                    -webkit-transform: translatey(0);
                    transform: translatey(0);
                }
                50% {
                    -webkit-transform: translatey(10em);
                    transform: translatey(10em);
                }
            }

            @keyframes bounce {
                0%, 100% {
                    -webkit-transform: translatey(0);
                    transform: translatey(0);
                }
                50% {
                    -webkit-transform: translatey(10em);
                    transform: translatey(10em);
                }
            }
        `
    ]
})
export class LoaderComponent {}