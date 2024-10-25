const connect = require ('../helper/connect');
const { ObjectId } = require('mongodb');

module.exports = class Note extends connect{
    constructor(){
        super();
    }

    async getAllNotes() {
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection('note');
            const result = await collection.find({}).toArray();
            return {status: 200, message: "List of notes obtained", data: result};
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: "Error getting all notes", data: error.message}))
        }
    }



    async getNoteById(id){
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection('note');
            const result = await collection.findOne({_id: new ObjectId(id)});
            if(result) return{status: 200, message: "Note obtained", data: result};
            return {status: 404, message: "Note not found", data: result};
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: "Error getting note by id", data: error.message}))
        }
    }
}