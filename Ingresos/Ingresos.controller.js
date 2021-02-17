const Ingresos= require('./Ingresos.dao');

exports.getIngresos = (req,res,next)=>{
    Ingresos.find({},(error,ingresos)=>{ 
        if(!ingresos) {// email no existe 
            res.status(409).send({message:'Something went wrong / No hay cuentas '}) //el usuario no existe // buena practica de programacion no enviar que el usuario no existe en el message
  
       }else{
           //responder al frondend si todo fue bien, se le devuelve las cuentas nuevoo 
            res.send(ingresos);
       }
        
    }); 
}


//crear metodo para registrar nuevos gastos
exports.NewIngreso=(req,res,next)=>{
    console.log('xxxx',req.body)
    //vendran en el la solicitud (req) del frontend que nos llegara para despues guardar en la BD 
    const Newingre={
        Cuenta: req.body.cuenta,
        Fecha: req.body.fecha,
        Monto: req.body.Monto,
        Descripcion:req.body.detalle,
    }   

    Ingresos.create(Newingre, (error,Ningreso)=>{   //aqui se pasa el objeto de nuevo usuario y se agrega el error que pueda devolver  o el usario ingresado para retornar al frondend 
      // console.log('exxxxxe',error)
      if(error && error.code===11000) return res.status(409).send('dato ya existe');  
      if(error) return res.status(500).send('server error');
        

        ///datos que regresaran al frondend una vez (los gastos) se guardado en BD
        const dataNewIngreso={
            Cuenta: Ningreso.Cuenta,
            Fecha: Ningreso.Fecha,
            Monto: Ningreso.Monto,
        }

        //responder al frondend si todo fue bien, se le devuelve el usuario nuevoo 
        res.send({dataNewIngreso});
    }); 
}



//borrar ingresos xid
exports.deleteIngresos=(req,res,next)=>{
    console.log(req.params);
    const id= req.params.id;
   Ingresos.findByIdAndDelete(id, function (err, DeleteDoc) { 
       if (err){ 
           console.log(err) 
       } 
       else{ 
           console.log("Deleted : ", DeleteDoc); 
           res.send(DeleteDoc);
       } 

   });      

}


exports.updateIngresos=(req,res,next)=>{
    const id= req.params.id;
    const UpdateI={
        Cuenta: req.body.cuenta,
        Fecha: req.body.fecha,
        Monto: req.body.Monto,
        Descripcion:req.body.detalle,
    }
    Ingresos.findByIdAndUpdate(id,UpdateI,function(err,updateDoc){
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("update : ", updateDoc); 
            res.send(updateDoc);
        } 

    });
}
