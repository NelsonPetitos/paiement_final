'use strict'

function WRTechAPI(){
    this.socket = null
    this.xhttp = null; 
    this.apiKey = null;
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

function verifiedReference(reference){
    return (reference !== "");
}

//TThis method will set the callback of the
WRTechAPI.prototype.setApiCallback = function(resolve){
    if(typeof resolve === 'function'){
        this.apiCallback = resolve;
    }
}

WRTechAPI.prototype.setApiKey = function(newKey){
    this.apiKey = newKey;
}

WRTechAPI.prototype.setMomoMsgSpan = function(momoMsgSpan){
    this.momoMsgSpan = momoMsgSpan;
}

WRTechAPI.prototype.setErrorMsgSpan = function(errorMsgSpan){
    this.errorMsgSpan = errorMsgSpan;
}

WRTechAPI.prototype.setValidateReferenceBtn = function(validateReferenceBtn){
    this.validateReferenceBtn = validateReferenceBtn;
    this.setValidateReferenceBtnEventListener();
}

WRTechAPI.prototype.setCancelReferenceBtn = function(cancelReferenceBtn){
    this.cancelReferenceBtn = cancelReferenceBtn;
    this.setCancelReferenceBtnEventListener();
}

WRTechAPI.prototype.setWaitingBtn = function(waitingBtn){
    this.waitingBtn = waitingBtn;
}

WRTechAPI.prototype.setEmailInputText = function(emailInputText){
    this.emailInputText = emailInputText;
}

WRTechAPI.prototype.setReferenceInputText = function(referenceInputText){
    this.referenceInputText = referenceInputText;
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

WRTechAPI.prototype.setValidateBtn = function(validateBtn){
    this.validateBtn = validateBtn;
    this.setValidateButtonEventListemer();
}

WRTechAPI.prototype.setBlockOne = function(blockOne){
    this.blockOne = blockOne;
}

WRTechAPI.prototype.setBlockTwo = function(blockTwo){
    this.blockTwo = blockTwo;
}

WRTechAPI.prototype.setBlockThree = function(blockThree){
    this.blockThree = blockThree;
}

WRTechAPI.prototype.setBlockFour = function(blockFour){
    this.blockFour = blockFour;
}

WRTechAPI.prototype.setBlockFive = function(blockFive){
    this.blockFive = blockFive;
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
                        // let url = "http://localhost:5000/initpopup";
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
                        //Check and set box elements.
                        let result = JSON.parse(this.responseText);
                        document.body.insertAdjacentHTML('beforeend', result.box);

                        let blockOne = document.getElementById('wearetech_block_one');
                        if(blockOne){
                           WAPI.setBlockOne(blockOne);
                        }

                        let blockTwo = document.getElementById('wearetech_block_two');
                        if(blockTwo){
                           WAPI.setBlockTwo(blockTwo);
                        }

                        let blockThree = document.getElementById('wearetech_block_three');
                        if(blockThree){
                           WAPI.setBlockThree(blockThree);
                        }

                        let blockFour = document.getElementById('wearetech_block_four');
                        if(blockFour){
                           WAPI.setBlockFour(blockFour);
                        }

                        let blockFive = document.getElementById('wearetech_block_five');
                        if(blockFive){
                           WAPI.setBlockFive(blockFive);
                        }

                        let momoMsg = document.getElementById('wearetech_momo_message');
                        if(momoMsg){
                            WAPI.setMomoMsgSpan(momoMsg);
                        }

                        let valRefBtn = document.getElementById('wearetech_validate_reference');
                        if(valRefBtn){
                            WAPI.setValidateReferenceBtn(valRefBtn);
                        }

                        let cancelRefBtn = document.getElementById('wearetech_cancelled_reference');
                        if(cancelRefBtn){
                            WAPI.setCancelReferenceBtn(cancelRefBtn);
                        }

                        let refInput = document.getElementById('wearetech_reference_number');
                        if(refInput){
                            WAPI.setReferenceInputText(refInput);
                        }

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
                            WAPI.setValidateBtn(valBtn);
                        }

                        let cotrySpin = document.getElementById('countries_spinner');
                        if(cotrySpin){
                            WAPI.setCountriesSpinner(cotrySpin);
                        }

                        // Set the 
                        let options = "<option value='0'>Choose your country</option>";
                        for(let i = 0; i < result.countries.length; i++){
                            options += '<option value="'+result.countries[i].id+'-'+result.countries[i].code+'">'+result.countries[i].name+' - ( +'+result.countries[i].code+' )'+'</option>' ;
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

WRTechAPI.prototype.setValidateButtonEventListemer = function(){
    this.validateBtn.addEventListener("click", function (even) {
        if(typeof io !== 'undefined'){
            let phone, email;
            if(WAPI.emailInputText){
                email = WAPI.emailInputText.value;
            }
            if(WAPI.phoneInputText){
                phone = WAPI.phoneInputText.value;
            }
            let amount = document.getElementById('wearetech_transaction_amount').value;
            let ctryselect = WAPI.countriesSelectList.value.split("-");
            let country = ctryselect[0];
            let code = ctryselect[1];
            let operator = WAPI.phoneOperatorsSelectList.value;
            // let msgSpan = document.getElementById('wearetech_message');
            if(!verifiedPhone(phone, country, operator)){
                // console.log('il ya eu une erreur de validation des champs');
                if(WAPI.errorMsgSpan){
                    WAPI.errorMsgSpan.innerHTML = "Phone operator or number missing";
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
                    WAPI.socket = socket;
                    // console.log('Connection par socket avec le serveur reussie.'+socket.id);
                    let message = {phone: phone, country: country, code: code,operator: operator, apikey: WAPI.apiKey, amount: amount, email: email, isweb: true};
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

WRTechAPI.prototype.setValidateReferenceBtnEventListener = function() {
    this.validateReferenceBtn.addEventListener("click", function() {
        console.log('Valider la reference')
        console.log(this.value);
        let token = this.value;
        if(WAPI.referenceInputText){
            let reference = WAPI.referenceInputText.value;
            console.log('reference : '+reference);
            if(verifiedReference(reference)){
                if(WAPI.socket){
                    WAPI.waitingAction();
                    let message = {reference: reference, token: token, isweb: false};
                    WAPI.socket.emit('wearetechapi_client_emit', message);
                }else{
                    alert('Socket close.');
                }
            }else{
                if(WAPI.errorMsgSpan){
                    WAPI.errorMsgSpan.innerHTML = "Required reference";
                    WAPI.errorMsgSpan.style.display = 'block';
                    WAPI.errorMsgSpan.style.backgroundColor = '#EF4836';
                    WAPI.errorMsgSpan.style.color = '#FFF';
                }else{
                    alert('Required reference. You edit the source page.');
                }
            }
        }else{
            alert('You edit the page source.');
        }
    });
}

WRTechAPI.prototype.setCancelReferenceBtnEventListener = function() {
    this.cancelReferenceBtn.addEventListener("click", function() {
        WAPI.closeModal();
    });
}

WRTechAPI.prototype.setErrorButtonEventListener = function() {
    this.errorBtn.addEventListener("click", function() {
        WAPI.closeModal();
    });
}

WRTechAPI.prototype.setSuccessButtonEventListener = function() {
    this.successBtn.addEventListener("click", function() {
        WAPI.closeModal();
    });
}

WRTechAPI.prototype.setCountriesChangeEventListener = function(){
    this.countriesSelectList.addEventListener("change", function(){
        let val = parseInt(WAPI.countriesSelectList.value.split("-")[0]);
        if(val !== 0){
            // val = val.split("-")[0]
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


WRTechAPI.prototype.displayErrorMessage = function(message, err){
    if(this.errorMsgSpan){
        this.errorMsgSpan.innerHTML = message;
        this.errorMsgSpan.style.display = 'block';
        this.errorMsgSpan.style.color = 'white';

        if(err){
            this.errorMsgSpan.style.backgroundColor = '#EF4836';
        }else{
            this.errorMsgSpan.style.backgroundColor = '#3FC380';
        }
    }
}


WRTechAPI.prototype.waitingAction = function () {
    // let waiting = document.getElementById('wearetech_waiting');
    if(this.waitingBtn){
        this.waitingBtn.style.display = 'inline-block';
        // this.waitingBtn.disabled = true;
    }
    if(this.validateBtn){
        this.validateBtn.style.display = 'none';
    }
    if(this.validateReferenceBtn){
        this.validateReferenceBtn.style.display = 'none';
    }
    if(this.cancelReferenceBtn){
        this.cancelReferenceBtn.style.display = 'none';
    }
    if(this.emailInputText){
        this.emailInputText.disabled = true;
    }
    if(this.phoneInputText){
        this.phoneInputText.disabled = true;
    }
    if(this.countriesSelectList){
        this.countriesSelectList.disabled = true;
    }
    if(this.phoneOperatorsSelectList){
        this.phoneOperatorsSelectList.disabled = true;
    }
    if(this.referenceInputText){
        this.referenceInputText.disabled = true;
    }
}

WRTechAPI.prototype.removeBlockOne = function(){
    if(this.blockOne){
        this.blockOne.parentNode.removeChild(this.blockOne);
        this.setBlockOne(null);
        // console.log('remove block one');
    }
}

WRTechAPI.prototype.removeBlockTwo = function(){
    if(this.blockTwo){
        this.blockTwo.parentNode.removeChild(this.blockTwo);
        this.setBlockTwo(null);
        // console.log('remove block two');
    }
}

WRTechAPI.prototype.removeBlockThree = function(){
    if(this.blockThree){
        this.blockThree.parentNode.removeChild(this.blockThree);
        this.setBlockThree(null);
        // console.log('remove block three');
    }
}

WRTechAPI.prototype.removeBlockFour = function(){
    if(this.blockFour){
        this.blockFour.parentNode.removeChild(this.blockFour);
        this.setBlockFour(null);
    }
}

WRTechAPI.prototype.removeBlockFive = function(){
    if(this.blockFive){
        this.blockFive.parentNode.removeChild(this.blockFive);
        this.setBlockFive(null);
    }
}

WRTechAPI.prototype.closeModal = function(){
    if(this.modalDiv){
        this.modalDiv.parentNode.removeChild(this.modalDiv);
        this.setModalDiv(null);
    }
    if(this.socket){
        this.socket.disconnect();
        this.socket = null;
        console.log('Close the socket');
    }
}



WRTechAPI.prototype.handleResponse = function(result){
    this.removeBlockOne();
    this.removeBlockTwo();
    this.removeBlockThree();
    if(result.error == true){
        switch (parseInt(result.code)) {
            case CODE_WAITING:
                if(result.data != null){
                    //Le token a été crée et envoie au client avec succès
                    this.apiCallback(result.data);
                }
                this.displayErrorMessage(result.message, false);
                break;

            case 401:
                this.displayErrorMessage(result.message, true);
                if(this.waitingBtn){
                    this.waitingBtn.style.display = 'none';
                }
                if(this.referenceInputText){
                    this.referenceInputText.disabled = false;
                }
                if(this.validateReferenceBtn){
                    this.validateReferenceBtn.style.display = 'inline-block';
                }
                if(this.cancelReferenceBtn){
                    this.cancelReferenceBtn.style.display = 'inline-block';
                }
                break;

            case 402: 
                this.displayErrorMessage(result.message, true);
                if(this.waitingBtn){
                    this.waitingBtn.style.display = 'none';
                }
                if(this.referenceInputText){
                    this.referenceInputText.disabled = false;
                }
                if(this.errorBtn){
                    this.errorBtn.innerHTML = "Close";
                    this.errorBtn.style.display = 'block';
                }
                break;

            case MESSAGE_CODE:
                if(this.validateReferenceBtn){
                    this.validateReferenceBtn.style.display = 'inline-block';
                }
                if(this.cancelReferenceBtn){
                    this.cancelReferenceBtn.style.display = 'inline-block';
                }
                if(this.referenceInputText){
                    this.referenceInputText.disabled = false;
                }
                if(this.errorMsgSpan){
                    this.errorMsgSpan.style.display = 'none';
                }
                if(this.blockFour){
                    this.blockFour.style.display = 'block';
                }
                if(this.momoMsgSpan){
                    this.momoMsgSpan.innerHTML = result.message;
                }
                if(result.data != null && this.validateReferenceBtn){
                    this.validateReferenceBtn.value = result.data.token;
                }
                break;

            default:
                // une erreur c'est produite on affice le message et le bouton de fermeture
                this.displayErrorMessage(result.message, true);
                if(this.errorBtn){
                    this.errorBtn.innerHTML = "Fermer";
                    this.errorBtn.style.display = 'block';
                }
                break;
        }
    }else{
        // IL n'y a pas d'erreur appeler le callback pour lui deleguer la suite
        this.displayErrorMessage(result.message, false);
        if(this.successBtn){
            this.successBtn.innerHTML = "Sucess";
            this.successBtn.style.display = 'block';
        }
    }
    // On cache le spinner dans le cas où on n'attends plus
    if(this.waitingBtn && result.code != CODE_WAITING){
        // console.log('annuler le loader le code est '+result.code)
        this.waitingBtn.style.display = 'none';
    }
}

const CODE_WAITING = 105;
const MESSAGE_CODE = 106;
const WAPI = new WRTechAPI();
const SOCKET_IO_URL = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js";
// const SOCKETIOURL = "https://cdn.socket.io/socket.io-1.4.5.js";
var btnStack = [];
WAPI.setApiButtonEventListener();

WAPI.loadScript(SOCKET_IO_URL, function(){
    console.log("Le script a été chargé avec succès.");
    // console.log(result);
})
