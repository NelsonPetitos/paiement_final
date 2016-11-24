'use strict'
let listSocket = new Set();
let express = require('express')
let http = require('http')
let app = express()
let server = http.createServer(app)
let io = require('socket.io')(server);

//Set ejs as the templates engine
app.set('view engine', 'ejs')


//Middleware pour gerer les requetes ajaxs (de type XMLHttpRequest ou XDomainRequest
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.get('origin'));
    res.header("Access-Control-Allow-Credentials", true)
    next();
});
//Middleware
app.use('/assets', express.static(__dirname+'/public'))

app.get('/', (request, response) => {
    console.log(`new request on the home page url`)
    response.render('index', {title: "home page"})
})

app.get('/initpopup/:id', (request, response) => {
    console.log(request.params.id)
    console.log(request.get('origin'))
    response.end(` 
        <div id='wearetech_modal' style='box-sizing: border-box; display:block;padding-top:10%;padding-left: 35%;background-color: rgba(0, 0, 0, 0.7);z-index: 9999;position: fixed;margin: 0;top: 0;left: 0;bottom: 0;right: 0;'>
			<div style='overflow:hidden;width: 400px;height:200px;border-radius:6px;background-color: #ffffff;box-shadow:0px 10px 50px rgba(0, 0, 0, 0.8);'>
				<span style='padding-top: 10px;margin:0;width:100%;height:30px;display:block;position: relative;top: 0;left: 0;right: 0;background-color: #80d6a3;color:#ffffff;text-align: center;border-top-left-radius: 6px;border-top-right-radius: 6px;'>
				    Total amount: ${request.params.id}
                </span>
                <form style='margin:0; display: block;'>
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

//need to be improve to handle client paiement request
io.on('connection', (socket) => {
    listSocket.add(socket);
    console.log(`connection to socket.io identifier: ${socket.id}`)

    //All to do if socket it's not the server
    socket.on('wearetechapi_client_emit', (data) => {
        console.log(data)
        //Send my number to the Mobile server and wait for the validation
        let message = {
            phone: data.phone,
            socket: socket.id
        }
        io.emit('message', message);
        // socket.emit('wearetechapi_server_response', {reslt: "happy day"})
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnect to the socket.')
        listSocket.delete(this)
    })
})

io.on('message', (data)=>{
    listSocket.forEach((socket) =>{
        if(socket.id == data.socket){
            socket.emit('wearetechapi_server_response', {reslt: "happy day"})
        }
    })
})

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
})