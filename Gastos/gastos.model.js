const mongoose= require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex',true);

const useSchema = new Schema ({
    Cuenta:{
        type:String,
        required: true,
        unique: false,
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

