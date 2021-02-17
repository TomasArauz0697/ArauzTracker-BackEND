const mongoose= require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex',true);

const useSchema = new Schema ({
    Name_cuenta:{
        type:String,
        required: true,
        unique:true,
        trim:true,
    },
    Dinero:{
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
