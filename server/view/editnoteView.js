const layout = require('express').Router();
const { join } = require('path');

layout.get("/ ", (req, res)=>{
    res.sendFile(join(req.__dirname, 'src/view/editNote.html'));
})


module.exports = layout;