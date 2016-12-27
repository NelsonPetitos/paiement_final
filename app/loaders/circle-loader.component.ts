import { Component } from '@angular/core';

@Component({
    selector: 'circle-loader',
    template: `
<div class="wrap clearfix">
  <section class="clearfix">
    <ul class="rotate_wrapper">
      <li class="rotate_item"><span></span></li>
      <li class="rotate_item delay1"><span></span></li>
      <li class="rotate_item delay2"><span></span></li>
      <li class="rotate_item delay3"><span></span></li>
      <li class="rotate_item delay4"><span></span></li>
    </ul>
  </section>
</div>
    `,
    styles: [
        `
div.wrap {
    display: inline-block;
}

section {
    display: inline-block;
    height: 50px;
    width: 50px
    margin: 0;
    position: relative;
}

ul.rotate_wrapper {
    position: relative;
    width: 50px;
    height: 50px;
    list-style: none;
}

ul.rotate_wrapper li.rotate_item {
    width: 100%;
    height: 100%;
    border-radius: 52px;
    -webkit-border-radius: 52px;
    -moz-border-radius: 52px;
    -o-border-radius: 52px;
    top: 0;
    left: 0;
    z-index: 99;
    text-indent: -9999px;
    display: block;
    position: absolute;
    border: none;
}
ul.rotate_wrapper li.rotate_item span {
    background: #000000;
    bottom: 0px;
    left: 50%;
    margin-left: -2px;
    display: block;
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -o-border-radius: 2px;
}

/* CSS3 Animations */
ul.rotate_wrapper li.rotate_item {
    animation-iteration-count:infinite;
    animation-timing-function:linear;
    animation-name:orbit;

    -webkit-animation-iteration-count:infinite;
    -webkit-animation-timing-function:linear;
    -webkit-animation-name:orbit;
    
    -moz-animation-iteration-count:infinite;
    -moz-animation-timing-function:linear;
    -moz-animation-name:orbit;

    -o-animation-iteration-count:infinite;
    -o-animation-timing-function:linear;
    -o-animation-name:orbit;
}

ul.rotate_wrapper li.rotate_item {
    animation-duration:4s;
    -webkit-animation-duration:4s;
    -moz-animation-duration:4s;
    -o-animation-duration:4s;
}

.delay1 {
    animation-delay:0.2s;
    -moz-animation-delay:0.2s; /* Firefox */
    -webkit-animation-delay:0.2s; /* Safari and Chrome */
    -o-animation-delay:0.2s; /* Opera */
}

.delay2 {
    animation-delay:0.4s;
    -moz-animation-delay:0.4s; /* Firefox */
    -webkit-animation-delay:0.4s; /* Safari and Chrome */
    -o-animation-delay:0.4s; /* Opera */
}

.delay3 {
    animation-delay:0.6s;
    -moz-animation-delay:0.6s; /* Firefox */
    -webkit-animation-delay:0.6s; /* Safari and Chrome */
    -o-animation-delay:0.6s; /* Opera */
}

.delay4 {
    animation-delay:0.8s;
    -moz-animation-delay:0.8s; /* Firefox */
    -webkit-animation-delay:0.8s; /* Safari and Chrome */
    -o-animation-delay:0.8s; /* Opera */
}

@keyframes orbit {
    0% {
        transform:rotate(0deg);
        opacity: 1;
    }
    5% {
        transform:rotate(90deg);
        opacity: 1;
    }
    45% {
        transform:rotate(270deg);
        opacity: 1;
    }
    55% {
        transform:rotate(540deg);
        opacity: 1;
    }
    75% {
        transform:rotate(630deg);
        opacity: 1;
    }
    80% {
        transform:rotate(720deg);
        opacity: 0;
    }
    100% {
        transform:rotate(720deg);
        opacity: 0;
    }
}

@-webkit-keyframes orbit {
    0% {
        -webkit-transform:rotate(0deg);
        opacity: 1;
    }
    5% {
        -webkit-transform:rotate(90deg);
        opacity: 1;
    }
    45% {
        -webkit-transform:rotate(270deg);
        opacity: 1;
    }
    55% {
        -webkit-transform:rotate(540deg);
        opacity: 1;
    }
    75% {
        -webkit-transform:rotate(630deg);
        opacity: 1;
    }
    80% {
        -webkit-transform:rotate(720deg);
        opacity: 0;
    }
    100% {
        -webkit-transform:rotate(720deg);
        opacity: 0;
    }
}

@-moz-keyframes orbit {
    0% {
      -moz-transform:rotate(0deg);
        opacity: 1;
    }
    5% {
      -moz-transform:rotate(90deg);
        opacity: 1;
    }
    45% {
     -moz-transform:rotate(270deg);
        opacity: 1;
    }
    55% {
     -moz-transform:rotate(540deg);
        opacity: 1;
    }
    75% {
     -moz-transform:rotate(630deg);
        opacity: 1;
    }
    80% {
     -moz-transform:rotate(720deg);
        opacity: 0;
    }
    100% {
        -moz-transform:rotate(720deg);
        opacity: 0;
    }
}

@-o-keyframes orbit {
    0% {
        -o-transform:rotate(0deg);
        opacity: 1;
    }
    5% {
        -o-transform:rotate(90deg);
        opacity: 1;
    }
    45% {
        -o-transform:rotate(270deg);
        opacity: 1;
    }
    55% {
        -o-transform:rotate(540deg);
        opacity: 1;
    }
    75% {
        -o-transform:rotate(630deg);
        opacity: 1;
    }
    80% {
        -o-transform:rotate(720deg);
        opacity: 0;
    }
    100% {
        -o-transform:rotate(720deg);
        opacity: 0;
    }
}
        `
    ]
})
export class CircleLoaderComponent {}