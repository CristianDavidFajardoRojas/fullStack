const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');


const User = require('../model/userModel');
const user = new User();

/**
 * 
 * @method addNewUser Crear Usuario
 * @description Crea u nuevo usuario
 * TODO: devuelve un token JWT
 */
exports.addNewUser = async(req, res)=>{
    try{
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let resultPOST = await user.save(req.body);
        if(resultPOST.status !== 201) return res.status(resultPOST.status).json(resultPOST);
        delete req.body.password;
        req.body._id = resultPOST.data.insertedId;
        const SECRET_KEY =  fs.readFileSync('./certificate.csr');
        const token = jwt.sign(req.body, SECRET_KEY.toString('utf8'), {expiresIn: 1800000});
        req.session.auth = token;
        return res.status(202).json({status: 202, message: 'User created succesfully'});
    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}




/**
 * 
 * @method signInUser Iniciar Sesion
 * @description Permite a un usuario iniciar sesion
 * TODO: devuelve un token JWT
 */
exports.signInUser = async(req, res)=>{
    try{

    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}




/**
 * 
 * @method logOutUser Cerrar Sesion
 * @description Permite a un usuario cerrar sesion
 * TODO: devuelve un token JWT
 */
exports.logOutUser = async(req, res)=>{
    try{

    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}







/**
 * 
 * @method updateUserById Actualizar usuario
 * @description Permite actualizar un usuario por su id
 */
exports.updateUserById = async(req, res)=>{
    try{
        if( req.body.password ) req.body.password = await bcrypt.hash(req.body.password, 10);
        let resultUPDATE = await user.update(req.params.id, req.body);
        return res.status(resultUPDATE.status).json(resultUPDATE);
    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err);
    }
}




/**
 * 
 * @method deleteUserById Eliminar usuario
 * @description Permite eliminar un usuario por su id
 */
exports.deleteUserById = async(req, res)=>{
    try{

    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}