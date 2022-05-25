const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.midddlewares();
        
        //Rutas de aplicación
        this.routes();
    }

    midddlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parsear body a json
        this.app.use(express.json());
        
        //Directorio público
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios.route'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriento en puerto ', this.port)
        });
    }
}

module.exports = Server;