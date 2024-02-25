const mongoose= require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex',true);

const useSchema = new Schema ({
    Cuenta:{
        type:String,
<<<<<<< HEAD
        unique: false,
=======
        unique:false,
>>>>>>> c77f820b2144d54830b02f683451b06b1c288a65
        required: true,
        trim:true,
    },
    Fecha:{
        type:String,
        required: true,
        trim:true,
    },
    Monto:{
        type:String,
        required:true,
        trim:true,
    },
    Descripcion:{
        type:String,
        required:true,
        trim:true,
    },

},{
    timestamps:false,
    versionKey: false
});

module.exports=useSchema;

