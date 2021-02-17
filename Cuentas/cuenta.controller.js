const cuentas= require('./cuenta.dao');

exports.getCuentas = (req,res,next)=>{
    cuentas.find({},(error,cuenta)=>{ 
        if(!cuenta) {// email no existe 
            res.status(409).send({message:'Something went wrong / No hay cuentas '}) //el usuario no existe // buena practica de programacion no enviar que el usuario no existe en el message
  
       }else{
           //responder al frondend si todo fue bien, se le devuelve las cuentas nuevoo 
            res.send(cuenta);
       }
        
    }); 
}

exports.saveCuentas=(req,res,next)=>{
    console.log('xxxx',req.body)
    //vendran en el la solicitud (req) del frontend que nos llegara para despues guardar en la BD 
    const newcuenta={ //los nombres tiene que ser igaul a los de la base de datos
        Name_cuenta: req.body.cuenta,
        Dinero: req.body.Monto,
    }   

    cuentas.create(newcuenta, (error,Ncuenta)=>{ 
        // console.log('exxxxxe',error)
      if(error && error.code===11000) return res.status(409).send('dato ya existe');  
      if(error) return res.status(500).send('server error');
        

        ///datos que regresaran al frondend una vez (las cuentas) se guardado en BD
        const datanewcuenta={
            Cuenta: Ncuenta.Cuenta,
            Monto: Ncuenta.Monto,
        }

        //responder al frondend si todo fue bien, se le devuelve el usuario nuevoo 
        res.send({datanewcuenta});
    });
}

//borrar gasto por id
exports.deleteCuentaID=(req,res,next)=>{
    console.log(req.params);
    const id= req.params.id;
   cuentas.findByIdAndDelete(id, function (err, DeleteDoc) { 
       if (err){ 
           console.log(err) 
       } 
       else{ 
           console.log("Deleted : ", DeleteDoc); 
           res.send(DeleteDoc);
       } 

   });      

}

exports.updateCuentas=(req,res,next)=>{
    const id= req.params.id;
    const Updatects={
        Name_cuenta: req.body.cuenta,
        Dinero: req.body.Monto,
    }   

    cuentas.findByIdAndUpdate(id,Updatects,function (err, updateDoc) {
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("update : ", updateDoc); 
            res.send(updateDoc);
        } 
    });
}


