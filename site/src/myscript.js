// Importannnnnnnttt
// A faire securiser les liens du sites
// Disable tne links and the close button on the box

var CUR_INST = null;

const emailfilter = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;

const MODALBOX = `
<div class="flippay_login_container" id="flippay_login_box">
    <!--Login  Modal -->
    <div class="row">
        <div class="flippay_login_body col-xs-4 col-xs-offset-4" >
            <div class="login_img_container">
                <img class="login_img" src="https://paiementback.herokuapp.com/assets/img/logo.png" />
            </div>
            <div class="close_flippay_modal" id="close_flippay_modal">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="login_panel">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs"  role="tablist">
                    <li role="presentation"  class="active"><a href="#login" aria-controls="login" role="tab" data-toggle="tab">Login</a></li>
                    <li role="presentation"><a href="#signup" aria-controls="signup" role="tab" data-toggle="tab">Sign up</a></li>
                </ul>
                <div class="alert alert-danger" role="alert" style="text-align: center; padding:2%; display:none;" id="display_message" >Le message d'erreur</div>
                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane fade in active" id="login">
                        <form>
                            <div class="input-group form-group">
                                <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span> </div>
                                <input type="email" class="form-control" placeholder="Enter your email" required="required" id="login_email" />
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span> </div>
                                <input type="password" class="form-control" placeholder="Enter your password" required="required" id="login_password" />
                            </div>
                            <button class="btn btn-primary  btn-block" id="flippay_login_btn">Login</button>
                            <div class="loader_container">
                                <div class="load">
                                    <div  class="bar"></div>
                                    <div  class="bar"></div>
                                    <div  class="bar"></div>
                                </div>
                            </div>
                            <div style="color: white; margin-top: 20px;" class="">
                                <input type="checkbox" id="remenber_me_check"/> Remenber me <br/>
                                <span style="float: right; right: 5px;" ><a href="#">Forget your password ?</a></span>
                            </div>
                        </form>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="signup">
                        <form>
                            <div class="input-group form-group">
                                <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span> </div>
                                <input type="email" class="form-control" placeholder="Enter email" required="required" id="signup_email"/>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span> </div>
                                <input type="password" class="form-control" placeholder="Enter password" required="required" id="signup_password"/>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span> </div>
                                <input type="password" class="form-control" placeholder="Confirm password" required="required" id="signup_password_confirm"/>
                            </div>
                            <button class="btn btn-primary  btn-block" id="flippay_signup_btn">Sign up</button>
                            <div class="loader_container">
                                <div class="load">
                                    <div  class="bar"></div>
                                    <div  class="bar"></div>
                                    <div  class="bar"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

function WRTLock(){
    this.modalbox = null;
    this.loginbtn = null;
    this.loginemail = null;
    this.signupbtn = null;
    this.loginpwd = null;
    this.signupemail = null;
    this.signuppwd = null;
    this.signuppwdconfirm = null;
    this.closebtn = null;
    this.msgdiv = null;
    this.loaderdiv = null;
    this.loginCallback = null;
    this.remembercheck = null;
}

function initXHTTPRequest(params){
    let xhttp;
    if(window.XDomainRequest){
        xhttp = new XDomainRequest();
    }else if(window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    }else{
        alert("Le navigateur prend en compte ni le XMLHttpRequest ni le XDoamainRequest");
        return;
    }

    xhttp.open("POST", params.url, true);  
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("email="+params.email+"&password="+params.password);

    xhttp.onerror = function(err){
        handleError(err);
    }

    xhttp.onload = 
    function(){
        let result = {
            responseText: this.responseText,
            readyState: this.readyState,
            status: this.status

        }
        handleLoginResponse(result);
    }
}


function handleLoginResponse(result){
    if(CUR_INST){
        CUR_INST.disabledFields(false);
        if(result.readyState == 4 && result.status == 200){
            let data = JSON.parse(result.responseText); 
            CUR_INST.hideLoader()
            showElement(CUR_INST.loginbtn);
            showElement(CUR_INST.signupbtn);
            if(data.err === true){
                CUR_INST.displayErrorMsg(data.msg); 
            }else{
                CUR_INST.closeModal();
                if(CUR_INST.loginCallback){
                    CUR_INST.loginCallback(data.data);
                }else{
                    alert('User login but set your login callback');
                }   
            }
        }else{
            CUR_INST.hideLoader()
            showElement(CUR_INST.loginbtn);
            CUR_INST.displayErrorMsg("Response code not 200");
        }
    }else{
        alert('Api unexpected rupture.');
    }
}

function handleRegisterResponse(){

}

function handleError(err){
    console.log("An error occur during the XmlHttpRequest communication");
    console.log(err);
    if(CUR_INST){
        CUR_INST.disabledFields(false);
    }
}

function showElement(domElement){
    if(domElement){
        domElement.style.display = 'inline-block';
    }
}

function hideElement(domElement){
    if(domElement){
        domElement.style.display = 'none';
    }
}

WRTLock.prototype.disabledFields = function(decision){
    let inpts = document.getElementsByTagName('input');
    let btns = document.getElementsByTagName('button');
    let lnks = document.getElementsByTagName('a');
    let i;
    for(i = 0; i < inpts.length; i++){
        inpts[i].disabled = decision;
    }
    for(i = 0; i < btns.length; i++){
        btns[i].disabled = decision;
    }
}


WRTLock.prototype.show = function(){
    document.body.insertAdjacentHTML('beforeend', MODALBOX);
    this.initConfig();
    // console.log('Show modal');
}


WRTLock.prototype.closeModal = function(){
    if(this.modalbox){
        document.body.removeChild(this.modalbox);
    }
}

WRTLock.prototype.verifiedLogin = function(){
    let email = (this.loginemail)? this.loginemail.value : '';
    let password = (this.loginpwd)? this.loginpwd.value : '';

    if(password === '' ||  email === ''){
        return {err:true, msg: 'Required fields empties'};
    }
    if(password !== '' && emailfilter.test(email) === false){
        return {err:true, msg: 'Incorrect email format'};
    }
    return {err: false, msg: ''};
}

WRTLock.prototype.verifiedSignup = function(){
    let email = (this.signupemail)? this.signupemail.value : '';
    let password = (this.signuppwd)? this.signuppwd.value : '';
    let confirmpwd = (this.signuppwdconfirm)? this.signuppwdconfirm.value : '';

    if(password === '' ||  email === '' || confirmpwd === ''){
        return {err:true, msg: 'Required fields empties'};
    }
    if(password !== '' && confirmpwd !== '' && emailfilter.test(email) === false){
        return {err:true, msg: 'Incorrect email format'};
    }
    if(password !== '' && confirmpwd !== ''&& confirmpwd !== password){
        return {err:true, msg: 'Password dont match'};
    }
    return {err: false, msg: ''};
}


WRTLock.prototype.displayErrorMsg = function(msg){
    if(this.msgdiv){
        this.msgdiv.innerHTML = msg;
        this.msgdiv.style.display = 'block';
    }
    setTimeout(()=>{ 
        if(this.msgdiv){
            this.msgdiv.style.display = 'none';
        }
    }, 3000);
}

WRTLock.prototype.showLoader = function(){
    if(this.loaderdiv){
        let i = 0;
        for(i=0; i<this.loaderdiv.length; i++){
            this.loaderdiv[i].style.display = 'inline-block';
        }
    }
}

WRTLock.prototype.hideLoader = function(){
    if(this.loaderdiv){
        let i = 0;
        for(i=0; i<this.loaderdiv.length; i++){
            this.loaderdiv[i].style.display = 'none';
        }
    }  
}


WRTLock.prototype.initConfig = function(){
    // initialisation
    CUR_INST = this;
    this.modalbox = document.getElementById('flippay_login_box');
    this.closebtn = document.getElementById('close_flippay_modal');
    this.msgdiv = document.getElementById('display_message');
    this.loaderdiv = document.getElementsByClassName('loader_container');

    this.loginbtn = document.getElementById('flippay_login_btn');
    this.loginemail = document.getElementById('login_email');
    this.loginpwd = document.getElementById('login_password');

    this.signupbtn = document.getElementById('flippay_signup_btn');
    this.signupemail = document.getElementById('signup_email');
    this.signuppwd = document.getElementById('signup_password');
    this.signuppwdconfirm = document.getElementById('signup_password_confirm');


    // Close button  addEventListener
    if(this.closebtn){
        this.closebtn.addEventListener('click', ()=>{
            this.closeModal();
        });
    }

    //Login button addEventListener
    if(this.loginbtn){
        this.loginbtn.addEventListener('click', (e) => {
            e.preventDefault();
            let test = this.verifiedLogin();
            if(test.err === false){
                // ---------------------------------------------------------------------------------- //
                hideElement(this.loginbtn);
                hideElement(this.signupbtn);
                this.showLoader();
                this.disabledFields(true);

                let params = {
                    email: this.loginemail.value,
                    password: this.loginpwd.value,
                    url: "https://paiementback.herokuapp.com/api/users/login"
                }
                
                initXHTTPRequest(params);
                // ---------------------------------------------------------------------------------- //
            }else{
                // Aficher un alert demandant de faire les verification
                this.loginemail.classList ? this.loginemail.classList.add('error') : this.loginemail.className += ' error';
                this.displayErrorMsg(test.msg);
            }
        })
    } 

    // Sign up button addEventListener
    if(this.signupbtn){
        this.signupbtn.addEventListener('click',(e) =>{
            e.preventDefault();
            let test = this.verifiedSignup();
            if(test.err === false){
                // ---------------------------------------------------------------------------------- //
                hideElement(this.signupbtn);
                hideElement(this.loginbtn);
                this.showLoader();
                this.disabledFields(true);

                let params = {
                    email: this.signupemail.value,
                    password: this.signuppwd.value,
                    url: "https://paiementback.herokuapp.com/api/users"
                }

                initXHTTPRequest(params);
                // ---------------------------------------------------------------------------------- //
            }else{
                // Aficher un alert demandant de faire les verification
                this.loginemail.classList ? this.loginemail.classList.add('error') : this.loginemail.className += ' error';
                this.displayErrorMsg(test.msg);
            }
        })
    }
}





// -Regarder s il y a des endroit haut debit au cameroun
// -Pour une boite voire les details pour la creation dune boite
// -regarde des details technique realite virtuel 
// - prendre les infos sur Dasso scte d'aviation qui va financer Phillipe


