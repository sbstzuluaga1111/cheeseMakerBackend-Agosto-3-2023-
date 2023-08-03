const Categoria  = require('../models/Categoria.js');  

const postCategoria = async(req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }
   /*  console.log("usuario:",usuario); */
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    
    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}


module.exports = {
    getCategoria,
    postCategoria,
    deleteCategoria,
    putCategoria,
}


const getCategoria = async(req, res)=>{
    const { hasta, desde } = req.query;
    const query = { estado: true };

//const usuarios = await Usuario.find(query)
//   .skip(Number( desde ))
//   .limit(Number( hasta ))

//const total = await Usuario.countDocuments(query)

    const [ total, usuarios ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip( Number( desde ))
            .limit(Number( hasta ))
    ]);

    res.json({
        total,
        usuarios
    });
}

const deleteCategoria = async (req, res)=>{
    //19.  extraigo y respondo id pasado como parametro desde postman
    const {id} = req.params

    //20. borrado fisico en DB
   /*  const usuario = await Usuario.findByIdAndDelete(id); */

    //21.  borrado virtual.  solo se cambia el estado a false del usuario asociado al id en cuestion
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json(usuario)
}

const putCategoria = async (req, res)=>{
  /* 1- http put ini*/
    const { id } = req.params;
    //Extraigo lo que NO necesito que se registre en MONGODB
    // incluyendo el object _id de mongodb
    const { _id,estado, ...resto } = req.body;

    //Busca documento por el id y actualiza lo deseado(resto) de la coleccion.
    const nombre = await nombre.findByIdAndUpdate( id, resto );
    const usuario = await usuario.findByIdAndUpdate( id, resto );
    
    res.json({
        msg:"Categoria Actualizada",
        nombre : nombre
    });
     /* 1- http put fin */
}