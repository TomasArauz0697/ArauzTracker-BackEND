const mongooes = require('mongoose');
const dbURL= require('./properties').DB;
module.exports=()=>{
    mongooes.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
        console.log(`Mongo conectado en ${dbURL}`);
    }).catch( error => console.log(`error en la conexion ${error}`))

    process.on('SIGINT',()=>{
        mongooes.connection.close(()=>{
            console.log('Conexion cerrada');
            process.exit(0);
        })
    })
}