const Mreciente= require('./reciente.dao');

exports.getMovimientosRecientes = (req,res,next)=>{
    Mreciente.find({},(error,Mreciente)=>{ 
        if(!Mreciente) {// email no existe 
            res.status(409).send({message:'Something went wrong / No hay Movimientos Recientes '}) //el usuario no existe // buena practica de programacion no enviar que el usuario no existe en el message
  
       }else{
           //responder al frondend si todo fue bien, se le devuelve las cuentas nuevoo 
            res.send(Mreciente);
       }
        
    }); 
}

exports.getMovimientosRecientes_Only5 = (req,res,next)=>{
    Mreciente.find({},(error,Mreciente)=>{ 
        if(!Mreciente) {// email no existe 
            res.status(409).send({message:'Something went wrong / No hay Movimientos Recientes '}) //el usuario no existe // buena practica de programacion no enviar que el usuario no existe en el message
  
       }else{
           //responder al frondend si todo fue bien, se le devuelve las cuentas nuevoo 
            res.send(Mreciente);
       }
        
    }).limit(5).sort({_id:-1}); 
}

