import { Component } from '@angular/core'

@Component({
    selector: 'bar-loader',
    template: `
<div class="load">
    <div  class="bar"></div>
    <div  class="bar"></div>
    <div  class="bar"></div>
</div>
    `,
    styles: [`
.load{
    display: inline-block;
    margin: 0;
    width: 20px; 
    height: 20px
}
.bar{
    background: #99aaca;
    border: 1px solid #96a6c9;
    float: left;
    margin-right: 3px;
    margin-top: 0px;
    width: 3px;
    height: 20px;
  
    -webkit-animation: loading 1s steps(3, end) infinite;
    -moz-animation: loading 1s steps(3, end) infinite;
    -ms-animation: loading 1s steps(3, end) infinite;
}
.load .bar:nth-child(2){-webkit-animation-delay: 0.1s;
-moz-animation-delay: 0.1s;
-ms-animation-delay: 0.1s;
-o-animation-delay: 0.1s;
animation-delay: 0.1s;}
.load .bar:nth-child(3){-webkit-animation-delay: 0.2s;
-moz-animation-delay: 0.2s;
-ms-animation-delay: 0.2s;
-o-animation-delay: 0.2s;
animation-delay: 0.2s;}
@-webkit-keyframes loading{
  0%{}
  10%{margin-top: 6px; height: 15px; border-color:#d1d8e6;background-color:#bac5db; }
  20%{  margin-top: -10px; height: 20px; border-color:#d1d7e2; background-color:#c6ccda; }
  30%{ margin-top:6px; height:15px; border-color:#d1d8e6; background-color:#bac5db;}
  40%{margin-top:8px; height:10px;}
 
}
@-moz-keyframes loading{
  0%{}
  10%{margin-top: 6px; height: 15px; border-color:#d1d8e6;background-color:#bac5db; }
  20%{  margin-top: -10px; height: 20px; border-color:#d1d7e2; background-color:#c6ccda; }
  30%{ margin-top:6px; height:15px; border-color:#d1d8e6; background-color:#bac5db;}
  40%{margin-top:8px; height:10px;}
 
}
@-ms-keyframes loading{
  0%{}
  10%{margin-top: 6px; height: 15px; border-color:#d1d8e6;background-color:#bac5db; }
  20%{  margin-top: -10px; height: 20px; border-color:#d1d7e2; background-color:#c6ccda; }
  30%{ margin-top:6px; height:15px; border-color:#d1d8e6; background-color:#bac5db;}
  40%{margin-top:8px; height:10px;}
 
}
@keyframes loading{
  0%{}
  10%{margin-top: 6px; height: 15px; border-color:#d1d8e6;background-color:#bac5db; }
  20%{  margin-top: -10px; height: 20px; border-color:#d1d7e2; background-color:#c6ccda; }
  30%{ margin-top:6px; height:15px; border-color:#d1d8e6; background-color:#bac5db;}
  40%{margin-top:8px; height:10px;}
 
}
    `]
})

export class BarLoaderComponent {}