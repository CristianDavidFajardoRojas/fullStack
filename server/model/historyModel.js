const connect = require('../helper/connect');
const { ObjectId } = require('mongodb');

module.exports = class History extends connect {
    constructor(){
        super()
    }


    async getHistoryNote(idNote, idUser){
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection('history');
            const [ result ] = await collection.find({note_id: new ObjectId(idNote), user_id: new ObjectId(idUser)}).toArray();
            if(result) return{status: 200, message: "History obtained", data: result};
            return {status: 404, message: "History not found", data: result};
        } catch (error) {
            console.log(error.message);
            throw new Error(JSON.stringify({status: 500, message: "Error getting note by id", data: error.message}))
        }
    }
}