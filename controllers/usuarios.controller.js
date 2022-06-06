const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuariosGet = async(req, res = response)=> {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado : true };

    // const usuarios = await Usuario.find(query)
    //                 .skip(Number(desde))
    //                 .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    //Ejecuta las promesas al mismo tiempo, reduce el tiempo de espera
    const [total, usuarios ] = await Promise.all([
                    Usuario.find(query)
                            .skip(Number(desde))
                            .limit(Number(limite)),
                    Usuario.countDocuments(query)
                ]);

    res.json({
        total,
        usuarios
    })
};

const usuariosPost = async(req, res = response)=> {

    const {nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({nombre, correo, password, rol});

    //Encryptar la password
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar en db
    await usuario.save();

    res.json({
        usuario
    })
};

const usuariosPut = async(req, res = response)=> {

    const { id } = req.params;

    const { _id, password, correo, google, ...resto } = req.body;

    if( password ){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true});

    res.json(usuario)
};

const usuariosDelete = async (req, res = response)=> {

    const { id } = req.params;

    //Fisicamente borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado : false});

    res.json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}