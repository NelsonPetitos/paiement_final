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

WRTechAPI.prototype.setErrorButton = function(errorButton){
    this.errorButton= errorButton;
    this.setErrorButtonEventListener();
}

WRTechAPI.prototype.setSuccessButton = function(successButton){
    this.successButton = successButton;
    this.setSuccessButtonEventListener()
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
                    // let url = "http://192.168.15.197:5000/initpopup";
                    let url = "https://paiementback.herokuapp.com/initpopup";
                    xhttp.open("POST", url, true);
                    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhttp.send('amount='+amount);
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

                        let errorBtn = document.getElementById("wearetech_error");
                        let successBtn = document.getElementById("wearetech_success");

                        if(errorBtn){
                            WAPI.setErrorButton(errorBtn);
                        }

                        if(successBtn){
                            WAPI.setSuccessButton(successBtn);
                        }

                        if(successBtn){
                            WAPI.setErrorButton(errorBtn);
                        }

                        let valBtn = document.getElementById("wearetech_validate");
                        if(valBtn){
                            WAPI.setValidateButton(valBtn);
                        }
                        let phoneInput = document.getElementById('wearetech_phone_number')
                        if(phoneInput){
                            phoneInput.addEventListener('focus', WAPI.handlePhoneError())
                            console.log('focus in place.')
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
            let phone = document.getElementById('wearetech_phone_number').value;

            let amount = document.getElementById('wearetech_transaction_amount').value;

            if(typeof phone == 'undefined' || /^[1-9][0-9]{8,}/.test(phone) == false ){
                document.getElementById('wearetech_message').style.display = 'block';
            }else{

                let socket = io.connect('https://paiementback.herokuapp.com');
                // let socket = io.connect('http://192.168.15.197:5000');

                if(typeof socket !== 'undefined'){
                    let message = {phone: phone, code: 237, apiKey: WAPI.apiKey, amount: amount};
                    socket.emit('wearetechapi_client_emit', message);

                    //dismiss modal view after the connect has been send
                    WAPI.waitingAction()

                    socket.on('wearetechapi_server_response', function(result) {
                        WAPI.handleResponse(result);
                        WAPI.apiCallback(result);
                    });
                }else{
                    console.log("Socket connection with wearetech server failed.");
                }
            }
        }else{
            console.log("socket.io is not load in this application.");
        }
    });
}

WRTechAPI.prototype.setErrorButtonEventListener = function() {
    this.errorButton.addEventListener("click", function() {
        let modaldiv = document.getElementById('wearetech_modal');
        if(modaldiv){
            document.body.removeChild(modaldiv);
        }
    });
}

WRTechAPI.prototype.setSuccessButtonEventListener = function() {
    this.successButton.addEventListener("click", function() {
        let modaldiv = document.getElementById('wearetech_modal');
        if(modaldiv){
            document.body.removeChild(modaldiv);
        }
    });
}

WRTechAPI.prototype.loadScript = function(url, callback){
    let scrpt = document.createElement('script');
    scrpt.src = url;
    scrpt.type = 'text/javascript';
    scrpt.onload = callback();
    document.getElementsByTagName('body')[0].appendChild(scrpt);
}


WRTechAPI.prototype.handlePhoneError = function () {
    console.log('focus occur');
    let message = document.getElementById('wearetech_message')
    if(message.style.display == 'block'){
        message.style.display = 'none';
    }
}


WRTechAPI.prototype.waitingAction = function () {
    let waiting = document.getElementById('wearetech_waiting');
    if(waiting){
        waiting.style.display = 'inline-block';
        this.validateButton.style.display = 'none';
    }
}

WRTechAPI.prototype.handleResponse = function(result) {
    let waiting = document.getElementById('wearetech_waiting');
    let error = document.getElementById('wearetech_error');
    let success = document.getElementById('wearetech_success');

    if(result.error == true){
        if(error){
            error.innerHTML = result.message;
            error.style.display = 'block';
        }
    }else{
        if(success){
            success.innerHTML = result.message;
            success.style.display = 'block';
        }
    }
    if(waiting){
        waiting.style.display = 'none';
    }



}

const WAPI = new WRTechAPI();
WAPI.setApiButtonEventListener();
WAPI.loadScript('https://cdn.socket.io/socket.io-1.4.5.js', function(){
    console.log("Le script a été chargé avec succès.");
})