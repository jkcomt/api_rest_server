const Role = require("../models/role");
const Usuario = require('../models/usuario');

const esRolValido = async( rol = '')=>{    
    const existeRole = await Role.findOne( { rol });
    if(!existeRole){
      throw new Error( `El rol ${ rol} no existe en la BD`) 
    }
  }

const emailValido = async( correo )=> {
  
  const existeEmail = await Usuario.findOne({ correo });

  if(existeEmail){
    throw new Error( `El correo ${ correo } ya está registrado`) 
  }
}

const existeUsuariobyID = async( id )=>{
  try {  
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
      throw new Error( `El usuario ${ id } no existe`) 
    } 
  } catch (error) {
      throw new Error( `El id ${ id } no es válido`);      
  }
}

module.exports = {
    esRolValido,
    emailValido,
    existeUsuariobyID
}