/**
 * 
 * @method addNewUser Crear Usuario
 * @description Crea u nuevo usuario
 * TODO: devuelve un token JWT
 */
exports.addNewUser = async(req, res)=>{
    try{

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

    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
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