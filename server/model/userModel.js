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

}

