const { response, request } = require('express');
const reservasModel = require("../Model/reservas");
const { formatoFecha } = require('../helpers/fecha');

class Reserva
{
    //maneras de obtener datos del request
    //1 - una manera es con request.body
    //2 - request.params (URL)
    //3 - request.query (URL) 

    //obtiene una reserva según mongoID
    getReserva = async ( req=request, res=response ) => {

        try {
            let {id} = req.params
            const reserva = await reservasModel.findById(id);
            res.status(200).json({
                status:200,
                msg:reserva
            })


        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontro la mesa'
            }); 
        }

    }
    //Obtiene todas las reservas según un dia en particular
    getAllReserva = async ( req=request, res=response ) => {
        
        try {
            let {fechaIngreso} = req.body
            
            const reserva = await reservasModel.find();

            let listaReservas = [];

            reserva.forEach( (element, index) => {
                
                if (element.fechaIngreso) {
                    
                    const date = new Date(String(element.fechaIngreso));
                    let day = date.getDate();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    // Sunday - Saturday : 0 - 6
                    let fecha = `${year}-${month}-${day}`
                    if (fecha == fechaIngreso) {
                        listaReservas.push(element)
                    }
                }
            });
            res.status(200).json({
                status:200,
                msg:{reserva: listaReservas}
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron mesas'
            }); 
        }

    }
    //Genera una nueva reserva en la mesa
    postReserva = async ( req=request, res=response ) => {
        
        try {
            let {fechaIngreso, fechaSalida, mesa, reservada, sobrecupo} = req.body
            //ingreso=fechaIngreso
            let reserva = new reservasModel({fechaSalida, mesa, reservada, sobrecupo})
            await reserva.save();
            if ( !fechaIngreso ) {

                fechaIngreso= await formatoFecha(new Date())
                await reservasModel.findByIdAndUpdate(reserva.id, {fechaIngreso:fechaIngreso});
            }
            res.status( 200 ).json( { 
                status: 201,
                msg: 'Mesa reservada' 
            });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se reservo mesa'
            });
        }
    
    }
    //Modifica reserva según mongoID
    putReserva = async ( req=request, res=response ) => {
        
        try {

            let {id} = req.params
            let {fechaIngreso, mesa, fechaSalida, ...update} = req.body
            if (update.sobrecupo == true) {
                await reservasModel.findByIdAndUpdate(id, update);
            } else {
                update.fechaSalida= await formatoFecha(new Date())
                update.reservada = false 
                await reservasModel.findByIdAndUpdate(id, update);
            }
            res.status(200).json({
                status:200,
                msg:"OK"
            })

        } catch (error) {

            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se modifico la reserva'
            });

        }

    }

}

module.exports = Reserva;