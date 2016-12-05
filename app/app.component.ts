import { Component } from '@angular/core';
import {Routes} from "@angular/router";



@Component({
    selector: 'my-app',
    template: `
        <!--<nav class="navbar navbar-default">-->
          <!--<div class="container-fluid">-->
            <!--<div class="navbar-header">-->
              <!--<a class="navbar-brand" href="#">-->
                <!--<img alt="Brand" src="">-->
              <!--</a>-->
            <!--</div>-->
            <!--<div class="container">-->
                <!--<ul class="nav navbar-nav">-->
                    <!--<li> <a routerLink="/home" routerLinkActive="active">Home</a></li> -->
                    <!--<li> <a routerLink="/about" routerLinkActive="active">About</a></li>-->
                    <!--<li> <a routerLink="/get-started" routerLinkActive="active">Get started</a></li>-->
                    <!--<li> <a routerLink="/docs" routerLinkActive="active">Docs</a></li>-->
                    <!--<li> <a routerLink="/account" routerLinkActive="active">Account</a></li>-->
                <!--</ul>-->
            <!--</div>-->
          <!--</div>-->
        <!--</nav>-->
        
        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav">
                        <!-- Hidden li included to remove active class from about link when scrolled up past about section -->
                        <li class="hidden">
                            <a class="page-scroll" href="#page-top"></a>
                        </li>
                        <li>
                            <a class="page-scroll" routerLink="/home" routerLinkActive="active">Home</a>
                        </li><li>
                            <a class="page-scroll" routerLink="/about" routerLinkActive="active">About</a>
                        </li>
                        <li>
                            <a class="page-scroll" routerLink="/getstarted" routerLinkActive="active">Get started</a>
                        </li>
                        <li>
                            <a class="page-scroll" routerLink="/docs" routerLinkActive="active">Docs</a>
                        </li>
                        <li>
                            <a routerLink="/account" routerLinkActive="active">Account</a>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container -->
        </nav>

        <router-outlet></router-outlet>
`
})

export class AppComponent  { }
