const {response} = require('express');

const usuariosGet = (req, res = response)=> {

    const {nombre = 'no name',edad,id} = req.query;

    res.json({
        msg : 'get API',
        nombre,edad,id
    })
};

const usuariosPost = (req, res = response)=> {

    const {nombre, edad} = req.body;

    res.json({
        msg : 'post API',
        nombre,
        edad
    })
};

const usuariosPut = (req, res = response)=> {

    const { id } = req.params;

    res.json({
        msg : 'put API',
        id
    })
};

const usuariosDelete = (req, res = response)=> {
    res.json({
        msg : 'delete API'
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}