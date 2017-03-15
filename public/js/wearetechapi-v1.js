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

function verifiedPhone(phone, country, operator){
    return !(typeof phone == 'undefined' || phone == null || typeof country == 'undefined' || country == 0 || typeof operator == 'undefined' || operator == 0 || /^[1-9][0-9]{8,}/.test(phone) == false)
}

WRTechAPI.prototype.setApiKey = function(newKey){
    this.apiKey = newKey;
}

WRTechAPI.prototype.setErrorMsgSpan = function(errorMsgSpan){
    this.errorMsgSpan = errorMsgSpan;
}

WRTechAPI.prototype.setWaitingBtn = function(waitingBtn){
    this.waitingBtn = waitingBtn;
}

WRTechAPI.prototype.setEmailInputText = function(emailInputText){
    this.emailInputText = emailInputText;
}

WRTechAPI.prototype.setModalDiv = function(modalDiv){
    this.modalDiv = modalDiv;
}

WRTechAPI.prototype.setPhoneInputText = function(phoneInputText){
    this.phoneInputText = phoneInputText;
}

WRTechAPI.prototype.setCountriesSpinner = function(countriesSpinner){
    this.countriesSpinner = countriesSpinner;
}

WRTechAPI.prototype.setErrorBtn = function(errorBtn){
    this.errorBtn= errorBtn;
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

WRTechAPI.prototype.setSuccessBtn = function(successBtn){
    this.successBtn = successBtn;
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

                        let modalDiv = document.getElementById('wearetech_modal');
                        if(modalDiv){
                            WAPI.setModalDiv(modalDiv);
                        }

                        let emailInput = document.getElementById('wearetech_client_email');
                        if(emailInput){
                            WAPI.setEmailInputText(emailInput);
                        }

                        let phoneInput = document.getElementById('wearetech_phone_number');
                        if(phoneInput){
                            WAPI.setPhoneInputText(phoneInput);
                        }

                        let phonOp = document.getElementById("wearetech_phone_operator");
                        if(phonOp){
                            WAPI.setPhoeOperatorsList(phonOp);
                        }

                        let waitingBtn = document.getElementById('wearetech_waiting');
                        if(waitingBtn){
                            WAPI.setWaitingBtn(waitingBtn);
                        }

                        let msgSpan = document.getElementById('wearetech_message');
                        if(msgSpan){
                            WAPI.setErrorMsgSpan(msgSpan)
                        }

                        let errorBtn = document.getElementById("wearetech_error");
                        if(errorBtn){
                            WAPI.setErrorBtn(errorBtn);
                        }

                        let successBtn = document.getElementById("wearetech_success");
                        if(successBtn){
                            WAPI.setSuccessBtn(successBtn);
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
            let phone, email;
            if(WAPI.emailInputText){
                email = WAPI.emailInputText.value;
            }
            if(WAPI.phoneInputText){
                phone = WAPI.phoneInputText.value;
            }
            let amount = document.getElementById('wearetech_transaction_amount').value;
            let country = WAPI.countriesSelectList.value;
            let operator = WAPI.phoneOperatorsSelectList.value;
            // let msgSpan = document.getElementById('wearetech_message');
            if(!verifiedPhone(phone, country, operator)){
                // console.log('il ya eu une erreur de validation des champs');
                if(WAPI.errorMsgSpan){
                    WAPI.errorMsgSpan.innerHTML = "Required field missing";
                    WAPI.errorMsgSpan.style.display = 'block';
                    WAPI.errorMsgSpan.style.backgroundColor = '#EF4836';
                    WAPI.errorMsgSpan.style.color = '#FFF';
                }else{
                    alert('Required field empty');
                }
            }else{
                // console.log('il n y a pas derreur de validation des champs')
                let socket = io.connect('https://paiementback.herokuapp.com');
                // let socket = io.connect('http://192.168.15.117:5000');

                if(typeof socket !== 'undefined'){
                    // console.log('Connection par socket avec le serveur reussie.'+socket.id);
                    let message = {phone: phone, country: country, operator: operator, apikey: WAPI.apiKey, amount: amount, email: email};
                    socket.emit('wearetechapi_client_emit', message);

                    //dismiss modal view after the connect has been send
                    WAPI.waitingAction()
                    if(WAPI.errorMsgSpan){
                        WAPI.errorMsgSpan.style.display = 'none';
                    }

                    socket.on('wearetechapi_server_response', function(result) {
                        WAPI.handleResponse(result);
                        // WAPI.apiCallback(result);
                    });
                }else{
                    console.log("Socket connection with wearetech server failed.");
                    return;
                }
            }
        }else{
            console.log("socket.io is not load in this application.");
            return;
        }
    });
}

WRTechAPI.prototype.setErrorButtonEventListener = function() {
    this.errorBtn.addEventListener("click", function() {
        if(WAPI.modalDiv){
            document.body.removeChild(WAPI.modalDiv);
        }
    });
}

WRTechAPI.prototype.setSuccessButtonEventListener = function() {
    this.successBtn.addEventListener("click", function() {
        if(WAPI.modalDiv){
            document.body.removeChild(WAPI.modalDiv);
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
        }else{
            WAPI.hidePhoneOperatorList();
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
    // let message = document.getElementById('wearetech_message')
    if(WAPI.errorMsgSpan.style.display == 'block'){
        WAPI.errorMsgSpan.style.display = 'none';
    }
}


WRTechAPI.prototype.waitingAction = function () {
    // let waiting = document.getElementById('wearetech_waiting');
    if(this.waitingBtn){
        this.waitingBtn.style.display = 'inline-block';
        this.waitingBtn.disabled = true;
        this.validateButton.style.display = 'none';

        if(this.emailInputText){
            this.emailInputText.disabled = true;
        }
        if(this.phoneInputText){
            this.phoneInputText.disabled = true;
        }
        // document.getElementById('wearetech_client_email').disabled = true;
        // document.getElementById('wearetech_phone_number').disabled = true;
        if(this.countriesSelectList){
            this.countriesSelectList.disabled = true;
        }
        if(this.phoneOperatorsSelectList){
            this.phoneOperatorsSelectList.disabled = true;
        }
    }
}

// WRTechAPI.prototype.removeAll = function(){
//     if(this.emailInputText){

//     }
// }

WRTechAPI.prototype.handleResponse = function(result) {
    if(result.error == true){
        if(result.code != CODE_WAITING){
            // Tâche inachevée le token doit 
            if(this.errorMsgSpan){
                this.errorMsgSpan.innerHTML = result.message;
                this.errorMsgSpan.style.display = 'block';
                this.errorMsgSpan.style.color = 'white';
                this.errorMsgSpan.style.backgroundColor = '#EF4836';
            }
            if(this.errorBtn){
                this.errorBtn.innerHTML = "Close";
                this.errorBtn.style.display = 'block';
            }
        }else{
            // une erreur c'est produite
            if(result.data != null){
                //Le token a été crée et envoie au client avec succès
                this.apiCallback(result.data);
            }
            if(this.errorMsgSpan){
                this.errorMsgSpan.innerHTML = result.message;
                this.errorMsgSpan.style.display = 'block';
                this.errorMsgSpan.style.backgroundColor = '#3FC380';
                this.errorMsgSpan.style.color = 'white';
            }
        }
    }else{
        // IL n'y a pas d'erreur appeler le callback pour lui deleguer la suite
        if(this.errorMsgSpan){
            this.errorMsgSpan.innerHTML = result.message;
            this.errorMsgSpan.style.display = 'block';
            this.errorMsgSpan.style.backgroundColor = 'lightgreen';
        }
        if(this.successBtn){
            this.successBtn.innerHTML = "Sucess";
            this.successBtn.style.display = 'block';
        }
    }
    if(this.waitingBtn && result.code != CODE_WAITING){
        this.waitingBtn.style.display = 'none';
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
