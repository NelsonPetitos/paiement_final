'use strict'

function WRTechAPI(){
    this.apiKey = "Qw2@ivd56njks&jso9bc#cxz9-caxm-0";
    this.apiCallback = function(data){
        console.log(data);
    };
}

WRTechAPI.prototype.setApiKey = function(newKey){
    this.apiKey = newKey;
    console.log("new api key = "+ newKey);
}

WRTechAPI.prototype.setCloseButton = function(closeButton){
    this.closeButton = closeButton;
    this.setCloseButtonEventListener();
}

WRTechAPI.prototype.setValidateButton = function(validateButton){
    this.validateButton = validateButton;
    this.setValidateButtonEventListemer();
}

WRTechAPI.prototype.setApiButtonEventListener = function(){
    let btns = document.querySelectorAll('[data-wearetechbtn]');
    for(let i = 0; i < btns.length; i++){
        let btn = btns[i];
        if(btn.dataset.wearetechbtn != 0){
            btn.addEventListener("click", function(){

                // WAPI.currentButton = this;
                // let anim = document.createElement('div');
                // anim.style = "display:inline-block;border:3px solid #f3f3f3;border-top: 3px solid #3498db;border-radius:50%;width:15px;height:15px;animation:spin 2s linear infinite;margin:10px;";
                // anim.id = "wearetech-loader";
                // this.replaceWith(anim);

                var xhttp;
                if(window.XDomainRequest){
                    xhttp = new XDomainRequest();
                    console.log("Le navigateur prend en compte le XDoamainRequest");
                }else if(window.XMLHttpRequest){
                    xhttp = new XMLHttpRequest();
                    console.log("Le navigateur prend en compte le XMLHttpRequest");
                }else{
                    console.log("Le navigateur prend en compte ni le XMLHttpRequest ni le XDoamainRequest");
                    return;
                }

                let amount = this.dataset.amount;
                if(typeof amount !== 'undefined'){
                    // xhttp.open("GET", "https://paiementback.herokuapp.com/initpopup/"+amount, true);
                    xhttp.open("GET", "http://192.168.15.197:5000/initpopup/"+amount, true);
                    xhttp.send();
                }else{
                    console.log("Set data-amount attribute to your button");
                    return;
                }

                xhttp.onerror = function(err){
                    console.log("An error occur during the XmlHttpRequest communication");
                    console.log(err);
                }

                xhttp.onload = function(){
                    if(this.readyState == 4 && this.status == 200){
                        //Il faut faire un controle avant d'inserer de nouveau le code suivant.
                        document.body.insertAdjacentHTML('beforeend', this.responseText);


                        let closebtn = document.getElementById("wearetech_closemodal");
                        if(closebtn){
                            WAPI.setCloseButton(closebtn);
                        }
                        let valBtn = document.getElementById("wearetech_validate");
                        if(valBtn){
                            WAPI.setValidateButton(valBtn);
                        }
                    }
                }
            })
        }else{
            console.log("This button is not handle");
        }
    }
    // btns.forEach(function(btn){
    //
    // })
}

//TThis method will set the callback of the
WRTechAPI.prototype.setApiCallback = function(resolve){
    if(typeof resolve === 'function'){
        this.apiCallback = resolve;
    }
}

WRTechAPI.prototype.setValidateButtonEventListemer = function(){
    this.validateButton.addEventListener("click", function () {
        if(typeof io !== 'undefined'){
            // let socket = io.connect('https://paiementback.herokuapp.com');
            let socket = io.connect('http://192.168.15.197:5000');
            if(typeof socket !== 'undefined'){

                let phone = document.getElementById('wearetech_phone_number').value;
                let amount = document.getElementById('wearetech_transaction_amount').value;

                let message = {phone: phone, code: 237, apiKey: WAPI.apiKey, amount: amount};
                socket.emit('wearetechapi_client_emit', message);

                //dismiss modal view after the connect has been send
                let modaldiv = document.getElementById('wearetech_modal');
                if(modaldiv){
                    document.body.removeChild(modaldiv);
                }else{
                    console.log("there is not a block div with id='wearetech_modal'");
                }

                socket.on('wearetechapi_server_response', function(result) {
                    WAPI.apiCallback(result);
                });
            }else{
                console.log("Socket connection with wearetech server failed.");
            }
        }else{
            console.log("socket.io is not load in this application.");
        }
    });
}

WRTechAPI.prototype.setCloseButtonEventListener = function() {
    this.closeButton.addEventListener("click", function() {
        var modaldiv = document.getElementById('wearetech_modal');
        if(typeof modaldiv !== 'undefined'){
            document.body.removeChild(modaldiv);
        }else{
            console.log("there is not a block div with id='wearetech_modal'");
        }

        // remove animation
        // let anim = document.getElementById('wearetech-loader');
        // anim.replaceWith(WAPI.currentButton);
    });
}

WRTechAPI.prototype.loadScript = function(url, callback){
    let scrpt = document.createElement('script');
    scrpt.src = url;
    scrpt.type = 'text/javascript';
    scrpt.onload = callback();
    document.getElementsByTagName('body')[0].appendChild(scrpt);
}

const WAPI = new WRTechAPI();
WAPI.setApiButtonEventListener();
WAPI.loadScript('https://cdn.socket.io/socket.io-1.4.5.js', function(){
    console.log("Le script a été chargé avec succès.");
})