const connect = require ('../helper/connect');

module.exports = class Note extends connect{
    constructor(){
        super();
    }

    async getAllNotes() {
        try {
            const { status, message, data, data: db} = await this.getConnect();
            const collection = db.collection('note');
            const result = await collection.find({}).toArray();
            return {status: 200, message: "List of notes obtained", data: result};
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: "Error getting all notes", data: error}))
        }
    }
}