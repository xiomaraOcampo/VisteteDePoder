let {check,validationResult,body}= require('express-validator');

 const validations={
    usersRegister:[
  check ('nombre').isLength({min:1}).withMessage('Este campo debe estar completo'),
  check ('email').isEmail().withMessage('El mail y/o contraseña son incorrectos'),
  check ('contrasenia').isLength({min:6}).withMessage('El mail y/o contraseña son incorrectos'),
  body('confirmacionContrasenia').custom((value, { req }) => {
    if (value !== req.body.contrasenia) {
      throw new Error('La confirmacion de contraseña no concuerda con contraseña');
    }
    
    return true;
  }).withMessage('Contraseña no coinciden') 

    ],

    productCreated:[
      check ('nombre').isLength({min:1}).withMessage('Te faltó el nombre!!!'),
      check ('descripcion').isLength({min:1}).withMessage('Este campo debe estar completo'),
      check ('precio').isCurrency({symbol: '$', require_symbol: false, allow_space_after_symbol: false, symbol_after_digits: false, allow_negatives: true, parens_for_negatives: false, negative_sign_before_digits: false, negative_sign_after_digits: false, allow_negative_sign_placeholder: false, thousands_separator: '.', decimal_separator: ',', allow_decimal: true, require_decimal: false, digits_after_decimal: [2], allow_space_after_digits: false}).withMessage('El campo precio debe estar completo'),


    ],
    usersEdit:[
      check ('nombre').isLength({min:1}).withMessage('Este campo debe estar completo'),
      check ('email').isEmail().withMessage('El mail es incorrecto'),

    ],
    usersUpload:[
      check ('email').isEmail(),
      check ('contrasenia').isLength({min:6}).withMessage('El mail y/o contraseña son invalidos'),
    ]
}

module.exports=validations;