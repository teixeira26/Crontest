const venom = require('venom-bot');
const fs = require('fs');
const express = require('express');
var cors = require('cors')
const app = express();
const port = 3001;

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

let qr;


app.get('/', cors(corsOptions), (req, res) => {
    res.send({qr});
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})



const createVenomInstance = ()=>{
    venom
     .create(
        'sessionName',
        (base64Qr, asciiQR, attempts, urlCode) => {
          console.log(asciiQR); // Optional to log the QR in the terminal
            qr = base64Qr;
        },
        undefined,
        { logQR: false }
      )
        .then((client) => {
            start(client);
        })
        .catch((erro) => {
            console.log(erro);
        });
}

function start(client) {
  client.onMessage((message) => {
      console.log(message)

      client
        .sendText('5491151168838@c.us', 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
  });
}

createVenomInstance();
