const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const usuarioModel = require("../Model/usuario");
const { update } = require('../Model/rol');

class User
{
    
    getUsuario = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const usuario = await usuarioModel.findById(id);
            res.status(200).json({
                status:200,
                msg:usuario
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro el usuario'
            }); 
        }

    }
    getAllUsuario = async ( req=request, res=response ) => {
        
        try {

            const usuario = await usuarioModel.find();
            res.status(200).json({
                status:200,
                msg:usuario
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron usuarios'
            }); 
        }

    }
    postUsuario = async ( req=request, res=response ) => {
        
        try {

            let {nombre, apellido, rut, contrasenna, correo, celular, fechaCumpleannos, rol, estatus, genero} = req.body
            let usuario = new usuarioModel({nombre, apellido, rut, contrasenna, correo, celular, fechaCumpleannos, rol, estatus, genero})
            const salt = bcryptjs.genSaltSync();
            usuario.contrasenna = bcryptjs.hashSync( contrasenna, salt );
            await usuario.save();
            res.status( 200 ).json({ 
                status: 201,
                msg: 'Usuario creado' 
            });

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se añadio el usuario'
            });

        }

    }
    putUsuario = async ( req=request, res=response ) => {
        
        try {
            
            let {id} = req.params
            let { contrasenna, rut, estatus, ...update} = req.body
            if (contrasenna) {
                const salt = bcryptjs.genSaltSync();
                update.contrasenna = bcryptjs.hashSync( contrasenna, salt);
            }
            let usuario = await usuarioModel.findByIdAndUpdate(id, update);
            res.status(200).json({
                status:200,
                msg:usuario
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico el usuario'
            });
        }

    }
    deleteUsuario = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let update = {}
            let est 
            let {estatus = false} = req.query
            if (estatus == "true") {
                update = {estatus:true}
                est = true
            } else {
                update = {estatus:false}
                est= false
            }
            let usuario = await usuarioModel.findByIdAndUpdate(id, update);
            usuario.estatus = est
            res.status(200).json({
                status:200,
                msg:usuario
            })

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se elimino el usuario'
            });

        }

    }

}

module.exports = User;