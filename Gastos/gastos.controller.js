const gastos= require('./gastos.dao');

exports.getGastos = (req,res,next)=>{
    gastos.find({},(error,gastoss)=>{ 
        if(!gastoss) {// email no existe 
            res.status(409).send({message:'Something went wrong / No hay cuentas '}) //el usuario no existe // buena practica de programacion no enviar que el usuario no existe en el message
  
       }else{
           //responder al frondend si todo fue bien, se le devuelve las cuentas nuevoo 
            res.send(gastoss);
       }
        
    }); 
}



//crear metodo para registrar nuevos gastos
exports.NewGasto=(req,res,next)=>{
    console.log('xxxx',req.body)
    //vendran en el la solicitud (req) del frontend que nos llegara para despues guardar en la BD 
    const Newg={
        Cuenta: req.body.cuenta,
        Fecha: req.body.fecha,
        Monto: req.body.Monto,
        Descripcion:req.body.detalle,
    }   

    gastos.create(Newg, (error,Ngastos)=>{   //aqui se pasa el objeto de nuevo usuario y se agrega el error que pueda devolver  o el usario ingresado para retornar al frondend 
      // console.log('exxxxxe',error)
      if(error && error.code===11000) return res.status(409).send('dato ya existe');  
      if(error) return res.status(500).send('server error');
        

        ///datos que regresaran al frondend una vez (los gastos) se guardado en BD
        const dataNewGastos={
            Cuenta: Ngastos.Cuenta,
            Fecha: Ngastos.Fecha,
            Monto: Ngastos.Monto,
        }

        //responder al frondend si todo fue bien, se le devuelve el usuario nuevoo 
        res.send({dataNewGastos});
    }); 
}


//borrar gasto por id
exports.deletegasto=(req,res,next)=>{
    console.log(req.params);
    const id= req.params.id;
   gastos.findByIdAndDelete(id, function (err, DeleteDoc) { 
       if (err){ 
           console.log(err) 
       } 
       else{ 
           console.log("Deleted : ", DeleteDoc); 
           res.send(DeleteDoc);
       } 

   });      

}

exports.updateGastos=(req,res,next)=>{
    const id= req.params.id;
    const Updateg={
        Cuenta: req.body.cuenta,
        Fecha: req.body.fecha,
        Monto: req.body.Monto,
        Descripcion:req.body.detalle,
    }   

    gastos.findByIdAndUpdate(id,Updateg,function (err, updateDoc) {
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("update : ", updateDoc); 
            res.send(updateDoc);
        } 
    });
}
