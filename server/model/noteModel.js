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
            const result = await collection.find({user_id: new ObjectId(idUser), estado: 'visible'}).toArray();
            return {status: 200, message: "List of notes obtained", data: result};
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: "Error getting all notes", data: error.message}))
        }
    }



    async getNoteById(id, idUser){
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection('note');
            const result = await collection.findOne({_id: new ObjectId(id), user_id: new ObjectId(idUser), estado: 'visible'});
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
            const result = await collection.find({
                $or: [
                   { title: { $regex: new RegExp(text.trim(), 'i') } },
                   { description: { $regex: new RegExp(text.trim(), 'i') } }
                ],
                user_id: new ObjectId(idUser), estado: 'visible'
            }).toArray();

            if(result) return{status: 200, message: "Note obtained", data: result};
            return {status: 404, message: "Note not found", data: result};
        } catch (error) {
            console.log(error.message);
            throw new Error(JSON.stringify({status: 500, message: "Error getting note by title or desc.", data: error.message}))
        }
    }    




    async insertNote(data){
        try{
            data.user_id = new ObjectId(data.user_id);
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection('note');
            const result = await collection.insertOne(data);
            if(result) return{status: 201, message: "Note Inserted Succesfully", data: result};
            return {status: 404, message: "Note not found", data: result};
        }catch(error){
            console.log(error.message);
            throw new Error(JSON.stringify({status: 500, message: "Error creating note", data: error.message}))
        }
    }





    
    async updateNote(id, idUser, data){
        try{
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection('note');
            const result = await collection.updateOne({_id: new ObjectId(id), user_id: new ObjectId(idUser)},{$set: data});
            return{status: 200, message: "Note Updated Succesfully", data: result};
        }catch(error){
            console.log(error.message);
            throw new Error(JSON.stringify({status: 500, message: "Error creating note", data: error.message}))
        }
    }




}