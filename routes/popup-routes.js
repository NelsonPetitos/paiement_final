let express = require('express');
let router = express.Router();



router.post('/', (request, response) => {
    console.log(request.body.amount);
    let amount = request.body.amount;

    let box =`
    	
	<div id="wearetech_modal" class="wearetechmodalContainer" style="height:100%;">
	    <style>
            .wearetechmodalContainer .wearetechmodal{
                display: inline-block;
                border-radius: 6px;
                width: 300px;
                padding-bottom: 16px;
                position: relative;
                background-color: #f5f5f7;
                box-shadow: 0 12px 30px 0 rgba(0, 0, 0, .5), inset 0 1px 0 0 hsla(0, 0%, 100%, .65);
                margin-left:auto;
                margin-right:auto;
                font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                line-height: 1.5;
            }
    
            .wearetechmodalContainer .wearetechmodal select{
                -webkit-appearance: none!important;
                -moz-appearance: none!important;
                -o-appearance: none!important;
                appearance: none!important;
                background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50px' height='50px'><polyline points='46.139,15.518 25.166,36.49 4.193,15.519'/></svg>") right no-repeat;
                background-color: transparent;
                /*background-transparency: ;*/
                padding-left: 35px;
                padding-right: 5px;
                height:38px;
                font-size:13px;
                background-position: right 5px top 10px;
                background-size: 12px 12px;
                border:1px solid rgba(0,0,0,0.15);
                width:100%;
                border-radius:5px;
                -webkit-border-radius:5px;
                -moz-border-radius:5px;
                -o-border-radius:5px;
    
            }
    
            .wearetechmodalContainer .wearetechmodal h1,.wearetechmodalContainer .wearetechmodal h2{
                margin: 0;
                text-align: center;
            }
            .wearetechmodalContainer .Overlay{
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                -webkit-transition-property: opacity;
                transition-property: opacity
            }
    
            .wearetechmodalContainer .Overlay-Background
            {
                background: rgba(0, 0, 0, .6);
                z-index: -1;
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
            }
    
            .wearetechmodalContainer .wearetechController{
                left: 50%;
                margin: 0 auto;
                margin-bottom: 42px;
                top: 50%;
                width: 300px;
            }
            .wearetechmodalContainer .logoImage{
                width: 64px;
                height: 64px;
                border-radius: 100%;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                -o-border-radius: 100%;
                background: #fff;
                background-position: 50% 50%;
                background-size: cover;
                display: inline-block
            }
    
            .wearetechmodalContainer .companyName{
                font-size: 17px;
                font-weight: 700;
                color: #000;
                text-shadow: 0 1px 0 #fff;
            }
            .wearetechmodalContainer .Header-purchaseDescription{
                font-size: 13px;
                font-weight: 500;
                color: #5b5b65;
                text-shadow: 0 1px 0 #fff;
                padding-bottom: 6px;
            }
    
            .wearetechmodalContainer .wearetech-button-submit{
                color:white;
                border: 1px solid rgba(46, 86, 153, .1);
                background-image: -webkit-linear-gradient(top, #44b1e8, #3098de);
                background-image: linear-gradient(-180deg, #44b1e8, #3098de);
                box-shadow: 0 1px 0 0 rgba(46, 86, 153, .15), inset 0 1px 0 0 rgba(46, 86, 153, .1), inset 0 -1px 0 0;
                padding-top:8px;
                padding-bottom:8px;
                width:100%;
                border-radius:5px;
                -webkit-border-radius:5px;
                -moz-border-radius:5px;
                -o-border-radius:5px;
            }
    
            .wearetechmodalContainer .content{
                border-top: 1px solid #fff;
                box-shadow: 0 -1px 0 0 #d2d2d3;
                border-top-left-radius: 5px;
                -webkit-border-top-left-radius: 5px;
                -moz-border-top-left-radius: 5px;
                -o-border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                -moz-border-top-right-radius: 5px;
                -o-border-top-right-radius: 5px;
                webkit-border-top-right-radius: 5px;
                width: 100%;
                height: 4px;
                background-color: #f5f5f7;
                margin-bottom: -3px
            }
    
            .wearetechmodalContainer .checkout{
                font-size: 15px;
                line-height: 21px;
                height: 37px;
                font-weight: 700;
                color: #fff;
                text-shadow: 0 -1px 0 rgba(0, 0, 0, .12);
                cursor: pointer;
                -webkit-transition: all .2s ease-in-out;
                transition: all .2s ease-in-out;
                width: 100%;
                padding: 0;
                border: 0;
            }
            .wearetechmodalContainer .checkout{
                background-image: linear-gradient(180deg, #328ac3, #277bbe);
                position: relative;
                border-radius: 4px;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                -o-border-radius: 4px;
    
                background-color: #3ea8e5;
                background-image: -webkit-linear-gradient(top, #44b1e8, #3098de);
                background-image: linear-gradient(-180deg, #44b1e8, #3098de);
                box-shadow: 0 1px 0 0 rgba(46, 86, 153, .15), inset 0 1px 0 0 rgba(46, 86, 153, .1), inset 0 -1px 0 0 rgba(46, 86, 153, .4);
            }
    
            .wearetechmodalContainer .checkout.success{
                background:#77c63e;
                position: relative;
                border-radius: 4px;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                -o-border-radius: 4px;
                box-shadow: 0 1px 0 #fff, inset 0 2px 0 rgba(41, 102, 20, .1);
                
            }
            .wearetechmodalContainer .checkout.success:after{
                border-color:rgba(41,102,20,.25);
            }
    
            .wearetechmodalContainer .checkout.error{
                background:#EF4836;
                position: relative;
                border-radius: 4px;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                -o-border-radius: 4px;
                box-shadow: 0 1px 0 #fff, inset 0 2px 0 rgba(41, 102, 20, .1);
                
            }

             .wearetechmodalContainer .checkout:active{
                background-image: linear-gradient(180deg, #328ac3, #277bbe);
            }
        </style>
	
		<span>
			<div class="Overlay">
				<div class="Overlay-Background">
				</div>
			</div>
		</span>
		<span>
			<div class="wearetechController" style="">
				<div class="wearetechmodal" style="margin-top:50px;">
					<div style="text-align:center;background:#e8e9eb;border-top-left-radius:5px;border-top-right-radius:5px;padding:10px 15px 10px 15px;">
						<div style="width:100%;text-align:center;padding-top:40px;">
							<div style="width:70px;height:70px;box-shadow: 0 0 0 1px rgba(0, 0, 0, .18), 0 2px 2px 0 rgba(0, 0, 0, .08);border: 4px solid #fff;border-radius:50%;padding-left:0px;padding:0px!important;position:absolute;top:0;left:0;display:inline-block;top:-36px;right:0px;left:0px;margin: 0 auto;background:white;">
							</div>
							<div style="width:66px;height:66px;border: 1px solid rgba(0,0,0,0.15);border-radius:50%;padding-left:0px;padding:0px!important;position:absolute;top:0;left:0;display:inline-block;top:-31px;right:0px;left:0px;margin: 0 auto;background:white;">
							</div>
							<div style="width:76px;height:76px;border-radius:50%;margin-left:auto;margin-right:auto;position:absolute;top:0;left:0;display:inline-block;top:-28px;right:0px;left:0px;margin: 0 auto;">
								<div class="logoImage" alt="Logo" style="background-image: url(https://paiementback.herokuapp.com/assets/img/logo.png);display:inline-block;vertical-align:middle;"></div>
							</div>
							<h1 class="Header-companyName">Flitpay</h1>
							<div id="wearetech_message" style="background-color: #f2dede;border-color: #ebccd1;color: #a94442;display:none">Give a valid phone number</div>
						</div>
					</div>
					<div style="background:#f5f5f5;padding:10px 30px 10px 30px;border-top:1px solid silver;border-top-left-radius:5px;border-top-right-radius:5px;">
					<input type='hidden' value="${amount}" id="wearetech_transaction_amount"/>
						<div style="margin-top:20px;">	
							<div style="background:white;height:37px;border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;-o-border-radius:5px;">
								<div style="position:relative;z-index:1;">
									<select id="wearetech_country_code">
										<option value="237" style="">Cameroun - (+237)</option>
										<option value="239">Côte d'ivoire - (+..)</option>
										<option value="241">Gabon - (...)</option>
										<option value="240">Nigéria - (...)</option>
									</select>
								</div>
								<div style="position:relative;top:-27px;margin-bottom:-30px;z-index:0;">
									<span>
										<title>Flag</title>
										<svg xmlns="http://www.w3.org/2000/svg" style="width: 17px;margin-left:6px;" focusable="false" fill="#489cfd"  viewBox="0 0 60 60" version="1.1" id="Capa_1" x="0px" y="0px">
											<path d="M44.18,20l9.668-15.47c0.193-0.309,0.203-0.697,0.027-1.015C53.698,3.197,53.363,3,53,3H8V1c0-0.553-0.447-1-1-1  S6,0.447,6,1v3v29v3v23c0,0.553,0.447,1,1,1s1-0.447,1-1V37h45c0.363,0,0.698-0.197,0.875-0.516  c0.176-0.317,0.166-0.706-0.027-1.015L44.18,20z M8,35v-2V5h43.195l-9.043,14.47c-0.203,0.324-0.203,0.736,0,1.061L51.195,35H8z"/></path>
										</svg>	
									</span>
								</div>
							</div>
						</div>
						<div style="margin-top:20px;">
							<div style="background:white;border-radius:5px;height:84px;">
								<div style="margin-bottom:0px;z-index:10;position:relative;">
									<input id="wearetech_client_email" style="width:82%;border:none;height:38px;padding-left:35px;padding-right:5px;font-size:13px;border-top-left-radius:5px;border-top-right-radius:5px;border:1px solid rgba(0,0,0,0.15);margin-bottom:0px;background:transparent;" placeholder="Email" type="email">
								</div>
								<div style="position:relative;top:-28px;margin-bottom:-35px;z-index:0;height:35px;">
									<span>
										<title>Email</title>
										<svg xmlns="http://www.w3.org/2000/svg" style="width: 35px;margin-left:6px;" focusable="false" fill="#489cfd"  viewBox="0 0 60 60" version="1.1" id="Capa_1" x="0px" y="0px">
											<path d="M25.109,21.51c-0.123,0-0.246-0.045-0.342-0.136l-5.754-5.398c-0.201-0.188-0.211-0.505-0.022-0.706    c0.189-0.203,0.504-0.212,0.707-0.022l5.754,5.398c0.201,0.188,0.211,0.505,0.022,0.706C25.375,21.457,25.243,21.51,25.109,21.51z"/>
											<path d="M5.902,21.51c-0.133,0-0.266-0.053-0.365-0.158c-0.189-0.201-0.179-0.518,0.022-0.706l5.756-5.398    c0.202-0.188,0.519-0.18,0.707,0.022c0.189,0.201,0.179,0.518-0.022,0.706l-5.756,5.398C6.148,21.465,6.025,21.51,5.902,21.51z"/>
											<path d="M28.512,26.529H2.5c-1.378,0-2.5-1.121-2.5-2.5V6.982c0-1.379,1.122-2.5,2.5-2.5h26.012c1.378,0,2.5,1.121,2.5,2.5v17.047   C31.012,25.408,29.89,26.529,28.512,26.529z M2.5,5.482c-0.827,0-1.5,0.673-1.5,1.5v17.047c0,0.827,0.673,1.5,1.5,1.5h26.012   c0.827,0,1.5-0.673,1.5-1.5V6.982c0-0.827-0.673-1.5-1.5-1.5H2.5z"/>
											<path d="M15.506,18.018c-0.665,0-1.33-0.221-1.836-0.662L0.83,6.155C0.622,5.974,0.6,5.658,0.781,5.449   c0.183-0.208,0.498-0.227,0.706-0.048l12.84,11.2c0.639,0.557,1.719,0.557,2.357,0L29.508,5.419   c0.207-0.181,0.522-0.161,0.706,0.048c0.181,0.209,0.16,0.524-0.048,0.706L17.342,17.355   C16.835,17.797,16.171,18.018,15.506,18.018z" />
										</svg>	
									</span>
								</div>
								<div style="margin-top:0px;position:relative;z-index:1;">
									<input id='wearetech_phone_number' type="tel" onfocus="WAPI.handlePhoneError()" style="width:82%;border:none;padding-left:35px;padding-right:5px;height:38px;font-size:13px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border:1px solid rgba(0,0,0,0.15);margin-top:0px;background:transparent;" placeholder="Téléphone" autofocus required>
								</div>
								<div style="position:relative;top:-28px;margin-bottom:-60px;z-index:0;height:35px;">
									<span>
										<title>Phone</title>
										<svg xmlns="http://www.w3.org/2000/svg" style="width: 40px;margin-left:6px;" focusable="false" fill="#489cfd"  viewBox="0 0 60 60" version="1.1" id="Capa_1" x="0px" y="0px">
											<path d="M19.494,0H7.948C6.843,0,5.951,0.896,5.951,1.999v23.446c0,1.102,0.892,1.997,1.997,1.997h11.546   c1.103,0,1.997-0.895,1.997-1.997V1.999C21.491,0.896,20.597,0,19.494,0z M10.872,1.214h5.7c0.144,0,0.261,0.215,0.261,0.481   s-0.117,0.482-0.261,0.482h-5.7c-0.145,0-0.26-0.216-0.26-0.482C10.612,1.429,10.727,1.214,10.872,1.214z M13.722,25.469   c-0.703,0-1.275-0.572-1.275-1.276s0.572-1.274,1.275-1.274c0.701,0,1.273,0.57,1.273,1.274S14.423,25.469,13.722,25.469z    M19.995,21.1H7.448V3.373h12.547V21.1z"/>
										</svg>	
									</span>
								</div>
							</div>
						</div>
						<div style="margin-top:20px;">

							<button style="" class="checkout paiement" id="wearetech_validate">
								Pay ${amount} CFA
							</button>

							<button style="display:none" class="checkout paiement" id="wearetech_waiting">
								<svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"></animate></rect></svg>
							</button>

							<button style="display:none" class="checkout error" id="wearetech_error">
								Une erreur est survenue
							</button>
							
							<button style="display:none" class="checkout success" id="wearetech_success">
								Paiement réussi
							</button>
						</div>
					</div>	
				</div>
			</div>
		</span>
	</div>

`

    let popup = `
        <div id='wearetech_modal' style='box-sizing: border-box; display:block;padding-top:10%;padding-left: 35%;background-color: rgba(0, 0, 0, 0.7);z-index: 9999;position: fixed;margin: 0;top: 0;left: 0;bottom: 0;right: 0;'>
			<div style='overflow:hidden;width: 400px;height:200px;border-radius:6px;background-color: #ffffff;box-shadow:0px 10px 50px rgba(0, 0, 0, 0.8);'>
				<span style='padding-top: 10px;margin:0;width:100%;height:30px;display:block;position: relative;top: 0;left: 0;right: 0;background-color: #80d6a3;color:#ffffff;text-align: center;border-top-left-radius: 6px;border-top-right-radius: 6px;'>
				    Total amount: ${amount}
                </span>
                <form style='margin:0; display: block;'>
                    <input type='hidden' value="${amount}" id="wearetech_transaction_amount"/>
                    <div style='margin:20px 30px 30px 20px; padding: 0;'>
                        <label style='display: inline-block; width: 20%; margin: 0; padding: 0; margin: 0;'>Indicatif</label>
                        <select style='display: inline; width: 75%; margin: 0; padding:0;' id="country_code">
                            <option>(+237) - Cameroun</option>
                            <option>(+237) - Gabon</option>
                            <option>(+237) - République Centrafricaine</option>
                        </select>
                    </div>
                    <div style='margin: 0; margin: 0px 30px 20px 20px; padding: 0;'>
                        <label style='display: inline-block; width: 20%; margin: 0; padding: 0; margin: 0;'>Tél : </label>
                        <input type='text' style='display: inline; width: 75%; margin: 0; padding:0;' id='wearetech_phone_number' placeholder='Numéro de téléphone' />
                    </div>
                    <div style='text-align: right; margin:0 30px 20px 0px; padding: 0;'>
                        <button type='button' id="wearetech_validate">Valider</button>
                        <button type='button' id="wearetech_closemodal">Annuler</button>
                    </div>
                </form>
			</div>
		</div>

    `

    response.end(box)


})

module.exports = router


