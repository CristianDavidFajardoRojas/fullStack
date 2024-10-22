/**
 * 
 * @method save Guardar historial 
 * @description Guardar historial
 */
exports.save = async(req, res)=>{
    try{

    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}