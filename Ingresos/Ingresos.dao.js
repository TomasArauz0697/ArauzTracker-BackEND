// logica de negocio
const mongoose = require('mongoose');
const authSchema= require('./Ingresos.model');

authSchema.statics ={
    create:function(data,callback){
        const user= new this(data);
        user.save(callback);
    },
    login:function(query,callback){
        this.find(query,callback);
    } 
    
}

const authModel= mongoose.model('Ingreso',authSchema,'Ingresos');
module.exports=authModel;