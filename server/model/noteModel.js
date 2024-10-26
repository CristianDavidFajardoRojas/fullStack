const connect = require ('../helper/connect');
const { ObjectId } = require('mongodb');

module.exports = class Note extends connect{
    constructor(){
        super();
    }

    async getAllNotes(idUser) {
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection('note');
            const result = await collection.find({user_id: new ObjectId(idUser)}).toArray();
            return {status: 200, message: "List of notes obtained", data: result};
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: "Error getting all notes", data: error.message}))
        }
    }



    async getNoteById(id, idUser){
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection('note');
            const result = await collection.findOne({_id: new ObjectId(id), user_id: new ObjectId(idUser)});
            if(result) return{status: 200, message: "Note obtained", data: result};
            return {status: 404, message: "Note not found", data: result};
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: "Error getting note by id", data: error.message}))
        }
    }



    async getNoteByTitleOrDesc(text, idUser){
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection('note');
            console.log(text)
            const result = await collection.find({
                $or: [
                   { title: { $regex: new RegExp(text.trim(), 'i') } },
                   { description: { $regex: new RegExp(text.trim(), 'i') } }
                ],
                user_id: new ObjectId(idUser)
            }).toArray();

            if(result) return{status: 200, message: "Note obtained", data: result};
            return {status: 404, message: "Note not found", data: result};
        } catch (error) {
            console.log(error.message);
            throw new Error(JSON.stringify({status: 500, message: "Error getting note by id", data: error.message}))
        }
    }    
}