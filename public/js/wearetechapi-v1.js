'use strict'

function WRTechAPI(){
    this.xhttp = null; 
    this.apiKey = "0000000000000000000000";
    this.apiCallback = function(){
        alert("Set the callback method to handle the result.");
    };
}

function getButton(anid){
    for(let i=0; i < btnStack.length; i++){
        if(btnStack[i].id == anid){
            return btnStack[i].amount;
        }
    }
    return null;
}

function verifiedPhone(phone){
    return !(typeof phone == 'undefined' || phone == null || /^[1-9][0-9]{8,}/.test(phone) == false)
}

WRTechAPI.prototype.setApiKey = function(newKey){
    this.apiKey = newKey;
    // console.log("new api key = "+ newKey);
}

WRTechAPI.prototype.setCountriesSpinner = function(countriesSpinner){
    this.countriesSpinner = countriesSpinner;
}

WRTechAPI.prototype.setErrorButton = function(errorButton){
    this.errorButton= errorButton;
    this.setErrorButtonEventListener();
}

WRTechAPI.prototype.setCountriesList = function(countriesSelectList){
    this.countriesSelectList= countriesSelectList;
    this.setCountriesChangeEventListener();
}

WRTechAPI.prototype.setPhoeOperatorsList = function(phoneOperatorsSelectList){
    this.phoneOperatorsSelectList= phoneOperatorsSelectList;
    // this.setCountriesChangeEventListener();
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

        //Verifier que l'identification du boutton
        let randNum = (Math.random()*1e32).toString(36);
        btn.dataset.wearetechkey = randNum;
        btnStack[btnStack.length] = {
            id: randNum,
            amount: btn.dataset.amount
        }
        
        // (Math.random()*1e32).toString(36)
        if(btn.dataset.wearetechbtn != 0){
            btn.addEventListener("click", function(){
                if(window.XDomainRequest){
                    WAPI.xhttp = new XDomainRequest();
                    console.log("Le navigateur prend en compte le XDoamainRequest");
                }else if(window.XMLHttpRequest){
                    WAPI.xhttp = new XMLHttpRequest();
                    console.log("Le navigateur prend en compte le XMLHttpRequest");
                }else{
                    console.log("Le navigateur prend en compte ni le XMLHttpRequest ni le XDoamainRequest");
                    return;
                }

                let amount = this.dataset.amount;
                // console.log(this.dataset.wearetechkey);
                if(typeof amount !== 'undefined'){
                    let testAmount = getButton(this.dataset.wearetechkey);
                    if(testAmount != null && testAmount == amount){
                        // let url = "http://192.168.15.117:5000/initpopup";
                        let url = "https://paiementback.herokuapp.com/initpopup";
                        WAPI.xhttp.open("POST", url, true);
                        WAPI.xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        WAPI.xhttp.send('amount='+amount);
                    }else{
                        alert('Security issues');
                        return;
                    }
                    
                }else{
                    alert("Set data-amount attribute to your button");
                    return;
                }
                
                WAPI.xhttp.onerror = function(err){
                    console.log("An error occur during the XmlHttpRequest communication");
                    console.log(err);
                }

                WAPI.xhttp.onload = function(){
                    if(this.readyState == 4 && this.status == 200){
                        //Il faut faire un controle avant d'inserer de nouveau le code suivant.
                        let result = JSON.parse(this.responseText);
                        document.body.insertAdjacentHTML('beforeend', result.box);

                        let phonOp = document.getElementById("wearetech_phone_operator");
                        if(phonOp){
                            WAPI.setPhoeOperatorsList(phonOp);
                        }

                        let errorBtn = document.getElementById("wearetech_error");
                        if(errorBtn){
                            WAPI.setErrorButton(errorBtn);
                        }

                        let successBtn = document.getElementById("wearetech_success");
                        if(successBtn){
                            WAPI.setSuccessButton(successBtn);
                        }

                        let valBtn = document.getElementById("wearetech_validate");
                        if(valBtn){
                            WAPI.setValidateButton(valBtn);
                        }

                        let cotrySpin = document.getElementById('countries_spinner');
                        if(cotrySpin){
                            WAPI.setCountriesSpinner(cotrySpin);
                        }

                        // Set the 
                        let options = "<option value='0'>Choose your country</option>";
                        for(let i = 0; i < result.countries.length; i++){
                            options += '<option value="'+result.countries[i].id+'">'+result.countries[i].name+' - ( +'+result.countries[i].code+' )'+'</option>' ;
                        }
                        let selectCountries = document.getElementById('wearetech_country_code');
                        if(selectCountries){
                            selectCountries.innerHTML = options;
                            WAPI.setCountriesList(selectCountries);
                        }
                    }
                }
            })
        }else{
            console.log("This button is not handle");
        }
    }
    // console.log(btnStack);
}

//TThis method will set the callback of the
WRTechAPI.prototype.setApiCallback = function(resolve){
    if(typeof resolve === 'function'){
        this.apiCallback = resolve;
    }
}

WRTechAPI.prototype.setValidateButtonEventListemer = function(){
    this.validateButton.addEventListener("click", function (even) {
        if(typeof io !== 'undefined'){
            let phone = document.getElementById('wearetech_phone_number').value;
            let email = document.getElementById('wearetech_client_email').value;
            let amount = document.getElementById('wearetech_transaction_amount').value;

            if(!verifiedPhone(phone)){
                let msgSpan = document.getElementById('wearetech_message');
                msgSpan.style.display = 'block';
                msgSpan.style.backgroundColor = '#EF4836';
                msgSpan.style.color = '#FFF';
            }else{

                let socket = io.connect('https://paiementback.herokuapp.com');
                // let socket = io.connect('http://192.168.15.117:5000');

                if(typeof socket !== 'undefined'){
                    let message = {phone: phone, code: 237, apikey: WAPI.apiKey, amount: amount, email: email};
                    socket.emit('wearetechapi_client_emit', message);

                    //dismiss modal view after the connect has been send
                    WAPI.waitingAction()

                    socket.on('wearetechapi_server_response', function(result) {
                        WAPI.handleResponse(result);
                        // WAPI.apiCallback(result);
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

WRTechAPI.prototype.setCountriesChangeEventListener = function(){
    this.countriesSelectList.addEventListener("change", function(){
        let val = parseInt(WAPI.countriesSelectList.value);
        if(val !== 0){
            WAPI.showCountriesSpinner();
            // je cherche les operateurs de ce pays
            if(WAPI.xhttp !== null){
                // let url = "http://192.168.15.117:5000/api/operators/"+val;
                let url = "https://paiementback.herokuapp.com/api/operators/"+val;
                WAPI.xhttp.open("GET", url, true);
                WAPI.xhttp.send(); 
                
                WAPI.xhttp.onerror = function(err){
                    console.log("An error occur during the XmlHttpRequest communication");
                    console.log(err);
                    let options = "<option value='0'>Choose phone operator</option>";
                    if(WAPI.phoneOperatorsSelectList){
                        WAPI.phoneOperatorsSelectList.innerHTML = options;
                    }
                    WAPI.hideCountriesSpinner();
                    WAPI.showPhoneOperatorList();
                }

                WAPI.xhttp.onload = function(){
                    let options = "";
                    if(this.readyState == 4 && this.status == 200){
                        //Il faut faire un controle avant d'inserer de nouveau le code suivant.
                        let result = JSON.parse(this.responseText);
                        options = "<option value='0'>Choose phone operator</option>";

                        for(let i = 0; i < result.data.length; i++){
                            options += '<option value="'+result.data[i].id+'">'+result.data[i].name+'</option>' ;
                        }
                        
                    }else{
                        options = "<option value='0'>An error occur</option>";
                    }

                    if(WAPI.phoneOperatorsSelectList){
                        WAPI.phoneOperatorsSelectList.innerHTML = options;
                    }
                    WAPI.hideCountriesSpinner();
                    WAPI.showPhoneOperatorList();
                }
            }
        }
        
    })
}

WRTechAPI.prototype.showCountriesSpinner = function(){
    this.countriesSpinner.style.display = 'inline-block';
}

WRTechAPI.prototype.hideCountriesSpinner = function(){
    this.countriesSpinner.style.display = 'none';
}

WRTechAPI.prototype.showPhoneOperatorList = function(){
    let block = document.getElementById('wearetech_phone_operator_container')
    if(block){
        block.style.display = 'block';
    }
}

WRTechAPI.prototype.hidePhoneOperatorList = function(){
    let block = document.getElementById('wearetech_phone_operator_container')
    if(block){
        block.style.display = 'none';
    }
}

WRTechAPI.prototype.loadScript = function(url, callback){
    let scrpt = document.createElement('script');
    scrpt.src = url;
    scrpt.type = 'text/javascript';
    scrpt.onload = callback();
    document.getElementsByTagName('body')[0].appendChild(scrpt);
}


WRTechAPI.prototype.handlePhoneError = function () {
    let message = document.getElementById('wearetech_message')
    if(message.style.display == 'block'){
        message.style.display = 'none';
    }
}


WRTechAPI.prototype.waitingAction = function () {
    let waiting = document.getElementById('wearetech_waiting');
    if(waiting){
        waiting.style.display = 'inline-block';
        waiting.disabled = true;
        this.validateButton.style.display = 'none';

        document.getElementById('wearetech_client_email').disabled = true;
        document.getElementById('wearetech_phone_number').disabled = true;
        document.getElementById('wearetech_country_code').disabled = true;
    }
}

WRTechAPI.prototype.handleResponse = function(result) {
    // document.getElementById('wearetech_client_email').disabled = false;
    // document.getElementById('wearetech_phone_number').disabled = false;

    let message = document.getElementById('wearetech_message');
    let waiting = document.getElementById('wearetech_waiting');
    let error = document.getElementById('wearetech_error');
    let success = document.getElementById('wearetech_success');

    console.log("Je resoit la reponse");

    if(result.error == true){
        if(result.code != CODE_WAITING){
            if(message){
                message.innerHTML = result.message;
                message.style.display = 'block';
                message.style.color = 'white';
                message.style.backgroundColor = '#EF4836';
            }
            if(error){
                error.innerHTML = "Close";
                error.style.display = 'block';
            }
        }else{
            if(result.data != null){
                //Le token a été crée et envoie au client avec succès
                WAPI.apiCallback(result.data);
            }
            if(message){
                message.innerHTML = result.message;
                message.style.display = 'block';
                message.style.backgroundColor = '#3FC380';
                message.style.color = 'white';
            }
        }
    }else{
        if(message){
            message.innerHTML = result.message;
            message.style.display = 'block';
            message.style.backgroundColor = 'lightgreen';
        }
        if(success){
            success.innerHTML = "Sucess";
            success.style.display = 'block';
        }
    }
    if(waiting && result.code != CODE_WAITING){
        waiting.style.display = 'none';
    }



}

const CODE_WAITING = 105;
const WAPI = new WRTechAPI();
const SOCKET_IO_URL = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js";
// const SOCKETIOURL = "https://cdn.socket.io/socket.io-1.4.5.js";
var btnStack = [];
WAPI.setApiButtonEventListener();

WAPI.loadScript(SOCKET_IO_URL, function(){
    console.log("Le script a été chargé avec succès.");
    // console.log(result);
})
