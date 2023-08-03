const { Router } = require('express');
const { check } = require('express-validator');

const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');

const { postCategoria
      } = require('../controllers/categoria.controllers.js');

const { deleteCategoria
} = require('../controllers/categoria.controllers.js');

const router = Router();

/**
 * localhost/api/categorias
 */





// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('usuario','El usuario es obligatorio').not().isEmpty(),

      check('nombre').custom(nameExist),
      check('usuario').custom(userExist),

    validateDocuments
], postCategoria );


router.delete("/:id", [
              validateJWT,
                 isAdminRole,   
          check('id', 'No es un ID válido').isMongoId(),
          check('id').custom( userExist ),
          validateDocuments
      ], deleteCategoria );



router.put("/:id",
[
      check('id', 'No es un ObjectID MongoDB válido').isMongoId(),

      check('id').custom( userExistsById ),
      check('rol').custom(isValidRole),
      validateDocuments
  ], putCategoria );
  
router.patch("/", patchUsers);




module.exports = router;