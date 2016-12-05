import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div class="main-container">
            <div id="top"></div>
            <header class="site-header">
                <nav class="site-nav navbar navbar-default">
                    <div class="container">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <!-- Header Logo -->
                            <a class="header-logo load-content" href="#home">
                                <img src="assets/img/logo.png" alt="" class="logo-light">
                            </a>
                        </div>
                        <div id="navbar" class="navbar-collapse collapse navbar-right">
                            <ul class="nav navbar-nav">
                                <li routerLinkActive="active"><a routerLink="/home">Home</a></li>
                                <li routerLinkActive="active"><a >About</a></li>
                                <li routerLinkActive="active"><a >Get started</a></li>
                                <li routerLinkActive="active"><a >Docs</a></li>
                                
                                <li routerLinkActive="active"><a routerLink="login">Login</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            
            <router-outlet></router-outlet>

            
            <!-- Footer -->
            <footer class="site-footer section">
                <div class="container-fluid">
                    <!--<div class="row">-->
                        <!--<div class="col-lg-12">-->
                            <!--<div class="row">-->
                                <!--<div class="col-lg-4" >-->
                                    <!--<h2>-->
                                        <!--<i class="browser icon"></i> Guide-->
                                    <!--</h2>-->
                                    <!--<ul style="text-align: justify !important;">-->
                                        <!--<li><a >Souscription</a></li>-->
                                        <!--<li><a >Downloads the script</a></li>-->
                                        <!--<li><a >Create button</a></li>-->
                                        <!--<li><a >Implement the callback</a></li>-->
                                    <!--</ul>-->
                                <!--</div>-->
                                <!--<div class="col-lg-4">-->
                                    <!--<h2>-->
                                        <!--<i class="settings icon"></i>-->
                                        <!--API reference-->
                                    <!--</h2>-->
                                    <!--<ul style="text-align: justify !important;">-->
                                        <!--<li><a href="#">WAPI object</a></li>-->
                                        <!--<li>-->
                                            <!--<a href="#">Attributes</a>-->
                                            <!--<ul>-->
                                                <!--<li><a >apiKey</a></li>-->
                                                <!--<li><a >apiCallback</a> </li>-->
                                            <!--</ul>-->
                                        <!--</li>-->
            <!---->
                                        <!--<li>-->
                                            <!--<a >Method </a>-->
                                        <!--</li>-->
                                    <!--</ul>-->
                                <!--</div>-->
                                <!--<div class="col-lg-4">-->
                                    <!--<h2>-->
                                        <!--<i class="configure icon"></i>-->
                                        <!--Advance-->
                                    <!--</h2>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <div class="row">
                         <div class="col-md-12">
                            <p>Copyright &copy; 2016 Flitpay. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>

            <a class="backToTop scrollto" ><i class="fa fa-angle-up"></i></a>

        </div>
`
})

export class AppComponent  { }
