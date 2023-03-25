const fs = require('fs');
const express = require('express');
var cors = require('cors')
const app = express();
const port = 3001;


  const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.get('/', cors(corsOptions), (req, res) => {

    const client = new Client();

    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.initialize();

    client.on('message', message => {
	console.log(message.body);
});
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})



