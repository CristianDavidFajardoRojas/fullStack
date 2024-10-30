const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.auth = async(req, res, next)=>{
    try{
        // const SECRET_KEY =  'tu_clave_secreta_aqui';
        var payload = jwt.verify(req.session.auth, process.env.EXPRESS_SECRET_KEY);
        req.data = payload;
        next();
    }catch(error){
        
        return res.status(401).json({status: 401, message: 'No token provided', data: error.message});
    }
}