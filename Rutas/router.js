//rutas
const users = require('../auth/auth.controller');
const cuenta = require('../Cuentas/cuenta.controller');
const Mreciente= require('../MRecientes/reciente.controller');
const Ingresos = require('../Ingresos/Ingresos.controller');
const Gastos = require('../Gastos/gastos.controller');

module.exports= (router)=>{
   router.post('/register',users.createUser);
   router.post('/login',users.loginUser);
   router.post('/savegasto',Gastos.NewGasto);
   router.post('/saveIngresos',Ingresos.NewIngreso)
   router.post('/saveCuentas',cuenta.saveCuentas);
   router.get('/user',users.getDataUsuarios);
   router.delete('/deleteIngreso/:id', Ingresos.deleteIngresos)
   router.delete('/deleteGasto/:id', Gastos.deletegasto)
   router.delete('/deleteCuenta/:id', cuenta.deleteCuentaID)

   router.get('/cuenta',cuenta.getCuentas);
   router.get('/recientes',Mreciente.getMovimientosRecientes_Only5);
   router.get('/ingresos',Ingresos.getIngresos);
   router.get('/gastos',Gastos.getGastos);

   router.put('/gastosUpdate/:id',Gastos.updateGastos);
   router.put('/ingresosUpdate/:id',Ingresos.updateIngresos);
   router.put('/CuentasUpdate/:id',cuenta.updateCuentas)


}