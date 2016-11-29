let express = require('express');
let router = express.Router();

router.get('/:id', (request, response) => {
    console.log(request.params.id)
    console.log(request.get('origin'))
    response.end(` 
        <div id='wearetech_modal' style='box-sizing: border-box; display:block;padding-top:10%;padding-left: 35%;background-color: rgba(0, 0, 0, 0.7);z-index: 9999;position: fixed;margin: 0;top: 0;left: 0;bottom: 0;right: 0;'>
			<div style='overflow:hidden;width: 400px;height:200px;border-radius:6px;background-color: #ffffff;box-shadow:0px 10px 50px rgba(0, 0, 0, 0.8);'>
				<span style='padding-top: 10px;margin:0;width:100%;height:30px;display:block;position: relative;top: 0;left: 0;right: 0;background-color: #80d6a3;color:#ffffff;text-align: center;border-top-left-radius: 6px;border-top-right-radius: 6px;'>
				    Total amount: ${request.params.id}
                </span>
                <form style='margin:0; display: block;'>
                    <input type='hidden' value="${request.params.id}" id="wearetech_transaction_amount"/>
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
        
    `)
})

module.exports = router;