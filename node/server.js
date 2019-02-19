const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const {promisify} = require('util');
const fs = require('fs');
const port = 17123;

// htmlのreturn
app.get('/' , (req, res) => {
  res.sendFile('./index.html');
});

app.route('/lux')
    
   // luxデータ取得
   .get(async (req, res) => {
     const lux = await promisify(fs.readFile)
                                ('./sensorData.csv', {encoding : 'utf8'}) 
                                .then(fileData => fileData.split(",")[1])
                                .catch(err => res.send(err));
     res.send(lux);
   })
   
   // luxデータ書き込み(上書き)
   .put(async (req, res) => {
     res.setHeader('Content-Type', 'text/plain');
     const id = req.body.id;
     const lux = req.body.lux;
     promisify(fs.writeFile)
              ('./sensorData.csv', id + "," + lux, 'utf-8')
              .then(() => res.send("succeeded to write file"))
              .catch(err => {
         console.log(err);
         res.send("failed to write file");
       });
    });

app.listen(port);
