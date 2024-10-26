const connect = require ('../helper/connect');
const { ObjectId } = require('mongodb');

module.exports = class User extends connect{
    constructor(){
        super();
    }

    async save(body) {
        try {
            const { status, message, data: db } = await this.getConnect();
            const collection = db.collection('user');
            const [resultNickName] = await collection.find({
            nickname: body.nickname,
            }).toArray();
            if (resultNickName) return { status: 200, message: "El nickName ya existe en la colección.", data: undefined };
            const [resultEmail] = await collection.find({
            email: body.email
            }).toArray();
            if (resultEmail) return { status: 200, message: "El email ya existe en la colección.", data: undefined };
            const result = await collection.insertOne(body);
            return { status: 201, message: "Nuevo usuario insertado correctamente.", data: result };
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: "Error getting all notes", data: error }));
        }
    }


    async update(id, body){
        try{
            const { status, message, data: db } = await this.getConnect();
            const collection = db.collection('user');
            const [resultNickName] = body.nickname ? await collection.find({
                nickname: body.nickname,
            }).toArray() : undefined;
            if (resultNickName) return { status: 200, message: "El nickName ya existe en la colección.", data: undefined };
            const [resultEmail] = body.email ? await collection.find({
                email: body.email
            }).toArray() : undefined;
            if (resultEmail) return { status: 200, message: "El email ya existe en la colección.", data: undefined };
            const result = await collection.updateOne({_id: new ObjectId(id)}, {$set: body});
            return { status: 200, message: "User modified succesfully", data: result };
        }catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: "Error updating the user", data: error.message }));
        }
    }


    async findByEmail(email){
        try {       
            const { status, message, data: db } = await this.getConnect();
            const collection = db.collection('user');
            const result = await collection.findOne({email: email});
            if(result) return { status: 200, message: 'User found succesfully', data: result}
            return { status: 404, message: 'Email not found', data: null }
        } catch (error) {
            return { status : 500, message: 'Error finding the user', data: error.message }
        }
    }
}

