const mongoose= require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex',true);

const useSchema = new Schema ({
    Nombre:{
        type:String,
        required: true,
        trim:true,
    },
    Apellido:{
        type:String,
        required:true,
        trim:true,
    },
    Correo:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    Contraseña:{
        type:String,
        required:true,
        trim:true,
    },
    verificacion:{
        type:String,
        required:true,
        trim:true,
    },

},{
    timestamps:true
});

module.exports=useSchema;

/** ,{
    timestamps:true
}**/
