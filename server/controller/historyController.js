const History = require('../model/historyModel');
const history = new History();

/**
 * 
 * @method save Guardar historial 
 * @description Guardar historial
 */
exports.save = async(req, res)=>{
    try{
        let result = await history.insertHistory(req.body, req.params.id);
        return res.status(result.status).json(result);
    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}




/**
 * 
 * @method findNoteChangeHistory Obtiene historial de cambios de una nota
 * @description Obtiene historial de cambios de una nota
 */
exports.findNoteChangeHistory = async(req, res)=>{
    try{
        let result = await history.getHistoryNote(req.params.id, req.data._id);
        return res.status(result.status).json(result);
    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}