'use strict'
const cors = require('cors');
const ALLRoutes= require('./Rutas/router');
const express= require('express');
const properties = require('./config/properties');
const BD= require('./config/db');
//init db
BD();

const app = express();
const router= express.Router();

//body parse
const bodyParser=require('body-parser');
const bodyParserJson=bodyParser.json();
const bodyParserURLEncoded=bodyParser.urlencoded({extended:true});

app.use(bodyParserJson);
app.use(bodyParserURLEncoded);

//cors
//aceptar las peticiones que netren al server
app.use(cors());

app.use('/api',router);
ALLRoutes(router);

router.get('/',(req,res)=>{
    res.send('hello from home')
})

app.use(router);

app.listen(properties.PORT ,()=>{
    console.log(`server running on port ${properties.PORT}`)

});