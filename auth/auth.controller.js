const User= require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SecretKey= 'arauz2000';

//crear metodo para crear los usuarios
exports.createUser=(req,res,next)=>{
    console.log('xxxx',req.body)
    //vendran en el la solicitud (req) del frontend que nos llegara para despues guardar en la BD 
    const NewUser={
        name: req.body.name,
        email: req.body.email,
        //password: req.body.password,
        password: bcrypt.hashSync(req.body.password), //incriptar password 
    }   

    User.create(NewUser, (error,usuario)=>{   //aqui se pasa el objeto de nuevo usuario y se agrega el error que pueda devolver  o el usario ingresado para retornar al frondend 
      // console.log('exxxxxe',error)
      if(error && error.code===11000) return res.status(409).send('email ya existe');  

        if(error) return res.status(500).send('server error');
        const expiresIn = 20*60*60; 
      
        const accessToken =jwt.sign({id:usuario.id},
            SecretKey,{
                expiresIn:expiresIn
            
        });

        ///datos que regresaran al frondend una vez (usuario) se guardado en BD // si enviamos usuario entonces la pass iria de un lado para el otro de forma innecesaria
        const dataUsuarios={
            name: usuario.name,
            email: usuario.email,
            accessToken: accessToken,
            expiresIn: expiresIn,
        }

        //responder al frondend si todo fue bien, se le devuelve el usuario nuevoo 
        res.send({dataUsuarios});
    }); 
}

//crear el metodo de login 

exports.loginUser=(req,res,next)=>{
    console.log('login',req.body) ;
 //datos de login que viene desde el frondend que  se almacenaran en la variable userdata
 const userdata={
     email:req.body.email,
     password:req.body.password,
 }

 // una vez que los datos llegaron entonces tenemos que verificar en la BD haber si ese usuario esta o no.
 User.findOne({email:userdata.email}, (error,usuario)=>{  //a modo de promesa devolvera un error o que el dato si existe 

     if(error) return res.status(500).send('Server error! Servidor'); // error 500  // error del servidor
     if(!usuario) {// email no existe 
          res.status(409).send({message:'Something went wrong / usuario No existe '}) //el usuario no existe // buena practica de programacion no enviar que el usuario no existe en el message

     }else{
         // si el usuario si existe 
        // const resultadoPass= userdata.password;
         //desincriptar contraseña                 password frondend / password  bd
         const resultadoPass= bcrypt.compareSync(userdata.password,usuario.password);

         if(resultadoPass){ // se verifica si la contraseña es correcta 
            const expiresIn = 20*60*60; 
             const accessToken = jwt.sign({id:usuario.id},SecretKey,{expiresIn:expiresIn});
            
        ///datos que regresaran al frondend una vez (usuario) se guardado en BD // si enviamos usuario entonces la pass iria de un lado para el otro de forma innecesaria
        const dataUsuarios={
            name: usuario.name,
            email: usuario.email,
            accessToken: accessToken,
            expiresIn: expiresIn,
        }

        //responder al frondend si todo fue bien, se le devuelve el usuario nuevoo 
        res.send({dataUsuarios});

        
         }else{ // pass incorrecto
             res.status(409).send({message:'somenting went wrong / contraseñ'})

         }
     }

 })
}


exports.getDataUsuarios = (req,res,next)=>{
    User.find({},(error,usuarios)=>{ 
        console.log("ccc" ,usuarios);
        if(!usuarios) {// email no existe 
            res.status(409).send({message:'Something went wrong / No hay usuarios '}) //el usuario no existe // buena practica de programacion no enviar que el usuario no existe en el message
  
       }else{
        console.log("heree");
           console.log(usuarios);
           //responder al frondend si todo fue bien, se le devuelve el usuario nuevoo 
            res.send(usuarios);
       }
        
    }); 
}


