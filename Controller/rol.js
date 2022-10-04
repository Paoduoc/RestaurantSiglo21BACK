const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const rolModel = require("../Model/rol");

class Rol
{
    //maneras de obtener datos del request
    //1 - una manera es con request.body
    //2 - request.params (URL)
    //3 - request.query (URL) 
    getRol = async ( req=request, res=response ) => {

        try {
            
            let {id} = req.params
            const rol = await rolModel.findById(id);
            res.status(200).json({
                status:200,
                msg:rol
            })

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el rol'
            }); 

        }

    }
    getAllRol = async ( req=request, res=response ) => {
        
        try {
            
            const roles = await rolModel.find();
            res.status(200).json({
                status:200,
                msg:roles
            })

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron roles'
            });

        }

    }
    postRol = async ( req=request, res=response ) => {
        
        try {

            let {nombre} = req.body
            let rol = new rolModel({nombre})

            await rol.save();
            res.status( 200 ).json( { status: 201,msg: 'Rol creado' } );
            
        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadieron roles'
            });
        }
    
    }
    putRol = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let {nombre} = req.body
            let rol = await rolModel.findByIdAndUpdate(id, {nombre});
            rol.nombre = nombre
            res.status(200).json({
                status:200,
                msg:rol
            })

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el rol'
            });

        }

    }
    deleteRol = async ( req=request, res=response ) => {
        
        try {
            
            let {id} = req.params
            let update = {}
            let est 
            let {estado = false} = req.query
            if (estado == "true") {
                update = {estado:true}
                est = true
            } else {
                update = {estado:false}
                est= false
            }
            let rol = await rolModel.findByIdAndUpdate(id, update);
            rol.estado = est
            res.status(200).json({
                status:200,
                msg:rol
            })

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se elimino el rol'
            });

        }

    }

}

module.exports = Rol;