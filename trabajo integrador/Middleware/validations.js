let {check,validationResult,body}= require('express-validator');

 const validations={
    usersRegister:[
  check ('nombre').isLength({min:1}).withMessage('Este campo debe estar completo'),
  check ('email').isEmail().withMessage('El mail debe ser un mail valido'),
  check ('contrasenia').isLength({min:6}).withMessage('La contraseña debe tener al menos seis caracteres'),
  body('confirmacionContrasenia').custom((value, { req }) => {
    if (value !== req.body.contrasenia) {
      throw new Error('La confirmacion de contraseña no concuerda con contraseña');
    }
    
    return true;
  }).withMessage('Contraseña no coinciden') 

    ],
    productCreated:[
      check ('nombre').isLength({min:1}).withMessage('Este campo debe estar completo')
     // check ('descripcion').isLength({min:1}).withMessage('Este campo debe estar completo')


    ]
}

module.exports=validations; 